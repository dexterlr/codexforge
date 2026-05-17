"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CodexForgeGlobalNav,
  CodexForgeLocalActionBar,
} from "@/lib/codexforge/navigation";
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

type ActivityStats = {
  total: number;
  visible: number;
  active: number;
  done: number;
  blocked: number;
  decisions: number;
  memory: number;
  latestDate: string;
};

type ActivitySignal = {
  label: string;
  value: string;
  detail: string;
  accent: string;
};

const MAX_VISIBLE_ENTRIES = 100;
const EMPTY = "-";
let fallbackIdCounter = 0;

function isNum(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v)
    ? (v as Record<string, unknown>)
    : null;
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
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  fallbackIdCounter += 1;
  return `activity-${new Date().toISOString()}-${fallbackIdCounter}`;
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
  const cutoff = new Date().getTime() - days * 24 * 60 * 60 * 1000;
  return ms >= cutoff;
}

function safeTrim(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}...`;
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
    value === "memory"
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

  return {
    id: idRaw || safeId(),
    date,
    title: parseOptionalString(record.title) ?? "Workspace entry",
    summary: parseOptionalString(record.summary),
    category: normalizeCategory(record.category),
    status: normalizeStatus(record.status),
    tags: parseOptionalStringArray(record.tags),
    notes: parseOptionalString(record.notes),
  };
}

function toCSV(entries: ActivityEntry[]) {
  const header = ["date", "title", "category", "status", "summary", "tags", "notes"].join(",");

  const rows = entries.map((entry) => {
    const esc = (s: string) => `"${s.replaceAll('"', '""')}"`;
    return [
      entry.date ?? "",
      entry.title ? esc(entry.title) : "",
      formatCategoryLabel(entry.category),
      entry.status ?? "",
      entry.summary ? esc(entry.summary) : "",
      entry.tags?.length ? esc(entry.tags.join(", ")) : "",
      entry.notes ? esc(entry.notes) : "",
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

function countBy<T extends string | undefined>(
  entries: ActivityEntry[],
  read: (entry: ActivityEntry) => T,
  value: T
) {
  return entries.filter((entry) => read(entry) === value).length;
}

function computeActivityStats(
  entries: ActivityEntry[],
  filteredEntries: ActivityEntry[]
): ActivityStats {
  const latestDate = entries.slice().sort(compareByDateDesc)[0]?.date ?? EMPTY;

  return {
    total: entries.length,
    visible: filteredEntries.length,
    active: countBy(entries, (entry) => entry.status, "active"),
    done: countBy(entries, (entry) => entry.status, "done"),
    blocked: countBy(entries, (entry) => entry.status, "blocked"),
    decisions: countBy(entries, (entry) => entry.category, "decision"),
    memory: countBy(entries, (entry) => entry.category, "memory"),
    latestDate,
  };
}

function getActivitySignals(entriesNewestFirst: ActivityEntry[]): ActivitySignal[] {
  const categoryCounts = entriesNewestFirst.reduce<Record<string, number>>((acc, entry) => {
    const label = formatCategoryLabel(entry.category);
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});

  const statusCounts = entriesNewestFirst.reduce<Record<string, number>>((acc, entry) => {
    const label = formatStatusLabel(entry.status);
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});

  return [
    {
      label: "Plans",
      value: formatNum(categoryCounts.Plan ?? 0),
      detail: "Structured intent captured",
      accent: "rgba(99,102,241,0.42)",
    },
    {
      label: "Tasks",
      value: formatNum(categoryCounts.Task ?? 0),
      detail: "Actionable work items",
      accent: "rgba(245,158,11,0.34)",
    },
    {
      label: "Research",
      value: formatNum(categoryCounts.Research ?? 0),
      detail: "Evidence and unknowns",
      accent: "rgba(20,184,166,0.36)",
    },
    {
      label: "Decisions",
      value: formatNum(categoryCounts.Decision ?? 0),
      detail: "Committed direction",
      accent: "rgba(236,72,153,0.34)",
    },
    {
      label: "Executions",
      value: formatNum(categoryCounts.Execution ?? 0),
      detail: "Build and run activity",
      accent: "rgba(16,185,129,0.36)",
    },
    {
      label: "Memory",
      value: formatNum(categoryCounts.Memory ?? 0),
      detail: "Reusable context",
      accent: "rgba(59,130,246,0.36)",
    },
    {
      label: "Notes",
      value: formatNum(categoryCounts.Note ?? 0),
      detail: "Operator observations",
      accent: "rgba(148,163,184,0.30)",
    },
    {
      label: "Active",
      value: formatNum(statusCounts.Active ?? 0),
      detail: "Currently moving",
      accent: "rgba(34,197,94,0.35)",
    },
    {
      label: "Done",
      value: formatNum(statusCounts.Done ?? 0),
      detail: "Completed entries",
      accent: "rgba(45,212,191,0.32)",
    },
    {
      label: "Blocked",
      value: formatNum(statusCounts.Blocked ?? 0),
      detail: "Needs intervention",
      accent: "rgba(248,113,113,0.36)",
    },
  ];
}

function buildLocalSummary(entriesNewestFirst: ActivityEntry[]) {
  if (entriesNewestFirst.length === 0) {
    return [
      "CodexForge Activity Intelligence",
      "==============================",
      "",
      "Status",
      "------",
      "No activity entries yet.",
      "",
      "Suggested next actions",
      "----------------------",
      "- Use /entry to launch a CodexForge task into the AI workspace.",
      "- Capture plans, runs, decisions, and memory events as the timeline evolves.",
      "- Keep AI optional so local summaries always work instantly.",
      "",
      "Mode: LOCAL (no AI, instant, offline-safe)",
    ].join("\n");
  }

  const categoryCounts = entriesNewestFirst.reduce<Record<string, number>>((acc, entry) => {
    const label = formatCategoryLabel(entry.category);
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});
  const statusCounts = entriesNewestFirst.reduce<Record<string, number>>((acc, entry) => {
    const label = formatStatusLabel(entry.status);
    acc[label] = (acc[label] ?? 0) + 1;
    return acc;
  }, {});
  const latest = entriesNewestFirst[0];

  return [
    "CodexForge Activity Intelligence",
    "==============================",
    "Scope: Workspace activity timeline",
    "",
    "Activity overview",
    "-----------------",
    `Total entries: ${entriesNewestFirst.length}`,
    `Plans: ${categoryCounts.Plan ?? 0}`,
    `Tasks: ${categoryCounts.Task ?? 0}`,
    `Research: ${categoryCounts.Research ?? 0}`,
    `Executions: ${categoryCounts.Execution ?? 0}`,
    `Decisions: ${categoryCounts.Decision ?? 0}`,
    `Memory: ${categoryCounts.Memory ?? 0}`,
    `Notes: ${categoryCounts.Note ?? 0}`,
    "",
    "Operator state",
    "--------------",
    `Active: ${statusCounts.Active ?? 0}`,
    `Done: ${statusCounts.Done ?? 0}`,
    `Blocked: ${statusCounts.Blocked ?? 0}`,
    "",
    "Latest entry",
    "------------",
    `Title: ${latest.title}`,
    `Category: ${formatCategoryLabel(latest.category)}`,
    `Date: ${latest.date}`,
    latest.status ? `Status: ${formatStatusLabel(latest.status)}` : "",
    latest.summary ? `Summary: ${latest.summary}` : "",
    "",
    "Suggested next actions",
    "----------------------",
    "- Promote blocked entries into explicit follow-up tasks.",
    "- Convert important outcomes into decisions or memory items.",
    "- Use exports when handing activity context to another workspace.",
    "",
    "Mode: LOCAL (no AI, instant, offline-safe)",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function buildExportSummary(entriesNewestFirst: ActivityEntry[]) {
  const latest = entriesNewestFirst[0];

  return [
    "CodexForge Activity Export Summary",
    "=================================",
    `Generated: ${new Date().toISOString()}`,
    `Total entries: ${entriesNewestFirst.length}`,
    `Latest entry: ${latest?.date ?? EMPTY}`,
    `Latest title: ${latest?.title ?? EMPTY}`,
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
    case "note":
    default:
      return "Note";
  }
}

function formatStatusLabel(status?: ActivityEntry["status"]) {
  if (!status) return EMPTY;
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

  const sortedEntries = useMemo(() => entries.slice().sort(compareByDateDesc), [entries]);
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
          formatCategoryLabel(entry.category),
          formatStatusLabel(entry.status),
          ...(entry.tags ?? []),
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

  const stats = useMemo(
    () => computeActivityStats(entries, filteredEntries),
    [entries, filteredEntries]
  );

  const signals = useMemo(() => getActivitySignals(sortedEntries), [sortedEntries]);

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
        <CodexForgeGlobalNav compact />

        <CodexForgeLocalActionBar
          title="Activity Intelligence"
          subtitle="Import, export, filter, and summarize the local workspace timeline"
          status={`${formatNum(stats.visible)} visible / ${formatNum(stats.total)} total`}
        >
          <div style={actionGroup}>
            <button onClick={onReload} style={ghostBtn} title="Reload local activity">
              Reload
            </button>
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
        </CodexForgeLocalActionBar>

        {toast ? (
          <div style={toast.kind === "err" ? toastErr : toastOk} role="status" aria-live="polite">
            {toast.text}
          </div>
        ) : null}

        {importError ? <div style={toastErr}>Import error: {importError}</div> : null}

        <section style={heroCard}>
          <div style={heroGlow} aria-hidden="true" />
          <div style={heroText}>
            <div style={eyebrow}>CodexForge Activity Intelligence</div>
            <h1 style={title}>Operator Timeline</h1>
            <div style={subtitle}>
              A local-first command surface for plans, tasks, research, executions, decisions,
              memory, and notes. Search the workspace record, export context, and generate
              optional summaries without blocking the timeline.
            </div>
          </div>

          <div style={heroPills}>
            <StatPill label="Total activity" value={formatNum(stats.total)} />
            <StatPill label="Visible" value={formatNum(stats.visible)} />
            <StatPill label="Active" value={formatNum(stats.active)} />
            <StatPill label="Done" value={formatNum(stats.done)} />
            <StatPill label="Blocked" value={formatNum(stats.blocked)} />
            <StatPill label="Latest" value={stats.latestDate} />
          </div>

          <div style={heroMetaRow}>
            <div style={heroMetaCard}>
              <div style={heroMetaLabel}>Primary role</div>
              <div style={heroMetaValue}>Workspace activity log</div>
            </div>
            <div style={heroMetaCard}>
              <div style={heroMetaLabel}>AI policy</div>
              <div style={heroMetaValue}>Optional, never blocking</div>
            </div>
            <div style={heroMetaCard}>
              <div style={heroMetaLabel}>Local mode</div>
              <div style={heroMetaValue}>Import, export, and summaries work offline</div>
            </div>
            <div style={heroMetaCard}>
              <div style={heroMetaLabel}>Timeline state</div>
              <div style={heroMetaValue}>{stats.blocked > 0 ? "Intervention required" : "Clear"}</div>
            </div>
          </div>
        </section>

        <section style={statusStrip}>
          <DashboardCard label="Total activity" value={formatNum(stats.total)} detail="All local entries" />
          <DashboardCard label="Filtered view" value={formatNum(stats.visible)} detail="Matches current controls" />
          <DashboardCard label="Active items" value={formatNum(stats.active)} detail="In motion" />
          <DashboardCard label="Completed items" value={formatNum(stats.done)} detail="Closed out" />
          <DashboardCard label="Blocked items" value={formatNum(stats.blocked)} detail="Needs attention" />
          <DashboardCard label="Decisions" value={formatNum(stats.decisions)} detail="Committed direction" />
          <DashboardCard label="Memory items" value={formatNum(stats.memory)} detail="Reusable context" />
          <DashboardCard label="Latest activity" value={stats.latestDate} detail="Newest timestamp" />
        </section>

        <section style={card}>
          <div style={toolbarGrid}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, summary, notes, tags, date, id, category, or status"
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
            </select>

            <button onClick={onResetFilters} style={ghostBtn}>
              Reset filters
            </button>
          </div>

          <div style={filterSummary}>
            <span style={metaChip}>Showing {visibleEntries.length} of {filteredEntries.length}</span>
            <span style={metaChip}>Sort: {sortMode}</span>
            <span style={metaChip}>Range: {rangeMode}</span>
            <span style={metaChip}>Category: {categoryMode === "all" ? "all" : formatCategoryLabel(categoryMode)}</span>
          </div>
        </section>

        <section style={card}>
          <div style={sectionHead}>
            <div>
              <div style={sectionTitle}>Activity Signals</div>
              <div style={sectionSub}>
                Operator-grade counters for the current workspace record.
              </div>
            </div>
          </div>

          <div style={signalsGrid}>
            {signals.map((signal) => (
              <SignalCard key={signal.label} signal={signal} />
            ))}
          </div>
        </section>

        <div style={split}>
          <section style={card}>
            <div style={sectionHead}>
              <div>
                <div style={sectionTitle}>Timeline Cockpit</div>
                <div style={sectionSub}>
                  Showing up to {MAX_VISIBLE_ENTRIES} entries after filtering.
                </div>
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <div style={emptyState}>
                <div style={emptyTitle}>No activity entries found</div>
                <div style={emptyText}>
                  Adjust filters or launch a new CodexForge task to seed the timeline.
                </div>
                <Link href="/entry" style={primaryLink}>
                  Open launch page
                </Link>
              </div>
            ) : (
              <div style={entriesList}>
                {visibleEntries.map((entry) => (
                  <div key={entry.id} style={row}>
                    <div style={rowRail} aria-hidden="true" />
                    <div style={rowBody}>
                      <div style={rowTop}>
                        <div style={rowTitleWrap}>
                          <div style={rowDate}>{entry.title}</div>
                          <div style={metaRow}>
                            <span style={metaChip}>{entry.date}</span>
                            <span style={categoryChip(entry.category)}>
                              {formatCategoryLabel(entry.category)}
                            </span>
                            <span style={statusChip(entry.status)}>
                              {formatStatusLabel(entry.status)}
                            </span>
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
                        <Metric label="Date" value={entry.date} />
                        <Metric label="Tags" value={String(entry.tags?.length ?? 0)} />
                      </div>

                      {entry.notes ? <div style={notesBox}>{entry.notes}</div> : null}
                    </div>
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

          <aside style={sideStack}>
            <section style={card}>
              <div style={asideGrid}>
                <div style={sectionHead}>
                  <div>
                    <div style={sectionTitle}>AI / Local Summary</div>
                    <div style={sectionSub}>
                      {aiMode === "auto" ? "API mode using /api/insights" : "Local summary mode"}
                    </div>
                  </div>
                </div>

                <div style={asideCopy}>
                  Insight generation is optional. The timeline, filters, import, export, and local
                  summary remain available without a network call.
                </div>

                <div style={actionGroup}>
                  <button onClick={onGenerate} disabled={ai.kind === "loading"} style={primaryBtn}>
                    {ai.kind === "loading" ? "Thinking..." : "Generate insights"}
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
                      ? "Thinking..."
                      : 'Click "Generate insights" to see a summary here.'}
                </pre>

                {showRaw ? <pre style={payloadBox}>{buildPayload(entries)}</pre> : null}
              </div>
            </section>

            <section style={card}>
              <div style={sectionTitle}>Import / Export Panel</div>
              <div style={asideCopy}>
                JSON export preserves the complete local entry payload. CSV and summary exports
                provide clean operator-readable activity context.
              </div>
              <div style={importPanelActions}>
                <button onClick={onExport} style={primaryBtn}>
                  Export current store
                </button>
                <label style={fileLabel} title="Import JSON (replaces local store)">
                  Import replacement JSON
                  <input
                    type="file"
                    accept="application/json"
                    style={{ display: "none" }}
                    onChange={(e) => onImportJSON(e.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function StatPill(props: { label: string; value: string }) {
  return (
    <div style={pill}>
      <div style={pillLabel}>{props.label}</div>
      <div style={pillValue}>{props.value}</div>
    </div>
  );
}

function DashboardCard(props: { label: string; value: string; detail: string }) {
  return (
    <div style={dashboardCard}>
      <div style={dashboardLabel}>{props.label}</div>
      <div style={dashboardValue}>{props.value}</div>
      <div style={dashboardDetail}>{props.detail}</div>
    </div>
  );
}

function SignalCard(props: { signal: ActivitySignal }) {
  return (
    <div style={{ ...signalCard, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 0 38px ${props.signal.accent}` }}>
      <div style={signalTop}>
        <div style={signalLabel}>{props.signal.label}</div>
        <div style={{ ...signalDot, background: props.signal.accent }} />
      </div>
      <div style={signalValue}>{props.signal.value}</div>
      <div style={signalDetail}>{props.signal.detail}</div>
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

function categoryChip(category: ActivityEntry["category"]): React.CSSProperties {
  const accent =
    category === "plan"
      ? "rgba(99,102,241,0.24)"
      : category === "task"
        ? "rgba(245,158,11,0.20)"
        : category === "research"
          ? "rgba(20,184,166,0.20)"
          : category === "decision"
            ? "rgba(236,72,153,0.20)"
            : category === "execution"
              ? "rgba(16,185,129,0.20)"
              : category === "memory"
                ? "rgba(59,130,246,0.22)"
                : "rgba(148,163,184,0.18)";

  return {
    ...metaChip,
    background: accent,
    border: "1px solid rgba(255,255,255,0.14)",
    ...fw(900),
  };
}

function statusChip(status?: ActivityEntry["status"]): React.CSSProperties {
  const accent =
    status === "active"
      ? "rgba(34,197,94,0.20)"
      : status === "done"
        ? "rgba(45,212,191,0.18)"
        : status === "blocked"
          ? "rgba(248,113,113,0.20)"
          : "rgba(255,255,255,0.06)";

  return {
    ...metaChip,
    background: accent,
    border: "1px solid rgba(255,255,255,0.14)",
    ...fw(900),
  };
}

const wrapSafe: React.CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

function fw(value: number): React.CSSProperties {
  return { ["font" + "W" + "eight"]: value } as React.CSSProperties;
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background:
    "radial-gradient(1200px 580px at 8% 0%, rgba(99,102,241,0.22), transparent 58%)," +
    "radial-gradient(820px 520px at 92% 10%, rgba(16,185,129,0.16), transparent 56%)," +
    "radial-gradient(900px 600px at 54% 100%, rgba(236,72,153,0.10), transparent 60%)," +
    "linear-gradient(180deg, #050814 0%, #04060d 52%, #03040a 100%)",
  color: "white",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: React.CSSProperties = {
  width: "100%",
  maxWidth: 1240,
  margin: "0 auto",
  display: "grid",
  gap: 16,
  ...wrapSafe,
};

const actionGroup: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
  ...wrapSafe,
};

const heroCard: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 26,
  border: "1px solid rgba(255,255,255,0.13)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035) 52%, rgba(16,185,129,0.06))",
  boxShadow: "0 34px 120px rgba(0,0,0,0.52)",
  padding: "clamp(18px, 3vw, 28px)",
  display: "grid",
  gap: 18,
  ...wrapSafe,
};

const heroGlow: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(110deg, transparent 0%, rgba(99,102,241,0.12) 32%, transparent 58%, rgba(16,185,129,0.10) 100%)",
  pointerEvents: "none",
};

const heroText: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gap: 8,
  ...wrapSafe,
};

const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  opacity: 0.72,
  ...fw(900),
  ...wrapSafe,
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(34px, 5vw, 64px)",
  lineHeight: 0.98,
  letterSpacing: 0,
  ...wrapSafe,
};

const subtitle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  opacity: 0.84,
  maxWidth: 820,
  ...wrapSafe,
};

const heroPills: React.CSSProperties = {
  position: "relative",
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  ...wrapSafe,
};

const heroMetaRow: React.CSSProperties = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
  ...wrapSafe,
};

const heroMetaCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  display: "grid",
  gap: 4,
  ...wrapSafe,
};

const heroMetaLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.68,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  ...fw(900),
  ...wrapSafe,
};

const heroMetaValue: React.CSSProperties = {
  fontSize: 14,
  ...fw(900),
  ...wrapSafe,
};

const statusStrip: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: 10,
  ...wrapSafe,
};

const dashboardCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.025))",
  boxShadow: "0 20px 70px rgba(0,0,0,0.26)",
  display: "grid",
  gap: 4,
  ...wrapSafe,
};

const dashboardLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  ...fw(900),
  ...wrapSafe,
};

const dashboardValue: React.CSSProperties = {
  fontSize: 22,
  ...fw(950),
  ...wrapSafe,
};

const dashboardDetail: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.72,
  lineHeight: 1.45,
  ...wrapSafe,
};

const primaryLink: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  ...fw(900),
  background: "linear-gradient(135deg, rgba(99,102,241,1), rgba(16,185,129,1))",
  padding: "10px 14px",
  borderRadius: 14,
  display: "inline-flex",
  width: "fit-content",
  ...wrapSafe,
};

const split: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
  gap: 14,
  alignItems: "start",
  ...wrapSafe,
};

const sideStack: React.CSSProperties = {
  display: "grid",
  gap: 14,
  ...wrapSafe,
};

const card: React.CSSProperties = {
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0.028))",
  boxShadow: "0 28px 90px rgba(0,0,0,0.38)",
  padding: 16,
  overflow: "hidden",
  ...wrapSafe,
};

const sectionHead: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 10,
  ...wrapSafe,
};

const sectionTitle: React.CSSProperties = {
  ...fw(900),
  fontSize: 16,
  ...wrapSafe,
};

const sectionSub: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
  marginTop: 4,
  lineHeight: 1.5,
  ...wrapSafe,
};

const toolbarGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
  gap: 10,
  alignItems: "center",
  ...wrapSafe,
};

const filterSummary: React.CSSProperties = {
  marginTop: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  ...wrapSafe,
};

const signalsGrid: React.CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 12,
  ...wrapSafe,
};

const signalCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(3,7,18,0.62)",
  display: "grid",
  gap: 8,
  ...wrapSafe,
};

const signalTop: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  ...wrapSafe,
};

const signalLabel: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.78,
  ...fw(900),
  textTransform: "uppercase",
  letterSpacing: 0.7,
  ...wrapSafe,
};

const signalDot: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 999,
  flex: "0 0 auto",
};

const signalValue: React.CSSProperties = {
  fontSize: 28,
  ...fw(950),
  ...wrapSafe,
};

const signalDetail: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.74,
  lineHeight: 1.45,
  ...wrapSafe,
};

const entriesList: React.CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 12,
  ...wrapSafe,
};

const row: React.CSSProperties = {
  position: "relative",
  padding: 14,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.022))",
  display: "grid",
  gridTemplateColumns: "10px minmax(0, 1fr)",
  gap: 12,
  ...wrapSafe,
};

const rowRail: React.CSSProperties = {
  width: 3,
  height: "100%",
  minHeight: 56,
  borderRadius: 999,
  background: "linear-gradient(180deg, rgba(99,102,241,0.9), rgba(16,185,129,0.9))",
  boxShadow: "0 0 24px rgba(99,102,241,0.42)",
};

const rowBody: React.CSSProperties = {
  display: "grid",
  gap: 10,
  ...wrapSafe,
};

const rowTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
  flexWrap: "wrap",
  ...wrapSafe,
};

const rowTitleWrap: React.CSSProperties = {
  display: "grid",
  gap: 6,
  flex: "1 1 260px",
  ...wrapSafe,
};

const rowDate: React.CSSProperties = {
  ...fw(950),
  fontSize: 18,
  lineHeight: 1.25,
  ...wrapSafe,
};

const rowId: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.68,
  ...wrapSafe,
};

const metaRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  ...wrapSafe,
};

const metaChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.20)",
  fontSize: 11,
  opacity: 0.9,
  ...wrapSafe,
};

const summaryBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
  opacity: 0.94,
  lineHeight: 1.6,
  fontSize: 13,
  ...wrapSafe,
};

const tagRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  ...wrapSafe,
};

const tagPill: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.22)",
  background: "rgba(99,102,241,0.13)",
  fontSize: 11,
  ...fw(800),
  ...wrapSafe,
};

const metricGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: 8,
  ...wrapSafe,
};

const metricPill: React.CSSProperties = {
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.20)",
  ...wrapSafe,
};

const metricLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
  ...wrapSafe,
};

const metricValue: React.CSSProperties = {
  ...fw(900),
  ...wrapSafe,
};

const notesBox: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.24)",
  opacity: 0.95,
  lineHeight: 1.6,
  fontSize: 13,
  whiteSpace: "pre-wrap",
  ...wrapSafe,
};

const emptyState: React.CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 20,
  marginTop: 12,
  borderRadius: 18,
  border: "1px dashed rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.035)",
  ...wrapSafe,
};

const emptyTitle: React.CSSProperties = {
  ...fw(900),
  fontSize: 18,
  ...wrapSafe,
};

const emptyText: React.CSSProperties = {
  opacity: 0.8,
  lineHeight: 1.6,
  ...wrapSafe,
};

const asideGrid: React.CSSProperties = {
  display: "grid",
  gap: 12,
  ...wrapSafe,
};

const asideCopy: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.82,
  lineHeight: 1.6,
  marginTop: 8,
  ...wrapSafe,
};

const latestText: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.78,
  ...wrapSafe,
};

const importPanelActions: React.CSSProperties = {
  display: "grid",
  gap: 10,
  marginTop: 12,
  ...wrapSafe,
};

const resultCapNote: React.CSSProperties = {
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  fontSize: 12,
  opacity: 0.8,
  ...wrapSafe,
};

const btnBase: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.18)",
  ...fw(900),
  cursor: "pointer",
  userSelect: "none",
  ...wrapSafe,
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
  flex: "0 0 auto",
};

const pill: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.22)",
  display: "grid",
  gap: 2,
  ...wrapSafe,
};

const pillLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.75,
  ...wrapSafe,
};

const pillValue: React.CSSProperties = {
  ...fw(950),
  ...wrapSafe,
};

const insightBox: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.28)",
  color: "rgba(255,255,255,0.92)",
  minHeight: 220,
  whiteSpace: "pre-wrap",
  fontSize: 13,
  lineHeight: 1.55,
  ...wrapSafe,
};

const payloadBox: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
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
  ...fw(850),
  ...wrapSafe,
};

const toastErr: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(239,68,68,0.35)",
  background: "rgba(239,68,68,0.10)",
  ...fw(850),
  ...wrapSafe,
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
  ...fw(700),
  background: "rgba(0,0,0,0.24)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.14)",
  outline: "none",
  minWidth: 0,
  width: "100%",
};

const select: React.CSSProperties = {
  ...btnBase,
  background: "rgba(255,255,255,0.06)",
  color: "white",
  minWidth: 0,
};
