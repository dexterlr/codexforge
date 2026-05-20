import type {
  SandboxExecutionRequest,
  SandboxLogLevel,
  SandboxLogLine,
  SandboxLogSimulation,
  SandboxRunStepId,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";

const LOG_DEFINITIONS: ReadonlyArray<{
  level: SandboxLogLevel;
  source: string;
  message: string;
  relatedStepId: SandboxRunStepId;
  reviewNote: string;
}> = [
  {
    level: "info",
    source: "sandbox-request",
    message: "Simulated request accepted; no executor invoked.",
    relatedStepId: "request-accepted",
    reviewNote: "Metadata-only lifecycle.",
  },
  {
    level: "warning",
    source: "sandbox-policy",
    message: "Future executor remains blocked until approval, health, and kill-switch requirements exist.",
    relatedStepId: "policy-reviewed",
    reviewNote: "Policy warning is simulated.",
  },
  {
    level: "blocked",
    source: "sandbox-execution",
    message: "Renderer launch, command execution, local HTTP call, provider call, and file write are blocked.",
    relatedStepId: "execution-start-simulated",
    reviewNote: "No real command output is claimed.",
  },
  {
    level: "info",
    source: "sandbox-progress",
    message: "Simulated progress label: 50 percent placeholder.",
    relatedStepId: "progress-simulated",
    reviewNote: "No worker progress was polled.",
  },
  {
    level: "success",
    source: "sandbox-verification",
    message: "Simulated verification confirms no real execution occurred.",
    relatedStepId: "verification-simulated",
    reviewNote: "Verification is a sandbox report, not external proof.",
  },
] as const;

export function buildSandboxLogLine(
  input: Partial<SandboxLogLine> & Pick<SandboxLogLine, "order" | "level" | "source" | "message" | "relatedStepId">
): SandboxLogLine {
  return {
    lineId:
      input.lineId ??
      buildCreativeExecutionSandboxStableId("sandbox-log-line", [
        input.order,
        input.level,
        input.source,
      ]),
    reviewNote: "Simulated log line; no real command output.",
    ...input,
    simulated: true,
  };
}

export function buildSandboxLogSimulation(
  request: SandboxExecutionRequest = buildSandboxExecutionRequest()
): SandboxLogSimulation {
  const cappedAt = 12;
  const lines = LOG_DEFINITIONS.slice(0, cappedAt).map((line, index) =>
    buildSandboxLogLine({
      ...line,
      order: index + 1,
      lineId: buildCreativeExecutionSandboxStableId("sandbox-log-line", [
        request.requestId,
        index + 1,
        line.source,
      ]),
    })
  );
  const simulation: SandboxLogSimulation = {
    logId: buildCreativeExecutionSandboxStableId("sandbox-log-simulation", [request.requestId]),
    requestId: request.requestId,
    lines,
    cappedAt,
    summary: [],
  };

  return { ...simulation, summary: summarizeSandboxLogSimulation(simulation) };
}

export function summarizeSandboxLogSimulation(simulation: Pick<SandboxLogSimulation, "lines" | "cappedAt">): string[] {
  return [
    `${simulation.lines.length} deterministic simulated log line(s) are visible.`,
    `Logs are capped at ${simulation.cappedAt} line(s).`,
    "No real command output, renderer output, endpoint output, or provider output is claimed.",
  ];
}
