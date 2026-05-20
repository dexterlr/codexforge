import type {
  SandboxCancellationEvent,
  SandboxCancellationPlan,
  SandboxCancellationStatus,
  SandboxExecutionRequest,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";
import { buildSandboxExecutionRequest } from "./sandbox-execution-request";

const CANCELLATION_EVENTS: readonly Omit<SandboxCancellationEvent, "eventId" | "noRealAction">[] = [
  {
    order: 1,
    label: "Cancel queued sandbox",
    status: "available",
    detail: "Queued sandbox state can be marked cancelled before simulated progress.",
  },
  {
    order: 2,
    label: "Stop simulated progress",
    status: "simulated",
    detail: "Progress labels stop; no worker, process, or renderer exists.",
  },
  {
    order: 3,
    label: "Mark fake artifacts incomplete",
    status: "simulated",
    detail: "Fake artifact placeholders become incomplete and remain clearly labeled.",
  },
  {
    order: 4,
    label: "Preserve fake logs",
    status: "available",
    detail: "Simulated logs are retained in memory for review handoff only.",
  },
  {
    order: 5,
    label: "Mark review required",
    status: "available",
    detail: "Cancellation path still requires operator review.",
  },
  {
    order: 6,
    label: "Future executor kill-switch requirement",
    status: "future-only",
    detail: "A real executor phase must define a kill-switch before any process launch is possible.",
  },
] as const;

export function buildSandboxCancellationEvent(
  input: Partial<SandboxCancellationEvent> & Pick<SandboxCancellationEvent, "order" | "label">
): SandboxCancellationEvent {
  return {
    eventId:
      input.eventId ??
      buildCreativeExecutionSandboxStableId("sandbox-cancellation-event", [input.order, input.label]),
    status: "unknown",
    detail: "Cancellation event is simulated.",
    ...input,
    noRealAction: true,
  };
}

export function buildSandboxCancellationPlan(
  request: SandboxExecutionRequest = buildSandboxExecutionRequest()
): SandboxCancellationPlan {
  const events = CANCELLATION_EVENTS.map((event) =>
    buildSandboxCancellationEvent({
      ...event,
      eventId: buildCreativeExecutionSandboxStableId("sandbox-cancellation-event", [
        request.requestId,
        event.order,
        event.label,
      ]),
    })
  );
  const status: SandboxCancellationStatus =
    request.sandboxMode === "cancellation-simulation" ? "simulated" : "available";
  const plan: SandboxCancellationPlan = {
    planId: buildCreativeExecutionSandboxStableId("sandbox-cancellation-plan", [request.requestId]),
    requestId: request.requestId,
    status,
    events,
    noLocalProcessToKill: "Cancellation plan says no local process to kill because the sandbox never launches one.",
    noRealRenderToStop: "Cancellation plan says no real render to stop because render execution never starts.",
    futureExecutorKillSwitchRequirement:
      "Future executor kill-switch requirement: any real executor MVP must define process ownership, cancellation semantics, artifact cleanup, and review logging before launch.",
    reviewRequired: true,
    summary: [],
  };

  return { ...plan, summary: summarizeSandboxCancellationPlan(plan) };
}

export function summarizeSandboxCancellationPlan(plan: Pick<SandboxCancellationPlan, "status" | "events" | "noLocalProcessToKill" | "noRealRenderToStop" | "futureExecutorKillSwitchRequirement">): string[] {
  return [
    `Cancellation status: ${plan.status}.`,
    `${plan.events.length} cancellation event(s) are visible.`,
    plan.noLocalProcessToKill,
    plan.noRealRenderToStop,
    plan.futureExecutorKillSwitchRequirement,
  ];
}
