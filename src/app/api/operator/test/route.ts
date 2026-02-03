import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";

type ReqBody = { repoPath?: string };

function errorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return "Unknown error";
}

const execFileAsync = promisify(execFile);

// Keep tests read-only-ish and predictable: only run inside repoPath.
function isLikelyInside(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    if (!repoPath) {
      return NextResponse.json({ ok: false, error: "repoPath is required" }, { status: 400 });
    }

    const rootAbs = path.resolve(repoPath);

    // Validate repoPath exists and is a folder
    let st: Awaited<ReturnType<typeof fs.stat>>;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return NextResponse.json({ ok: false, error: "repoPath does not exist" }, { status: 400 });
    }
    if (!st.isDirectory()) {
      return NextResponse.json({ ok: false, error: "repoPath must be a folder" }, { status: 400 });
    }

    // We run: npm test (or npm -s test). Use npm.cmd on Windows.
    const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

    // Safety: ensure cwd is inside the provided rootAbs (it is, but keep the guard)
    const cwd = rootAbs;
    if (!isLikelyInside(rootAbs, cwd)) {
      return NextResponse.json({ ok: false, error: "Resolved path escapes repoPath" }, { status: 400 });
    }

    // Run tests
    // - timeout prevents hanging forever
    // - capture stdout/stderr for UI
    try {
      const { stdout, stderr } = await execFileAsync(
        npmCmd,
        ["test", "--silent"],
        {
          cwd,
          timeout: 5 * 60 * 1000, // 5 minutes
          windowsHide: true,
          maxBuffer: 10 * 1024 * 1024, // 10MB
        }
      );

      const output = [stdout, stderr].filter(Boolean).join("\n").trim();

      return NextResponse.json({
        ok: true,
        testOutput: output || "(no output)",
      });
    } catch (e: unknown) {
      // execFile throws on non-zero exit or timeout; include whatever output exists
      const ee = e as {
        stdout?: unknown;
        stderr?: unknown;
        signal?: unknown;
        code?: unknown;
        killed?: unknown;
        message?: unknown;
      };

      const stdout = typeof ee.stdout === "string" ? ee.stdout : "";
      const stderr = typeof ee.stderr === "string" ? ee.stderr : "";
      const output = [stdout, stderr].filter(Boolean).join("\n").trim();

      const msg = errorMessage(e);
      return NextResponse.json(
        {
          ok: false,
          error: `Tests failed: ${msg}`,
          testOutput: output || "(no output)",
        },
        { status: 500 }
      );
    }
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: errorMessage(e) }, { status: 500 });
  }
}
