import { NextResponse } from "next/server";
import { getCodexForgeToolByName } from "@/lib/codexforge/tools";
import type { CodexForgeToolExecutionContext } from "@/lib/codexforge/tools";

type ReqBody = {
  repoPath?: string;
  filePath?: string;
  includeLineNumbers?: boolean;
  maxChars?: number;
};

type ReadOk = {
  ok: true;
  root: string;
  filePath: string;
  bytes: number;
  text: string;
  truncated?: boolean;
  warnings?: Array<{
    code: string;
    message: string;
  }>;
};

type ReadErr = {
  ok: false;
  error: string;
};

type ReadResponse = ReadOk | ReadErr;

function json(status: number, payload: ReadResponse) {
  return NextResponse.json(payload, { status });
}

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asOptionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as ReqBody | null;

    const repoPath = asTrimmedString(body?.repoPath);
    const filePath = asTrimmedString(body?.filePath);
    const includeLineNumbers = asOptionalBoolean(body?.includeLineNumbers);
    const maxChars = asOptionalNumber(body?.maxChars);

    if (!repoPath) {
      return json(400, { ok: false, error: "repoPath is required" });
    }

    if (!filePath) {
      return json(400, { ok: false, error: "filePath is required" });
    }

    const tool = getCodexForgeToolByName("read-file");

    if (!tool?.handler) {
      return json(500, {
        ok: false,
        error: "CodexForge read-file tool is not available.",
      });
    }

    const context: CodexForgeToolExecutionContext = {
      requestId: `operator-read-${Date.now().toString(16)}`,
      repoPath,
      cwd: repoPath,
      allowWrites: false,
      allowExternal: false,
      allowDesktopControl: false,
      metadata: {
        source: "operator-read-route",
      },
    };

    const result = await tool.handler(
      {
        path: filePath,
        ...(includeLineNumbers !== undefined ? { includeLineNumbers } : {}),
        ...(maxChars !== undefined ? { maxChars } : {}),
      },
      context
    );

    if (!result.ok) {
      return json(400, {
        ok: false,
        error: result.error?.message || result.summary || "Failed to read file.",
      });
    }

    if (result.content?.type !== "json") {
      return json(500, {
        ok: false,
        error: "Read-file tool returned an unexpected content type.",
      });
    }

    const payload = result.content.json;
    const text = typeof payload.content === "string" ? payload.content : "";
    const relativePath =
      typeof payload.relativePath === "string" && payload.relativePath.trim()
        ? payload.relativePath.trim()
        : filePath;
    const absolutePath =
      typeof payload.absolutePath === "string" && payload.absolutePath.trim()
        ? payload.absolutePath.trim()
        : repoPath;
    const bytes =
      typeof payload.size === "number" && Number.isFinite(payload.size)
        ? payload.size
        : text.length;
    const truncated = payload.truncated === true;

    return json(200, {
      ok: true,
      root: absolutePath,
      filePath: relativePath,
      bytes,
      text,
      ...(truncated ? { truncated: true } : {}),
      ...(result.warnings?.length ? { warnings: result.warnings } : {}),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message.trim().length > 0
        ? error.message
        : "Unknown error";

    return json(500, { ok: false, error: message });
  }
}