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
 * Thin API wrapper around the in-memory CodexForge execution engine.
 *
 * Current model:
 * - one engine instance per server process
 * - explicit action dispatch only
 * - no direct engine mutation from the route
 * - process-memory persistence only
 */

type RequestBody = {
  action?: unknown;
  goal?: unknown;
  nowLabel?: unknown;
};

type ApiSuccess = {
  ok: true;
  state: RunState;
};

type ApiError = {
  ok: false;
  error: string;
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

declare global {
  // eslint-disable-next-line no-var
  var __codexforgeEngine__: CodexForgeEngine | undefined;
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

function jsonSuccess(state: RunState, status = 200) {
  return NextResponse.json<ApiSuccess>(
    {
      ok: true,
      state,
    },
    { status }
  );
}

function jsonError(error: string, status = 400) {
  return NextResponse.json<ApiError>(
    {
      ok: false,
      error,
    },
    { status }
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

function isValidActionName(value: string): value is ValidActionName {
  return (VALID_ACTIONS as readonly string[]).includes(value);
}

function parseJsonBody(value: unknown): RequestBody {
  if (!isRecord(value)) {
    throw new Error("Bad request: expected JSON object.");
  }

  return {
    action: value.action,
    goal: value.goal,
    nowLabel: value.nowLabel,
  };
}

function normalizeGoal(value: unknown): CodexGoal {
  if (!isRecord(value)) {
    throw new Error("Goal must be an object.");
  }

  const goal = asTrimmedString(value.goal);
  const repoPath = asTrimmedString(value.repoPath);

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
    throw new Error(
      "Action is required. Expected one of: start, approvePlan, rejectPlan, approveDiffs, rejectDiffs, reset."
    );
  }

  if (!isValidActionName(actionName)) {
    throw new Error(
      "Unknown action. Expected one of: start, approvePlan, rejectPlan, approveDiffs, rejectDiffs, reset."
    );
  }

  return actionName;
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

function getNowLabel(value: unknown): string {
  const explicit = asTrimmedString(value);
  if (explicit) {
    return explicit;
  }

  return `[${new Date().toLocaleTimeString()}]`;
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
    const raw = (await req.json()) as unknown;
    const body = parseJsonBody(raw);

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