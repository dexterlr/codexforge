import { NextResponse } from "next/server";

type ActivityCategory =
  | "note"
  | "plan"
  | "task"
  | "research"
  | "decision"
  | "execution"
  | "memory"
  | "legacy-health";

type ActivityStatus = "idea" | "active" | "done" | "blocked";

type CodexForgeActivityEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  summary?: string;
  category: ActivityCategory;
  status?: ActivityStatus;
  tags?: string[];
  notes?: string;

  // legacy compatibility
  weight?: number;
  steps?: number;
  water?: number;
  sleep?: number;
};

type CapabilityMode = "analyze";

type CategoryCounts = Record<ActivityCategory, number>;

type LegacySignals = {
  avgWeight?: number;
  avgSteps?: number;
  avgWater?: number;
  avgSleep?: number;
  medianWeight?: number;
  medianSteps?: number;
  medianWater?: number;
  medianSleep?: number;
  minWeight?: number;
  maxWeight?: number;
  minSteps?: number;
  maxSteps?: number;
  minWater?: number;
  maxWater?: number;
  minSleep?: number;
  maxSleep?: number;
  weightDelta?: number;
  stepsDelta?: number;
  waterDelta?: number;
  sleepDelta?: number;
  legacyEntryCount: number;
  noteCount: number;
  completeEntryCount: number;
  partialEntryCount: number;
};

type ActivitySignals = {
  planCount: number;
  taskCount: number;
  researchCount: number;
  decisionCount: number;
  executionCount: number;
  memoryCount: number;
  noteCount: number;
  legacyHealthCount: number;
  taggedEntryCount: number;
  activeCount: number;
  doneCount: number;
  blockedCount: number;
};

type InsightSignals = {
  activity: ActivitySignals;
  legacy: LegacySignals;
};

type InsightMeta = {
  entryCount: number;
  analyzedCount: number;
  latestEntryDate?: string;
  oldestAnalyzedDate?: string;
  mode: "local";
  capability: CapabilityMode;
  warnings: string[];
  signals: InsightSignals;
};

type InsightResponse =
  | {
      ok: true;
      insight: string;
      model: "codexforge-local-v1";
      capability: CapabilityMode;
      meta: InsightMeta;
    }
  | {
      ok: false;
      insight: string;
      model: "codexforge-local-v1";
      error: string;
    };

type SummaryResult = {
  insight: string;
  analyzedCount: number;
  warnings: string[];
  latestEntryDate?: string;
  oldestAnalyzedDate?: string;
  signals: InsightSignals;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function parseOptionalNumber(v: unknown): number | undefined {
  return isFiniteNumber(v) ? v : undefined;
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

function isIsoDateYYYYMMDD(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseDateToMs(dateYYYYMMDD: string) {
  const [y, m, d] = dateYYYYMMDD.split("-").map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return 0;
  return new Date(y, m - 1, d).getTime();
}

function compareByDateDesc(a: CodexForgeActivityEntry, b: CodexForgeActivityEntry) {
  return (b.date ? parseDateToMs(b.date) : 0) - (a.date ? parseDateToMs(a.date) : 0);
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

function formatNumber(n: number) {
  return n.toLocaleString();
}

function safeTrim(s: string, max: number) {
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function makeStableId(idx: number) {
  return `generated-${Date.now()}-${idx}-${Math.random().toString(16).slice(2)}`;
}

function nums(values: Array<number | undefined>) {
  return values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
}

function hasAnyLegacyMetric(entry: CodexForgeActivityEntry) {
  return (
    isFiniteNumber(entry.weight) ||
    isFiniteNumber(entry.steps) ||
    isFiniteNumber(entry.water) ||
    isFiniteNumber(entry.sleep)
  );
}

function hasAllCoreLegacyMetrics(entry: CodexForgeActivityEntry) {
  return (
    isFiniteNumber(entry.weight) &&
    isFiniteNumber(entry.steps) &&
    isFiniteNumber(entry.water) &&
    isFiniteNumber(entry.sleep)
  );
}

function normalizeCategory(raw: unknown, hasLegacyMetrics: boolean): ActivityCategory {
  if (
    raw === "note" ||
    raw === "plan" ||
    raw === "task" ||
    raw === "research" ||
    raw === "decision" ||
    raw === "execution" ||
    raw === "memory" ||
    raw === "legacy-health"
  ) {
    return raw;
  }

  return hasLegacyMetrics ? "legacy-health" : "note";
}

function normalizeStatus(raw: unknown): ActivityStatus | undefined {
  if (raw === "idea" || raw === "active" || raw === "done" || raw === "blocked") {
    return raw;
  }

  return undefined;
}

function normalizeEntry(raw: unknown, idx: number): CodexForgeActivityEntry {
  if (!isRecord(raw)) {
    throw new Error(`Entry #${idx + 1} must be an object.`);
  }

  const date = typeof raw.date === "string" ? raw.date.trim() : "";
  if (!date || !isIsoDateYYYYMMDD(date)) {
    throw new Error(`Entry #${idx + 1} is missing a valid date (YYYY-MM-DD).`);
  }

  const id =
    typeof raw.id === "string" && raw.id.trim()
      ? raw.id.trim()
      : makeStableId(idx);

  const weight = parseOptionalNumber(raw.weight);
  const steps = parseOptionalNumber(raw.steps);
  const water = parseOptionalNumber(raw.water);
  const sleep = parseOptionalNumber(raw.sleep);

  const hasLegacyMetrics =
    weight !== undefined ||
    steps !== undefined ||
    water !== undefined ||
    sleep !== undefined;

  const title =
    parseOptionalString(raw.title) ??
    (hasLegacyMetrics ? "Legacy health entry" : "Workspace entry");

  return {
    id,
    date,
    title,
    summary: parseOptionalString(raw.summary),
    category: normalizeCategory(raw.category, hasLegacyMetrics),
    status: normalizeStatus(raw.status),
    tags: parseOptionalStringArray(raw.tags),
    notes: parseOptionalString(raw.notes),
    weight,
    steps,
    water,
    sleep,
  };
}

function buildCategoryCounts(entries: CodexForgeActivityEntry[]): CategoryCounts {
  return entries.reduce<CategoryCounts>(
    (acc, entry) => {
      acc[entry.category] += 1;
      return acc;
    },
    {
      note: 0,
      plan: 0,
      task: 0,
      research: 0,
      decision: 0,
      execution: 0,
      memory: 0,
      "legacy-health": 0,
    }
  );
}

function buildActivitySignals(entriesNewestFirst: CodexForgeActivityEntry[]): ActivitySignals {
  const counts = buildCategoryCounts(entriesNewestFirst);

  return {
    planCount: counts.plan,
    taskCount: counts.task,
    researchCount: counts.research,
    decisionCount: counts.decision,
    executionCount: counts.execution,
    memoryCount: counts.memory,
    noteCount: counts.note,
    legacyHealthCount: counts["legacy-health"],
    taggedEntryCount: entriesNewestFirst.filter((entry) => (entry.tags?.length ?? 0) > 0).length,
    activeCount: entriesNewestFirst.filter((entry) => entry.status === "active").length,
    doneCount: entriesNewestFirst.filter((entry) => entry.status === "done").length,
    blockedCount: entriesNewestFirst.filter((entry) => entry.status === "blocked").length,
  };
}

function buildLegacySignals(entriesNewestFirst: CodexForgeActivityEntry[]): LegacySignals {
  const legacyEntries = entriesNewestFirst.filter(
    (entry) => entry.category === "legacy-health" || hasAnyLegacyMetric(entry)
  );

  const last7 = legacyEntries.slice(0, 7);

  const weights = nums(last7.map((e) => e.weight));
  const steps = nums(last7.map((e) => e.steps));
  const water = nums(last7.map((e) => e.water));
  const sleep = nums(last7.map((e) => e.sleep));

  let weightDelta: number | undefined;
  if (weights.length >= 2) {
    weightDelta = round1(weights[0] - weights[weights.length - 1]);
  }

  let stepsDelta: number | undefined;
  if (steps.length >= 2) {
    stepsDelta = Math.round(steps[0] - steps[steps.length - 1]);
  }

  let waterDelta: number | undefined;
  if (water.length >= 2) {
    waterDelta = round1(water[0] - water[water.length - 1]);
  }

  let sleepDelta: number | undefined;
  if (sleep.length >= 2) {
    sleepDelta = round1(sleep[0] - sleep[sleep.length - 1]);
  }

  return {
    avgWeight: weights.length ? round1(avg(weights)) : undefined,
    avgSteps: steps.length ? Math.round(avg(steps)) : undefined,
    avgWater: water.length ? round1(avg(water)) : undefined,
    avgSleep: sleep.length ? round1(avg(sleep)) : undefined,

    medianWeight: weights.length ? round1(median(weights)) : undefined,
    medianSteps: steps.length ? Math.round(median(steps)) : undefined,
    medianWater: water.length ? round1(median(water)) : undefined,
    medianSleep: sleep.length ? round1(median(sleep)) : undefined,

    minWeight: weights.length ? Math.min(...weights) : undefined,
    maxWeight: weights.length ? Math.max(...weights) : undefined,
    minSteps: steps.length ? Math.min(...steps) : undefined,
    maxSteps: steps.length ? Math.max(...steps) : undefined,
    minWater: water.length ? Math.min(...water) : undefined,
    maxWater: water.length ? Math.max(...water) : undefined,
    minSleep: sleep.length ? Math.min(...sleep) : undefined,
    maxSleep: sleep.length ? Math.max(...sleep) : undefined,

    weightDelta,
    stepsDelta,
    waterDelta,
    sleepDelta,

    legacyEntryCount: legacyEntries.length,
    noteCount: last7.filter((e) => !!e.notes).length,
    completeEntryCount: last7.filter(hasAllCoreLegacyMetrics).length,
    partialEntryCount: last7.filter(
      (e) => hasAnyLegacyMetric(e) && !hasAllCoreLegacyMetrics(e)
    ).length,
  };
}

function summarize(entries: CodexForgeActivityEntry[]): SummaryResult {
  const warnings: string[] = [];

  if (!entries.length) {
    return {
      insight: [
        "CodexForge Local Activity Analysis",
        "=================================",
        "",
        "Status",
        "------",
        "No activity entries yet.",
        "",
        "Suggested next actions",
        "----------------------",
        "• Use /entry to launch a real CodexForge task into the AI workspace.",
        "• Keep this route deterministic, instant, and useful without a model call.",
        "• Preserve this path as a local fallback even after richer AI analysis exists.",
        "",
        "Mode: LOCAL (no model call, offline-safe fallback)",
      ].join("\n"),
      analyzedCount: 0,
      warnings,
      latestEntryDate: undefined,
      oldestAnalyzedDate: undefined,
      signals: {
        activity: {
          planCount: 0,
          taskCount: 0,
          researchCount: 0,
          decisionCount: 0,
          executionCount: 0,
          memoryCount: 0,
          noteCount: 0,
          legacyHealthCount: 0,
          taggedEntryCount: 0,
          activeCount: 0,
          doneCount: 0,
          blockedCount: 0,
        },
        legacy: {
          legacyEntryCount: 0,
          noteCount: 0,
          completeEntryCount: 0,
          partialEntryCount: 0,
        },
      },
    };
  }

  const sorted = entries.slice().sort(compareByDateDesc);
  const latestEntryDate = sorted[0]?.date;
  const oldestAnalyzedDate = sorted[sorted.length - 1]?.date;

  const activitySignals = buildActivitySignals(sorted);
  const legacySignals = buildLegacySignals(sorted);

  if (activitySignals.legacyHealthCount > 0) {
    warnings.push("Legacy health data is still present in workspace history.");
  }
  if (legacySignals.completeEntryCount === 0 && activitySignals.legacyHealthCount > 0) {
    warnings.push("Legacy metric entries are present but few are complete.");
  }
  if (activitySignals.executionCount === 0) {
    warnings.push("No execution events recorded yet.");
  }
  if (activitySignals.planCount === 0) {
    warnings.push("No plan entries recorded yet.");
  }
  if (activitySignals.memoryCount === 0) {
    warnings.push("No memory entries recorded yet.");
  }

  const lines: string[] = [];
  lines.push("CodexForge Local Activity Analysis");
  lines.push("=================================");
  lines.push("Scope: Workspace activity history");
  lines.push("Purpose: Review local activity, migration progress, and legacy compatibility data.");
  lines.push("");

  lines.push("Dataset");
  lines.push("-------");
  lines.push(`Entries received: ${sorted.length}`);
  lines.push(`Entries analyzed: ${sorted.length}`);
  lines.push(`Latest entry: ${latestEntryDate ?? "—"}`);
  lines.push(`Oldest analyzed entry: ${oldestAnalyzedDate ?? "—"}`);
  lines.push("");

  lines.push("Workspace activity");
  lines.push("------------------");
  lines.push(`• Plans: ${activitySignals.planCount}`);
  lines.push(`• Tasks: ${activitySignals.taskCount}`);
  lines.push(`• Research items: ${activitySignals.researchCount}`);
  lines.push(`• Decisions: ${activitySignals.decisionCount}`);
  lines.push(`• Execution events: ${activitySignals.executionCount}`);
  lines.push(`• Memory items: ${activitySignals.memoryCount}`);
  lines.push(`• Notes: ${activitySignals.noteCount}`);
  lines.push(`• Tagged entries: ${activitySignals.taggedEntryCount}`);
  lines.push(`• Active items: ${activitySignals.activeCount}`);
  lines.push(`• Done items: ${activitySignals.doneCount}`);
  lines.push(`• Blocked items: ${activitySignals.blockedCount}`);
  lines.push("");

  const latest = sorted[0];
  lines.push("Latest entry");
  lines.push("------------");
  lines.push(`Title: ${latest.title}`);
  lines.push(`Category: ${latest.category}`);
  lines.push(`Date: ${latest.date}`);
  if (latest.status) lines.push(`Status: ${latest.status}`);
  if (latest.summary) lines.push(`Summary: ${latest.summary}`);
  if (latest.tags?.length) lines.push(`Tags: ${latest.tags.join(", ")}`);
  lines.push("");

  lines.push("Migration readout");
  lines.push("-----------------");
  if (activitySignals.legacyHealthCount > 0) {
    lines.push(`• Legacy health entries still present: ${activitySignals.legacyHealthCount}.`);
    lines.push("• History is successfully handling migration-era data alongside CodexForge-native activity.");
  } else {
    lines.push("• No legacy health data detected.");
    lines.push("• History is operating in CodexForge-first mode.");
  }
  lines.push("");

  lines.push("Legacy metric snapshot");
  lines.push("----------------------");
  if (legacySignals.legacyEntryCount === 0) {
    lines.push("• No legacy metric entries found.");
  } else {
    if (typeof legacySignals.avgWeight === "number") {
      lines.push(`• Avg weight: ${legacySignals.avgWeight.toFixed(1)} kg`);
    }
    if (typeof legacySignals.avgSteps === "number") {
      lines.push(`• Avg steps: ${formatNumber(legacySignals.avgSteps)}`);
    }
    if (typeof legacySignals.avgWater === "number") {
      lines.push(`• Avg water: ${legacySignals.avgWater.toFixed(1)} L`);
    }
    if (typeof legacySignals.avgSleep === "number") {
      lines.push(`• Avg sleep: ${legacySignals.avgSleep.toFixed(1)} hrs`);
    }

    if (typeof legacySignals.weightDelta === "number") {
      if (Math.abs(legacySignals.weightDelta) < 0.3) {
        lines.push("• Weight is broadly stable across recent legacy entries.");
      } else if (legacySignals.weightDelta > 0) {
        lines.push(`• Weight is trending upward by about ${legacySignals.weightDelta.toFixed(1)} kg.`);
      } else {
        lines.push(`• Weight is trending downward by about ${Math.abs(legacySignals.weightDelta).toFixed(1)} kg.`);
      }
    }

    if (typeof legacySignals.stepsDelta === "number") {
      if (Math.abs(legacySignals.stepsDelta) < 500) {
        lines.push("• Activity level is broadly steady.");
      } else if (legacySignals.stepsDelta > 0) {
        lines.push("• Steps are trending upward.");
      } else {
        lines.push("• Steps are trending downward.");
      }
    }
  }
  lines.push("");

  lines.push("Suggested next actions");
  lines.push("----------------------");
  lines.push("• Keep using /entry as a CodexForge launchpad so history fills with real workspace activity.");
  lines.push("• Add more execution and memory events so /history becomes a true operational timeline.");
  lines.push("• Preserve legacy health data only as migration-safe historical content.");
  lines.push("• Keep this route fast and deterministic as the offline-safe local fallback.");
  lines.push("");
  lines.push("Mode: LOCAL (no model call, offline-safe fallback)");

  return {
    insight: lines.join("\n"),
    analyzedCount: sorted.length,
    warnings,
    latestEntryDate,
    oldestAnalyzedDate,
    signals: {
      activity: activitySignals,
      legacy: legacySignals,
    },
  };
}

function badRequest(message: string, status = 400) {
  return NextResponse.json<InsightResponse>(
    {
      ok: false,
      insight: "",
      model: "codexforge-local-v1",
      error: message,
    },
    { status }
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as unknown;

    if (!isRecord(body)) {
      return badRequest("Bad request: expected JSON object like { entries: [...] }.");
    }

    const mode: CapabilityMode =
      typeof body.mode === "string" && body.mode === "analyze" ? "analyze" : "analyze";

    const rawEntries = body.entries;
    if (!Array.isArray(rawEntries)) {
      return badRequest("Bad request: 'entries' must be an array.");
    }

    const entries = rawEntries.map((entry, idx) => normalizeEntry(entry, idx));
    const result = summarize(entries);

    return NextResponse.json<InsightResponse>({
      ok: true,
      insight: result.insight,
      model: "codexforge-local-v1",
      capability: mode,
      meta: {
        entryCount: entries.length,
        analyzedCount: result.analyzedCount,
        latestEntryDate: result.latestEntryDate,
        oldestAnalyzedDate: result.oldestAnalyzedDate,
        mode: "local",
        capability: mode,
        warnings: result.warnings.map((w) => safeTrim(w, 160)),
        signals: result.signals,
      },
    });
  } catch (e: unknown) {
    const message =
      e instanceof Error && e.message.trim()
        ? e.message
        : "Bad request: expected JSON object like { entries: [...] }.";

    return badRequest(message, 400);
  }
}