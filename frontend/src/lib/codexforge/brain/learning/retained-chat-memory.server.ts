import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { openCreatorNativeRoot, type CreatorNativeRoot } from "../../creator/creator-native-filesystem.server";
import { containsPrivateAlphaSecretLikeContent } from "../../private-alpha/private-alpha-validation";
import type { ProjectMemoryEntry } from "./project-learning";

const UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/u;
const VARIANT_SUFFIX = /:v-[a-f0-9]{64}$/u;
// Each publication fits comfortably below the native filesystem's 1 MiB transfer limit.
// Numbered, immutable pages allow the archive as a whole to grow beyond that limit.
const PAGE_BYTES = 512 * 1024;
const ENTRIES_PER_PAGE = 128;
const MAX_CONTENTION_RETRIES = 12;

function archiveRoot(testSuffix?: string): string[] {
  if (testSuffix === undefined) return [".codexforge", "brain", "retained-chats"];
  if (process.env.NODE_ENV !== "test" || !/^[a-z0-9][a-z0-9-]{0,60}$/u.test(testSuffix)) {
    throw new Error("Invalid Brain archive test scope.");
  }
  return [".codexforge", "brain-tests", testSuffix, "retained-chats"];
}

function errorCode(error: unknown): unknown {
  return typeof error === "object" && error !== null && "code" in error ? error.code : null;
}

function existingRoot(segments: string[]): CreatorNativeRoot | null {
  try {
    return openCreatorNativeRoot(segments, "existing");
  } catch (error) {
    if (errorCode(error) === "not_found") return null;
    throw error;
  }
}

function memoryId(id: unknown, threadId: string): id is string {
  const prefix = `codex-chat:${threadId}:`;
  return typeof id === "string" && id.startsWith(prefix) &&
    /^(?:user|assistant):[A-Za-z0-9._-]{1,160}:(?:0|[1-9]\d{0,8})(?::v-[a-f0-9]{64})?$/u.test(id.slice(prefix.length));
}

function validateEntry(value: unknown, threadId: string): asserts value is ProjectMemoryEntry {
  if (!value || typeof value !== "object") throw new Error("Invalid retained chat memory.");
  const e = value as Partial<ProjectMemoryEntry>;
  if (Object.keys(e).length !== 8 || e.sourceType !== "codex-chat" || e.sourceId !== threadId ||
      !memoryId(e.id, threadId) || typeof e.at !== "string" ||
      !Number.isFinite(Date.parse(e.at)) || new Date(e.at).toISOString() !== e.at ||
      (e.kind !== "worked" && e.kind !== "did-not-work" && e.kind !== "decision") ||
      (e.sourceLabel !== "User message" && e.sourceLabel !== "Assistant report" &&
       e.sourceLabel !== "User-confirmed recommendation") ||
      (e.sourceLabel === "Assistant report") !== e.id.startsWith(`codex-chat:${threadId}:assistant:`) ||
      (e.sourceLabel === "Assistant report" && e.kind === "decision") ||
      (e.sourceLabel === "User-confirmed recommendation" && e.kind !== "decision") ||
      (e.relatedDecisionId !== null && (!memoryId(e.relatedDecisionId, threadId) || e.kind === "decision")) ||
      typeof e.text !== "string" || !e.text.trim() || e.text.length > 480 ||
      /[\p{Cc}\p{Cf}\p{Cs}<>]/u.test(e.text) || containsPrivateAlphaSecretLikeContent(e.text) ||
      /\b(?:password|passphrase|api[_ -]?key|access[_ -]?token|client[_ -]?secret)\s*(?:[:=]|\bis\b)\s*\S/iu.test(e.text)) {
    throw new Error("Invalid retained chat memory.");
  }
}

function ordered(entries: ProjectMemoryEntry[]): ProjectMemoryEntry[] {
  return entries.sort((left, right) => left.at.localeCompare(right.at) || left.id.localeCompare(right.id));
}

function variantId(entry: ProjectMemoryEntry): string {
  const content = JSON.stringify([entry.kind, entry.text, entry.relatedDecisionId]);
  return `${entry.id}:v-${createHash("sha256").update(content).digest("hex")}`;
}

function newEntries(observed: readonly ProjectMemoryEntry[], saved: Map<string, ProjectMemoryEntry>): ProjectMemoryEntry[] {
  const pending: ProjectMemoryEntry[] = [];
  const decisions = new Map<string, string>();
  // The input is decision-first, so even a multi-page write publishes cited evidence in order.
  for (const entry of observed) {
    let candidate = entry;
    if (entry.relatedDecisionId) {
      const target = decisions.get(entry.relatedDecisionId) ??
        (saved.get(entry.relatedDecisionId)?.kind === "decision" ? entry.relatedDecisionId : null);
      candidate = { ...entry, relatedDecisionId: target };
    }
    const original = saved.get(entry.id);
    if (original && (original.kind !== candidate.kind || original.text !== candidate.text ||
        (candidate.relatedDecisionId !== null && original.relatedDecisionId !== candidate.relatedDecisionId))) {
      candidate = { ...candidate, id: variantId(candidate) };
    }
    if (entry.kind === "decision") decisions.set(entry.id, candidate.id);
    if (!saved.has(candidate.id)) pending.push(candidate);
  }
  return pending;
}

function readPage(root: CreatorNativeRoot, file: string[], threadId: string, page: number): ProjectMemoryEntry[] | null {
  let bytes: Buffer;
  try {
    bytes = root.readFile(file, PAGE_BYTES);
  } catch (error) {
    if (errorCode(error) === "not_found") return null;
    throw error;
  }
  const record = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  if (record?.version !== 1 || record.threadId !== threadId || record.page !== page ||
      !Array.isArray(record.entries) || !record.entries.length || record.entries.length > ENTRIES_PER_PAGE) {
    throw new Error("Invalid retained chat memory page.");
  }
  for (const entry of record.entries) validateEntry(entry, threadId);
  return record.entries;
}

// A missing page is the end only when the next committed files do not already exist.
// This also detects loss of the last page in a full bucket. No mutable index is required.
function hasLaterPage(root: CreatorNativeRoot, bucket: number, page: number): boolean {
  try {
    const names = root.listDirectory([`pages-${bucket}`]);
    if (names.some(name => /^\d+\.json$/u.test(name) && Number.parseInt(name, 10) > page)) return true;
  } catch (error) {
    if (errorCode(error) !== "not_found") throw error;
  }
  try {
    root.stat([`pages-${bucket + 1}`]);
    return true;
  } catch (error) {
    if (errorCode(error) === "not_found") return false;
    throw error;
  }
}

function mergePages(
  root: CreatorNativeRoot, threadId: string, observations: readonly ProjectMemoryEntry[]
): ProjectMemoryEntry[] {
  const saved = new Map<string, ProjectMemoryEntry>();
  let pending: ProjectMemoryEntry[] | null = null;
  let pendingOffset = 0;
  let contention = 0;
  let page = 1;
  for (;;) {
    const bucket = Math.floor((page - 1) / 256);
    const file = [`pages-${bucket}`, `${page}.json`];
    let entries: ProjectMemoryEntry[] | null;
    try {
      entries = readPage(root, file, threadId, page);
      if (!entries) {
        if (hasLaterPage(root, bucket, page)) {
          // A competing writer may have published several pages after our initial read.
          if (readPage(root, file, threadId, page)) continue;
          throw new Error("The retained chat archive has a missing page.");
        }
        if (pending === null) {
          pending = newEntries(observations, saved);
          pendingOffset = 0;
        }
        if (pendingOffset === pending.length) return ordered([...saved.values()]);
        entries = pending.slice(pendingOffset, pendingOffset + ENTRIES_PER_PAGE);
        const bytes = Buffer.from(JSON.stringify({ version: 1, threadId, page, entries }));
        if (bytes.length > PAGE_BYTES) throw new Error("Retained chat memory page is too large.");
        root.writeAtomicExclusive(file, `.page-${randomUUID()}.tmp`, bytes);
        pendingOffset += entries.length;
      } else {
        // A competing process may have won a page with a different original decision.
        // Rebuild pending variant IDs and links against that winner at the new tail.
        pending = null;
      }
    } catch (error) {
      const code = errorCode(error);
      if ((code === "already_exists" || code === "conflict" || code === "busy") &&
          ++contention <= MAX_CONTENTION_RETRIES) continue;
      throw error;
    }
    contention = 0;
    for (const entry of entries) {
      if (saved.has(entry.id) || (entry.relatedDecisionId && saved.get(entry.relatedDecisionId)?.kind !== "decision")) {
        throw new Error("Retained chat memory page has an inconsistent evidence link or identity.");
      }
      saved.set(entry.id, entry);
    }
    page++;
  }
}

/** Keep the original and each distinct edit to a learned clause, without duplicating replayed observations. */
export function mergeRetainedChatMemory(
  threadId: string, observed: readonly ProjectMemoryEntry[], testSuffix?: string
): ProjectMemoryEntry[] {
  if (!UUID.test(threadId)) throw new Error("Invalid retained chat identity.");
  const observations = new Map<string, ProjectMemoryEntry>();
  for (const entry of observed) {
    validateEntry(entry, threadId);
    if (VARIANT_SUFFIX.test(entry.id)) throw new Error("Expected a source entry rather than an archived version.");
    if (!observations.has(entry.id)) observations.set(entry.id, entry);
  }
  const directory = [...archiveRoot(testSuffix), threadId];
  const root = observations.size ? openCreatorNativeRoot(directory, "persistent") : existingRoot(directory);
  if (!root) return [];
  try {
    const decisionsFirst = [...observations.values()].sort((a, b) =>
      Number(b.kind === "decision") - Number(a.kind === "decision"));
    return mergePages(root, threadId, decisionsFirst);
  } finally {
    root.close();
  }
}

export function readAllRetainedChatMemory(testSuffix?: string, excludedThreadId?: string): ProjectMemoryEntry[] {
  const root = existingRoot(archiveRoot(testSuffix));
  if (!root) return [];
  try {
    const entries: ProjectMemoryEntry[] = [];
    for (const threadId of root.listDirectory([])) {
      if (UUID.test(threadId) && threadId !== excludedThreadId) {
        for (const entry of mergeRetainedChatMemory(threadId, [], testSuffix)) entries.push(entry);
      }
    }
    return ordered(entries);
  } finally {
    root.close();
  }
}
