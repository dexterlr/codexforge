import type { PrivateAlphaRunState } from "./private-alpha-types";

export const PRIVATE_ALPHA_INITIAL_RUN_STATE = "awaiting_approval" as const;

export const PRIVATE_ALPHA_TRANSITION_TABLE: Readonly<
  Record<
    PrivateAlphaRunState,
    Readonly<Partial<Record<"approve" | "cancel" | "block", PrivateAlphaRunState>>>
  >
> = {
  awaiting_approval: {
    approve: "approved",
    cancel: "canceled",
    block: "blocked",
  },
  approved: {
    cancel: "canceled",
    block: "blocked",
  },
  canceled: {},
  blocked: {},
} as const;

export type PrivateAlphaStateTransitionAction =
  | "approve"
  | "cancel"
  | "block";

export type PrivateAlphaStateTransitionResult =
  | Readonly<{
      ok: true;
      nextState: PrivateAlphaRunState;
    }>
  | Readonly<{
      ok: false;
      message: string;
    }>;

export function getPrivateAlphaNextState(
  currentState: PrivateAlphaRunState,
  action: PrivateAlphaStateTransitionAction
): PrivateAlphaRunState | null {
  return PRIVATE_ALPHA_TRANSITION_TABLE[currentState][action] ?? null;
}

export function assertPrivateAlphaTransition(
  currentState: PrivateAlphaRunState,
  action: PrivateAlphaStateTransitionAction
): PrivateAlphaStateTransitionResult {
  const nextState = getPrivateAlphaNextState(currentState, action);
  if (nextState) {
    return {
      ok: true,
      nextState,
    };
  }

  return {
    ok: false,
    message: `Transition ${currentState} -> ${action} is not allowed.`,
  };
}
