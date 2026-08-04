import "server-only";

import path from "node:path";
import {
  lstat,
  link,
  mkdir,
  open,
  readdir,
  realpath,
  rename,
  rmdir,
  unlink,
} from "node:fs/promises";
import { CODEXFORGE_PROJECT_ROOT } from "@/lib/codexforge/server-safe-paths";
import { makeCreatorHexId } from "./creator-crypto";
import {
  creatorNativeRootExists,
  openCreatorNativeRoot,
  type CreatorNativeRoot,
  type CreatorNativeTreeEntry,
} from "./creator-native-filesystem.server";

const CREATOR_MAX_OWNED_FILE_READ_BYTES = 1_048_576;
const CREATOR_MAX_TREE_PUBLICATION_ENTRIES = 15;
const CREATOR_MAX_TREE_TARGET_SEGMENTS = 64;
const CREATOR_MAX_TREE_RELATIVE_SEGMENTS = 5;
const CREATOR_MAX_TREE_RELATIVE_SEGMENT_CHARACTERS = 48;
const CREATOR_MAX_TREE_RELATIVE_CHARACTERS = 126;
const CREATOR_MAX_TREE_PUBLICATION_BYTES = 1_048_576;

export type CreatorTreePublicationEntry = CreatorNativeTreeEntry;

export class CreatorFilesystemError extends Error {
  constructor(
    readonly code:
      | "unsafe_creator_root"
      | "unsafe_artifact_path"
      | "already_exists"
      | "not_found"
      | "write_failed",
    message: string
  ) {
    super(message);
    this.name = "CreatorFilesystemError";
  }
}

function errorCode(error: unknown): string | null {
  return typeof error === "object" && error !== null && "code" in error
    ? String((error as { code?: unknown }).code ?? "")
    : null;
}

function isContained(candidate: string, base: string): boolean {
  const relative = path.relative(base, candidate);
  return relative === "" || (!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`));
}

function assertInternalSegment(segment: string): void {
  if (
    !segment ||
    segment === "." ||
    segment === ".." ||
    segment.includes("/") ||
    segment.includes("\\") ||
    segment.includes(":") ||
    segment.includes("\0") ||
    !/^[A-Za-z0-9._-]+$/.test(segment) ||
    segment.endsWith(".") ||
    segment.endsWith(" ")
  ) {
    throw new CreatorFilesystemError("unsafe_artifact_path", "Creator filesystem segment is unsafe.");
  }
}

function normalizeTreePublicationEntries(
  targetSegments: readonly string[],
  entries: readonly CreatorTreePublicationEntry[]
): readonly CreatorNativeTreeEntry[] {
  if (
    !Array.isArray(targetSegments) ||
    !Array.isArray(entries) ||
    targetSegments.length < 1 ||
    targetSegments.length > CREATOR_MAX_TREE_TARGET_SEGMENTS ||
    !targetSegments.every((segment) => typeof segment === "string") ||
    entries.length < 1 ||
    entries.length > CREATOR_MAX_TREE_PUBLICATION_ENTRIES
  ) {
    throw new CreatorFilesystemError(
      "unsafe_artifact_path",
      "Creator tree publication shape is outside its bounded policy."
    );
  }
  targetSegments.forEach(assertInternalSegment);

  let aggregateBytes = 0;
  const canonicalFiles: string[] = [];
  return entries.map((entry) => {
    if (!Array.isArray(entry) || entry.length !== 2) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator tree publication entry is malformed."
      );
    }
    const relativeSegments = entry[0];
    const data = entry[1];
    if (
      !Array.isArray(relativeSegments) ||
      relativeSegments.length < 1 ||
      relativeSegments.length > CREATOR_MAX_TREE_RELATIVE_SEGMENTS ||
      !relativeSegments.every((segment) => typeof segment === "string") ||
      !Buffer.isBuffer(data) ||
      data.length > CREATOR_MAX_OWNED_FILE_READ_BYTES
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator tree publication entry is outside its bounded policy."
      );
    }
    relativeSegments.forEach(assertInternalSegment);
    if (
      relativeSegments.some(
        (segment) => segment.length > CREATOR_MAX_TREE_RELATIVE_SEGMENT_CHARACTERS
      ) ||
      relativeSegments.join("/").length > CREATOR_MAX_TREE_RELATIVE_CHARACTERS
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator tree publication relative path exceeds its bounded policy."
      );
    }
    aggregateBytes += data.length;
    if (aggregateBytes > CREATOR_MAX_TREE_PUBLICATION_BYTES) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator tree publication exceeds its aggregate byte limit."
      );
    }

    const canonical = relativeSegments.map((segment) => segment.toLowerCase()).join("/");
    if (
      canonicalFiles.some(
        (existing) =>
          existing === canonical ||
          existing.startsWith(`${canonical}/`) ||
          canonical.startsWith(`${existing}/`)
      )
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator tree publication contains a duplicate, case collision, or file/ancestor collision."
      );
    }
    canonicalFiles.push(canonical);
    return [[...relativeSegments], Buffer.from(data)] as const;
  });
}

async function safeLstat(absolutePath: string) {
  return lstat(absolutePath).catch((error: unknown) => {
    if (errorCode(error) === "ENOENT") return null;
    throw error;
  });
}

async function removeOwnedTreeAbsolute(absolutePath: string, containmentRoot: string): Promise<void> {
  const stat = await safeLstat(absolutePath);
  if (!stat) return;
  if (stat.isSymbolicLink()) {
    await unlink(absolutePath);
    return;
  }
  const resolved = await realpath(absolutePath);
  if (!isContained(resolved, containmentRoot)) {
    throw new CreatorFilesystemError("unsafe_artifact_path", "Creator cleanup target resolves outside its owned root.");
  }
  if (stat.isDirectory()) {
    const entries = await readdir(absolutePath);
    for (const entry of entries) {
      await removeOwnedTreeAbsolute(path.join(absolutePath, entry), containmentRoot);
    }
    const after = await lstat(absolutePath);
    const afterResolved = await realpath(absolutePath);
    if (
      !after.isDirectory() ||
      after.isSymbolicLink() ||
      after.dev !== stat.dev ||
      after.ino !== stat.ino ||
      afterResolved !== resolved ||
      !isContained(afterResolved, containmentRoot)
    ) {
      throw new CreatorFilesystemError("unsafe_artifact_path", "Creator cleanup directory changed during bounded removal.");
    }
    await rmdir(absolutePath);
    return;
  }
  const after = await lstat(absolutePath);
  if (
    !after.isFile() ||
    after.isSymbolicLink() ||
    after.dev !== stat.dev ||
    after.ino !== stat.ino ||
    (await realpath(absolutePath)) !== resolved
  ) {
    throw new CreatorFilesystemError("unsafe_artifact_path", "Creator cleanup file changed during bounded removal.");
  }
  await unlink(absolutePath);
}

export class CreatorOwnedFilesystem {
  private readonly rootSegments: readonly string[];
  private nativeRoot: CreatorNativeRoot | null = null;
  private nativeLifecycleTerminated = false;
  private rootAbsolutePath: string | null = null;
  private projectRealPath: string | null = null;
  private projectIdentity: Readonly<{ device: number; inode: number }> | null = null;
  private rootRealPath: string | null = null;
  private rootIdentity: Readonly<{ device: number; inode: number }> | null = null;

  private async captureDirectoryIdentity(segments: readonly string[]): Promise<Readonly<{
    absolutePath: string;
    realPath: string;
    device: number;
    inode: number;
  }>> {
    const absolutePath = await this.assertSafeExisting(segments, "directory");
    const stat = await lstat(absolutePath);
    const realPath = await realpath(absolutePath);
    return { absolutePath, realPath, device: stat.dev, inode: stat.ino };
  }

  private async revalidateDirectoryIdentity(identity: Readonly<{
    absolutePath: string;
    realPath: string;
    device: number;
    inode: number;
  }>): Promise<void> {
    const stat = await lstat(identity.absolutePath);
    const realPath = await realpath(identity.absolutePath);
    if (
      !stat.isDirectory() ||
      stat.isSymbolicLink() ||
      stat.dev !== identity.device ||
      stat.ino !== identity.inode ||
      realPath !== identity.realPath ||
      this.rootRealPath === null ||
      !isContained(realPath, this.rootRealPath)
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator directory identity changed at the filesystem operation boundary."
      );
    }
  }

  private async revalidateDirectoryOperationBoundary(
    segments: readonly string[],
    identity: Readonly<{
      absolutePath: string;
      realPath: string;
      device: number;
      inode: number;
    }>
  ): Promise<void> {
    await this.revalidateDirectoryIdentity(identity);
    const recaptured = await this.captureDirectoryIdentity(segments);
    if (
      recaptured.absolutePath !== identity.absolutePath ||
      recaptured.realPath !== identity.realPath ||
      recaptured.device !== identity.device ||
      recaptured.inode !== identity.inode
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator directory identity changed immediately before the filesystem operation."
      );
    }
  }

  constructor(readonly dataRootLabel: string) {
    if (process.platform !== "win32") {
      throw new CreatorFilesystemError(
        "unsafe_creator_root",
        "Secure creator filesystem operations are currently available only on Windows with the audited native boundary."
      );
    }
    const segments = dataRootLabel.split("/");
    if (
      segments.length < 2 ||
      segments[0] !== ".codexforge" ||
      !["creator", "creator-tests"].includes(segments[1]) ||
      segments.some((segment) => !segment)
    ) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator data root label is not allowlisted.");
    }
    segments.forEach(assertInternalSegment);
    this.rootSegments = segments;
  }

  private native(): CreatorNativeRoot {
    if (process.platform !== "win32" || this.nativeLifecycleTerminated) {
      throw new CreatorFilesystemError(
        "unsafe_creator_root",
        this.nativeLifecycleTerminated
          ? "Creator filesystem lifecycle is permanently closed after owned-root cleanup was attempted."
          : "Secure creator filesystem operations are unavailable on this platform."
      );
    }
    try {
      this.nativeRoot ??= openCreatorNativeRoot(this.rootSegments);
      return this.nativeRoot;
    } catch (error) {
      if (error instanceof CreatorFilesystemError) throw error;
      throw new CreatorFilesystemError(
        "unsafe_creator_root",
        error instanceof Error ? error.message : "Secure Windows creator filesystem support is unavailable."
      );
    }
  }

  private translateNativeError(error: unknown, operation: "read" | "write"): never {
    const code = errorCode(error);
    if (code === "already_exists") {
      throw new CreatorFilesystemError("already_exists", "Creator-owned target already exists.");
    }
    if (code === "not_found") {
      throw new CreatorFilesystemError("not_found", "Creator-owned path was not found.");
    }
    if (
      code === "invalid_path" ||
      code === "unsafe_reparse" ||
      code === "unsafe_node" ||
      code === "unsafe_hardlink" ||
      code === "closed"
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator filesystem rejected an unsafe handle-relative path or node."
      );
    }
    if (code === "helper_unavailable") {
      throw new CreatorFilesystemError(
        "unsafe_creator_root",
        "Secure Windows creator storage is unavailable. Rebuild the bundled native helper and use an NTFS volume with transaction support."
      );
    }
    throw new CreatorFilesystemError(
      operation === "read" ? "unsafe_artifact_path" : "write_failed",
      operation === "read"
        ? "Creator filesystem could not complete a verified handle-relative read."
        : "Creator filesystem could not complete a verified handle-relative mutation."
    );
  }

  async ensureRoot(): Promise<string> {
    if (process.platform === "win32") {
      this.native();
      const root = this.rootSegments.reduce(
        (current, segment) => path.join(current, segment),
        CODEXFORGE_PROJECT_ROOT
      );
      this.rootAbsolutePath = root;
      return root;
    }
    const projectStat = await lstat(CODEXFORGE_PROJECT_ROOT);
    if (!projectStat.isDirectory() || projectStat.isSymbolicLink()) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator project root is not a safe directory.");
    }
    const projectRealPath = await realpath(CODEXFORGE_PROJECT_ROOT);
    if (
      (this.projectRealPath !== null && this.projectRealPath !== projectRealPath) ||
      (this.projectIdentity !== null &&
        (this.projectIdentity.device !== projectStat.dev || this.projectIdentity.inode !== projectStat.ino))
    ) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator project root identity changed during this process.");
    }
    this.projectRealPath = projectRealPath;
    this.projectIdentity = { device: projectStat.dev, inode: projectStat.ino };
    let current = CODEXFORGE_PROJECT_ROOT;
    for (const segment of this.dataRootLabel.split("/")) {
      assertInternalSegment(segment);
      current = path.join(current, segment);
      let stat = await safeLstat(current);
      if (!stat) {
        try {
          await mkdir(current);
        } catch (error) {
          if (errorCode(error) !== "EEXIST") throw error;
        }
        stat = await lstat(current);
      }
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new CreatorFilesystemError("unsafe_creator_root", "Creator root contains a link or non-directory component.");
      }
      const resolved = await realpath(current);
      if (!isContained(resolved, projectRealPath)) {
        throw new CreatorFilesystemError("unsafe_creator_root", "Creator root resolves outside the project boundary.");
      }
    }
    const rootStat = await lstat(current);
    const rootRealPath = await realpath(current);
    const finalProjectStat = await lstat(CODEXFORGE_PROJECT_ROOT);
    const finalProjectRealPath = await realpath(CODEXFORGE_PROJECT_ROOT);
    if (
      !finalProjectStat.isDirectory() ||
      finalProjectStat.isSymbolicLink() ||
      finalProjectRealPath !== projectRealPath ||
      finalProjectStat.dev !== projectStat.dev ||
      finalProjectStat.ino !== projectStat.ino ||
      (this.rootRealPath !== null && this.rootRealPath !== rootRealPath) ||
      (this.rootIdentity !== null &&
        (this.rootIdentity.device !== rootStat.dev || this.rootIdentity.inode !== rootStat.ino))
    ) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator root identity changed during this process.");
    }
    this.rootAbsolutePath = current;
    this.rootRealPath = rootRealPath;
    this.rootIdentity = { device: rootStat.dev, inode: rootStat.ino };
    return current;
  }

  async rootExists(): Promise<boolean> {
    if (process.platform === "win32") {
      if (this.nativeLifecycleTerminated) {
        throw new CreatorFilesystemError(
          "unsafe_creator_root",
          "Creator root lifecycle is closed and cannot be inspected again."
        );
      }
      if (this.nativeRoot) {
        this.nativeRoot.stat([]);
        return true;
      }
      try {
        const exists = creatorNativeRootExists(this.rootSegments);
        if (exists) this.native();
        return exists;
      } catch (error) {
        throw new CreatorFilesystemError(
          "unsafe_creator_root",
          error instanceof Error ? error.message : "Creator root could not be inspected securely."
        );
      }
    }
    const projectStat = await lstat(CODEXFORGE_PROJECT_ROOT);
    if (!projectStat.isDirectory() || projectStat.isSymbolicLink()) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator project root is not a safe directory.");
    }
    const projectRealPath = await realpath(CODEXFORGE_PROJECT_ROOT);
    if (
      (this.projectRealPath !== null && this.projectRealPath !== projectRealPath) ||
      (this.projectIdentity !== null &&
        (this.projectIdentity.device !== projectStat.dev || this.projectIdentity.inode !== projectStat.ino))
    ) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator project root identity changed during this process.");
    }
    this.projectRealPath = projectRealPath;
    this.projectIdentity = { device: projectStat.dev, inode: projectStat.ino };
    let current = CODEXFORGE_PROJECT_ROOT;
    for (const segment of this.dataRootLabel.split("/")) {
      current = path.join(current, segment);
      const stat = await safeLstat(current);
      if (!stat) return false;
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new CreatorFilesystemError("unsafe_creator_root", "Creator root contains a link or non-directory component.");
      }
      const resolved = await realpath(current);
      if (!isContained(resolved, projectRealPath)) {
        throw new CreatorFilesystemError("unsafe_creator_root", "Creator root resolves outside the project boundary.");
      }
    }
    const rootStat = await lstat(current);
    const rootRealPath = await realpath(current);
    const finalProjectStat = await lstat(CODEXFORGE_PROJECT_ROOT);
    const finalProjectRealPath = await realpath(CODEXFORGE_PROJECT_ROOT);
    if (
      !finalProjectStat.isDirectory() ||
      finalProjectStat.isSymbolicLink() ||
      finalProjectRealPath !== projectRealPath ||
      finalProjectStat.dev !== projectStat.dev ||
      finalProjectStat.ino !== projectStat.ino ||
      (this.rootRealPath !== null && this.rootRealPath !== rootRealPath) ||
      (this.rootIdentity !== null &&
        (this.rootIdentity.device !== rootStat.dev || this.rootIdentity.inode !== rootStat.ino))
    ) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator root identity changed during this process.");
    }
    this.rootAbsolutePath = current;
    this.rootRealPath = rootRealPath;
    this.rootIdentity = { device: rootStat.dev, inode: rootStat.ino };
    return true;
  }

  private async revalidateRoot(root: string): Promise<string> {
    const stat = await lstat(root);
    const resolved = await realpath(root);
    if (
      !stat.isDirectory() ||
      stat.isSymbolicLink() ||
      this.rootRealPath === null ||
      resolved !== this.rootRealPath ||
      this.rootIdentity === null ||
      stat.dev !== this.rootIdentity.device ||
      stat.ino !== this.rootIdentity.inode ||
      this.projectRealPath === null ||
      !isContained(resolved, this.projectRealPath)
    ) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator root trust anchor failed revalidation.");
    }
    return resolved;
  }

  async resolve(segments: readonly string[]): Promise<string> {
    const root = await this.ensureRoot();
    segments.forEach(assertInternalSegment);
    const candidate = segments.reduce((current, segment) => path.join(current, segment), root);
    if (!isContained(path.resolve(candidate), path.resolve(root))) {
      throw new CreatorFilesystemError("unsafe_artifact_path", "Creator path escapes its owned root.");
    }
    return candidate;
  }

  async ensureDirectory(segments: readonly string[]): Promise<string> {
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      try {
        this.native().ensureDirectory(segments);
      } catch (error) {
        this.translateNativeError(error, "write");
      }
      return this.resolve(segments);
    }
    const root = await this.ensureRoot();
    const rootRealPath = await this.revalidateRoot(root);
    let current = root;
    for (const segment of segments) {
      assertInternalSegment(segment);
      current = path.join(current, segment);
      let stat = await safeLstat(current);
      if (!stat) {
        try {
          await mkdir(current);
        } catch (error) {
          if (errorCode(error) !== "EEXIST") throw error;
        }
        stat = await lstat(current);
      }
      if (!stat.isDirectory() || stat.isSymbolicLink()) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator directory contains a link or non-directory component.");
      }
      const resolved = await realpath(current);
      if (!isContained(resolved, rootRealPath)) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator directory resolves outside its owned root.");
      }
    }
    return current;
  }

  async createDirectoryExclusive(segments: readonly string[]): Promise<string> {
    if (segments.length < 1) {
      throw new CreatorFilesystemError("unsafe_artifact_path", "Creator directory target is missing.");
    }
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      try {
        this.native().createDirectoryExclusive(segments);
      } catch (error) {
        this.translateNativeError(error, "write");
      }
      return this.resolve(segments);
    }
    const parent = segments.slice(0, -1);
    await this.ensureDirectory(parent);
    const parentIdentity = await this.captureDirectoryIdentity(parent);
    await this.revalidateDirectoryOperationBoundary(parent, parentIdentity);
    const absolutePath = path.join(parentIdentity.absolutePath, segments.at(-1)!);
    try {
      await mkdir(absolutePath);
    } catch (error) {
      if (errorCode(error) === "EEXIST") {
        throw new CreatorFilesystemError("already_exists", "Creator-owned directory already exists.");
      }
      throw new CreatorFilesystemError("write_failed", "Creator-owned directory creation failed.");
    }
    await this.assertSafeExisting(segments, "directory");
    return absolutePath;
  }

  async assertSafeExisting(
    segments: readonly string[],
    expected: "file" | "directory"
  ): Promise<string> {
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      let kind: "file" | "directory";
      try {
        kind = this.native().stat(segments);
      } catch (error) {
        this.translateNativeError(error, "read");
      }
      if (kind !== expected) {
        throw new CreatorFilesystemError(
          "unsafe_artifact_path",
          `Creator-owned ${expected} target has an unsafe node type.`
        );
      }
      return this.resolve(segments);
    }
    const root = await this.ensureRoot();
    const rootRealPath = await this.revalidateRoot(root);
    let current = root;
    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      assertInternalSegment(segment);
      current = path.join(current, segment);
      const stat = await safeLstat(current);
      if (!stat) throw new CreatorFilesystemError("not_found", "Creator-owned path was not found.");
      if (stat.isSymbolicLink()) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator-owned path contains a symbolic link or junction.");
      }
      const isLast = index === segments.length - 1;
      if (!isLast && !stat.isDirectory()) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator-owned path has a non-directory ancestor.");
      }
      if (isLast && expected === "file" && !stat.isFile()) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator-owned file target is not a regular file.");
      }
      if (isLast && expected === "directory" && !stat.isDirectory()) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator-owned directory target is not a directory.");
      }
      const resolved = await realpath(current);
      if (!isContained(resolved, rootRealPath)) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator-owned path resolves outside its root.");
      }
    }
    return current;
  }

  async listDirectory(segments: readonly string[]): Promise<readonly string[]> {
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      try {
        return this.native().listDirectory(segments).sort();
      } catch (error) {
        this.translateNativeError(error, "read");
      }
    }
    const absolutePath = await this.assertSafeExisting(segments, "directory");
    return (await readdir(absolutePath)).sort();
  }

  async readBuffer(segments: readonly string[]): Promise<Buffer> {
    if (segments.length < 1) {
      throw new CreatorFilesystemError("unsafe_artifact_path", "Creator file target is missing.");
    }
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      try {
        return this.native().readFile(segments, CREATOR_MAX_OWNED_FILE_READ_BYTES);
      } catch (error) {
        this.translateNativeError(error, "read");
      }
    }
    const parentIdentity = await this.captureDirectoryIdentity(segments.slice(0, -1));
    await this.revalidateDirectoryOperationBoundary(segments.slice(0, -1), parentIdentity);
    const absolutePath = path.join(parentIdentity.absolutePath, segments.at(-1)!);
    let handle;
    try {
      handle = await open(absolutePath, "r");
      const before = await handle.stat();
      const pathStat = await lstat(absolutePath);
      const targetRealPath = await realpath(absolutePath);
      await this.revalidateDirectoryIdentity(parentIdentity);
      if (
        !before.isFile() ||
        !pathStat.isFile() ||
        pathStat.isSymbolicLink() ||
        before.dev !== pathStat.dev ||
        before.ino !== pathStat.ino ||
        before.size > CREATOR_MAX_OWNED_FILE_READ_BYTES ||
        this.rootRealPath === null ||
        !isContained(targetRealPath, this.rootRealPath)
      ) {
        throw new CreatorFilesystemError(
          "unsafe_artifact_path",
          "Creator-owned file failed verified-handle containment checks."
        );
      }
      const value = await handle.readFile();
      const after = await handle.stat();
      await this.revalidateDirectoryIdentity(parentIdentity);
      if (
        before.dev !== after.dev ||
        before.ino !== after.ino ||
        before.size !== after.size ||
        after.size > CREATOR_MAX_OWNED_FILE_READ_BYTES ||
        value.length !== after.size
      ) {
        throw new CreatorFilesystemError("unsafe_artifact_path", "Creator-owned file changed during its bounded read.");
      }
      return value;
    } finally {
      await handle?.close().catch(() => undefined);
    }
  }

  async writeExclusive(segments: readonly string[], data: Buffer): Promise<void> {
    if (segments.length < 1) throw new CreatorFilesystemError("unsafe_artifact_path", "Creator file target is missing.");
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      try {
        const temporaryName = `${segments.at(-1)}.tmp-${makeCreatorHexId(8)}`;
        this.native().writeAtomicExclusive(segments, temporaryName, data);
        return;
      } catch (error) {
        if (error instanceof CreatorFilesystemError) throw error;
        this.translateNativeError(error, "write");
      }
    }
    const parent = segments.slice(0, -1);
    await this.ensureDirectory(parent);
    const parentIdentity = await this.captureDirectoryIdentity(parent);
    await this.revalidateDirectoryOperationBoundary(parent, parentIdentity);
    const absolutePath = path.join(parentIdentity.absolutePath, segments.at(-1)!);
    let handle;
    let createdIdentity: Readonly<{ device: number; inode: number }> | null = null;
    let payloadWritten = false;
    try {
      handle = await open(absolutePath, "wx", 0o600);
      const opened = await handle.stat();
      createdIdentity = { device: opened.dev, inode: opened.ino };
      await this.revalidateDirectoryIdentity(parentIdentity);
      const pathStat = await lstat(absolutePath);
      const targetRealPath = await realpath(absolutePath);
      if (
        !pathStat.isFile() ||
        pathStat.isSymbolicLink() ||
        pathStat.dev !== opened.dev ||
        pathStat.ino !== opened.ino ||
        opened.size !== 0 ||
        this.rootRealPath === null ||
        !isContained(targetRealPath, this.rootRealPath)
      ) {
        throw new CreatorFilesystemError(
          "unsafe_artifact_path",
          "Creator file identity failed containment verification before payload write."
        );
      }
      await handle.writeFile(data);
      payloadWritten = true;
      await handle.sync();
    } catch (error) {
      await handle?.close().catch(() => undefined);
      handle = undefined;
      if (!payloadWritten && createdIdentity) {
        const created = await safeLstat(absolutePath).catch(() => null);
        if (
          created?.isFile() &&
          !created.isSymbolicLink() &&
          created.size === 0 &&
          created.dev === createdIdentity.device &&
          created.ino === createdIdentity.inode
        ) {
          await unlink(absolutePath).catch(() => undefined);
        }
      }
      if (error instanceof CreatorFilesystemError) throw error;
      if (errorCode(error) === "EEXIST") {
        throw new CreatorFilesystemError("already_exists", "Creator-owned target already exists.");
      }
      throw new CreatorFilesystemError("write_failed", "Creator-owned exclusive write failed.");
    } finally {
      await handle?.close().catch(() => undefined);
    }
    const written = await this.readBuffer(segments);
    if (!written.equals(data)) {
      throw new CreatorFilesystemError("write_failed", "Creator-owned write verification failed.");
    }
  }

  async writeAtomicExclusive(segments: readonly string[], data: Buffer): Promise<void> {
    if (segments.length < 1) throw new CreatorFilesystemError("unsafe_artifact_path", "Creator file target is missing.");
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      const temporaryName = `${segments.at(-1)}.tmp-${makeCreatorHexId(8)}`;
      try {
        this.native().writeAtomicExclusive(segments, temporaryName, data);
        return;
      } catch (error) {
        if (error instanceof CreatorFilesystemError) throw error;
        this.translateNativeError(error, "write");
      }
    }
    const parent = segments.slice(0, -1);
    await this.ensureDirectory(parent);
    const parentIdentity = await this.captureDirectoryIdentity(parent);
    await this.revalidateDirectoryOperationBoundary(parent, parentIdentity);
    const target = path.join(parentIdentity.absolutePath, segments.at(-1)!);
    if (await safeLstat(target)) {
      throw new CreatorFilesystemError("already_exists", "Creator-owned target already exists.");
    }
    const temporarySegments = [
      ...parent,
      `${segments.at(-1)}.tmp-${makeCreatorHexId(8)}`,
    ];
    const temporary = await this.resolve(temporarySegments);
    try {
      await this.writeExclusive(temporarySegments, data);
      try {
        await this.revalidateDirectoryOperationBoundary(parent, parentIdentity);
        await link(temporary, target);
      } catch (error) {
        if (errorCode(error) === "EEXIST") {
          throw new CreatorFilesystemError("already_exists", "Creator-owned target already exists.");
        }
        throw new CreatorFilesystemError("write_failed", "Creator-owned atomic publication failed.");
      }
      await unlink(temporary);
      await this.assertSafeExisting(segments, "file");
      const published = await this.readBuffer(segments);
      if (!published.equals(data)) {
        throw new CreatorFilesystemError("write_failed", "Creator-owned atomic publication verification failed.");
      }
    } catch (error) {
      const temporaryStat = await safeLstat(temporary);
      if (temporaryStat?.isFile() && !temporaryStat.isSymbolicLink()) {
        await unlink(temporary).catch(() => undefined);
      }
      throw error;
    }
  }

  async compareDeleteExact(
    segments: readonly string[],
    expectedData: Buffer
  ): Promise<void> {
    if (segments.length < 1 || !Buffer.isBuffer(expectedData)) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator exact-deletion target is invalid."
      );
    }
    segments.forEach(assertInternalSegment);
    if (process.platform !== "win32") {
      throw new CreatorFilesystemError(
        "unsafe_creator_root",
        "Secure creator exact deletion is unavailable outside the audited Windows native boundary."
      );
    }
    try {
      this.native().compareDeleteExact(segments, expectedData);
    } catch (error) {
      if (error instanceof CreatorFilesystemError) throw error;
      this.translateNativeError(error, "write");
    }
  }

  async publishTreeExclusive(
    targetSegments: readonly string[],
    orderedEntries: readonly CreatorTreePublicationEntry[]
  ): Promise<void> {
    if (!Array.isArray(targetSegments)) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator tree publication target is malformed."
      );
    }
    const target = [...targetSegments];
    const entries = normalizeTreePublicationEntries(target, orderedEntries);
    const targetParent = target.slice(0, -1);
    await this.ensureDirectory(targetParent);
    if (process.platform === "win32") {
      try {
        this.native().publishTreeExclusive(target, entries);
        return;
      } catch (error) {
        if (error instanceof CreatorFilesystemError) throw error;
        this.translateNativeError(error, "write");
      }
    }

    const stageSegments = [
      ...targetParent,
      `.publish-${target.at(-1)}-${makeCreatorHexId(12)}`,
    ] as const;
    let stageCreated = false;
    try {
      await this.createDirectoryExclusive(stageSegments);
      stageCreated = true;
      for (const [relativeSegments, data] of entries) {
        const stagedSegments = [...stageSegments, ...relativeSegments];
        await this.writeExclusive(stagedSegments, data);
        const staged = await this.readBuffer(stagedSegments);
        if (!staged.equals(data)) {
          throw new CreatorFilesystemError(
            "write_failed",
            "Creator tree publication failed staged byte verification."
          );
        }
      }
      await this.renameDirectoryExclusive(stageSegments, target);
      for (const [relativeSegments, data] of entries) {
        const published = await this.readBuffer([...target, ...relativeSegments]);
        if (!published.equals(data)) {
          throw new CreatorFilesystemError(
            "write_failed",
            "Creator tree publication failed final byte verification."
          );
        }
      }
    } catch (error) {
      if (stageCreated) {
        await this.removeOwnedTree(stageSegments).catch(() => undefined);
      }
      throw error;
    }
  }

  async renameDirectoryExclusive(
    sourceSegments: readonly string[],
    targetSegments: readonly string[]
  ): Promise<void> {
    const sourceParent = sourceSegments.slice(0, -1);
    const targetParent = targetSegments.slice(0, -1);
    if (
      sourceSegments.length < 1 ||
      targetSegments.length < 1 ||
      sourceParent.length !== targetParent.length ||
      sourceParent.some((segment, index) => segment !== targetParent[index])
    ) {
      throw new CreatorFilesystemError(
        "unsafe_artifact_path",
        "Creator directory publication requires one exact shared parent boundary."
      );
    }
    if (process.platform === "win32") {
      sourceSegments.forEach(assertInternalSegment);
      targetSegments.forEach(assertInternalSegment);
      try {
        this.native().renameExclusive(sourceSegments, targetSegments);
        return;
      } catch (error) {
        if (errorCode(error) === "conflict") {
          throw new CreatorFilesystemError(
            "already_exists",
            "Creator directory publication encountered concurrent target ownership."
          );
        }
        this.translateNativeError(error, "write");
      }
    }
    const source = await this.assertSafeExisting(sourceSegments, "directory");
    await this.ensureDirectory(targetParent);
    const targetParentIdentity = await this.captureDirectoryIdentity(targetParent);
    await this.revalidateDirectoryOperationBoundary(targetParent, targetParentIdentity);
    const target = path.join(targetParentIdentity.absolutePath, targetSegments.at(-1)!);
    if (await safeLstat(target)) {
      throw new CreatorFilesystemError("already_exists", "Creator revision target already exists.");
    }
    await this.assertSafeExisting(sourceSegments, "directory");
    await this.revalidateDirectoryOperationBoundary(targetParent, targetParentIdentity);
    await rename(source, target);
    await this.assertSafeExisting(targetSegments, "directory");
  }

  async removeOwnedTree(segments: readonly string[]): Promise<void> {
    if (segments.length < 1) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Refusing to remove the creator root through a broad target.");
    }
    if (process.platform === "win32") {
      segments.forEach(assertInternalSegment);
      try {
        this.native().removeTree(segments);
        return;
      } catch (error) {
        this.translateNativeError(error, "write");
      }
    }
    const root = await this.ensureRoot();
    let absolutePath: string;
    try {
      absolutePath = await this.assertSafeExisting(segments, "directory");
    } catch (error) {
      if (error instanceof CreatorFilesystemError && error.code === "not_found") return;
      throw error;
    }
    if (!isContained(path.resolve(absolutePath), path.resolve(root)) || absolutePath === root) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator cleanup target is too broad.");
    }
    const rootReal = await this.revalidateRoot(root);
    await removeOwnedTreeAbsolute(absolutePath, rootReal);
  }

  async removeTestRoot(): Promise<void> {
    if (!this.dataRootLabel.startsWith(".codexforge/creator-tests/")) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Only deterministic creator test roots can use owned root cleanup.");
    }
    if (process.platform === "win32") {
      const nativeRoot = this.native();
      this.nativeLifecycleTerminated = true;
      try {
        nativeRoot.removeRoot();
        this.nativeRoot = null;
        this.rootAbsolutePath = null;
        return;
      } catch (error) {
        this.translateNativeError(error, "write");
      }
    }
    const root = await this.ensureRoot();
    const projectReal = this.projectRealPath ?? (await realpath(CODEXFORGE_PROJECT_ROOT));
    if (!isContained(path.resolve(root), path.resolve(projectReal))) {
      throw new CreatorFilesystemError("unsafe_creator_root", "Creator test root cleanup escaped the project boundary.");
    }
    await removeOwnedTreeAbsolute(root, await realpath(root));
    this.rootAbsolutePath = null;
    this.rootRealPath = null;
    this.rootIdentity = null;
  }
}
