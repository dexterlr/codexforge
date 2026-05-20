import type {
  SandboxExecutionRequest,
  SandboxLifecycle,
  SandboxLifecycleEvent,
  SandboxLifecycleEventKind,
  SandboxLifecycleStatus,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";

type EventDefinition = {
  kind: SandboxLifecycleEventKind;
  label: string;
  status: SandboxLifecycleStatus;
  detail: string;
};

const EVENT_DEFINITIONS: readonly EventDefinition[] = [
  { kind: "created", label: "Created", status: "completed", detail: "Sandbox request created as deterministic data." },
  { kind: "queued", label: "Queued", status: "simulated", detail: "Queue state is simulated without a worker." },
  { kind: "preflight-reviewed", label: "Preflight reviewed", status: "completed", detail: "Policy, approval, and bridge health posture are reviewed." },
  { kind: "dry-run-started", label: "Dry-run started", status: "simulated", detail: "Dry-run is a fake lifecycle state only." },
  { kind: "running-simulated", label: "Running simulated", status: "simulated", detail: "Running state is simulated and no renderer starts." },
  { kind: "progress-updated", label: "Progress updated", status: "simulated", detail: "Progress update is a deterministic label." },
  { kind: "output-placeholder-created", label: "Output placeholder created", status: "simulated", detail: "Placeholder is a fake label, not a file." },
  { kind: "cancelled", label: "Cancelled", status: "cancelled", detail: "Cancellation branch is simulated; no local process is killed." },
  { kind: "failed-simulated", label: "Failed simulated", status: "warning", detail: "Failure branch is represented as reviewable fake state." },
  { kind: "completed-simulated", label: "Completed simulated", status: "completed", detail: "Completion is fake and cannot prove real output." },
  { kind: "handoff-ready", label: "Handoff ready", status: "completed", detail: "Review handoff is ready for copy-only review." },
  { kind: "review-required", label: "Review required", status: "warning", detail: "Operator review remains required." },
  { kind: "blocked", label: "Blocked", status: "blocked", detail: "Real execution is blocked by sandbox policy." },
] as const;

function selectEventsForMode(request: SandboxExecutionRequest): EventDefinition[] {
  if (request.sandboxMode === "cancellation-simulation") {
    return EVENT_DEFINITIONS.filter((event) =>
      [
        "created",
        "queued",
        "preflight-reviewed",
        "running-simulated",
        "progress-updated",
        "cancelled",
        "review-required",
      ].includes(event.kind)
    );
  }

  if (request.sandboxMode === "dry-run-simulation") {
    return EVENT_DEFINITIONS.filter((event) =>
      ["created", "preflight-reviewed", "dry-run-started", "review-required", "handoff-ready"].includes(event.kind)
    );
  }

  if (request.sandboxMode === "verification-simulation") {
    return EVENT_DEFINITIONS.filter((event) =>
      ["created", "preflight-reviewed", "running-simulated", "completed-simulated", "handoff-ready"].includes(event.kind)
    );
  }

  return EVENT_DEFINITIONS.filter((event) =>
    [
      "created",
      "queued",
      "preflight-reviewed",
      "dry-run-started",
      "running-simulated",
      "progress-updated",
      "output-placeholder-created",
      "completed-simulated",
      "review-required",
      "handoff-ready",
    ].includes(event.kind)
  );
}

export function buildSandboxLifecycleEvent(
  input: Partial<SandboxLifecycleEvent> & Pick<SandboxLifecycleEvent, "kind" | "order">
): SandboxLifecycleEvent {
  const definition = EVENT_DEFINITIONS.find((event) => event.kind === input.kind);
  return {
    eventId:
      input.eventId ??
      buildCreativeExecutionSandboxStableId("sandbox-lifecycle-event", [input.kind, input.order]),
    label: definition?.label ?? input.kind,
    status: definition?.status ?? "pending",
    detail: definition?.detail ?? "Sandbox lifecycle event is simulated.",
    sideEffectSummary: "No real event persistence, no Brain mutation, no command execution, and no file writes.",
    noRealWorldAction: true,
    ...input,
  };
}

export function buildSandboxLifecycle(
  request: SandboxExecutionRequest = buildSandboxExecutionRequest()
): SandboxLifecycle {
  const events = selectEventsForMode(request).map((event, index) =>
    buildSandboxLifecycleEvent({
      kind: event.kind,
      order: index + 1,
      eventId: buildCreativeExecutionSandboxStableId("sandbox-lifecycle-event", [
        request.requestId,
        event.kind,
        index + 1,
      ]),
      simulatedTimestampLabel: `simulated-t+${String(index).padStart(2, "0")}`,
    })
  );
  const status =
    request.sandboxMode === "cancellation-simulation"
      ? "cancelled"
      : events.some((event) => event.status === "blocked")
        ? "blocked"
        : "completed";
  const lifecycle: SandboxLifecycle = {
    lifecycleId: buildCreativeExecutionSandboxStableId("sandbox-lifecycle", [request.requestId]),
    requestId: request.requestId,
    events,
    status,
    summary: [],
  };

  return { ...lifecycle, summary: summarizeSandboxLifecycle(lifecycle) };
}

export function summarizeSandboxLifecycle(lifecycle: Pick<SandboxLifecycle, "events" | "status">): string[] {
  return [
    `Lifecycle status: ${lifecycle.status}.`,
    `${lifecycle.events.length} lifecycle event(s) are simulated.`,
    "No runtime clock, no real event persistence, and no Brain mutation are used.",
  ];
}
