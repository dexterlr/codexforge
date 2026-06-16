import type { DailyBetaActivationReadinessLock, DailyBetaActivationReadinessLockBoundary, DailyBetaActivationReadinessLockModel } from "./daily-beta-activation-readiness-lock-types";
import { buildDailyBetaActivationReadinessLockStableKey } from "./daily-beta-activation-readiness-lock-types";

export const DAILY_BETA_ACTIVATION_READINESS_LOCK_LANGUAGE = [
  "Daily Beta activation readiness lock",
  "Daily Beta activation readiness lock does not lock readiness automatically",
  "Readiness lock requires explicit operator approval",
  "Unresolved readiness lock blockers stay blocked",
  "Lock criteria groups",
  "Rollback checklist",
] as const;

export function buildDailyBetaActivationReadinessLock(input: Omit<DailyBetaActivationReadinessLock, "id"> & { idHint: string }): DailyBetaActivationReadinessLock {
  const { idHint, ...readinessLock } = input;
  return { id: buildDailyBetaActivationReadinessLockStableKey("daily-beta-activation-readiness-lock", idHint, input.status), ...readinessLock };
}

export function buildDailyBetaActivationReadinessLocks(): DailyBetaActivationReadinessLock[] {
  return [
    buildDailyBetaActivationReadinessLock({
      idHint: "daily-beta-activation-readiness-lock-packet",
      status: "blocked",
      activationReadinessLockIdentity: "Activation readiness lock identity: daily-beta-activation-readiness-lock-packet.",
      lockCriteriaGroups: [
        "Lock criteria groups: final gate checklist, trial/feedback/regression/hardening checklist, handoff checklist, rollback checklist, denied readiness lock actions, unresolved readiness lock blockers, activation candidate route, checkpoint docs route, and next recommended action.",
      ],
      finalGateChecklist: [
        "Final gate checklist: final gate approval, live boundary approval, operator readiness approval, activation candidate review, and no unresolved final gate blockers remain manual prerequisites outside this page.",
      ],
      trialFeedbackRegressionHardeningChecklist: [
        "Trial/feedback/regression/hardening checklist: controlled trial review, feedback review, regression review, and final hardening review remain review-only and do not execute, ingest, test, fix, or apply anything from UI.",
      ],
      handoffChecklist: [
        "Handoff checklist: release handoff requires explicit operator approval and is not sent, applied, exported, persisted, or stored automatically from this page.",
      ],
      rollbackChecklist: [
        "Rollback checklist: rollback owner, stop condition, support route, recovery review, evidence source, and release communication note must stay reviewed before readiness lock can be requested.",
      ],
      deniedReadinessLockActions: [
        "Denied readiness lock actions: lock readiness automatically, freeze readiness, activate Daily Beta, go live, send handoff, export files automatically, mutate files, mutate memory, execute workflows, call providers, call local models, call connectors, create automations, persist approvals, store outputs, or store credentials.",
      ],
      unresolvedReadinessLockBlockers: [
        "Unresolved readiness lock blockers: missing readiness lock approval, unresolved final gate checklist item, unresolved trial/feedback/regression/hardening blocker, missing handoff approval, missing rollback checklist owner, and missing checkpoint docs review.",
      ],
      activationCandidateRoute: "Activation candidate route: /codexforge-daily-beta-activation-candidate summarizes activation readiness without going live.",
      checkpointDocsRoute: "Checkpoint docs route: docs/codexforge-checkpoint-current.md documents the highest local all-smoke phase and review-only posture.",
      nextRecommendedAction: "Next recommended action: keep readiness unlocked and review activation candidate plus checkpoint docs before requesting explicit readiness lock approval outside this page.",
      advancedDailyBetaActivationReadinessLockDetails: "Advanced Daily Beta activation readiness lock details: Daily Beta activation readiness lock is review-only. Daily Beta activation readiness lock does not lock readiness automatically, readiness lock requires explicit operator approval, and unresolved readiness lock blockers stay blocked. It does not lock readiness automatically, freeze readiness, activate Daily Beta, go live, send handoff, export files automatically, mutate files, mutate memory, execute workflows, call providers, call local models, call connectors, create automations, persist approvals, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationReadinessLockBoundary(): DailyBetaActivationReadinessLockBoundary {
  return { reviewOnly: true, approvalRequired: true, readinessLockAutomationAllowedFromUi: false, dailyBetaActivationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationReadinessLock(model: Pick<DailyBetaActivationReadinessLockModel, "readinessLocks">): string {
  return "Daily Beta activation readiness lock summarizes " + model.readinessLocks.length + " readiness lock packet without locking readiness automatically. Readiness lock requires explicit operator approval, and unresolved readiness lock blockers stay blocked.";
}

export function buildDailyBetaActivationReadinessLockModel(): DailyBetaActivationReadinessLockModel {
  const readinessLocks = buildDailyBetaActivationReadinessLocks();
  const model: DailyBetaActivationReadinessLockModel = {
    title: "Daily Beta activation readiness lock",
    summary: "",
    readinessLocks,
    boundary: buildDailyBetaActivationReadinessLockBoundary(),
    language: [...DAILY_BETA_ACTIVATION_READINESS_LOCK_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation readiness lock",
      "Activation readiness lock identity",
      "Lock criteria groups",
      "Final gate checklist",
      "Trial/feedback/regression/hardening checklist",
      "Handoff checklist",
      "Rollback checklist",
      "Denied readiness lock actions",
      "Unresolved readiness lock blockers",
      "Activation candidate route",
      "Checkpoint docs route",
      "Next recommended action",
      "Daily Beta activation readiness lock does not lock readiness automatically",
      "Readiness lock requires explicit operator approval",
      "Unresolved readiness lock blockers stay blocked",
      "advanced Daily Beta activation readiness lock details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationReadinessLock(model) };
}
