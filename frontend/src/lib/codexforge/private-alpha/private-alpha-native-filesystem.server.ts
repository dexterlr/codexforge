import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";
import {
  creatorNativeRootExists,
  openCreatorNativeRoot,
  type CreatorNativeNodeKind,
  type CreatorNativeRoot,
} from "@/lib/codexforge/creator/creator-native-filesystem.server";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX,
} from "./private-alpha-validation";

export type PrivateAlphaNativeErrorCode =
  | "already_exists"
  | "not_found"
  | "compare_mismatch"
  | "fence_mismatch"
  | "conflict"
  | "unsafe"
  | "unavailable";

type PrivateAlphaNativeRootContext = Readonly<{
  dataRootLabel: string;
  root: CreatorNativeRoot;
}>;

const PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT =
  new AsyncLocalStorage<PrivateAlphaNativeRootContext>();

export class PrivateAlphaNativeFilesystemError extends Error {
  constructor(
    readonly code: PrivateAlphaNativeErrorCode,
    message: string
  ) {
    super(message);
    this.name = "PrivateAlphaNativeFilesystemError";
  }
}

function nativeErrorCode(error: unknown): string | null {
  return typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string"
    ? (error as { code: string }).code
    : null;
}

function translateNativeError(error: unknown): never {
  const code = nativeErrorCode(error);
  if (code === "already_exists") {
    throw new PrivateAlphaNativeFilesystemError(
      "already_exists",
      "Private-alpha native target already exists."
    );
  }
  if (code === "not_found") {
    throw new PrivateAlphaNativeFilesystemError(
      "not_found",
      "Private-alpha native target was not found."
    );
  }
  if (
    code === "compare_mismatch" ||
    code === "fence_mismatch" ||
    code === "conflict" ||
    code === "busy"
  ) {
    throw new PrivateAlphaNativeFilesystemError(
      code === "busy" ? "conflict" : code,
      "Private-alpha native compare-and-exchange rejected stale ownership."
    );
  }
  if (
    code === "invalid_path" ||
    code === "unsafe_reparse" ||
    code === "unsafe_node" ||
    code === "unsafe_hardlink" ||
    code === "too_many_nodes" ||
    code === "too_large" ||
    code === "closed"
  ) {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native boundary rejected an unsafe path or node."
    );
  }
  throw new PrivateAlphaNativeFilesystemError(
    "unavailable",
    "Secure Windows private-alpha filesystem support is unavailable."
  );
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
    !/^[A-Za-z0-9._-]+$/u.test(segment) ||
    segment.endsWith(".") ||
    segment.endsWith(" ")
  ) {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native path segment is unsafe."
    );
  }
}

function dataRootSegments(dataRootLabel: string): readonly string[] {
  const segments = dataRootLabel.split("/");
  const isProduction = dataRootLabel === PRIVATE_ALPHA_DATA_ROOT_LABEL;
  const isTest =
    segments.length === 3 &&
    `${segments[0]}/${segments[1]}` === PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX &&
    /^[a-z0-9](?:[a-z0-9-]{0,78}[a-z0-9])?$/u.test(segments[2] ?? "");
  if (!isProduction && !isTest) {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native root label is not allowlisted."
    );
  }
  segments.forEach(assertInternalSegment);
  return segments;
}

export function privateAlphaNativeRootExists(dataRootLabel: string): boolean {
  try {
    return creatorNativeRootExists(dataRootSegments(dataRootLabel));
  } catch (error) {
    translateNativeError(error);
  }
}

export function readPrivateAlphaNativeFileIfPresent(
  dataRootLabel: string,
  segments: readonly string[],
  maximumBytes: number
): Buffer | null {
  const rootSegments = dataRootSegments(dataRootLabel);
  assertPrivateAlphaNativeSegments(segments);
  if (
    !Number.isSafeInteger(maximumBytes) ||
    maximumBytes < 1 ||
    maximumBytes > 1_048_576
  ) {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native read limit is outside its bounded envelope."
    );
  }

  const active = PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.getStore();
  if (active) {
    if (active.dataRootLabel !== dataRootLabel) {
      throw new PrivateAlphaNativeFilesystemError(
        "unsafe",
        "Private-alpha native inspection crossed its retained data-root handle."
      );
    }
    try {
      return active.root.readFile(segments, maximumBytes);
    } catch (error) {
      if (nativeErrorCode(error) === "not_found") return null;
      return translateNativeError(error);
    }
  }

  let rootExists: boolean;
  try {
    rootExists = creatorNativeRootExists(rootSegments);
  } catch (error) {
    return translateNativeError(error);
  }
  if (!rootExists) return null;

  let root: CreatorNativeRoot;
  try {
    root = openCreatorNativeRoot(rootSegments, "existing");
  } catch {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native root changed during fail-closed inspection."
    );
  }
  try {
    try {
      return root.readFile(segments, maximumBytes);
    } catch (error) {
      if (nativeErrorCode(error) === "not_found") return null;
      return translateNativeError(error);
    }
  } finally {
    root.close();
  }
}

export function withPrivateAlphaNativeRoot<T>(
  dataRootLabel: string,
  work: (root: CreatorNativeRoot) => T
): T {
  const active = PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.getStore();
  if (active) {
    if (active.dataRootLabel !== dataRootLabel) {
      throw new PrivateAlphaNativeFilesystemError(
        "unsafe",
        "Private-alpha native operation crossed its retained data-root handle."
      );
    }
    try {
      return work(active.root);
    } catch (error) {
      if (error instanceof PrivateAlphaNativeFilesystemError) throw error;
      if (nativeErrorCode(error) !== null) return translateNativeError(error);
      throw error;
    }
  }
  let root: CreatorNativeRoot | null = null;
  try {
    root = openCreatorNativeRoot(dataRootSegments(dataRootLabel), "persistent");
  } catch (error) {
    return translateNativeError(error);
  }
  try {
    return work(root);
  } catch (error) {
    if (error instanceof PrivateAlphaNativeFilesystemError) throw error;
    if (nativeErrorCode(error) !== null) return translateNativeError(error);
    throw error;
  } finally {
    try {
      root.close();
    } catch (error) {
      return translateNativeError(error);
    }
  }
}

export function withPrivateAlphaExistingNativeRoot<T>(
  dataRootLabel: string,
  work: (root: CreatorNativeRoot) => T
): T | null {
  const active = PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.getStore();
  if (active) {
    if (active.dataRootLabel !== dataRootLabel) {
      throw new PrivateAlphaNativeFilesystemError(
        "unsafe",
        "Private-alpha native inspection crossed its retained data-root handle."
      );
    }
    try {
      return work(active.root);
    } catch (error) {
      if (error instanceof PrivateAlphaNativeFilesystemError) throw error;
      if (nativeErrorCode(error) !== null) return translateNativeError(error);
      throw error;
    }
  }

  let rootExists: boolean;
  try {
    rootExists = creatorNativeRootExists(dataRootSegments(dataRootLabel));
  } catch (error) {
    return translateNativeError(error);
  }
  if (!rootExists) return null;

  let root: CreatorNativeRoot;
  try {
    root = openCreatorNativeRoot(dataRootSegments(dataRootLabel), "existing");
  } catch {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native root changed during fail-closed inspection."
    );
  }
  try {
    try {
      return work(root);
    } catch (error) {
      if (error instanceof PrivateAlphaNativeFilesystemError) throw error;
      if (nativeErrorCode(error) !== null) return translateNativeError(error);
      throw error;
    }
  } finally {
    try {
      root.close();
    } catch (error) {
      return translateNativeError(error);
    }
  }
}

export async function withPrivateAlphaExistingNativeRootLease<T>(
  dataRootLabel: string,
  work: () => Promise<T>
): Promise<T | null> {
  const active = PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.getStore();
  if (active) {
    if (active.dataRootLabel !== dataRootLabel) {
      throw new PrivateAlphaNativeFilesystemError(
        "unsafe",
        "Private-alpha native inspection crossed its retained data-root handle."
      );
    }
    return work();
  }
  if (process.platform !== "win32") return work();

  const rootSegments = dataRootSegments(dataRootLabel);
  let rootExists: boolean;
  try {
    rootExists = creatorNativeRootExists(rootSegments);
  } catch (error) {
    return translateNativeError(error);
  }
  if (!rootExists) return null;

  let root: CreatorNativeRoot;
  try {
    root = openCreatorNativeRoot(rootSegments, "existing");
  } catch {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native root changed during fail-closed inspection."
    );
  }
  try {
    return await PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.run(
      { dataRootLabel, root },
      work
    );
  } catch (error) {
    if (error instanceof PrivateAlphaNativeFilesystemError) throw error;
    if (nativeErrorCode(error) !== null) return translateNativeError(error);
    throw error;
  } finally {
    try {
      root.close();
    } catch (error) {
      return translateNativeError(error);
    }
  }
}

export async function withPrivateAlphaNativeRootLease<T>(
  dataRootLabel: string,
  work: () => Promise<T>
): Promise<T> {
  const active = PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.getStore();
  if (active) {
    if (active.dataRootLabel !== dataRootLabel) {
      throw new PrivateAlphaNativeFilesystemError(
        "unsafe",
        "Private-alpha native operation crossed its retained data-root handle."
      );
    }
    return work();
  }
  if (process.platform !== "win32") return work();

  let root: CreatorNativeRoot | null = null;
  try {
    root = openCreatorNativeRoot(dataRootSegments(dataRootLabel), "persistent");
  } catch (error) {
    return translateNativeError(error);
  }
  try {
    return await PRIVATE_ALPHA_NATIVE_ROOT_CONTEXT.run(
      { dataRootLabel, root },
      work
    );
  } catch (error) {
    if (error instanceof PrivateAlphaNativeFilesystemError) throw error;
    if (nativeErrorCode(error) !== null) return translateNativeError(error);
    throw error;
  } finally {
    try {
      root.close();
    } catch (error) {
      return translateNativeError(error);
    }
  }
}

export function assertPrivateAlphaNativeSegments(
  segments: readonly string[]
): readonly string[] {
  if (segments.length < 1 || segments.length > 8) {
    throw new PrivateAlphaNativeFilesystemError(
      "unsafe",
      "Private-alpha native path depth is outside its bounded envelope."
    );
  }
  segments.forEach(assertInternalSegment);
  return segments;
}

export type { CreatorNativeNodeKind, CreatorNativeRoot };
