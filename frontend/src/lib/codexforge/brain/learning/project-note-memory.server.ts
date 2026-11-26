import "server-only";

import { createHash } from "node:crypto";
import { openCreatorNativeRoot } from "../../creator/creator-native-filesystem.server";
import { containsPrivateAlphaSecretLikeContent } from "../../private-alpha/private-alpha-validation";
import type { ProjectMemoryEntry } from "./project-learning";

const NOTE_SOURCE = "docs/development/project-memory.md";
const MAX_NOTE_BYTES = 131_072;
const KINDS = { "Decision": "decision", "Worked": "worked", "Did not work": "did-not-work" } as const;

function safeText(value: string, limit: number) {
  return value.length > 0 && value.length <= limit && !/[\p{Cc}\p{Cf}\p{Cs}<>`"“”]/u.test(value) &&
    !/^['‘]|['’]$/u.test(value) && !containsPrivateAlphaSecretLikeContent(value);
}

function datedSection(line: string) {
  const match = /^## (\d{4}-\d{2}-\d{2})\s+[—–-]\s+(.+)$/u.exec(line);
  if (!match) return null;
  const [, date, title] = match;
  if (!safeText(title, 160)) return null;
  const at = `${date}T00:00:00.000Z`;
  const parsed = new Date(at);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString() === at ? { at, title } : null;
}

export function parseProjectNoteMemory(markdown: string): ProjectMemoryEntry[] {
  if (Buffer.byteLength(markdown, "utf8") > MAX_NOTE_BYTES) throw new Error("Project note exceeds its read limit.");
  const entries = new Map<string, ProjectMemoryEntry>();
  let section: ReturnType<typeof datedSection> = null;
  let sectionEntries: ProjectMemoryEntry[] = [];
  let fence = "";
  let inComment = false;
  let inQuote = false;

  function finishSection() {
    const decisions = sectionEntries.filter((entry) => entry.kind === "decision");
    for (const entry of sectionEntries) {
      const relatedDecisionId = entry.kind !== "decision" && decisions.length === 1 ? decisions[0].id : null;
      entries.set(entry.id, { ...entry, relatedDecisionId });
    }
    sectionEntries = [];
  }

  for (const line of markdown.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (fence) {
      if (trimmed.startsWith(fence) && [...trimmed].every((char) => char === fence[0])) fence = "";
      continue;
    }
    if (inComment || trimmed.includes("<!--")) {
      inComment = !trimmed.includes("-->");
      continue;
    }
    if (/^>/.test(trimmed)) inQuote = true;
    if (!trimmed || /^#{1,6} /u.test(line)) inQuote = false;
    if (inQuote) continue;
    const openingFence = /^ {0,3}(`{3,}|~{3,})/u.exec(line);
    if (openingFence) {
      fence = openingFence[1];
      continue;
    }
    if (/^#{1,6}(?:\s|$)/u.test(line)) {
      finishSection();
      section = datedSection(line.trimEnd());
      continue;
    }
    const labeled = /^(?:[-*] )?(Decision|Worked|Did not work):\s+(.+)$/u.exec(line);
    if (!section || !labeled) continue;
    const kind = KINDS[labeled[1] as keyof typeof KINDS];
    const text = labeled[2].trim();
    if (!safeText(text, 480)) continue;
    const digest = createHash("sha256").update(JSON.stringify([section.at, section.title, kind, text])).digest("hex");
    sectionEntries.push({
      id: `project-note:${digest}`, kind, text, at: section.at, sourceLabel: section.title,
      sourceType: "project-note", sourceId: NOTE_SOURCE, relatedDecisionId: null,
    });
  }
  finishSection();
  return [...entries.values()];
}

export async function readProjectNoteMemory(): Promise<ProjectMemoryEntry[]> {
  try {
    const root = openCreatorNativeRoot(["docs", "development"], "existing");
    try {
      const bytes = root.readFile(["project-memory.md"], MAX_NOTE_BYTES);
      return parseProjectNoteMemory(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    } finally {
      root.close();
    }
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "not_found") return [];
    throw error;
  }
}
