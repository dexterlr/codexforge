import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

/**
 * /api/operator/diff
 *
 * Deterministic, offline-safe diff generator.
 *
 * Goals:
 * - Never write to disk
 * - Only operate on strict allowlisted files
 * - Accept explicit targets or v3Plan.files
 * - Always return predictable full-replace unified diffs
 * - Support append:/prepend: demo commands
 * - Provide a safe fallback for normal natural-language goals
 */

type PlanStepObject = {
  id: string;
  title: string;
  detail: string;
};

type PlanStep = string | PlanStepObject;

type Plan = {
  steps: PlanStep[];
};

type V3PlannedFile = {
  path: string;
  reason?: string;
};

type V3Plan = {
  files?: V3PlannedFile[];
};

type Diff = {
  filePath: string;
  patch: string;
};

type ReqBody = {
  repoPath?: unknown;
  goal?: unknown;
  plan?: unknown;
  v3Plan?: unknown;
  targetFile?: unknown;
  targetFiles?: unknown;
  maxFileBytes?: unknown;
  debug?: unknown;
};

type JsonPayload = Record<string, unknown>;

type GoalEditMode = "append" | "prepend" | "replace" | "unsupported";

type GoalEditResult = {
  mode: GoalEditMode;
  updated: string;
  reason: string;
};

type ResolveTargetsResult = {
  targets: string[];
  source: "targetFiles" | "targetFile" | "v3Plan.files" | "default";
};

const DEFAULT_TARGET_FILE = "src/app/history/page.tsx";
const DEFAULT_MAX_FILE_BYTES = 500_000;
const ABSOLUTE_MAX_FILE_BYTES = 2_000_000;

const ALLOWED_TARGETS = new Set<string>([
  "package.json",

  "src/app/history/page.tsx",
  "src/app/clawd/page.tsx",
  "src/app/entry/page.tsx",

  "src/app/api/operator/plan/route.ts",
  "src/app/api/operator/diff/route.ts",
  "src/app/api/operator/apply/route.ts",
  "src/app/api/operator/snapshot/route.ts",
  "src/app/api/operator/test/route.ts",

  "src/app/api/operator/run/list/route.ts",
  "src/app/api/operator/run/get/route.ts",
  "src/app/api/operator/run/start/route.ts",
  "src/app/api/operator/run/update/route.ts",

  "src/app/api/operator/checkpoint/list/route.ts",
  "src/app/api/operator/checkpoint/restore/route.ts",

  "src/lib/operator/v3/plan.ts",
  "src/lib/operator/v3/generatePlan.ts",
]);

const STAMP_RE = /^\/\/ Operator demo change \(.*?\)$/;
const PREPEND_RE =
  /^\/\/\s*(prepended via operator demo|prepended by operator|operator-prepend:.*)$/i;
const APPEND_RE =
  /^\/\/\s*(appended via operator demo|appended by operator|operator-append:.*|operator-auto:.*)$/i;

function toPosix(p: string) {
  return p.replaceAll("\\", "/").trim();
}

function safeTrim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isPlanStepObject(value: unknown): value is PlanStepObject {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.detail === "string"
  );
}

function isPlanStep(value: unknown): value is PlanStep {
  return (typeof value === "string" && value.trim().length > 0) || isPlanStepObject(value);
}

function isPlan(value: unknown): value is Plan {
  return (
    isRecord(value) &&
    Array.isArray(value.steps) &&
    value.steps.length > 0 &&
    value.steps.every(isPlanStep)
  );
}

function isV3PlannedFile(value: unknown): value is V3PlannedFile {
  return isRecord(value) && typeof value.path === "string" && value.path.trim().length > 0;
}

function isV3Plan(value: unknown): value is V3Plan {
  if (!isRecord(value)) return false;
  if (value.files === undefined) return true;
  return Array.isArray(value.files) && value.files.every(isV3PlannedFile);
}

function asBoolean(value: unknown) {
  return value === true;
}

function safeErrorMessage(error: unknown, fallback = "Unknown error") {
  if (error instanceof Error && error.message.trim()) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  if (isRecord(error) && typeof error.message === "string" && error.message.trim()) {
    return error.message;
  }
  return fallback;
}

function json(status: number, payload: JsonPayload, extraHeaders?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: { ...(extraHeaders ?? {}) },
  });
}

function json400(error: string, extra?: JsonPayload) {
  return json(400, { ok: false, error, ...(extra ?? {}) });
}

function json405(error: string) {
  return json(405, { ok: false, error });
}

function allowedTargetsArray() {
  return Array.from(ALLOWED_TARGETS).sort();
}

function allowedTargetsList() {
  return allowedTargetsArray().join(", ");
}

function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function clampMaxBytes(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_MAX_FILE_BYTES;
  return Math.min(Math.max(1_000, Math.floor(n)), ABSOLUTE_MAX_FILE_BYTES);
}

function uniqStrings(values: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];

  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }

  return out;
}

function normalizeTargetsFromExplicitBody(body: ReqBody) {
  const explicitTargetFiles = Array.isArray(body.targetFiles)
    ? body.targetFiles.map((x) => safeTrim(x)).filter(Boolean)
    : [];

  const explicitTargetFile = safeTrim(body.targetFile);

  if (explicitTargetFiles.length > 0) {
    return uniqStrings(explicitTargetFiles.map(toPosix));
  }

  if (explicitTargetFile) {
    return uniqStrings([toPosix(explicitTargetFile)]);
  }

  return [];
}

function normalizeTargetsFromV3Plan(v3Plan: unknown) {
  if (!isV3Plan(v3Plan) || !Array.isArray(v3Plan.files) || v3Plan.files.length === 0) {
    return [];
  }

  const v3Targets = v3Plan.files
    .map((file) => safeTrim(file.path))
    .filter(Boolean)
    .map(toPosix);

  return uniqStrings(v3Targets);
}

function resolveTargets(body: ReqBody): ResolveTargetsResult {
  const explicit = normalizeTargetsFromExplicitBody(body);
  if (explicit.length > 0) {
    return {
      targets: explicit,
      source:
        Array.isArray(body.targetFiles) && body.targetFiles.length > 0
          ? "targetFiles"
          : "targetFile",
    };
  }

  const fromV3 = normalizeTargetsFromV3Plan(body.v3Plan);
  if (fromV3.length > 0) {
    return {
      targets: fromV3,
      source: "v3Plan.files",
    };
  }

  return {
    targets: [DEFAULT_TARGET_FILE],
    source: "default",
  };
}

function validateTargets(targets: readonly string[]) {
  const disallowed = targets.filter((t) => !ALLOWED_TARGETS.has(t));

  if (disallowed.length > 0) {
    return {
      ok: false as const,
      error: "One or more target files are not allowed.",
      disallowed,
      allowed: allowedTargetsArray(),
    };
  }

  return { ok: true as const };
}

/**
 * Predictable full-replace unified diff.
 * The apply route reconstructs final content from '+' lines.
 */
function makeUnifiedDiff(filePath: string, oldText: string, newText: string) {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");

  const header = [
    `--- ${filePath}`,
    `+++ ${filePath}`,
    `@@ -1,${oldLines.length} +1,${newLines.length} @@`,
  ];

  const body: string[] = [];

  for (const line of oldLines) body.push(`-${line}`);
  for (const line of newLines) body.push(`+${line}`);

  return [...header, ...body].join("\n");
}

function normalizeOperatorFileForDemoCommands(original: string, stampIso: string) {
  const stampLine = `// Operator demo change (${stampIso})`;
  const lines = original.split(/\r?\n/);

  while (lines.length > 0 && STAMP_RE.test(lines[0])) {
    lines.shift();
  }

  if (lines.length > 0 && PREPEND_RE.test(lines[0])) {
    lines.shift();
  }

  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  if (lines.length > 0 && APPEND_RE.test(lines[lines.length - 1])) {
    lines.pop();
  }

  const rest = lines.join("\n");
  return rest ? `${stampLine}\n${rest}\n` : `${stampLine}\n`;
}

function extractGoalPayload(goal: string, prefix: "append:" | "prepend:") {
  const lower = goal.toLowerCase();
  const idx = lower.indexOf(prefix);
  if (idx === -1) return "";
  return goal.slice(idx + prefix.length).trim();
}

function tryInsertHistoryExportButton(normalized: string) {
  const marker = "operator-export-button";
  if (normalized.includes(marker)) {
    return { changed: false, updated: normalized, reason: "history export button already present" };
  }

  const needle = "<div style={{ flex: 1 }} />";
  if (!normalized.includes(needle)) {
    return { changed: false, updated: normalized, reason: "history toolbar anchor not found" };
  }

  const updated = normalized.replace(
    needle,
    [
      `            <button`,
      `              style={ghostBtn}`,
      `              onClick={() => {`,
      `                try {`,
      `                  const data = JSON.stringify({ exportedAt: new Date().toISOString(), entries }, null, 2);`,
      `                  const blob = new Blob([data], { type: "application/json" });`,
      `                  const url = URL.createObjectURL(blob);`,
      `                  const a = document.createElement("a");`,
      `                  a.href = url;`,
      `                  a.download = "history-export.json";`,
      `                  a.click();`,
      `                  URL.revokeObjectURL(url);`,
      `                } catch (error) {`,
      `                  console.error("history export failed", error);`,
      `                }`,
      `              }}`,
      `              title="operator-export-button"`,
      `            >`,
      `              Export JSON`,
      `            </button>`,
      `            <div style={{ flex: 1 }} />`,
    ].join("\n"),
  );

  return {
    changed: updated !== normalized,
    updated,
    reason: updated !== normalized ? "inserted history export button" : "history export insertion made no change",
  };
}

function applyGoalDrivenEdit(original: string, goal: string, stampIso: string): GoalEditResult {
  const normalized = normalizeOperatorFileForDemoCommands(original, stampIso);
  const lower = goal.toLowerCase();

  if (lower.includes("prepend:")) {
    const msg = extractGoalPayload(goal, "prepend:");
    const line = msg ? `// operator-prepend: ${msg}\n` : `// operator-prepend: (empty)\n`;

    const match = normalized.match(/^\/\/ Operator demo change \(.*?\)\r?\n/);
    if (match) {
      const head = match[0];
      const rest = normalized.slice(head.length);
      return {
        mode: "prepend",
        updated: head + line + rest,
        reason: "explicit prepend command",
      };
    }

    return {
      mode: "prepend",
      updated: line + normalized,
      reason: "explicit prepend command",
    };
  }

  if (lower.includes("append:")) {
    const msg = extractGoalPayload(goal, "append:");
    const line = msg ? `// operator-append: ${msg}` : `// operator-append: (empty)`;
    return {
      mode: "append",
      updated: normalized + line + "\n",
      reason: "explicit append command",
    };
  }

  if (lower.includes("history") && lower.includes("export")) {
    const historyPatch = tryInsertHistoryExportButton(normalized);
    if (historyPatch.changed) {
      return {
        mode: "replace",
        updated: historyPatch.updated,
        reason: historyPatch.reason,
      };
    }
  }

  return {
    mode: "append",
    updated: normalized + `// operator-auto: ${goal || "(empty goal)"}\n`,
    reason: "safe fallback auto-append",
  };
}

function goalMode(goal: string): GoalEditMode {
  const g = goal.toLowerCase();
  if (g.includes("append:")) return "append";
  if (g.includes("prepend:")) return "prepend";
  if (g.includes("history") && g.includes("export")) return "replace";
  return "unsupported";
}

function countPlanSteps(plan: Plan) {
  return plan.steps.length;
}

export async function OPTIONS() {
  return json(
    200,
    { ok: true },
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  );
}

export async function GET() {
  return json405(
    `Use POST with JSON body: { repoPath, goal, plan, v3Plan?, targetFile? | targetFiles? }. Allowed targets: ${allowedTargetsList()}`,
  );
}

export async function POST(req: Request) {
  try {
    const body = ((await req.json().catch(() => null)) ?? null) as ReqBody | null;

    const repoPath = safeTrim(body?.repoPath);
    const goal = safeTrim(body?.goal);
    const plan = body?.plan;

    if (!repoPath) return json400("repoPath is required");
    if (!goal) return json400("goal is required");
    if (!isPlan(plan)) return json400("plan is required and must include steps[]");

    if (body?.v3Plan !== undefined && !isV3Plan(body.v3Plan)) {
      return json400("v3Plan is malformed");
    }

    const resolvedTargets = resolveTargets(body ?? {});
    const targetPosixList = [...resolvedTargets.targets];

    if (targetPosixList.length === 0) {
      return json400("No targets provided (targetFile or targetFiles[] or v3Plan.files)");
    }

    const allowlistCheck = validateTargets(targetPosixList);
    if (!allowlistCheck.ok) {
      return json400(allowlistCheck.error, {
        requested: targetPosixList,
        disallowed: allowlistCheck.disallowed,
        allowed: allowlistCheck.allowed,
      });
    }

    const rootAbs = path.resolve(repoPath);

    let rootStat: Awaited<ReturnType<typeof fs.stat>>;
    try {
      rootStat = await fs.stat(rootAbs);
    } catch {
      return json400("repoPath does not exist");
    }

    if (!rootStat.isDirectory()) {
      return json400("repoPath must be a folder");
    }

    const maxBytes = clampMaxBytes(body?.maxFileBytes);
    const stamp = new Date().toISOString();
    const debug = asBoolean(body?.debug);

    const diffs: Diff[] = [];
    const perFile: Array<{
      filePath: string;
      absPath: string;
      bytes: number;
      changed: boolean;
      mode: GoalEditMode;
      reason: string;
    }> = [];

    for (const targetPosix of targetPosixList) {
      const absPath = path.resolve(path.join(rootAbs, targetPosix));

      if (!isLikelyInside(rootAbs, absPath)) {
        return json400(`Resolved path escapes repoPath: ${targetPosix}`);
      }

      let buf: Buffer;
      try {
        buf = await fs.readFile(absPath);
      } catch (error: unknown) {
        return json400(`Unable to read ${targetPosix}: ${safeErrorMessage(error, "read error")}`);
      }

      if (buf.byteLength > maxBytes) {
        return json400(`Target file too large (> ${maxBytes} bytes): ${targetPosix}`);
      }

      const original = buf.toString("utf8");
      const result = applyGoalDrivenEdit(original, goal, stamp);
      const changed = result.updated !== original;

      if (changed) {
        diffs.push({
          filePath: targetPosix,
          patch: makeUnifiedDiff(targetPosix, original, result.updated),
        });
      }

      if (debug) {
        perFile.push({
          filePath: targetPosix,
          absPath,
          bytes: buf.byteLength,
          changed,
          mode: result.mode,
          reason: result.reason,
        });
      }
    }

    return json(200, {
      ok: true,
      diffs,
      meta: {
        targetFiles: targetPosixList,
        goal,
        planSteps: countPlanSteps(plan),
        stamp,
        mode: goalMode(goal),
        count: diffs.length,
        maxFileBytes: maxBytes,
        allowedTargetCount: ALLOWED_TARGETS.size,
        targetsSource: resolvedTargets.source,
      },
      ...(debug ? { debug: { perFile } } : {}),
      ...(diffs.length === 0
        ? {
            note:
              "No changes produced. Check target matching and fallback edit logic.",
          }
        : {}),
    });
  } catch (error: unknown) {
    return json(500, { ok: false, error: safeErrorMessage(error) });
  }
}