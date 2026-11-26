import type { CreatorProjectStatus } from "./creator-types";

export const CREATOR_INITIAL_STATE: CreatorProjectStatus = "draft";

export const CREATOR_TRANSITION_TABLE = Object.freeze({
  draft: ["awaiting_plan_approval", "awaiting_generation_approval", "failed", "canceled"],
  awaiting_plan_approval: ["awaiting_generation_approval", "failed", "canceled"],
  awaiting_generation_approval: ["approved", "failed", "canceled"],
  approved: ["generating", "failed", "canceled"],
  generating: ["validating", "rejected_output", "stopping", "failed"],
  validating: ["rejected_output", "ready", "failed"],
  rejected_output: ["validating", "ready", "repair_requested", "canceled"],
  ready: ["preview_available", "awaiting_revision_plan_approval", "repair_requested", "exported", "canceled"],
  preview_available: ["ready", "canceled"],
  awaiting_revision_plan_approval: ["awaiting_revision_generation_approval", "failed", "canceled"],
  awaiting_revision_generation_approval: ["revision_generation_approved", "failed", "canceled"],
  revision_generation_approved: ["revising", "failed", "canceled"],
  revising: ["validating", "rejected_output", "stopping", "failed"],
  stopping: ["stopped"],
  stopped: ["ready"],
  repair_requested: ["awaiting_repair_approval", "failed", "canceled"],
  awaiting_repair_approval: ["repair_approved", "failed", "canceled"],
  repair_approved: ["repairing", "failed", "canceled"],
  repairing: ["validating", "stopping", "failed"],
  failed: ["ready", "canceled", "exported"],
  canceled: [],
  exported: [],
}) satisfies Readonly<Record<CreatorProjectStatus, readonly CreatorProjectStatus[]>>;

export class CreatorTransitionError extends Error {
  constructor(
    readonly previousState: CreatorProjectStatus,
    readonly requestedState: CreatorProjectStatus
  ) {
    super(`Creator transition ${previousState} -> ${requestedState} is not allowed.`);
    this.name = "CreatorTransitionError";
  }
}

export function canTransitionCreatorProject(
  previousState: CreatorProjectStatus,
  requestedState: CreatorProjectStatus
): boolean {
  const allowed = CREATOR_TRANSITION_TABLE[previousState] as readonly CreatorProjectStatus[];
  return allowed.includes(requestedState);
}

export function assertCreatorTransition(
  previousState: CreatorProjectStatus,
  requestedState: CreatorProjectStatus
): void {
  if (!canTransitionCreatorProject(previousState, requestedState)) {
    throw new CreatorTransitionError(previousState, requestedState);
  }
}
