import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { execFile } from "child_process";
import { promisify } from "util";

type ReqBody = { repoPath?: string };

type ExecFileResult = {
  stdout: string;
  stderr: string;
};

type ExecFileError = Error & {
  stdout?: string;
  stderr?: string;
  code?: number | string | null;
  signal?: NodeJS.Signals | null;
};

const execFileAsync = promisify(execFile);

function errorMessage(e: unknown): string {
  if (e && typeof e === "object" && "message" in e) {
    const msg = (e as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return "Unknown error";
}

function isInsideOrSame(parentAbs: string, childAbs: string) {
  const rel = path.relative(parentAbs, childAbs);
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function joinOutput(stdout?: string, stderr?: string) {
  return [stdout ?? "", stderr ?? ""].filter(Boolean).join("\n").trim() || "(no output)";
}

async function pathExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = String(body?.repoPath ?? "").trim();
    if (!repoPath) {
      return NextResponse.json({ ok: false, error: "repoPath is required" }, { status: 400 });
    }

    const rootAbs = path.resolve(repoPath);

    let st: Awaited<ReturnType<typeof fs.stat>>;
    try {
      st = await fs.stat(rootAbs);
    } catch {
      return NextResponse.json({ ok: false, error: "repoPath does not exist" }, { status: 400 });
    }

    if (!st.isDirectory()) {
      return NextResponse.json({ ok: false, error: "repoPath must be a folder" }, { status: 400 });
    }

    const cwd = rootAbs;
    if (!isInsideOrSame(rootAbs, cwd)) {
      return NextResponse.json({ ok: false, error: "Resolved path escapes repoPath" }, { status: 400 });
    }

    const packageJsonPath = path.join(rootAbs, "package.json");
    if (!(await pathExists(packageJsonPath))) {
      return NextResponse.json(
        {
          ok: false,
          error: "package.json not found in repoPath",
          testOutput: "(no output)",
        },
        { status: 400 }
      );
    }

    const command =
      process.platform === "win32"
        ? "npm.cmd test --silent"
        : "npm test --silent";

    const file = process.platform === "win32" ? "cmd.exe" : "sh";
    const args =
      process.platform === "win32"
        ? ["/d", "/s", "/c", command]
        : ["-lc", command];

    try {
      const result = (await execFileAsync(file, args, {
        cwd,
        timeout: 5 * 60 * 1000,
        windowsHide: true,
        maxBuffer: 10 * 1024 * 1024,
      })) as ExecFileResult;

      return NextResponse.json({
        ok: true,
        testOutput: joinOutput(result.stdout, result.stderr),
      });
    } catch (e: unknown) {
      const err = e as ExecFileError;
      const output = joinOutput(err.stdout, err.stderr);

      return NextResponse.json(
        {
          ok: false,
          error: `Tests failed: ${errorMessage(e)}`,
          testOutput: output,
        },
        { status: 500 }
      );
    }
  } catch (e: unknown) {
    return NextResponse.json(
      {
        ok: false,
        error: errorMessage(e),
        testOutput: "(no output)",
      },
      { status: 500 }
    );
  }
}