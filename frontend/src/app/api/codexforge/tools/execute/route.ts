import { buildCodexForgeToolPolicyInputFromBody, evaluateCodexForgeToolPolicy } from "@/lib/codexforge/tools/tool-policy-guard";
import { NextResponse } from "next/server";
import {
  executeCodexForgeTool,
  getCodexForgeExecutableToolNames,
  getCodexForgeServerToolByName,
} from "@/lib/codexforge/tools/server";
import type {
  CodexForgeToolExecutionContext,
  CodexForgeToolExecutionRequest,
  CodexForgeToolExecutionResponse,
} from "@/lib/codexforge/tools";

/* ================= TYPES ================= */

type ExecuteToolRouteBody = {
  toolName?: unknown;
  input?: unknown;
  context?: unknown;
};

type ExecuteToolRouteMeta = {
  toolName: string;
  ok: boolean;
  availability?: string;
  durationMs?: number;
  requestId?: string;
};

type ExecuteToolRouteSuccess = {
  ok: true;
  result: CodexForgeToolExecutionResponse;
  meta: ExecuteToolRouteMeta;
};

type ExecuteToolRouteError = {
  ok: false;
  error: string;
  toolPolicy?: unknown;
  meta?: Partial<ExecuteToolRouteMeta> & {
    availableTools?: string[];
  };
};

type ExecuteToolRouteResponse = ExecuteToolRouteSuccess | ExecuteToolRouteError;

/* ================= CONSTANTS ================= */

const MAX_TOOL_NAME_LENGTH = 120;
const MAX_REQUEST_BYTES = 1_000_000;

/* ================= HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function clampText(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, Math.max(0, max - 1))}ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦`;
}

function json(status: number, payload: ExecuteToolRouteResponse) {
  return NextResponse.json(payload, { status });
}

function normalizeToolName(value: unknown): string | undefined {
  const toolName = asTrimmedString(value);
  if (!toolName) return undefined;
  return clampText(toolName, MAX_TOOL_NAME_LENGTH);
}

function normalizeInput(value: unknown): Record<string, unknown> {
  return isRecord(value) ? value : {};
}

function normalizeContext(value: unknown): CodexForgeToolExecutionContext {
  if (!isRecord(value)) {
    return {};
  }

  const requestId = asTrimmedString(value.requestId);
  const projectName = asTrimmedString(value.projectName);
  const workspaceRoot = asTrimmedString(value.workspaceRoot);
  const repoPath = asTrimmedString(value.repoPath);
  const cwd = asTrimmedString(value.cwd);
  const userIntent = asTrimmedString(value.userIntent);
  const metadata = isRecord(value.metadata) ? value.metadata : undefined;

  return {
    ...(requestId ? { requestId } : {}),
    ...(projectName ? { projectName } : {}),
    ...(workspaceRoot ? { workspaceRoot } : {}),
    ...(repoPath ? { repoPath } : {}),
    ...(cwd ? { cwd } : {}),
    ...(userIntent ? { userIntent } : {}),
    ...(value.allowExternal === true ? { allowExternal: true } : {}),
    ...(value.allowWrites === true ? { allowWrites: true } : {}),
    ...(value.allowDesktopControl === true ? { allowDesktopControl: true } : {}),
    ...(typeof value.timeoutMs === "number" && Number.isFinite(value.timeoutMs)
      ? { timeoutMs: value.timeoutMs }
      : {}),
    ...(metadata ? { metadata } : {}),
  };
}

function buildExecutionRequest(
  body: ExecuteToolRouteBody
): CodexForgeToolExecutionRequest | null {
  const toolName = normalizeToolName(body.toolName);
  if (!toolName) {
    return null;
  }

  return {
    toolName,
    input: normalizeInput(body.input),
    context: normalizeContext(body.context),
  };
}

async function readBody(req: Request): Promise<ExecuteToolRouteBody | null> {
  const contentLength = req.headers.get("content-length");
  if (contentLength) {
    const parsed = Number(contentLength);
    if (Number.isFinite(parsed) && parsed > MAX_REQUEST_BYTES) {
      throw new Error(`Request body too large. Limit is ${MAX_REQUEST_BYTES} bytes.`);
    }
  }

  const body = (await req.json().catch(() => null)) as ExecuteToolRouteBody | null;
  return body && isRecord(body) ? body : null;
}

/* ================= ROUTE ================= */

export async function POST(req: Request) {
  const startedAt = Date.now();

  try {
    const body = await readBody(req);

    if (!body) {
      return json(400, {
        ok: false,
        error: "Expected a JSON body with toolName, input, and optional context.",
        meta: {
          availableTools: getCodexForgeExecutableToolNames(),
        },
      });
    }

    const toolPolicyDecision = evaluateCodexForgeToolPolicy(
      buildCodexForgeToolPolicyInputFromBody(body)
    );

    if (!toolPolicyDecision.allowed) {
      return json(toolPolicyDecision.status, {
        ok: false,
        error: toolPolicyDecision.reason,
        toolPolicy: toolPolicyDecision,
        meta: {
          toolName: toolPolicyDecision.normalizedToolName ?? undefined,
          availableTools: getCodexForgeExecutableToolNames(),
        },
      });
    }

    const request = buildExecutionRequest(body);

    if (!request) {
      return json(400, {
        ok: false,
        error: "toolName is required.",
        meta: {
          availableTools: getCodexForgeExecutableToolNames(),
        },
      });
    }

    const tool = getCodexForgeServerToolByName(request.toolName);

    if (!tool) {
      return json(404, {
        ok: false,
        error: `Unknown tool '${request.toolName}'.`,
        meta: {
          toolName: request.toolName,
          availableTools: getCodexForgeExecutableToolNames(),
        },
      });
    }

    const result = await executeCodexForgeTool(request);
    const durationMs = Date.now() - startedAt;

    const response: ExecuteToolRouteSuccess = {
      ok: true,
      result,
      meta: {
        toolName: tool.name,
        ok: result.ok,
        availability: tool.availability,
        durationMs,
        requestId: request.context?.requestId,
      },
    };

    return json(result.ok ? 200 : 400, response);
  } catch (error) {
    const durationMs = Date.now() - startedAt;
    const message =
      error instanceof Error && error.message.trim().length > 0
        ? error.message.trim()
        : "Failed to execute tool.";

    const response: ExecuteToolRouteError = {
      ok: false,
      error: clampText(message, 400),
      meta: {
        durationMs,
        availableTools: getCodexForgeExecutableToolNames(),
      },
    };

    return json(500, response);
  }
}
