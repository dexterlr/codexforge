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
    | "memory"
    | "legacy-metric";
  status?: "idea" | "active" | "done" | "blocked";
  tags?: string[];
  notes?: string;

  // Legacy fields kept temporarily so old entry/history pages do not break
  weight?: number;
  steps?: number;
  water?: number;
  sleep?: number;
};

export type CodexForgeEntry = CodexForgeActivityEntry;

const PRIMARY_KEY = "codexforge_activity_entries_v1";
const LEGACY_KEYS = [
  "codexforge_activity_entries_v1",
  ["health", "tracker", "entries", "v1"].join("_"),
  ["health", "tracker", "entries"].join("-"),
  "entries",
  "healthEntries",
] as const;

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

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
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

function normalizeCategory(
  raw: unknown,
  hasLegacyMetrics: boolean
): CodexForgeActivityEntry["category"] {
  if (
    raw === "note" ||
    raw === "plan" ||
    raw === "task" ||
    raw === "research" ||
    raw === "decision" ||
    raw === "execution" ||
    raw === "memory" ||
    raw === "legacy-metric"
  ) {
    return raw;
  }

  return hasLegacyMetrics ? "legacy-metric" : "note";
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

function normalizeEntry(raw: unknown, index = 0): CodexForgeActivityEntry | null {
  if (!isRecord(raw)) return null;

  const id =
    asTrimmedString(raw.id) ??
    `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}`;

  const date = asTrimmedString(raw.date);
  if (!date) return null;

  const weight = asFiniteNumber(raw.weight);
  const steps = asFiniteNumber(raw.steps);
  const water = asFiniteNumber(raw.water);
  const sleep = asFiniteNumber(raw.sleep);

  const hasLegacyMetrics =
    weight !== undefined ||
    steps !== undefined ||
    water !== undefined ||
    sleep !== undefined;

  const title =
    asTrimmedString(raw.title) ??
    (hasLegacyMetrics ? "Legacy metric entry" : "Workspace entry");

  return {
    id,
    date,
    title,
    summary: asTrimmedString(raw.summary),
    category: normalizeCategory(raw.category, hasLegacyMetrics),
    status: normalizeStatus(raw.status),
    tags: normalizeTags(raw.tags),
    notes: asTrimmedString(raw.notes),
    weight,
    steps,
    water,
    sleep,
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

function readFromFirstAvailableKey(): CodexForgeActivityEntry[] {
  for (const key of LEGACY_KEYS) {
    const parsed = safeParse<unknown>(localStorage.getItem(key), []);
    const normalized = normalizeEntries(parsed);

    if (normalized.length > 0) {
      if (key !== PRIMARY_KEY) {
        localStorage.setItem(PRIMARY_KEY, JSON.stringify(normalized));
      }
      return normalized;
    }
  }

  return [];
}

export function loadEntries(): CodexForgeEntry[] {
  if (typeof window === "undefined") return [];
  return readFromFirstAvailableKey();
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

  for (const key of LEGACY_KEYS) {
    localStorage.removeItem(key);
  }
}
