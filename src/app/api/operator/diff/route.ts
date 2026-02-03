// Operator demo change (2026-02-03T13:12:40.608Z)
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type Plan = { steps: string[] };

type Diff = {
  filePath: string; // repo-relative, POSIX style
  patch: string; // unified diff text (simple full-replace diff)
};

type ReqBody = {
  repoPath?: string;
  goal?: string;
  plan?: Plan;

  // Back-compat: single target file (defaults to history page)
  targetFile?: string;

  // Multi-file support. If provided and non-empty, this overrides targetFile.
  // Each entry must still be allowlisted below.
  targetFiles?: string[];
};

type JsonPayload = Record<string, unknown>;

const MAX_FILE_BYTES = 500_000; // safety cap (~500KB)

// Demo safety: only allow these exact files to be read/modified via diff generation.
// Add more paths here as needed (must be repo-relative, POSIX style).
const ALLOWED_TARGETS = new Set<string>([
  "src/app/history/page.tsx",
  "src/app/api/operator/diff/route.ts",
]);

function toPosix(p: string) {
  return p.replace(/\\/g, "/");
}

// Only allow resolved paths inside repoPath (prevents "../" escaping)
function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

/**
 * Minimal "unified diff" generator.
 * Not a real diff algorithm; it emits "delete old lines + add new lines".
 * Good enough for an Operator demo and very predictable.
 */
function makeUnifiedDiff(filePath: string, oldText: string, newText: string): string {
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

function json(status: number, payload: JsonPayload, extraHeaders?: Record<string, string>) {
  return NextResponse.json(payload, {
    status,
    headers: { ...(extraHeaders ?? {}) },
  });
}

function json400(msg: string) {
  return json(400, { ok: false, error: msg });
}

function json405(msg: string) {
  return json(405, { ok: false, error: msg });
}

function allowedTargetsList() {
  return Array.from(ALLOWED_TARGETS).sort().join(", ");
}

// Very simple detection: if these handlers exist, export is already implemented.
function hasExportToolsAlready(text: string) {
  return text.includes("function onExportJSON") || text.includes("function onExportCSV");
}

const STAMP_RE = /^\/\/ Operator demo change \(.*?\)$/;
const PREPEND_RE =
  /^\/\/\s*(prepended via operator demo|prepended by operator|operator-prepend:.*)$/i;
const APPEND_RE =
  /^\/\/\s*(appended via operator demo|appended by operator|operator-append:.*)$/i;

/**
 * Normalize file so "stamp only" truly cleans up operator noise:
 * - Always ensure EXACTLY ONE stamp line at the top (fresh timestamp)
 * - Remove any stacked stamp lines
 * - ALSO remove operator prepend line immediately after the stamp (legacy or tagged)
 * - ALSO remove operator append line at end of file (legacy or tagged)
 */
function normalizeOperatorFile(original: string, stampIso: string) {
  const stampLine = `// Operator demo change (${stampIso})`;

  // Split into lines (no trailing newline dependency)
  const lines = original.split(/\r?\n/);

  // 1) Remove any leading stamp lines (stacked)
  while (lines.length > 0 && STAMP_RE.test(lines[0])) {
    lines.shift();
  }

  // 2) Remove one "prepend" line if it exists at new top
  if (lines.length > 0 && PREPEND_RE.test(lines[0])) {
    lines.shift();
  }

  // 3) Remove trailing empty lines
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  // 4) Remove one "append" line if it exists at end
  if (lines.length > 0 && APPEND_RE.test(lines[lines.length - 1])) {
    lines.pop();
  }

  // 5) Rebuild with exactly one stamp line at top, and ensure file ends with newline
  const rest = lines.join("\n");
  return rest.length > 0 ? `${stampLine}\n${rest}\n` : `${stampLine}\n`;
}

/**
 * Goal-driven deterministic edits (no AI):
 * - "append: X"  -> append "// operator-append: X" at end
 * - "prepend: X" -> insert "// operator-prepend: X" right AFTER the operator stamp line
 * Otherwise: only refresh stamp (and remove old operator prepend/append lines).
 */
function applyGoalDrivenEdit(original: string, goal: string, stampIso: string) {
  const normalized = normalizeOperatorFile(original, stampIso);
  const lower = goal.toLowerCase();

  const extractAfter = (prefix: "append:" | "prepend:") => {
    const idx = lower.indexOf(prefix);
    if (idx === -1) return "";
    return goal.slice(idx + prefix.length).trim();
  };

  if (lower.includes("prepend:")) {
    const msg = extractAfter("prepend:");
    const line = msg ? `// operator-prepend: ${msg}\n` : `// operator-prepend: (empty)\n`;

    // normalized always starts with stamp line + newline
    const m = normalized.match(/^\/\/ Operator demo change \(.*?\)\r?\n/);
    if (m) {
      const head = m[0];
      const rest = normalized.slice(head.length);
      return { mode: "prepend" as const, updated: head + line + rest };
    }
    return { mode: "prepend" as const, updated: line + normalized };
  }

  if (lower.includes("append:")) {
    const msg = extractAfter("append:");
    const line = msg ? `// operator-append: ${msg}` : `// operator-append: (empty)`;
    // normalized already ends with "\n"
    return { mode: "append" as const, updated: normalized + line + "\n" };
  }

  return { mode: "stamp" as const, updated: normalized };
}

function goalMode(goal: string) {
  const g = goal.toLowerCase();
  if (g.includes("append:")) return "append";
  if (g.includes("prepend:")) return "prepend";
  return "stamp";
}

function normalizeTargets(body: ReqBody) {
  const targetFileRaw = String(body?.targetFile ?? "src/app/history/page.tsx").trim();

  const targetFilesRaw = Array.isArray(body?.targetFiles) ? body.targetFiles : null;

  const requested =
    targetFilesRaw && targetFilesRaw.length > 0
      ? targetFilesRaw.map((x) => String(x ?? "").trim()).filter(Boolean)
      : [targetFileRaw];

  const posix = requested.map(toPosix);

  // De-dupe while preserving order
  const out: string[] = [];
  const seen = new Set<string>();
  for (const t of posix) {
    if (!t) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }

  return out;
}

export async function OPTIONS() {
  return json(
    200,
    { ok: true },
    {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  );
}

export async function GET() {
  return json405(
    `Use POST with JSON body: { repoPath, goal, plan, (optional) targetFile | targetFiles }. Allowed targets: ${allowedTargetsList()}`
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const goal = String(body?.goal ?? "").trim();
    const plan = body?.plan;

    if (!repoPath) return json400("repoPath is required");
    if (!goal) return json400("goal is required");
    if (!plan || !Array.isArray(plan.steps)) return json400("plan is required");

    const targetPosixList = normalizeTargets(body ?? {});
    if (targetPosixList.length === 0) {
      return json400("No targets provided (targetFile or targetFiles[])");
    }

    // Allowlist enforcement (demo safety)
    for (const t of targetPosixList) {
      if (!ALLOWED_TARGETS.has(t)) {
        return json400(`targetFile is not allowed. Allowed: ${allowedTargetsList()}`);
      }
    }

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st: { isDirectory(): boolean };
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return json400("repoPath does not exist");
    }
    if (!st.isDirectory()) return json400("repoPath must be a folder");

    const stamp = new Date().toISOString();
    const diffs: Diff[] = [];

    for (const targetPosix of targetPosixList) {
      const absPath = path.resolve(path.join(rootAbs, targetPosix));

      if (!isLikelyInside(rootAbs, absPath)) {
        return json400(`Resolved path escapes repoPath: ${targetPosix}`);
      }

      let original: string;
      try {
        const buf = await fs.readFile(absPath);
        if (buf.byteLength > MAX_FILE_BYTES) {
          return json400(`Target file too large (> ${MAX_FILE_BYTES} bytes): ${targetPosix}`);
        }
        original = buf.toString("utf8");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "read error";
        return json400(`Unable to read ${targetPosix}: ${msg}`);
      }

      // History page special-case: if export already exists, produce no diff for that file.
      if (targetPosix === "src/app/history/page.tsx" && hasExportToolsAlready(original)) {
        continue;
      }

      const { updated } = applyGoalDrivenEdit(original, goal, stamp);
      if (updated === original) continue;

      diffs.push({
        filePath: targetPosix,
        patch: makeUnifiedDiff(targetPosix, original, updated),
      });
    }

    return NextResponse.json({
      ok: true,
      diffs,
      meta: {
        targetFiles: targetPosixList,
        goal,
        planSteps: plan.steps.length,
        stamp,
        mode: goalMode(goal),
        count: diffs.length,
      },
      ...(diffs.length === 0 ? { note: "No changes produced (no-op for all targets)." } : {}),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
