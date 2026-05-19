export type CodexForgeActivityEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  summary?: string;
  category:
    | "note"
    | "plan"
    | "task"
    | "research"
    | "decision"
    | "execution"
    | "memory";
  status?: "idea" | "active" | "done" | "blocked";
  tags?: string[];
  notes?: string;
};

export type CodexForgeEntry = CodexForgeActivityEntry;

const PRIMARY_KEY = "codexforge_activity_entries_v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeTags(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const tags = Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return tags.length > 0 ? tags : undefined;
}

function normalizeCategory(raw: unknown): CodexForgeActivityEntry["category"] {
  if (
    raw === "note" ||
    raw === "plan" ||
    raw === "task" ||
    raw === "research" ||
    raw === "decision" ||
    raw === "execution" ||
    raw === "memory"
  ) {
    return raw;
  }

  return "note";
}

function normalizeStatus(
  raw: unknown
): CodexForgeActivityEntry["status"] | undefined {
  if (
    raw === "idea" ||
    raw === "active" ||
    raw === "done" ||
    raw === "blocked"
  ) {
    return raw;
  }

  return undefined;
}

function stableHash(value: unknown): string {
  const input = JSON.stringify(value);
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function createCodexForgeActivityEntryId(raw: unknown, index = 0): string {
  if (!isRecord(raw)) return `activity:${stableHash(["invalid", index])}`;

  const existingId = asTrimmedString(raw.id);
  if (existingId) return existingId;

  return `activity:${stableHash([
    asTrimmedString(raw.id),
    asTrimmedString(raw.date),
    asTrimmedString(raw.title),
    normalizeCategory(raw.category),
    normalizeStatus(raw.status),
    asTrimmedString(raw.summary),
    asTrimmedString(raw.notes),
    normalizeTags(raw.tags),
    index,
  ])}`;
}

function normalizeEntry(raw: unknown, index = 0): CodexForgeActivityEntry | null {
  if (!isRecord(raw)) return null;

  const date = asTrimmedString(raw.date);
  if (!date) return null;

  const title = asTrimmedString(raw.title) ?? "Workspace entry";

  return {
    id: createCodexForgeActivityEntryId(raw, index),
    date,
    title,
    summary: asTrimmedString(raw.summary),
    category: normalizeCategory(raw.category),
    status: normalizeStatus(raw.status),
    tags: normalizeTags(raw.tags),
    notes: asTrimmedString(raw.notes),
  };
}

function normalizeEntries(raw: unknown): CodexForgeActivityEntry[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .map((entry, index) => normalizeEntry(entry, index))
    .filter((entry): entry is CodexForgeActivityEntry => entry !== null)
    .sort((a, b) => {
      const aTime = Date.parse(a.date) || 0;
      const bTime = Date.parse(b.date) || 0;
      return bTime - aTime;
    });
}

function readCurrentEntries(): CodexForgeActivityEntry[] {
  const parsed = safeParse<unknown>(localStorage.getItem(PRIMARY_KEY), []);
  return normalizeEntries(parsed);
}

export function loadEntries(): CodexForgeEntry[] {
  if (typeof window === "undefined") return [];
  return readCurrentEntries();
}

export function saveEntries(entries: CodexForgeEntry[]) {
  if (typeof window === "undefined") return;

  const normalized = normalizeEntries(entries);
  localStorage.setItem(PRIMARY_KEY, JSON.stringify(normalized));
}

export function addEntry(entry: CodexForgeEntry) {
  const entries = loadEntries();
  const normalizedIncoming = normalizeEntry(entry);

  if (!normalizedIncoming) return;

  saveEntries([normalizedIncoming, ...entries]);
}

export function clearEntries() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PRIMARY_KEY);
}
