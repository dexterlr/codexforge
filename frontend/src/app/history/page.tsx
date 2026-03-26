// Operator demo change (2026-03-26T12:42:39.911Z)
"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { clearEntries, loadEntries, type HealthEntry } from "@/lib/storage";

/**
 * HISTORY PAGE (TESTBED)
 * ------------------------------------------------------------
 * Goals:
 * - Local-first: app works with no network.
 * - AI is optional: UI must stay usable if AI is slow/offline/broken.
 * - Demo-friendly: export/import tools, quick stats, predictable UI.
 *
 * Notes:
 * - This page intentionally avoids heavy dependencies.
 * - Where persistence APIs are unknown, we do best-effort persistence with safe fallbacks.
 */

type AiState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; text: string }
  | { kind: "error"; message: string };

type SortMode = "newest" | "oldest";
type RangeMode = "all" | "7d" | "30d" | "90d";

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
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function isNum(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function parseOptionalNumber(v: unknown): number | undefined {
  return isNum(v) ? v : undefined;
}

function parseOptionalString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function isISODateYYYYMMDD(s: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function formatNum(n: number) {
  return n.toLocaleString();
}

function errorMessage(e: unknown, fallback: string) {
  if (e instanceof Error && typeof e.message === "string" && e.message.trim()) return e.message;
  if (typeof e === "string" && e.trim()) return e;
  return fallback;
}

function safeId() {
  // stable-enough unique id for demo use
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeEntry(x: unknown, idx: number): HealthEntry {
  const r = asRecord(x);
  if (!r) throw new Error(`Entry #${idx + 1} must be an object.`);

  const date = typeof r.date === "string" ? r.date : "";
  if (!date || !isISODateYYYYMMDD(date)) {
    throw new Error(`Entry #${idx + 1} is missing a valid date (YYYY-MM-DD).`);
  }

  const idRaw = typeof r.id === "string" ? r.id : "";
  const id = idRaw || safeId();

  const weight = parseOptionalNumber(r.weight);
  const steps = parseOptionalNumber(r.steps);
  const water = parseOptionalNumber(r.water);
  const sleep = parseOptionalNumber(r.sleep);
  const notes = parseOptionalString(r.notes);

  return { id, date, weight, steps, water, sleep, notes };
}

function toCSV(entries: HealthEntry[]) {
  const header = ["date", "weight", "steps", "water", "sleep", "notes"].join(",");
  const rows = entries.map((e) => {
    const esc = (s: string) => `"${s.replaceAll('"', '""')}"`;
    return [
      e.date ?? "",
      isNum(e.weight) ? String(e.weight) : "",
      isNum(e.steps) ? String(e.steps) : "",
      isNum(e.water) ? String(e.water) : "",
      isNum(e.sleep) ? String(e.sleep) : "",
      e.notes ? esc(e.notes) : "",
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

/**
 * Sparkline using a safe set of Unicode blocks.
 * No spaces inside the block string (spaces break indexing).
 */
function spark(values: number[], width = 26) {
  if (values.length < 2) return "—";
  const blocks = "▁▂▃▄�▆▇█";

  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const span = maxV - minV || 1;

  const sampled: number[] = [];
  for (let i = 0; i < width; i++) {
    const idx = Math.floor((i / (width - 1)) * (values.length - 1));
    sampled.push(values[idx]);
  }

  return sampled
    .map((v) => {
      const t = (v - minV) / span;
      const b = Math.floor(t * (blocks.length - 1));
      return blocks[clamp(b, 0, blocks.length - 1)];
    })
    .join("");
}

function computeStats(entries: HealthEntry[]) {
  // Expect entries to be newest-first, but computeStats itself doesn't depend on sort.
  const last7 = entries.slice(0, 7);
  const last30 = entries.slice(0, 30);

  const weights7 = last7.map((e) => e.weight).filter(isNum);
  const steps7 = last7.map((e) => e.steps).filter(isNum);
  const water7 = last7.map((e) => e.water).filter(isNum);
  const sleep7 = last7.map((e) => e.sleep).filter(isNum);

  const weights30 = last30.map((e) => e.weight).filter(isNum);
  const steps30 = last30.map((e) => e.steps).filter(isNum);
  const water30 = last30.map((e) => e.water).filter(isNum);
  const sleep30 = last30.map((e) => e.sleep).filter(isNum);

  const countWithAnyMetric = last7.filter((e) => {
    return isNum(e.weight) || isNum(e.steps) || isNum(e.water) || isNum(e.sleep) || !!e.notes;
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

function parseDateToMs(dateYYYYMMDD: string) {
  // Date-only parse in local time; stable enough for demo filtering.
  const [y, m, d] = dateYYYYMMDD.split("-").map((x) => Number(x));
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return 0;
  return new Date(y, m - 1, d).getTime();
}

function withinRange(dateYYYYMMDD: string, range: RangeMode) {
  if (range === "all") return true;
  const ms = parseDateToMs(dateYYYYMMDD);
  if (!ms) return true;

  const days = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 90 : 99999;

  const now = Date.now();
  const cutoff = now - days * 24 * 60 * 60 * 1000;
  return ms >= cutoff;
}

function safeTrim(s: string, max: number) {
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

function makeToastMessage(prefix: string, msg: string) {
  const clean = msg.replace(/\s+/g, " ").trim();
  return `${prefix}${prefix ? ": " : ""}${safeTrim(clean, 180)}`;
}

/**
 * Best-effort persistence for edits (delete, replace):
 * - Prefer storage.saveEntries(entries) if present
 * - Else localStorage fallback to a small set of likely keys
 *
 * This is intentionally conservative: if we cannot confidently persist, we don't guess wildly.
 */
async function persistEntriesBestEffort(next: HealthEntry[]) {
  const storage = await import("@/lib/storage");

  const saveEntriesMaybe = (storage as unknown as { saveEntries?: unknown }).saveEntries;
  if (typeof saveEntriesMaybe === "function") {
    (saveEntriesMaybe as (e: HealthEntry[]) => void)(next);
    return { ok: true, how: "saveEntries()" as const };
  }

  // Fallback: try common keys only if they exist and look like arrays.
  const candidateKeys = ["health-tracker-entries", "entries", "healthEntries"];
  for (const k of candidateKeys) {
    try {
      const existing = localStorage.getItem(k);
      if (!existing) continue;
      const parsed: unknown = JSON.parse(existing);
      if (!Array.isArray(parsed)) continue;

      localStorage.setItem(k, JSON.stringify(next));
      return { ok: true, how: `localStorage("${k}")` as const };
    } catch {
      // ignore and try next key
    }
  }

  return { ok: false, how: "unknown" as const };
}

function buildLocalSummary(entries: HealthEntry[]) {
  if (entries.length === 0) return "No entries yet. Add one first, then summarize patterns.";

  const stats = computeStats(entries);
  const { last7, weights7, steps7, water7, sleep7 } = stats;

  const lines: string[] = [];
  lines.push(`Based on your latest ${last7.length} entries:`);

  if (weights7.length) lines.push(`• Avg weight (7d): ${round1(avg(weights7)).toFixed(1)} kg`);
  if (steps7.length) lines.push(`• Avg steps (7d): ${formatNum(Math.round(avg(steps7)))}`);
  if (water7.length) lines.push(`• Avg water (7d): ${round1(avg(water7)).toFixed(1)} L`);
  if (sleep7.length) lines.push(`• Avg sleep (7d): ${round1(avg(sleep7)).toFixed(1)} hrs`);

  if (!weights7.length && !steps7.length && !water7.length && !sleep7.length) {
    lines.push("• You have only entered notes/dates so far — add numbers to get trends.");
  }

  lines.push("");
  lines.push("This is LOCAL summary mode (fast/offline).");
  lines.push("Rule: AI stays optional so the app stays fast.");
  return lines.join("\n");
}

export default function HistoryPage() {
  // Reload button bumps reloadTick to trigger a re-render.
  const [reloadTick, setReloadTick] = useState(0);

  // Keep hydration safe: don't touch localStorage until after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  // Read entries only after mount.
  // NOTE: no reloadTick dependency here — changing reloadTick already re-renders the component.
  const entries = useMemo(() => {
    if (!mounted) return [];
    return loadEntries();
  }, [mounted]);

  // keep reloadTick "used" without depending on it in hooks (avoids lint noise)
  void reloadTick;

  const [ai, setAi] = useState<AiState>({ kind: "idle" });
  const [aiMode, setAiMode] = useState<"auto" | "local">("auto");
  const [showRaw, setShowRaw] = useState(false);
  const [importError, setImportError] = useState<string>("");

  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [rangeMode, setRangeMode] = useState<RangeMode>("all");

  const abortRef = useRef<AbortController | null>(null);

  // small “toast” UX (no libs)
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  function showToast(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
  }
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  const stats = useMemo(() => computeStats(entries), [entries]);

  const viewEntries = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = entries.slice();

    // Sort by date (fallback to 0 if missing)
    list.sort((a, b) => {
      const ams = a.date ? parseDateToMs(a.date) : 0;
      const bms = b.date ? parseDateToMs(b.date) : 0;
      return sortMode === "newest" ? bms - ams : ams - bms;
    });

    // Range filter
    list = list.filter((e) => (e.date ? withinRange(e.date, rangeMode) : true));

    // Text search (date + notes + id)
    if (q) {
      list = list.filter((e) => {
        const hay = `${e.date ?? ""} ${e.id ?? ""} ${e.notes ?? ""}`.toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [entries, query, sortMode, rangeMode]);

  const latest = useMemo(() => {
    if (entries.length === 0) return undefined;
    const list = entries
      .slice()
      .sort((a, b) => (b.date ? parseDateToMs(b.date) : 0) - (a.date ? parseDateToMs(a.date) : 0));
    return list[0];
  }, [entries]);

  const weightsForSpark = stats.last30.slice().reverse().map((e) => e.weight).filter(isNum);
  const stepsForSpark = stats.last30.slice().reverse().map((e) => e.steps).filter(isNum);
  const waterForSpark = stats.last30.slice().reverse().map((e) => e.water).filter(isNum);
  const sleepForSpark = stats.last30.slice().reverse().map((e) => e.sleep).filter(isNum);

  function onReload() {
    setReloadTick((x) => x + 1);
    showToast("ok", "Reloaded from local storage.");
  }

  function onClearAll() {
    if (!confirm("Clear ALL entries from local storage?")) return;
    clearEntries();
    setAi({ kind: "idle" });
    setReloadTick((x) => x + 1);
    showToast("ok", "All entries cleared.");
  }

  function onExportJSON() {
    const json = JSON.stringify(entries, null, 2);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadText(`health-tracker-entries-${stamp}.json`, json, "application/json");
    showToast("ok", "Exported JSON.");
  }

  function onExportCSV() {
    const csv = toCSV(entries);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadText(`health-tracker-entries-${stamp}.csv`, csv, "text/csv");
    showToast("ok", "Exported CSV.");
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

      const normalized: HealthEntry[] = parsed.map((x: unknown, idx: number) => normalizeEntry(x, idx));

      // Replace local store completely.
      clearEntries();

      const storage = await import("@/lib/storage");
      const saveEntriesMaybe = (storage as unknown as { saveEntries?: unknown }).saveEntries;
      const addEntryMaybe = (storage as unknown as { addEntry?: unknown }).addEntry;

      if (typeof saveEntriesMaybe === "function") {
        (saveEntriesMaybe as (e: HealthEntry[]) => void)(normalized);
      } else if (typeof addEntryMaybe === "function") {
        // Add in reverse so the final store is newest-first.
        for (const e of [...normalized].reverse()) {
          (addEntryMaybe as (e: HealthEntry) => void)(e);
        }
      } else {
        throw new Error("Storage module is missing saveEntries() and addEntry().");
      }

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
    if (!confirm("Delete this entry?")) return;

    const next = entries.filter((e) => e.id !== id);

    try {
      const res = await persistEntriesBestEffort(next);
      setReloadTick((x) => x + 1);

      if (res.ok) {
        showToast("ok", `Deleted entry. Saved via ${res.how}.`);
      } else {
        showToast("err", "Deleted in view, but could not persist (storage key unknown).");
      }
    } catch (e: unknown) {
      setReloadTick((x) => x + 1);
      showToast("err", makeToastMessage("Delete failed", errorMessage(e, "Unknown error")));
    }
  }

  async function onCopyPayload() {
    try {
      const payload = JSON.stringify({ entries: entries.slice(0, 50) }, null, 2);
      await navigator.clipboard.writeText(payload);
      showToast("ok", "Copied payload to clipboard.");
    } catch {
      showToast("err", "Copy failed (clipboard permissions?).");
    }
  }

  function localSummary() {
    return buildLocalSummary(entries);
  }

  async function onGenerate() {
    if (entries.length === 0) {
      setAi({ kind: "ready", text: "No entries yet. Add one first, then try again." });
      return;
    }

    // Cancel any in-flight request.
    abortRef.current?.abort();
    abortRef.current = null;

    setAi({ kind: "loading" });

    // Local mode is instant and zero network.
    if (aiMode === "local") {
      setAi({ kind: "ready", text: localSummary() });
      return;
    }

    // API mode: call /api/insights
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
        {/* Nav */}
        <div style={topBar}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/" style={navLink}>
              ← Home
            </Link>
            <div style={{ opacity: 0.55 }}>•</div>
            <Link href="/entry" style={navLink}>
              Add entry
            </Link>
            <div style={{ opacity: 0.55 }}>•</div>
            <button onClick={onReload} style={ghostBtn} title="Reload entries from local storage">
              Reload
            </button>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={onExportJSON} style={ghostBtn}>
              Export JSON
            </button>
            <button onClick={onExportCSV} style={ghostBtn}>
              Export CSV
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

        <h1 style={title}>History</h1>

        {/* Controls */}
        <section style={card}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search (date, notes, id)…"
              style={textInput}
            />

            <select value={sortMode} onChange={(e) => setSortMode(e.target.value as SortMode)} style={select}>
              <option value="newest">Sort: newest</option>
              <option value="oldest">Sort: oldest</option>
            </select>

            <select value={rangeMode} onChange={(e) => setRangeMode(e.target.value as RangeMode)} style={select}>
              <option value="all">Range: all</option>
              <option value="7d">Range: last 7 days</option>
              <option value="30d">Range: last 30 days</option>
              <option value="90d">Range: last 90 days</option>
            </select>

            <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatPill label="Entries" value={formatNum(entries.length)} />
              <StatPill label="Visible" value={formatNum(viewEntries.length)} />
              <StatPill label="Latest" value={latest?.date ?? "—"} />
              <StatPill label="7d filled" value={`${stats.countWithAnyMetric}/${stats.last7.length || 0}`} />
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 14 }}>Quick stats</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Last 7 days (avg/median) + last 30 (sparklines)</div>
            </div>
          </div>

          <div style={statsGrid}>
            <StatCard
              label="Weight"
              avg7={stats.weights7.length ? `${round1(avg(stats.weights7)).toFixed(1)} kg` : "—"}
              med7={stats.weights7.length ? `${round1(median(stats.weights7)).toFixed(1)} kg` : "—"}
              spark30={weightsForSpark.length ? spark(weightsForSpark) : "—"}
              hint="Goal: stable trends, not perfect data."
            />
            <StatCard
              label="Steps"
              avg7={stats.steps7.length ? `${formatNum(Math.round(avg(stats.steps7)))}` : "—"}
              med7={stats.steps7.length ? `${formatNum(Math.round(median(stats.steps7)))}` : "—"}
              spark30={stepsForSpark.length ? spark(stepsForSpark) : "—"}
              hint="Good test signal for AI patterns."
            />
            <StatCard
              label="Water"
              avg7={stats.water7.length ? `${round1(avg(stats.water7)).toFixed(1)} L` : "—"}
              med7={stats.water7.length ? `${round1(median(stats.water7)).toFixed(1)} L` : "—"}
              spark30={waterForSpark.length ? spark(waterForSpark) : "—"}
              hint="Units are liters (testbed)."
            />
            <StatCard
              label="Sleep"
              avg7={stats.sleep7.length ? `${round1(avg(stats.sleep7)).toFixed(1)} h` : "—"}
              med7={stats.sleep7.length ? `${round1(median(stats.sleep7)).toFixed(1)} h` : "—"}
              spark30={sleepForSpark.length ? spark(sleepForSpark) : "—"}
              hint="AI can flag inconsistent sleep."
            />
          </div>
        </section>

        {/* Main split */}
        <div style={split}>
          {/* Entries */}
          <section style={card}>
            <div style={sectionHead}>
              <div style={{ fontWeight: 900 }}>Entries</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Showing up to 100 (filters apply)</div>
            </div>

            {viewEntries.length === 0 ? (
              <div style={{ marginTop: 10, opacity: 0.85 }}>
                No entries match your filters. Go to{" "}
                <Link href="/entry" style={{ color: "white", fontWeight: 900 }}>
                  Add entry
                </Link>
                .
              </div>
            ) : (
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                {viewEntries.slice(0, 100).map((e) => (
                  <div key={e.id} style={row}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                      <div style={{ fontWeight: 950 }}>{e.date}</div>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ fontSize: 12, opacity: 0.75 }}>{e.id}</div>
                        <button onClick={() => onDeleteEntry(e.id)} style={smallDangerBtn} title="Delete entry">
                          Delete
                        </button>
                      </div>
                    </div>

                    <div style={metricLine}>
                      <Metric label="Weight" value={isNum(e.weight) ? `${e.weight} kg` : "—"} />
                      <Metric label="Steps" value={isNum(e.steps) ? formatNum(e.steps) : "—"} />
                      <Metric label="Water" value={isNum(e.water) ? `${e.water} L` : "—"} />
                      <Metric label="Sleep" value={isNum(e.sleep) ? `${e.sleep} h` : "—"} />
                      <Metric label="Notes" value={e.notes ? "Yes" : "—"} title={e.notes || ""} />
                    </div>

                    {e.notes ? <div style={notesBox}>{e.notes}</div> : null}
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
              Performance: intentionally simple (no chart libs). If we add real charts, we will lazy-load them.
            </div>
          </section>

          {/* AI Insights */}
          <aside style={card}>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={sectionHead}>
                <div style={{ fontWeight: 900 }}>AI Insights</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  {aiMode === "auto" ? "API (/api/insights)" : "local summary"}
                </div>
              </div>

              <div style={{ fontSize: 12, opacity: 0.82, lineHeight: 1.55 }}>
                This is the AI test harness. The app stays usable even if AI is slow, offline, or broken.
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={onGenerate} disabled={ai.kind === "loading"} style={primaryBtn}>
                  {ai.kind === "loading" ? "Thinking…" : "Generate insights"}
                </button>

                {ai.kind === "loading" ? (
                  <button onClick={onCancelAI} style={ghostBtn} title="Cancel in-flight request">
                    Cancel
                  </button>
                ) : null}

                <button
                  onClick={() => setAiMode((m) => (m === "auto" ? "local" : "auto"))}
                  style={ghostBtn}
                  title="Toggle between API mode and local summary mode"
                >
                  Mode: {aiMode === "auto" ? "API" : "Local"}
                </button>

                <button onClick={() => setShowRaw((v) => !v)} style={ghostBtn} title="Show raw JSON payload used for AI">
                  {showRaw ? "Hide" : "Show"} payload
                </button>

                <button onClick={onCopyPayload} style={ghostBtn} title="Copy JSON payload to clipboard">
                  Copy payload
                </button>
              </div>

              {latest ? (
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  Latest entry: <b>{latest.date}</b>
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

              {showRaw ? <pre style={payloadBox}>{JSON.stringify({ entries: entries.slice(0, 50) }, null, 2)}</pre> : null}

              <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5 }}>
                Rule: AI must be optional. Core UX must stay “boring-fast”.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ===== tiny UI bits ===== */

function StatPill(props: { label: string; value: string }) {
  return (
    <div style={pill}>
      <div style={{ fontSize: 11, opacity: 0.75 }}>{props.label}</div>
      <div style={{ fontWeight: 950 }}>{props.value}</div>
    </div>
  );
}

function StatCard(props: { label: string; avg7: string; med7: string; spark30: string; hint: string }) {
  return (
    <div style={miniCard}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 950 }}>{props.label}</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>7d avg / med</div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
        <div style={statChip}>
          <div style={chipLabel}>Avg</div>
          <div style={chipValue}>{props.avg7}</div>
        </div>
        <div style={statChip}>
          <div style={chipLabel}>Med</div>
          <div style={chipValue}>{props.med7}</div>
        </div>
      </div>

      <div style={{ marginTop: 10, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
        <div style={{ fontSize: 11, opacity: 0.7 }}>30d spark</div>
        <div style={{ fontSize: 16, letterSpacing: 0.5 }}>{props.spark30}</div>
      </div>

      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.78, lineHeight: 1.5 }}>{props.hint}</div>
    </div>
  );
}

function Metric(props: { label: string; value: string; title?: string }) {
  return (
    <div style={metricPill} title={props.title}>
      <div style={{ fontSize: 11, opacity: 0.7 }}>{props.label}</div>
      <div style={{ fontWeight: 900 }}>{props.value}</div>
    </div>
  );
}

/* ===== styles ===== */

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.18), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.14), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

const shell: React.CSSProperties = {
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gap: 16,
};

const topBar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const navLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.9)",
  textDecoration: "none",
  fontWeight: 950,
};

const title: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 4vw, 42px)",
  letterSpacing: -0.6,
};

const split: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
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

const statsGrid: React.CSSProperties = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
};

const row: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 8,
};

const metricLine: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: 8,
};

const metricPill: React.CSSProperties = {
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
};

const notesBox: React.CSSProperties = {
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
  opacity: 0.95,
  lineHeight: 1.5,
  fontSize: 13,
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

const miniCard: React.CSSProperties = {
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
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

const insightBox: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.25)",
  color: "rgba(255,255,255,0.92)",
  minHeight: 180,
  whiteSpace: "pre-wrap",
  fontSize: 13,
  lineHeight: 1.5,
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
// operator-append: test operator diff route
