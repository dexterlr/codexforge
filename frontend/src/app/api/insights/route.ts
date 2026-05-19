import { NextResponse } from "next/server";

type ActivityCategory =
  | "note"
  | "plan"
  | "task"
  | "research"
  | "decision"
  | "execution"
  | "memory";

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
};

type CapabilityMode = "analyze";

type CategoryCounts = Record<ActivityCategory, number>;

type ActivitySignals = {
  planCount: number;
  taskCount: number;
  researchCount: number;
  decisionCount: number;
  executionCount: number;
  memoryCount: number;
  noteCount: number;
  taggedEntryCount: number;
  activeCount: number;
  doneCount: number;
  blockedCount: number;
};

type InsightSignals = {
  activity: ActivitySignals;
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

function formatCategoryLabel(category: ActivityCategory) {
  if (category === "plan") return "Plan";
  if (category === "task") return "Task";
  if (category === "research") return "Research";
  if (category === "decision") return "Decision";
  if (category === "execution") return "Execution";
  if (category === "memory") return "Memory";
  return "Note";
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

function makeStableId(
  idx: number,
  entry: Omit<CodexForgeActivityEntry, "id">
) {
  return `insight-entry:${stableHash([
    idx,
    entry.date,
    entry.title,
    entry.category,
    entry.status,
    entry.tags,
    entry.summary,
    entry.notes,
  ])}`;
}

function safeTrim(s: string, max: number) {
  return s.length <= max ? s : `${s.slice(0, max - 1)}...`;
}

function normalizeCategory(raw: unknown): ActivityCategory {
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

  const title = parseOptionalString(raw.title) ?? "Workspace entry";
  const summary = parseOptionalString(raw.summary);
  const category = normalizeCategory(raw.category);
  const status = normalizeStatus(raw.status);
  const tags = parseOptionalStringArray(raw.tags);
  const notes = parseOptionalString(raw.notes);
  const id =
    typeof raw.id === "string" && raw.id.trim()
      ? raw.id.trim()
      : makeStableId(idx, {
          date,
          title,
          summary,
          category,
          status,
          tags,
          notes,
        });

  return {
    id,
    date,
    title,
    summary,
    category,
    status,
    tags,
    notes,
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
    taggedEntryCount: entriesNewestFirst.filter((entry) => (entry.tags?.length ?? 0) > 0).length,
    activeCount: entriesNewestFirst.filter((entry) => entry.status === "active").length,
    doneCount: entriesNewestFirst.filter((entry) => entry.status === "done").length,
    blockedCount: entriesNewestFirst.filter((entry) => entry.status === "blocked").length,
  };
}

function emptyActivitySignals(): ActivitySignals {
  return {
    planCount: 0,
    taskCount: 0,
    researchCount: 0,
    decisionCount: 0,
    executionCount: 0,
    memoryCount: 0,
    noteCount: 0,
    taggedEntryCount: 0,
    activeCount: 0,
    doneCount: 0,
    blockedCount: 0,
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
        "- Use /entry to launch a real CodexForge task into the AI workspace.",
        "- Keep this route deterministic, instant, and useful without a model call.",
        "- Preserve this path as a local fallback even after richer AI analysis exists.",
        "",
        "Mode: LOCAL (no model call, offline-safe fallback)",
      ].join("\n"),
      analyzedCount: 0,
      warnings,
      latestEntryDate: undefined,
      oldestAnalyzedDate: undefined,
      signals: {
        activity: emptyActivitySignals(),
      },
    };
  }

  const sorted = entries.slice().sort(compareByDateDesc);
  const latestEntryDate = sorted[0]?.date;
  const oldestAnalyzedDate = sorted[sorted.length - 1]?.date;
  const activitySignals = buildActivitySignals(sorted);

  if (activitySignals.executionCount === 0) {
    warnings.push("No execution events recorded yet.");
  }
  if (activitySignals.planCount === 0) {
    warnings.push("No plan entries recorded yet.");
  }
  if (activitySignals.memoryCount === 0) {
    warnings.push("No memory entries recorded yet.");
  }

  const latest = sorted[0];
  const lines: string[] = [];
  lines.push("CodexForge Local Activity Analysis");
  lines.push("=================================");
  lines.push("Scope: Workspace activity timeline");
  lines.push("Purpose: Review local activity, operator state, and workspace continuity.");
  lines.push("");

  lines.push("Dataset");
  lines.push("-------");
  lines.push(`Entries received: ${sorted.length}`);
  lines.push(`Entries analyzed: ${sorted.length}`);
  lines.push(`Latest entry: ${latestEntryDate ?? "-"}`);
  lines.push(`Oldest analyzed entry: ${oldestAnalyzedDate ?? "-"}`);
  lines.push("");

  lines.push("Workspace activity");
  lines.push("------------------");
  lines.push(`- Plans: ${activitySignals.planCount}`);
  lines.push(`- Tasks: ${activitySignals.taskCount}`);
  lines.push(`- Research items: ${activitySignals.researchCount}`);
  lines.push(`- Decisions: ${activitySignals.decisionCount}`);
  lines.push(`- Execution events: ${activitySignals.executionCount}`);
  lines.push(`- Memory items: ${activitySignals.memoryCount}`);
  lines.push(`- Notes: ${activitySignals.noteCount}`);
  lines.push(`- Tagged entries: ${activitySignals.taggedEntryCount}`);
  lines.push(`- Active items: ${activitySignals.activeCount}`);
  lines.push(`- Done items: ${activitySignals.doneCount}`);
  lines.push(`- Blocked items: ${activitySignals.blockedCount}`);
  lines.push("");

  lines.push("Latest entry");
  lines.push("------------");
  lines.push(`Title: ${latest.title}`);
  lines.push(`Category: ${formatCategoryLabel(latest.category)}`);
  lines.push(`Date: ${latest.date}`);
  if (latest.status) lines.push(`Status: ${latest.status}`);
  if (latest.summary) lines.push(`Summary: ${latest.summary}`);
  if (latest.tags?.length) lines.push(`Tags: ${latest.tags.join(", ")}`);
  lines.push("");

  lines.push("Continuity");
  lines.push("----------");
  lines.push("- History is operating in CodexForge activity mode.");
  lines.push("- Activity entries remain local, deterministic, and exportable.");
  lines.push("");

  lines.push("Suggested next actions");
  lines.push("----------------------");
  lines.push("- Keep using /entry as a CodexForge launchpad so history fills with real workspace activity.");
  lines.push("- Add more execution and memory events so /history becomes a true operational timeline.");
  lines.push("- Convert durable outcomes into decisions or memory items.");
  lines.push("- Keep this route fast and deterministic as the offline-safe local fallback.");
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
