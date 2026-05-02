import { NextResponse } from "next/server";
import {
  CodexForgeEngine,
  type CodexGoal,
  type EngineAction,
  type RunState,
} from "@/lib/codexforge/engine";

/**
 * /api/codexforge/run
 *
 * Stable API wrapper around the CodexForge execution engine.
 *
 * Current guarantees:
 * - keeps existing action-based behavior intact
 * - validates all inbound JSON before touching the engine
 * - returns no-store responses because state is mutable and process-local
 * - leaves direct mutation inside the engine only
 *
 * Forward-compatible additions:
 * - optional mode field for future expansion
 * - explicit route metadata in responses
 * - safer normalization and clearer error handling
 *
 * Supported action flow today:
 * - start
 * - approvePlan
 * - rejectPlan
 * - approveDiffs
 * - rejectDiffs
 * - reset
 *
 * Notes:
 * - engine persistence is still server-process memory only
 * - this route intentionally remains thin, predictable, and easy to evolve
 */

type RequestBody = {
  action?: unknown;
  goal?: unknown;
  nowLabel?: unknown;
  mode?: unknown;
  context?: unknown;
};

type ApiMeta = {
  route: "/api/codexforge/run";
  enginePersistence: "process-memory";
  actionMode: "explicit-dispatch";
  version: 2;
};

type ApiSuccess = {
  ok: true;
  state: RunState;
  meta: ApiMeta;
};

type ApiError = {
  ok: false;
  error: string;
  meta: ApiMeta;
};

type RouteContext = {
  engine: CodexForgeEngine;
};

const VALID_ACTIONS = [
  "start",
  "approvePlan",
  "rejectPlan",
  "approveDiffs",
  "rejectDiffs",
  "reset",
] as const;

type ValidActionName = (typeof VALID_ACTIONS)[number];

const VALID_ACTION_SET = new Set<string>(VALID_ACTIONS);
const ACTIONS_TEXT = VALID_ACTIONS.join(", ");

const VALID_MODES = ["action"] as const;
type ValidMode = (typeof VALID_MODES)[number];
const VALID_MODE_SET = new Set<string>(VALID_MODES);
const MODES_TEXT = VALID_MODES.join(", ");

const LIMITS = {
  maxGoalText: 4000,
  maxRepoPathText: 1200,
  maxNowLabelText: 120,
} as const;

declare global {
  // eslint-disable-next-line no-var
  var __codexforgeEngine__: CodexForgeEngine | undefined;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

function buildMeta(): ApiMeta {
  return {
    route: "/api/codexforge/run",
    enginePersistence: "process-memory",
    actionMode: "explicit-dispatch",
    version: 2,
  };
}

function getEngine(): CodexForgeEngine {
  if (!globalThis.__codexforgeEngine__) {
    globalThis.__codexforgeEngine__ = new CodexForgeEngine();
  }

  return globalThis.__codexforgeEngine__;
}

function getRouteContext(): RouteContext {
  return {
    engine: getEngine(),
  };
}

function buildJsonHeaders(): HeadersInit {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };
}

function jsonSuccess(state: RunState, status = 200) {
  return NextResponse.json<ApiSuccess>(
    {
      ok: true,
      state,
      meta: buildMeta(),
    },
    {
      status,
      headers: buildJsonHeaders(),
    }
  );
}

function jsonError(error: string, status = 400) {
  return NextResponse.json<ApiError>(
    {
      ok: false,
      error,
      meta: buildMeta(),
    },
    {
      status,
      headers: buildJsonHeaders(),
    }
  );
}

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

function clampText(text: string, max: number): string {
  return text.length <= max ? text : text.slice(0, max);
}

function asBoundedTrimmedString(
  value: unknown,
  max: number
): string | undefined {
  const trimmed = asTrimmedString(value);
  return trimmed ? clampText(trimmed, max) : undefined;
}

function isValidActionName(value: string): value is ValidActionName {
  return VALID_ACTION_SET.has(value);
}

function isValidMode(value: string): value is ValidMode {
  return VALID_MODE_SET.has(value);
}

function parseJsonBody(value: unknown): RequestBody {
  if (!isRecord(value)) {
    throw new Error("Bad request: expected a JSON object body.");
  }

  return {
    action: value.action,
    goal: value.goal,
    nowLabel: value.nowLabel,
    mode: value.mode,
    context: value.context,
  };
}

function normalizeGoal(value: unknown): CodexGoal {
  if (!isRecord(value)) {
    throw new Error("Goal must be an object.");
  }

  const goal = asBoundedTrimmedString(value.goal, LIMITS.maxGoalText);
  const repoPath = asBoundedTrimmedString(value.repoPath, LIMITS.maxRepoPathText);

  if (!goal) {
    throw new Error("Goal text is required.");
  }

  if (!repoPath) {
    throw new Error("repoPath is required.");
  }

  return {
    goal,
    repoPath,
  };
}

function normalizeActionName(value: unknown): ValidActionName {
  const actionName = asTrimmedString(value);

  if (!actionName) {
    throw new Error(`Action is required. Expected one of: ${ACTIONS_TEXT}.`);
  }

  if (!isValidActionName(actionName)) {
    throw new Error(`Unknown action. Expected one of: ${ACTIONS_TEXT}.`);
  }

  return actionName;
}

function normalizeMode(value: unknown): ValidMode {
  const mode = asTrimmedString(value) ?? "action";

  if (!isValidMode(mode)) {
    throw new Error(`Unknown mode. Expected one of: ${MODES_TEXT}.`);
  }

  return mode;
}

function normalizeAction(action: unknown, goal: unknown): EngineAction {
  const actionName = normalizeActionName(action);

  switch (actionName) {
    case "start":
      return {
        type: "start",
        goal: normalizeGoal(goal),
      };

    case "approvePlan":
      return { type: "approvePlan" };

    case "rejectPlan":
      return { type: "rejectPlan" };

    case "approveDiffs":
      return { type: "approveDiffs" };

    case "rejectDiffs":
      return { type: "rejectDiffs" };

    case "reset":
      return { type: "reset" };
  }
}

function validateUnusedContext(value: unknown): void {
  if (value === undefined) {
    return;
  }

  if (!isRecord(value) && !Array.isArray(value)) {
    throw new Error("context must be an object or array when provided.");
  }
}

function buildDefaultNowLabel(): string {
  return `[${new Date().toLocaleTimeString()}]`;
}

function getNowLabel(value: unknown): string {
  const explicit = asBoundedTrimmedString(value, LIMITS.maxNowLabelText);
  return explicit ?? buildDefaultNowLabel();
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    const trimmed = error.message.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  return fallback;
}

async function safeReadJson(req: Request): Promise<unknown> {
  try {
    return (await req.json()) as unknown;
  } catch {
    throw new Error("Bad request: request body must be valid JSON.");
  }
}

export async function GET() {
  try {
    const { engine } = getRouteContext();
    return jsonSuccess(engine.getState());
  } catch (error) {
    return jsonError(getErrorMessage(error, "Failed to read engine state."), 500);
  }
}

export async function POST(req: Request) {
  try {
    const raw = await safeReadJson(req);
    const body = parseJsonBody(raw);

    const mode = normalizeMode(body.mode);
    validateUnusedContext(body.context);

    if (mode !== "action") {
      return jsonError(`Unsupported mode. Expected one of: ${MODES_TEXT}.`, 400);
    }

    const { engine } = getRouteContext();
    const action = normalizeAction(body.action, body.goal);
    const nowLabel = getNowLabel(body.nowLabel);
    const state = await engine.runAction(nowLabel, action);

    return jsonSuccess(state);
  } catch (error) {
    const message = getErrorMessage(error, "Failed to run engine action.");
    return jsonError(message, 400);
  }
}