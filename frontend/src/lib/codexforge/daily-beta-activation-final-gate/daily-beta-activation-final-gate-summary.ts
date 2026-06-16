import type { DailyBetaActivationFinalGate, DailyBetaActivationFinalGateBoundary, DailyBetaActivationFinalGateModel } from "./daily-beta-activation-final-gate-types";
import { buildDailyBetaActivationFinalGateStableKey } from "./daily-beta-activation-final-gate-types";

export const DAILY_BETA_ACTIVATION_FINAL_GATE_LANGUAGE = [
  "Daily Beta activation final gate",
  "Daily Beta activation final gate does not activate Daily Beta",
  "Final gate decisions require explicit operator approval",
  "Unresolved final gate blockers stay blocked",
  "Final gate groups",
  "Live boundary status",
] as const;

export function buildDailyBetaActivationFinalGate(input: Omit<DailyBetaActivationFinalGate, "id"> & { idHint: string }): DailyBetaActivationFinalGate {
  const { idHint, ...finalGate } = input;
  return { id: buildDailyBetaActivationFinalGateStableKey("daily-beta-activation-final-gate", idHint, input.status), ...finalGate };
}

export function buildDailyBetaActivationFinalGates(): DailyBetaActivationFinalGate[] {
  return [
    buildDailyBetaActivationFinalGate({
      idHint: "daily-beta-activation-final-gate-packet",
      status: "blocked",
      activationFinalGateIdentity: "Activation final gate identity: daily-beta-activation-final-gate-packet.",
      finalGateGroups: [
        "Final gate groups: activation checklist status, dry-run/evidence/result/recovery/hardening status, live boundary status, operator readiness status, denied final gate actions, unresolved final gate blockers, controlled operator trial route, feedback inbox route, and next recommended action.",
      ],
      activationChecklistStatus: [
        "Activation checklist status: Daily Beta activation checklist review is represented, but this final gate does not activate Daily Beta or persist activation settings.",
      ],
      dryRunEvidenceResultRecoveryHardeningStatus: [
        "Dry-run/evidence/result/recovery/hardening status: dry-runs are not run, evidence is not auto-ingested, results are not stored, recovery is not triggered, and hardening is not applied from this page.",
      ],
      liveBoundaryStatus: [
        "Live boundary status: final live execution boundary signoff remains review-only and does not route live provider, local model, connector, automation, file, test, or workflow traffic.",
      ],
      operatorReadinessStatus: [
        "Operator readiness status: operator readiness is blocked until explicit operator approval, support owner review, rollback owner review, and release handoff review happen outside this page.",
      ],
      deniedFinalGateActions: [
        "Denied final gate actions: pass the final gate automatically, activate Daily Beta, execute workflows, run controlled operator trials, trigger recovery, apply hardening, go live, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approval decisions, store outputs, or store credentials.",
      ],
      unresolvedFinalGateBlockers: [
        "Unresolved final gate blockers: missing final gate approval, unresolved checklist/dry-run/evidence/result/recovery/hardening blocker, missing live boundary approval, missing operator readiness approval, and missing controlled operator trial review.",
      ],
      controlledOperatorTrialRoute: "Controlled operator trial route: /daily-beta-activation-controlled-operator-trial previews controlled trial behavior without executing workflows.",
      feedbackInboxRoute: "Feedback inbox route: /daily-beta-activation-feedback-inbox reviews activation feedback without auto-ingesting feedback.",
      nextRecommendedAction: "Next recommended action: keep the Daily Beta activation final gate blocked and review controlled operator trial plus feedback inbox before requesting explicit operator approval outside this page.",
      advancedDailyBetaActivationFinalGateDetails: "Advanced Daily Beta activation final gate details: Daily Beta activation final gate is review-only. Daily Beta activation final gate does not activate Daily Beta, final gate decisions require explicit operator approval, and unresolved final gate blockers stay blocked. It does not pass the final gate automatically, activate Daily Beta, execute workflows, run controlled operator trials, trigger recovery, apply hardening, go live, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approval decisions, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationFinalGateBoundary(): DailyBetaActivationFinalGateBoundary {
  return { reviewOnly: true, approvalRequired: true, dailyBetaActivationAllowedFromUi: false, finalGateAutoPassAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationFinalGate(model: Pick<DailyBetaActivationFinalGateModel, "finalGates">): string {
  return "Daily Beta activation final gate summarizes " + model.finalGates.length + " final gate packet without activating Daily Beta. Final gate decisions require explicit operator approval, and unresolved final gate blockers stay blocked.";
}

export function buildDailyBetaActivationFinalGateModel(): DailyBetaActivationFinalGateModel {
  const finalGates = buildDailyBetaActivationFinalGates();
  const model: DailyBetaActivationFinalGateModel = {
    title: "Daily Beta activation final gate",
    summary: "",
    finalGates,
    boundary: buildDailyBetaActivationFinalGateBoundary(),
    language: [...DAILY_BETA_ACTIVATION_FINAL_GATE_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation final gate",
      "Activation final gate identity",
      "Final gate groups",
      "Activation checklist status",
      "Dry-run/evidence/result/recovery/hardening status",
      "Live boundary status",
      "Operator readiness status",
      "Denied final gate actions",
      "Unresolved final gate blockers",
      "Controlled operator trial route",
      "Feedback inbox route",
      "Next recommended action",
      "Daily Beta activation final gate does not activate Daily Beta",
      "Final gate decisions require explicit operator approval",
      "Unresolved final gate blockers stay blocked",
      "advanced Daily Beta activation final gate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationFinalGate(model) };
}
