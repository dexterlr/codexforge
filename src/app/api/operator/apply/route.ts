import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type Diff = {
  filePath: string; // repo-relative, POSIX style
  patch: string; // unified diff text (our simple full-replace diff)
};

type ReqBody = {
  repoPath?: string;
  diffs?: Diff[];
  // Safety gate: default true means "show what would happen"
  dryRun?: boolean;
};

const MAX_FILE_BYTES = 500_000; // safety cap (~500KB)

// Must match what /diff can output (otherwise apply will reject it)
const ALLOWED_TARGETS = new Set<string>([
  "src/app/history/page.tsx",
  "src/app/api/operator/diff/route.ts",
]);

function toPosix(p: string) {
  return p.replace(/\\/g, "/");
}

// Only allow writes inside repoPath (prevents "../" escaping)
function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function json(status: number, payload: unknown, extraHeaders?: Record<string, string>) {
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

/**
 * Extract the file path declared by the patch header.
 * We expect:
 * --- <path>
 * +++ <path>
 */
function getPatchTargetFilePosix(patch: string) {
  const lines = patch.split("\n");
  const plus = lines.find((l) => l.startsWith("+++ "));
  if (!plus) return "";
  return toPosix(plus.slice(4).trim());
}

/**
 * Our diff format is intentionally simple:
 * - We generate diffs by "delete all old lines" then "add all new lines".
 * - So to apply, we reconstruct the new file from the '+' lines in the patch.
 */
function reconstructNewTextFromPatch(patch: string) {
  const lines = patch.split("\n");

  // Skip header-ish lines: --- , +++ , @@ ...
  // Then collect only lines that begin with '+' (but NOT '+++ ' header).
  const out: string[] = [];

  for (const line of lines) {
    if (line.startsWith("+++ ")) continue;
    if (line.startsWith("--- ")) continue;
    if (line.startsWith("@@")) continue;

    if (line.startsWith("+")) out.push(line.slice(1));
  }

  return out.join("\n");
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
    `Use POST with JSON body: { repoPath, diffs: [{ filePath, patch }], (optional) dryRun }. Allowed filePath: ${allowedTargetsList()}`
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    const diffs = body?.diffs;
    const dryRun = body?.dryRun !== false; // default true

    if (!repoPath) return json400("repoPath is required");

    // diffs must exist and be an array; BUT empty array is a valid no-op.
    if (!Array.isArray(diffs)) return json400("diffs[] is required");
    if (diffs.length === 0) {
      return NextResponse.json({
        ok: true,
        dryRun,
        applied: 0,
        actions: [],
        note: "No diffs to apply (no-op).",
      });
    }

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return json400("repoPath does not exist");
    }
    if (!st.isDirectory()) return json400("repoPath must be a folder");

    const actions: Array<{
      filePath: string;
      absPath: string;
      bytesNew: number;
      wouldWrite: boolean;
    }> = [];

    for (const d of diffs) {
      const filePathPosix = toPosix(String(d?.filePath ?? "").trim());
      const patch = String(d?.patch ?? "");

      if (!filePathPosix) return json400("Each diff must include filePath");
      if (!patch) return json400(`Missing patch for ${filePathPosix}`);

      // Patch header must match declared filePath (prevents mismatched writes)
      const patchTarget = getPatchTargetFilePosix(patch);
      if (!patchTarget) return json400(`Patch header missing '+++ ' line for ${filePathPosix}`);
      if (patchTarget !== filePathPosix) {
        return json400(
          `Patch target mismatch. diff.filePath=${filePathPosix} but patch targets ${patchTarget}`
        );
      }

      // Allowlist enforcement (demo safety)
      if (!ALLOWED_TARGETS.has(filePathPosix)) {
        return json400(`filePath is not allowed. Allowed: ${allowedTargetsList()}`);
      }

      const absPath = path.resolve(path.join(rootAbs, filePathPosix));

      if (!isLikelyInside(rootAbs, absPath)) {
        return json400(`Resolved path escapes repoPath: ${filePathPosix}`);
      }

      const newText = reconstructNewTextFromPatch(patch);
      const bytesNew = Buffer.byteLength(newText, "utf8");

      if (bytesNew > MAX_FILE_BYTES) {
        return json400(`Refusing to write ${filePathPosix}: new content > ${MAX_FILE_BYTES} bytes`);
      }

      actions.push({
        filePath: filePathPosix,
        absPath,
        bytesNew,
        wouldWrite: !dryRun,
      });

      if (!dryRun) {
        // Write atomically: write temp then rename
        const dir = path.dirname(absPath);
        const base = path.basename(absPath);
        const tmp = path.join(dir, `.${base}.tmp`);

        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(tmp, newText, "utf8");
        await fs.rename(tmp, absPath);
      }
    }

    return NextResponse.json({
      ok: true,
      dryRun,
      applied: dryRun ? 0 : actions.length,
      actions,
      note: dryRun
        ? "Dry run only: no files were written. Set dryRun=false to apply."
        : "Applied: files were written to disk.",
    });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
