import type { DailyBetaActivationHardeningPass, DailyBetaActivationHardeningPassBoundary, DailyBetaActivationHardeningPassModel } from "./daily-beta-activation-hardening-pass-types";
import { buildDailyBetaActivationHardeningPassStableKey } from "./daily-beta-activation-hardening-pass-types";

export const DAILY_BETA_ACTIVATION_HARDENING_PASS_LANGUAGE = [
  "Daily Beta activation hardening pass",
  "Daily Beta activation hardening pass does not apply changes",
  "Activation hardening changes require explicit operator approval",
  "Unresolved activation hardening blockers stay blocked",
  "Hardening groups",
  "Live boundary status",
] as const;

export function buildDailyBetaActivationHardeningPass(input: Omit<DailyBetaActivationHardeningPass, "id"> & { idHint: string }): DailyBetaActivationHardeningPass {
  const { idHint, ...hardeningPass } = input;
  return { id: buildDailyBetaActivationHardeningPassStableKey("daily-beta-activation-hardening-pass", idHint, input.status), ...hardeningPass };
}

export function buildDailyBetaActivationHardeningPasses(): DailyBetaActivationHardeningPass[] {
  return [
    buildDailyBetaActivationHardeningPass({
      idHint: "daily-beta-activation-hardening-pass-packet",
      status: "blocked",
      activationHardeningIdentity: "Activation hardening identity: daily-beta-activation-hardening-pass-packet.",
      hardeningGroups: [
        "Hardening groups: checklist/dry-run/evidence/result/recovery status, live boundary status, operator readiness checklist, denied hardening actions, unresolved hardening blockers, activation release candidate route, operator readiness review route, and next recommended action.",
      ],
      checklistDryRunEvidenceResultRecoveryStatus: [
        "Checklist/dry-run/evidence/result/recovery status: checklist, dry-run, evidence, result, and recovery reviews remain blocked until reviewed by an operator and do not execute, ingest, store, or trigger anything from UI.",
      ],
      liveBoundaryStatus: [
        "Live boundary status: final live execution boundary signoff remains review-only and does not sign off live execution, call providers, call local models, call connectors, create automations, mutate files, or run tests.",
      ],
      operatorReadinessChecklist: [
        "Operator readiness checklist: release owner, support owner, rollback owner, evidence owner, approval owner, and handoff owner must be named before any activation hardening change request.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, execute workflows, trigger recovery, mutate files, mutate memory, persist settings, persist approval decisions, call providers, call local models, call connectors, create automations, store outputs, or go live.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved activation hardening blockers: missing operator approval, unresolved checklist/dry-run/evidence/result/recovery blocker, missing live boundary approval, missing operator readiness owner, and missing release candidate review.",
      ],
      activationReleaseCandidateRoute: "Activation release candidate route: /codexforge-daily-beta-activation-release-candidate summarizes readiness without going live.",
      operatorReadinessReviewRoute: "Operator readiness review route: /daily-beta-activation-operator-readiness-review reviews operator readiness without activating Daily Beta or sending handoff.",
      nextRecommendedAction: "Next recommended action: keep activation hardening blocked and review the activation release candidate plus operator readiness route before requesting approval outside this page.",
      advancedDailyBetaActivationHardeningPassDetails: "Advanced Daily Beta activation hardening pass details: Daily Beta activation hardening pass is review-only. Daily Beta activation hardening pass does not apply changes, activation hardening changes require explicit operator approval, and unresolved activation hardening blockers stay blocked. It does not apply changes, execute workflows, trigger recovery, mutate files, mutate memory, persist settings, persist approval decisions, call providers, call local models, call connectors, create automations, store outputs, go live, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationHardeningPassBoundary(): DailyBetaActivationHardeningPassBoundary {
  return { reviewOnly: true, approvalRequired: true, hardeningApplyAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationExecutionAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationHardeningPass(model: Pick<DailyBetaActivationHardeningPassModel, "hardeningPasses">): string {
  return "Daily Beta activation hardening pass summarizes " + model.hardeningPasses.length + " hardening packet without applying changes. Activation hardening changes require explicit operator approval, and unresolved activation hardening blockers stay blocked.";
}

export function buildDailyBetaActivationHardeningPassModel(): DailyBetaActivationHardeningPassModel {
  const hardeningPasses = buildDailyBetaActivationHardeningPasses();
  const model: DailyBetaActivationHardeningPassModel = {
    title: "Daily Beta activation hardening pass",
    summary: "",
    hardeningPasses,
    boundary: buildDailyBetaActivationHardeningPassBoundary(),
    language: [...DAILY_BETA_ACTIVATION_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation hardening pass",
      "Activation hardening identity",
      "Hardening groups",
      "Checklist/dry-run/evidence/result/recovery status",
      "Live boundary status",
      "Operator readiness checklist",
      "Denied hardening actions",
      "Unresolved activation hardening blockers",
      "Activation release candidate route",
      "Operator readiness review route",
      "Next recommended action",
      "Daily Beta activation hardening pass does not apply changes",
      "Activation hardening changes require explicit operator approval",
      "Unresolved activation hardening blockers stay blocked",
      "advanced Daily Beta activation hardening pass details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationHardeningPass(model) };
}
