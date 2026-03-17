export type HealthEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  weight?: number;
  steps?: number;
  water?: number; // liters
  sleep?: number; // hours
  notes?: string;
};

const KEY = "health_tracker_entries_v1";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadEntries(): HealthEntry[] {
  if (typeof window === "undefined") return [];
  return safeParse<HealthEntry[]>(localStorage.getItem(KEY), []);
}

export function saveEntries(entries: HealthEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(entries));
}

export function addEntry(entry: HealthEntry) {
  const entries = loadEntries();
  saveEntries([entry, ...entries]);
}

export function clearEntries() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
