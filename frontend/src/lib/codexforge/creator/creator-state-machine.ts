import type { CreatorProjectStatus } from "./creator-types";

export const CREATOR_INITIAL_STATE: CreatorProjectStatus = "draft";

export const CREATOR_TRANSITION_TABLE = Object.freeze({
  draft: ["awaiting_generation_approval", "failed", "canceled"],
  awaiting_generation_approval: ["approved", "failed", "canceled"],
  approved: ["generating", "failed", "canceled"],
  generating: ["validating", "rejected_output", "failed"],
  validating: ["rejected_output", "ready", "failed"],
  rejected_output: ["repair_requested", "canceled"],
  ready: ["preview_available", "repair_requested", "exported", "canceled"],
  preview_available: ["ready", "canceled"],
  repair_requested: ["awaiting_repair_approval", "failed", "canceled"],
  awaiting_repair_approval: ["repair_approved", "failed", "canceled"],
  repair_approved: ["repairing", "failed", "canceled"],
  repairing: ["validating", "failed"],
  failed: ["canceled", "exported"],
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
