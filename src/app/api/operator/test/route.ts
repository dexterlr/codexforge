import { NextResponse } from "next/server";

/**
 * TEST (v0) — Stub only
 *
 * RULES:
 * - No real command execution yet
 * - Always returns deterministic output quickly
 *
 * Later we’ll replace this with real test execution via a backend worker:
 * - run `npm test` / `pnpm test` or `npm run lint`
 * - capture stdout/stderr
 * - stream logs
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | { repoPath?: string }
      | null;

    const repoPath = String(body?.repoPath ?? "").trim();

    if (!repoPath) {
      return NextResponse.json(
        { ok: false, error: "repoPath is required" },
        { status: 400 }
      );
    }

    // Stub output (fast + deterministic)
    const testOutput =
      `TEST (stub)\n` +
      `repoPath: ${repoPath}\n` +
      `\n` +
      `All tests passed (stub).\n`;

    return NextResponse.json({
      ok: true,
      testOutput,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
