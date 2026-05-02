"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  clearEntries,
  loadEntries,
  saveEntries,
  type CodexForgeActivityEntry,
} from "@/lib/storage";

type ActivityEntry = CodexForgeActivityEntry;

type AiState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; text: string }
  | { kind: "error"; message: string };

type SortMode = "newest" | "oldest";
type RangeMode = "all" | "7d" | "30d" | "90d";
type ExportMode = "json" | "csv" | "summary";
type ActivityCategory = "all" | ActivityEntry["category"];

type PersistResult = {
  ok: boolean;
  how: string;
};

type TrendDirection = "up" | "down" | "flat" | "unknown";

type LegacySignals = {
  avgWeight?: number;
  avgSteps?: number;
  avgWater?: number;
  avgSleep?: number;
  weightDelta?: number;
  stepDelta?: number;
  sleepDelta?: number;
  waterDelta?: number;
  weightTrend: TrendDirection;
};

type LegacyStats = {
  last7: ActivityEntry[];
  last30: ActivityEntry[];
  weights7: number[];
  steps7: number[];
  water7: number[];
  sleep7: number[];
  weights30: number[];
  steps30: number[];
  water30: number[];
  sleep30: number[];
  countWithAnyMetric: number;
};

type ActivityTotals = {
  total: number;
  visible: number;
  notes: number;
  tagged: number;
  latestDate: string;
};

type HeroStatus = {
  label: string;
  value: string;
};

const MAX_VISIBLE_ENTRIES = 100;

/* =========================
   helpers
========================= */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function avg(nums: number[]) {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function median(nums: number[]) {
  if (nums.length === 0) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function isNum(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : null;
}

function parseOptionalNumber(v: unknown): number | undefined {
  return isNum(v) ? v : undefined;
}

function parseOptionalString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function parseOptionalStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;

  const values = Array.from(
    new Set(
      v
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return values.length > 0 ? values : undefined;
}

function isISODateYYYYMMDD(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function formatNum(n: number) {
  return n.toLocaleString();
}

function errorMessage(e: unknown, fallback: string) {
  if (e instanceof Error && e.message.trim()) return e.message;
  if (typeof e === "string" && e.trim()) return e;
  return fallback;
}

function safeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseDateToMs(dateYYYYMMDD: string) {
  const [y, m, d] = dateYYYYMMDD.split("-").map((x) => Number(x));
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return 0;
  return new Date(y, m - 1, d).getTime();
}

function compareByDateDesc(a: ActivityEntry, b: ActivityEntry) {
  return (b.date ? parseDateToMs(b.date) : 0) - (a.date ? parseDateToMs(a.date) : 0);
}

function withinRange(dateYYYYMMDD: string, range: RangeMode) {
  if (range === "all") return true;

  const ms = parseDateToMs(dateYYYYMMDD);
  if (!ms) return true;

  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return ms >= cutoff;
}

function safeTrim(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

function makeToastMessage(prefix: string, msg: string) {
  const clean = msg.replace(/\s+/g, " ").trim();
  return `${prefix}${prefix ? ": " : ""}${safeTrim(clean, 180)}`;
}

function normalizeCategory(value: unknown): ActivityEntry["category"] {
  return value === "note" ||
    value === "plan" ||
    value === "task" ||
    value === "research" ||
    value === "decision" ||
    value === "execution" ||
    value === "memory" ||
    value === "legacy-health"
    ? value
    : "note";
}

function normalizeStatus(value: unknown): ActivityEntry["status"] {
  return value === "idea" ||
    value === "active" ||
    value === "done" ||
    value === "blocked"
    ? value
    : undefined;
}

function normalizeEntry(x: unknown, idx: number): ActivityEntry {
  const record = asRecord(x);
  if (!record) throw new Error(`Entry #${idx + 1} must be an object.`);

  const date = typeof record.date === "string" ? record.date : "";
  if (!date || !isISODateYYYYMMDD(date)) {
    throw new Error(`Entry #${idx + 1} is missing a valid date (YYYY-MM-DD).`);
  }

  const idRaw = typeof record.id === "string" ? record.id : "";
  const id = idRaw || safeId();

  const weight = parseOptionalNumber(record.weight);
  const steps = parseOptionalNumber(record.steps);
  const water = parseOptionalNumber(record.water);
  const sleep = parseOptionalNumber(record.sleep);
  const notes = parseOptionalString(record.notes);
  const title =
    parseOptionalString(record.title) ??
    ((weight ?? steps ?? water ?? sleep) !== undefined
      ? "Legacy health entry"
      : "Workspace entry");

  return {
    id,
    date,
    title,
    summary: parseOptionalString(record.summary),
    category: normalizeCategory(record.category),
    status: normalizeStatus(record.status),
    tags: parseOptionalStringArray(record.tags),
    notes,
    weight,
    steps,
    water,
    sleep,
  };
}

function toCSV(entries: ActivityEntry[]) {
  const header = [
    "date",
    "title",
    "category",
    "status",
    "summary",
    "tags",
    "notes",
    "weight",
    "steps",
    "water",
    "sleep",
  ].join(",");

  const rows = entries.map((entry) => {
    const esc = (s: string) => `"${s.replaceAll('"', '""')}"`;
    return [
      entry.date ?? "",
      entry.title ? esc(entry.title) : "",
      entry.category ?? "",
      entry.status ?? "",
      entry.summary ? esc(entry.summary) : "",
      entry.tags?.length ? esc(entry.tags.join(", ")) : "",
      entry.notes ? esc(entry.notes) : "",
      isNum(entry.weight) ? String(entry.weight) : "",
      isNum(entry.steps) ? String(entry.steps) : "",
      isNum(entry.water) ? String(entry.water) : "",
      isNum(entry.sleep) ? String(entry.sleep) : "",
    ].join(",");
  });

  return [header, ...rows].join("\r\n");
}

function downloadText(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

async function readFileAsText(file: File) {
  return await file.text();
}

function spark(values: number[], width = 24) {
  if (values.length < 2) return "—";

  const blocks = "▁▂▃▄▅▆▇█";
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const span = maxV - minV || 1;

  const sampled: number[] = [];
  for (let i = 0; i < width; i += 1) {
    const idx = Math.floor((i / (width - 1)) * (values.length - 1));
    sampled.push(values[idx]);
  }

  return sampled
    .map((v) => {
      const t = (v - minV) / span;
      const blockIndex = Math.floor(t * (blocks.length - 1));
      return blocks[clamp(blockIndex, 0, blocks.length - 1)];
    })
    .join("");
}

function computeLegacyStats(entriesNewestFirst: ActivityEntry[]): LegacyStats {
  const legacyEntries = entriesNewestFirst.filter(
    (entry) =>
      entry.category === "legacy-health" ||
      isNum(entry.weight) ||
      isNum(entry.steps) ||
      isNum(entry.water) ||
      isNum(entry.sleep)
  );

  const last7 = legacyEntries.slice(0, 7);
  const last30 = legacyEntries.slice(0, 30);

  const weights7 = last7.map((e) => e.weight).filter(isNum);
  const steps7 = last7.map((e) => e.steps).filter(isNum);
  const water7 = last7.map((e) => e.water).filter(isNum);
  const sleep7 = last7.map((e) => e.sleep).filter(isNum);

  const weights30 = last30.map((e) => e.weight).filter(isNum);
  const steps30 = last30.map((e) => e.steps).filter(isNum);
  const water30 = last30.map((e) => e.water).filter(isNum);
  const sleep30 = last30.map((e) => e.sleep).filter(isNum);

  const countWithAnyMetric = last7.filter((e) => {
    return (
      isNum(e.weight) ||
      isNum(e.steps) ||
      isNum(e.water) ||
      isNum(e.sleep) ||
      !!e.notes
    );
  }).length;

  return {
    last7,
    last30,
    weights7,
    steps7,
    water7,
    sleep7,
    weights30,
    steps30,
    water30,
    sleep30,
    countWithAnyMetric,
  };
}

function trendFromDelta(delta: number | undefined, flatThreshold: number) {
  if (!isNum(delta)) return "unknown" as TrendDirection;
  if (Math.abs(delta) < flatThreshold) return "flat" as TrendDirection;
  return delta > 0 ? ("up" as TrendDirection) : ("down" as TrendDirection);
}

function getLegacySignals(entriesNewestFirst: ActivityEntry[]): LegacySignals {
  const stats = computeLegacyStats(entriesNewestFirst);

  const avgWeight = stats.weights7.length ? round1(avg(stats.weights7)) : undefined;
  const avgSteps = stats.steps7.length ? Math.round(avg(stats.steps7)) : undefined;
  const avgWater = stats.water7.length ? round1(avg(stats.water7)) : undefined;
  const avgSleep = stats.sleep7.length ? round1(avg(stats.sleep7)) : undefined;

  const weightDelta =
    stats.weights7.length >= 2
      ? round1(stats.weights7[0] - stats.weights7[stats.weights7.length - 1])
      : undefined;

  const stepDelta =
    stats.steps7.length >= 2
      ? Math.round(stats.steps7[0] - stats.steps7[stats.steps7.length - 1])
      : undefined;

  const sleepDelta =
    stats.sleep7.length >= 2
      ? round1(stats.sleep7[0] - stats.sleep7[stats.sleep7.length - 1])
      : undefined;

  const waterDelta =
    stats.water7.length >= 2
      ? round1(stats.water7[0] - stats.water7[stats.water7.length - 1])
      : undefined;

  return {
    avgWeight,
    avgSteps,
    avgWater,
    avgSleep,
    weightDelta,
    stepDelta,
    sleepDelta,
    waterDelta,
    weightTrend: trendFromDelta(weightDelta, 0.3),
  };
}

function buildLocalSummary(entriesNewestFirst: ActivityEntry[]) {
  if (entriesNewestFirst.length === 0) {
    return [
      "CodexForge Activity Summary",
      "===========================",
      "",
      "Status",
      "------",
      "No activity entries yet.",
      "",
      "Suggested next actions",
      "----------------------",
      "• Use /entry to launch a real CodexForge task into the AI workspace.",
      "• Let /history evolve into plans, runs, decisions, and memory events.",
      "• Keep AI optional so local summaries always work instantly.",
      "",
      "Mode: LOCAL (no AI, instant, offline-safe)",
    ].join("\n");
  }

  const legacyStats = computeLegacyStats(entriesNewestFirst);
  const signals = getLegacySignals(entriesNewestFirst);

  const categoryCounts = entriesNewestFirst.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.category] = (acc[entry.category] ?? 0) + 1;
    return acc;
  }, {});

  const latest = entriesNewestFirst[0];

  const lines: string[] = [];
  lines.push("CodexForge Activity Summary");
  lines.push("===========================");
  lines.push("Scope: Workspace activity history");
  lines.push("");

  lines.push("Activity overview");
  lines.push("-----------------");
  lines.push(`Total entries: ${entriesNewestFirst.length}`);
  lines.push(`Plans: ${categoryCounts.plan ?? 0}`);
  lines.push(`Tasks: ${categoryCounts.task ?? 0}`);
  lines.push(`Research: ${categoryCounts.research ?? 0}`);
  lines.push(`Execution: ${categoryCounts.execution ?? 0}`);
  lines.push(`Decisions: ${categoryCounts.decision ?? 0}`);
  lines.push(`Memory: ${categoryCounts.memory ?? 0}`);
  lines.push(`Notes: ${categoryCounts.note ?? 0}`);
  lines.push(`Legacy health: ${categoryCounts["legacy-health"] ?? 0}`);
  lines.push("");

  lines.push("Latest entry");
  lines.push("------------");
  lines.push(`Title: ${latest.title}`);
  lines.push(`Category: ${latest.category}`);
  lines.push(`Date: ${latest.date}`);
  if (latest.status) lines.push(`Status: ${latest.status}`);
  if (latest.summary) lines.push(`Summary: ${latest.summary}`);
  lines.push("");

  lines.push("Legacy metric snapshot");
  lines.push("----------------------");
  if (legacyStats.last7.length === 0) {
    lines.push("• No legacy health metrics found in recent entries.");
  } else {
    if (legacyStats.weights7.length) {
      lines.push(`• Avg weight (7): ${round1(avg(legacyStats.weights7)).toFixed(1)} kg`);
    }
    if (legacyStats.steps7.length) {
      lines.push(`• Avg steps (7): ${formatNum(Math.round(avg(legacyStats.steps7)))}`);
    }
    if (legacyStats.water7.length) {
      lines.push(`• Avg water (7): ${round1(avg(legacyStats.water7)).toFixed(1)} L`);
    }
    if (legacyStats.sleep7.length) {
      lines.push(`• Avg sleep (7): ${round1(avg(legacyStats.sleep7)).toFixed(1)} hrs`);
    }

    if (signals.weightTrend === "flat") {
      lines.push("• Weight is broadly stable across recent legacy entries.");
    } else if (signals.weightTrend === "up" && isNum(signals.weightDelta)) {
      lines.push(`• Weight is trending upward by about ${round1(signals.weightDelta).toFixed(1)} kg.`);
    } else if (signals.weightTrend === "down" && isNum(signals.weightDelta)) {
      lines.push(
        `• Weight is trending downward by about ${round1(Math.abs(signals.weightDelta)).toFixed(1)} kg.`
      );
    }
  }
  lines.push("");

  lines.push("Suggested next actions");
  lines.push("----------------------");
  lines.push("• Keep using /entry as a CodexForge launchpad, not a health form.");
  lines.push("• Move future history items toward plans, runs, approvals, and memory events.");
  lines.push("• Preserve legacy data only as historical compatibility content.");
  lines.push("");
  lines.push("Mode: LOCAL (no AI, instant, offline-safe)");

  return lines.join("\n");
}

function buildExportSummary(entriesNewestFirst: ActivityEntry[]) {
  const legacyStats = computeLegacyStats(entriesNewestFirst);
  const latest = entriesNewestFirst[0];

  return [
    "CodexForge Activity Export Summary",
    "=================================",
    `Generated: ${new Date().toISOString()}`,
    `Total entries: ${entriesNewestFirst.length}`,
    `Latest entry: ${latest?.date ?? "—"}`,
    `Latest title: ${latest?.title ?? "—"}`,
    `Legacy metric entries (7d): ${legacyStats.countWithAnyMetric}/${legacyStats.last7.length || 0}`,
    "",
    buildLocalSummary(entriesNewestFirst),
  ].join("\n");
}

function buildPayload(entries: ActivityEntry[]) {
  return JSON.stringify({ entries: entries.slice(0, 50) }, null, 2);
}

function formatCategoryLabel(category: ActivityEntry["category"]) {
  switch (category) {
    case "plan":
      return "Plan";
    case "task":
      return "Task";
    case "research":
      return "Research";
    case "decision":
      return "Decision";
    case "execution":
      return "Execution";
    case "memory":
      return "Memory";
    case "legacy-health":
      return "Legacy health";
    case "note":
    default:
      return "Note";
  }
}

function formatStatusLabel(status?: ActivityEntry["status"]) {
  if (!status) return "—";
  if (status === "idea") return "Idea";
  if (status === "active") return "Active";
  if (status === "done") return "Done";
  if (status === "blocked") return "Blocked";
  return status;
}

async function persistEntriesBestEffort(next: ActivityEntry[]): Promise<PersistResult> {
  try {
    saveEntries(next);
    return { ok: true, how: "saveEntries()" };
  } catch {
    return { ok: false, how: "unknown" };
  }
}

function getActivityTotals(
  entries: ActivityEntry[],
  filteredEntries: ActivityEntry[]
): ActivityTotals {
  const latestDate = entries.slice().sort(compareByDateDesc)[0]?.date ?? "—";

  return {
    total: entries.length,
    visible: filteredEntries.length,
    notes: entries.filter((entry) => !!entry.notes?.trim()).length,
    tagged: entries.filter((entry) => (entry.tags?.length ?? 0) > 0).length,
    latestDate,
  };
}

function getHeroStatuses(
  categoryCounts: Record<string, number>,
  quickFacts: LegacySignals
): HeroStatus[] {
  return [
    {
      label: "Primary role",
      value: "Workspace activity log",
    },
    {
      label: "AI policy",
      value: "Optional, never blocking",
    },
    {
      label: "Latest metric trend",
      value:
        quickFacts.weightTrend === "flat"
          ? "Stable"
          : quickFacts.weightTrend === "up"
            ? "Rising"
            : quickFacts.weightTrend === "down"
              ? "Falling"
              : "Insufficient data",
    },
    {
      label: "Migration state",
      value: categoryCounts["legacy-health"] ? "Legacy data present" : "CodexForge-first",
    },
  ];
}

/* =========================
   page
========================= */

export default function HistoryPage() {
  const [mounted, setMounted] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);

  const [ai, setAi] = useState<AiState>({ kind: "idle" });
  const [aiMode, setAiMode] = useState<"auto" | "local">("auto");
  const [showRaw, setShowRaw] = useState(false);
  const [importError, setImportError] = useState("");
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [rangeMode, setRangeMode] = useState<RangeMode>("all");
  const [exportMode, setExportMode] = useState<ExportMode>("json");
  const [categoryMode, setCategoryMode] = useState<ActivityCategory>("all");

  const abortRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  function showToast(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
  }

  const entries = useMemo(() => {
    if (!mounted) return [];
    return loadEntries();
  }, [mounted, reloadTick]);

  const sortedEntries = useMemo(() => {
    return entries.slice().sort(compareByDateDesc);
  }, [entries]);

  const legacyStats = useMemo(() => computeLegacyStats(sortedEntries), [sortedEntries]);
  const latest = useMemo(() => sortedEntries[0], [sortedEntries]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = entries.slice();

    list.sort((a, b) => {
      const ams = a.date ? parseDateToMs(a.date) : 0;
      const bms = b.date ? parseDateToMs(b.date) : 0;
      return sortMode === "newest" ? bms - ams : ams - bms;
    });

    list = list.filter((entry) => (entry.date ? withinRange(entry.date, rangeMode) : true));

    if (categoryMode !== "all") {
      list = list.filter((entry) => entry.category === categoryMode);
    }

    if (q) {
      list = list.filter((entry) => {
        const haystack = [
          entry.date ?? "",
          entry.id ?? "",
          entry.title ?? "",
          entry.summary ?? "",
          entry.notes ?? "",
          entry.category ?? "",
          entry.status ?? "",
          ...(entry.tags ?? []),
          isNum(entry.weight) ? String(entry.weight) : "",
          isNum(entry.steps) ? String(entry.steps) : "",
          isNum(entry.water) ? String(entry.water) : "",
          isNum(entry.sleep) ? String(entry.sleep) : "",
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });
    }

    return list;
  }, [entries, query, sortMode, rangeMode, categoryMode]);

  const visibleEntries = useMemo(
    () => filteredEntries.slice(0, MAX_VISIBLE_ENTRIES),
    [filteredEntries]
  );

  const categoryCounts = useMemo(() => {
    return entries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.category] = (acc[entry.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [entries]);

  const quickFacts = useMemo(() => getLegacySignals(sortedEntries), [sortedEntries]);
  const totals = useMemo(
    () => getActivityTotals(entries, filteredEntries),
    [entries, filteredEntries]
  );
  const heroStatuses = useMemo(
    () => getHeroStatuses(categoryCounts, quickFacts),
    [categoryCounts, quickFacts]
  );

  const weightsForSpark = legacyStats.last30
    .slice()
    .reverse()
    .map((e) => e.weight)
    .filter(isNum);
  const stepsForSpark = legacyStats.last30
    .slice()
    .reverse()
    .map((e) => e.steps)
    .filter(isNum);
  const waterForSpark = legacyStats.last30
    .slice()
    .reverse()
    .map((e) => e.water)
    .filter(isNum);
  const sleepForSpark = legacyStats.last30
    .slice()
    .reverse()
    .map((e) => e.sleep)
    .filter(isNum);

  function onReload() {
    setReloadTick((x) => x + 1);
    showToast("ok", "Reloaded workspace activity from local storage.");
  }

  function onResetFilters() {
    setQuery("");
    setSortMode("newest");
    setRangeMode("all");
    setCategoryMode("all");
    showToast("ok", "Filters reset.");
  }

  function onClearAll() {
    if (!confirm("Clear ALL local CodexForge activity entries?")) return;
    clearEntries();
    setAi({ kind: "idle" });
    setReloadTick((x) => x + 1);
    showToast("ok", "All local activity cleared.");
  }

  function onExport() {
    const stamp = new Date().toISOString().slice(0, 10);

    if (exportMode === "json") {
      downloadText(
        `codexforge-activity-${stamp}.json`,
        JSON.stringify(entries, null, 2),
        "application/json"
      );
      showToast("ok", "Exported JSON.");
      return;
    }

    if (exportMode === "csv") {
      downloadText(`codexforge-activity-${stamp}.csv`, toCSV(entries), "text/csv");
      showToast("ok", "Exported CSV.");
      return;
    }

    downloadText(
      `codexforge-activity-summary-${stamp}.txt`,
      buildExportSummary(sortedEntries),
      "text/plain"
    );
    showToast("ok", "Exported summary.");
  }

  async function onImportJSON(file: File | null) {
    setImportError("");
    if (!file) return;

    try {
      const text = await readFileAsText(file);
      const parsed: unknown = JSON.parse(text);

      if (!Array.isArray(parsed)) {
        throw new Error("Import file must be a JSON array of entries.");
      }

      const normalized = parsed.map((x: unknown, idx: number) => normalizeEntry(x, idx));

      saveEntries(normalized);
      setAi({ kind: "idle" });
      setReloadTick((x) => x + 1);
      showToast("ok", `Imported ${normalized.length} entries.`);
    } catch (e: unknown) {
      const msg = errorMessage(e, "Import failed.");
      setImportError(msg);
      showToast("err", makeToastMessage("Import error", msg));
    }
  }

  async function onDeleteEntry(id: string) {
    if (!confirm("Delete this activity entry?")) return;

    const next = entries.filter((entry) => entry.id !== id);

    try {
      const result = await persistEntriesBestEffort(next);
      setReloadTick((x) => x + 1);

      if (result.ok) {
        showToast("ok", `Deleted entry. Saved via ${result.how}.`);
      } else {
        showToast("err", "Deleted in view, but could not persist.");
      }
    } catch (e: unknown) {
      setReloadTick((x) => x + 1);
      showToast("err", makeToastMessage("Delete failed", errorMessage(e, "Unknown error")));
    }
  }

  async function onCopyPayload() {
    try {
      await navigator.clipboard.writeText(buildPayload(entries));
      showToast("ok", "Copied payload.");
    } catch {
      showToast("err", "Copy failed (clipboard permissions?).");
    }
  }

  async function onCopySummary() {
    try {
      await navigator.clipboard.writeText(buildLocalSummary(sortedEntries));
      showToast("ok", "Copied summary.");
    } catch {
      showToast("err", "Copy failed (clipboard permissions?).");
    }
  }

  async function onGenerate() {
    if (entries.length === 0) {
      setAi({
        kind: "ready",
        text: "No activity entries yet. Launch something from /entry first, then try again.",
      });
      return;
    }

    abortRef.current?.abort();
    abortRef.current = null;
    setAi({ kind: "loading" });

    if (aiMode === "local") {
      setAi({ kind: "ready", text: buildLocalSummary(sortedEntries) });
      return;
    }

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
        signal: controller.signal,
      });

      const data: unknown = await res.json().catch(() => null);
      const obj = asRecord(data);
      const okFlag = obj ? obj.ok : undefined;

      if (!res.ok || okFlag !== true) {
        const errText =
          (obj && typeof obj.error === "string" && obj.error.trim() ? obj.error : "") ||
          `AI call failed (HTTP ${res.status})`;
        throw new Error(errText);
      }

      const insight = obj?.insight;
      setAi({ kind: "ready", text: typeof insight === "string" ? insight : "" });
    } catch (e: unknown) {
      const msg =
        e instanceof DOMException && e.name === "AbortError"
          ? "Canceled."
          : errorMessage(e, "Network/server error calling /api/insights");
      setAi({ kind: "error", message: msg });
    } finally {
      abortRef.current = null;
    }
  }

  function onCancelAI() {
    abortRef.current?.abort();
    abortRef.current = null;
    showToast("ok", "Canceled request.");
  }

  return (
    <main style={page}>
      <div style={shell}>
        <div style={topBar}>
          <div style={navGroup}>
            <Link href="/" style={navLink}>
              ← Home
            </Link>
            <div style={dot}>•</div>
            <Link href="/ai" style={navLink}>
              AI workspace
            </Link>
            <div style={dot}>•</div>
            <Link href="/entry" style={navLink}>
              Launch task
            </Link>
            <div style={dot}>•</div>
            <button onClick={onReload} style={ghostBtn} title="Reload local activity">
              Reload
            </button>
          </div>

          <div style={actionGroup}>
            <select
              value={exportMode}
              onChange={(e) => setExportMode(e.target.value as ExportMode)}
              style={select}
              title="Choose export format"
            >
              <option value="json">Export as JSON</option>
              <option value="csv">Export as CSV</option>
              <option value="summary">Export as summary</option>
            </select>

            <button onClick={onExport} style={ghostBtn}>
              Export
            </button>

            <label style={fileLabel} title="Import JSON (replaces local store)">
              Import JSON
              <input
                type="file"
                accept="application/json"
                style={{ display: "none" }}
                onChange={(e) => onImportJSON(e.target.files?.[0] ?? null)}
              />
            </label>

            <button onClick={onClearAll} style={dangerBtn}>
              Clear data
            </button>
          </div>
        </div>

        {toast ? (
          <div style={toast.kind === "err" ? toastErr : toastOk} role="status" aria-live="polite">
            {toast.text}
          </div>
        ) : null}

        {importError ? <div style={toastErr}>Import error: {importError}</div> : null}

        <div style={heroCard}>
          <div style={heroText}>
            <div style={eyebrow}>CodexForge activity</div>
            <h1 style={title}>Workspace History</h1>
            <div style={subtitle}>
              This page is now the local activity surface for CodexForge. It tracks plans, tasks,
              decisions, research, execution events, memory-oriented notes, and migration-safe
              legacy data while the rest of the workspace catches up.
            </div>
          </div>

          <div style={heroPills}>
            <StatPill label="Entries" value={formatNum(totals.total)} />
            <StatPill label="Visible" value={formatNum(totals.visible)} />
            <StatPill label="Tagged" value={formatNum(totals.tagged)} />
            <StatPill label="Latest" value={totals.latestDate} />
          </div>

          <div style={heroMetaRow}>
            {heroStatuses.map((item) => (
              <div key={item.label} style={heroMetaCard}>
                <div style={heroMetaLabel}>{item.label}</div>
                <div style={heroMetaValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <section style={card}>
          <div style={toolbarGrid}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, summary, notes, tags, date, id, or metric"
              style={textInput}
            />

            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              style={select}
            >
              <option value="newest">Sort: newest first</option>
              <option value="oldest">Sort: oldest first</option>
            </select>

            <select
              value={rangeMode}
              onChange={(e) => setRangeMode(e.target.value as RangeMode)}
              style={select}
            >
              <option value="all">Range: all time</option>
              <option value="7d">Range: last 7 days</option>
              <option value="30d">Range: last 30 days</option>
              <option value="90d">Range: last 90 days</option>
            </select>

            <select
              value={categoryMode}
              onChange={(e) => setCategoryMode(e.target.value as ActivityCategory)}
              style={select}
            >
              <option value="all">Category: all</option>
              <option value="plan">Plan</option>
              <option value="task">Task</option>
              <option value="research">Research</option>
              <option value="decision">Decision</option>
              <option value="execution">Execution</option>
              <option value="memory">Memory</option>
              <option value="note">Note</option>
              <option value="legacy-health">Legacy health</option>
            </select>

            <button onClick={onResetFilters} style={ghostBtn}>
              Reset filters
            </button>
          </div>

          <div style={filterSummary}>
            <span style={metaChip}>Showing {visibleEntries.length} of {filteredEntries.length}</span>
            <span style={metaChip}>Sort: {sortMode}</span>
            <span style={metaChip}>Range: {rangeMode}</span>
            <span style={metaChip}>Category: {categoryMode}</span>
          </div>
        </section>

        <section style={card}>
          <div style={sectionHead}>
            <div>
              <div style={sectionTitle}>Legacy metric snapshot</div>
              <div style={sectionSub}>
                These cards remain only to support migrated health data while the page becomes true CodexForge history.
              </div>
            </div>
          </div>

          <div style={statsGrid}>
            <StatCard
              label="Weight"
              avg7={legacyStats.weights7.length ? `${round1(avg(legacyStats.weights7)).toFixed(1)} kg` : "—"}
              med7={legacyStats.weights7.length ? `${round1(median(legacyStats.weights7)).toFixed(1)} kg` : "—"}
              spark30={weightsForSpark.length ? spark(weightsForSpark) : "—"}
              hint="Legacy metric support only."
            />
            <StatCard
              label="Steps"
              avg7={legacyStats.steps7.length ? formatNum(Math.round(avg(legacyStats.steps7))) : "—"}
              med7={legacyStats.steps7.length ? formatNum(Math.round(median(legacyStats.steps7))) : "—"}
              spark30={stepsForSpark.length ? spark(stepsForSpark) : "—"}
              hint="Legacy metric support only."
            />
            <StatCard
              label="Water"
              avg7={legacyStats.water7.length ? `${round1(avg(legacyStats.water7)).toFixed(1)} L` : "—"}
              med7={legacyStats.water7.length ? `${round1(median(legacyStats.water7)).toFixed(1)} L` : "—"}
              spark30={waterForSpark.length ? spark(waterForSpark) : "—"}
              hint="Legacy metric support only."
            />
            <StatCard
              label="Sleep"
              avg7={legacyStats.sleep7.length ? `${round1(avg(legacyStats.sleep7)).toFixed(1)} h` : "—"}
              med7={legacyStats.sleep7.length ? `${round1(median(legacyStats.sleep7)).toFixed(1)} h` : "—"}
              spark30={sleepForSpark.length ? spark(sleepForSpark) : "—"}
              hint="Legacy metric support only."
            />
          </div>
        </section>

        <div style={split}>
          <section style={card}>
            <div style={sectionHead}>
              <div>
                <div style={sectionTitle}>Activity entries</div>
                <div style={sectionSub}>
                  Showing up to {MAX_VISIBLE_ENTRIES} entries after filtering.
                </div>
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <div style={emptyState}>
                <div style={emptyTitle}>No activity entries found</div>
                <div style={emptyText}>
                  Try changing filters, or use the launch page to create a new CodexForge task entry.
                </div>
                <Link href="/entry" style={primaryLink}>
                  Open launch page
                </Link>
              </div>
            ) : (
              <div style={entriesList}>
                {visibleEntries.map((entry) => (
                  <div key={entry.id} style={row}>
                    <div style={rowTop}>
                      <div style={{ display: "grid", gap: 6 }}>
                        <div style={rowDate}>{entry.title}</div>
                        <div style={metaRow}>
                          <span style={metaChip}>{entry.date}</span>
                          <span style={metaChip}>{formatCategoryLabel(entry.category)}</span>
                          <span style={metaChip}>{formatStatusLabel(entry.status)}</span>
                        </div>
                        <div style={rowId}>{entry.id}</div>
                      </div>

                      <button
                        onClick={() => onDeleteEntry(entry.id)}
                        style={smallDangerBtn}
                        title="Delete entry"
                      >
                        Delete
                      </button>
                    </div>

                    {entry.summary ? <div style={summaryBox}>{entry.summary}</div> : null}

                    {entry.tags?.length ? (
                      <div style={tagRow}>
                        {entry.tags.map((tag) => (
                          <span key={tag} style={tagPill}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div style={metricGrid}>
                      <Metric label="Category" value={formatCategoryLabel(entry.category)} />
                      <Metric label="Status" value={formatStatusLabel(entry.status)} />
                      <Metric label="Weight" value={isNum(entry.weight) ? `${entry.weight} kg` : "—"} />
                      <Metric label="Steps" value={isNum(entry.steps) ? formatNum(entry.steps) : "—"} />
                    </div>

                    {isNum(entry.water) || isNum(entry.sleep) ? (
                      <div style={metricGridSecondary}>
                        <Metric label="Water" value={isNum(entry.water) ? `${entry.water} L` : "—"} />
                        <Metric label="Sleep" value={isNum(entry.sleep) ? `${entry.sleep} h` : "—"} />
                      </div>
                    ) : null}

                    {entry.notes ? <div style={notesBox}>{entry.notes}</div> : null}
                  </div>
                ))}

                {filteredEntries.length > MAX_VISIBLE_ENTRIES ? (
                  <div style={resultCapNote}>
                    Showing the first {MAX_VISIBLE_ENTRIES} matching entries. Narrow your filters to inspect more precisely.
                  </div>
                ) : null}
              </div>
            )}
          </section>

          <aside style={card}>
            <div style={asideGrid}>
              <div style={sectionHead}>
                <div>
                  <div style={sectionTitle}>AI insights</div>
                  <div style={sectionSub}>
                    {aiMode === "auto" ? "API mode using /api/insights" : "Local summary mode"}
                  </div>
                </div>
              </div>

              <div style={asideCopy}>
                The page stays useful even if AI is slow, offline, or unavailable.
              </div>

              <div style={actionGroup}>
                <button onClick={onGenerate} disabled={ai.kind === "loading"} style={primaryBtn}>
                  {ai.kind === "loading" ? "Thinking…" : "Generate insights"}
                </button>

                {ai.kind === "loading" ? (
                  <button onClick={onCancelAI} style={ghostBtn}>
                    Cancel
                  </button>
                ) : null}

                <button
                  onClick={() => setAiMode((mode) => (mode === "auto" ? "local" : "auto"))}
                  style={ghostBtn}
                >
                  Mode: {aiMode === "auto" ? "API" : "Local"}
                </button>

                <button onClick={onCopySummary} style={ghostBtn}>
                  Copy summary
                </button>

                <button onClick={() => setShowRaw((v) => !v)} style={ghostBtn}>
                  {showRaw ? "Hide" : "Show"} payload
                </button>

                <button onClick={onCopyPayload} style={ghostBtn}>
                  Copy payload
                </button>
              </div>

              {latest ? (
                <div style={latestText}>
                  Latest entry: <b>{latest.title}</b> on <b>{latest.date}</b>
                </div>
              ) : null}

              {ai.kind === "error" ? <div style={toastErr}>AI error: {ai.message}</div> : null}

              <pre style={insightBox}>
                {ai.kind === "ready"
                  ? ai.text
                  : ai.kind === "loading"
                    ? "Thinking…"
                    : "Click “Generate insights” to see a summary here."}
              </pre>

              {showRaw ? <pre style={payloadBox}>{buildPayload(entries)}</pre> : null}

              <div style={footnote}>
                Rule: AI must be optional. Core UX must stay fast, readable, and local-first.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* =========================
   subcomponents
========================= */

function StatPill(props: { label: string; value: string }) {
  return (
    <div style={pill}>
      <div style={pillLabel}>{props.label}</div>
      <div style={pillValue}>{props.value}</div>
    </div>
  );
}

function StatCard(props: {
  label: string;
  avg7: string;
  med7: string;
  spark30: string;
  hint: string;
}) {
  return (
    <div style={miniCard}>
      <div style={miniCardTop}>
        <div style={miniCardTitle}>{props.label}</div>
        <div style={miniCardMeta}>7d avg / med</div>
      </div>

      <div style={miniCardChipRow}>
        <div style={statChip}>
          <div style={chipLabel}>Avg</div>
          <div style={chipValue}>{props.avg7}</div>
        </div>
        <div style={statChip}>
          <div style={chipLabel}>Med</div>
          <div style={chipValue}>{props.med7}</div>
        </div>
      </div>

      <div style={sparkBox}>
        <div style={sparkLabel}>30d trend</div>
        <div style={sparkValue}>{props.spark30}</div>
      </div>

      <div style={cardHint}>{props.hint}</div>
    </div>
  );
}

function Metric(props: { label: string; value: string; title?: string }) {
  return (
    <div style={metricPill} title={props.title}>
      <div style={metricLabel}>{props.label}</div>
      <div style={metricValue}>{props.value}</div>
    </div>
  );
}

/* =========================
   styles
========================= */

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.14), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: React.CSSProperties = {
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gap: 16,
};

const heroCard: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 20,
  display: "grid",
  gap: 16,
};

const heroText: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  opacity: 0.72,
  fontWeight: 900,
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px, 4vw, 46px)",
  letterSpacing: -0.8,
};

const subtitle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  opacity: 0.84,
  maxWidth: 760,
};

const heroPills: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const heroMetaRow: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

const heroMetaCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 4,
};

const heroMetaLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.68,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  fontWeight: 900,
};

const heroMetaValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
};

const topBar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const navGroup: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

const actionGroup: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const dot: React.CSSProperties = {
  opacity: 0.55,
};

const navLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.9)",
  textDecoration: "none",
  fontWeight: 950,
};

const primaryLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  padding: "10px 14px",
  borderRadius: 14,
  display: "inline-flex",
};

const split: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.25fr 0.85fr",
  gap: 14,
};

const card: React.CSSProperties = {
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  padding: 16,
  overflow: "hidden",
};

const sectionHead: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 10,
};

const sectionTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 16,
};

const sectionSub: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
  marginTop: 4,
};

const toolbarGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(240px, 1fr) auto auto auto auto",
  gap: 10,
  alignItems: "center",
};

const filterSummary: React.CSSProperties = {
  marginTop: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const statsGrid: React.CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const entriesList: React.CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 12,
};

const row: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 10,
};

const rowTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
  flexWrap: "wrap",
};

const rowDate: React.CSSProperties = {
  fontWeight: 950,
  fontSize: 18,
};

const rowId: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.68,
  wordBreak: "break-all",
};

const metaRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const metaChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  fontSize: 11,
  opacity: 0.86,
};

const summaryBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  opacity: 0.94,
  lineHeight: 1.6,
  fontSize: 13,
};

const tagRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const tagPill: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.20)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 11,
  fontWeight: 800,
};

const metricGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 8,
};

const metricGridSecondary: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const metricPill: React.CSSProperties = {
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
};

const metricLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
};

const metricValue: React.CSSProperties = {
  fontWeight: 900,
};

const notesBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  opacity: 0.95,
  lineHeight: 1.6,
  fontSize: 13,
};

const emptyState: React.CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 20,
  marginTop: 12,
  borderRadius: 16,
  border: "1px dashed rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.03)",
};

const emptyTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 18,
};

const emptyText: React.CSSProperties = {
  opacity: 0.8,
  lineHeight: 1.6,
};

const asideGrid: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const asideCopy: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.82,
  lineHeight: 1.6,
};

const latestText: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.78,
};

const footnote: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  lineHeight: 1.5,
};

const resultCapNote: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  fontSize: 12,
  opacity: 0.8,
};

const btnBase: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  fontWeight: 900,
  cursor: "pointer",
  userSelect: "none",
};

const primaryBtn: React.CSSProperties = {
  ...btnBase,
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  color: "white",
};

const ghostBtn: React.CSSProperties = {
  ...btnBase,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};

const dangerBtn: React.CSSProperties = {
  ...btnBase,
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "white",
};

const smallDangerBtn: React.CSSProperties = {
  ...btnBase,
  padding: "6px 10px",
  borderRadius: 12,
  fontSize: 12,
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "white",
};

const pill: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  display: "grid",
  gap: 2,
};

const pillLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.75,
};

const pillValue: React.CSSProperties = {
  fontWeight: 950,
};

const miniCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

const miniCardTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
};

const miniCardTitle: React.CSSProperties = {
  fontWeight: 950,
};

const miniCardMeta: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
};

const miniCardChipRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 8,
};

const statChip: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  minWidth: 120,
};

const chipLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
};

const chipValue: React.CSSProperties = {
  fontWeight: 950,
};

const sparkBox: React.CSSProperties = {
  marginTop: 10,
  fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};

const sparkLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
};

const sparkValue: React.CSSProperties = {
  fontSize: 16,
  letterSpacing: 0.5,
};

const cardHint: React.CSSProperties = {
  marginTop: 8,
  fontSize: 12,
  opacity: 0.78,
  lineHeight: 1.5,
};

const insightBox: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.92)",
  minHeight: 200,
  whiteSpace: "pre-wrap",
  fontSize: 13,
  lineHeight: 1.55,
};

const payloadBox: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.20)",
  color: "rgba(255,255,255,0.88)",
  maxHeight: 280,
  overflow: "auto",
  whiteSpace: "pre",
  fontSize: 12,
  lineHeight: 1.45,
};

const toastOk: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(16,185,129,0.35)",
  background: "rgba(16,185,129,0.10)",
  fontWeight: 850,
};

const toastErr: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(239,68,68,0.35)",
  background: "rgba(239,68,68,0.10)",
  fontWeight: 850,
};

const fileLabel: React.CSSProperties = {
  ...ghostBtn,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const textInput: React.CSSProperties = {
  ...btnBase,
  cursor: "text",
  fontWeight: 700,
  background: "rgba(0,0,0,0.18)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.14)",
  outline: "none",
  minWidth: 240,
};

const select: React.CSSProperties = {
  ...btnBase,
  background: "rgba(255,255,255,0.06)",
  color: "white",
};