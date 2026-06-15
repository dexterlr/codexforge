import type { EndToEndWorkflowHardeningPass, EndToEndWorkflowHardeningPassBoundary, EndToEndWorkflowHardeningPassModel } from "./end-to-end-workflow-hardening-pass-types";
import { buildEndToEndWorkflowHardeningPassStableKey } from "./end-to-end-workflow-hardening-pass-types";

export const END_TO_END_WORKFLOW_HARDENING_PASS_LANGUAGE = [
  "End-to-end workflow hardening pass",
  "End-to-end workflow hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness status",
] as const;

export function buildEndToEndWorkflowHardeningPass(input: Omit<EndToEndWorkflowHardeningPass, "id"> & { idHint: string }): EndToEndWorkflowHardeningPass {
  const { idHint, ...pass } = input;
  return { id: buildEndToEndWorkflowHardeningPassStableKey("end-to-end-workflow-hardening-pass", idHint, input.status), ...pass };
}

export function buildEndToEndWorkflowHardeningPasses(): EndToEndWorkflowHardeningPass[] {
  return [
    buildEndToEndWorkflowHardeningPass({
      idHint: "end-to-end-workflow-hardening-pass-packet",
      status: "blocked",
      endToEndWorkflowHardeningIdentity: "End-to-end workflow hardening identity: end-to-end-workflow-hardening-pass-packet.",
      hardeningGroups: [
        "Hardening groups: approval gates, evidence redaction, result rejection, recovery rollback, boundary readiness, timeout/logging, privacy, and release-candidate readiness.",
      ],
      trialEvidenceResultRecoveryStatus: [
        "Trial/evidence/result/recovery status: trial plan is review-only, evidence is not ingested automatically, results are not stored, and recovery is not triggered from this UI.",
      ],
      boundaryReadinessStatus: [
        "Boundary readiness status: provider, local model, connector, automation, file patch, test execution, evidence, result, recovery, and hardening boundaries remain approval-gated and blocked until implemented outside this page.",
      ],
      releaseCandidateReadinessChecklist: [
        "Release candidate readiness checklist: release candidate needs reviewed test status, workflow plan/trial status, evidence/result/recovery/hardening status, and unresolved blocker list before any controlled rollout.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, execute workflows, mutate files, mutate memory, apply patches, run commands, persist settings, auto-apply policies, or clear blockers automatically.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved hardening blockers: missing approved change set, missing operator approval, missing boundary evidence, missing release-candidate readiness, and unresolved safety shortcuts.",
      ],
      releaseCandidateRoute: "Release candidate route: /codexforge-end-to-end-workflow-release-candidate summarizes release-candidate readiness without going live.",
      unifiedExecutionGapReportRoute: "Unified execution gap report route: /unified-execution-boundary-gap-report summarizes remaining execution gaps without running probes.",
      nextRecommendedAction: "Next recommended action: keep unresolved hardening blockers blocked until approved changes, boundary evidence, release-candidate readiness, and operator approval are complete outside this page.",
      advancedHardeningPassDetails: "Advanced hardening pass details: End-to-end workflow hardening pass is review-only. End-to-end workflow hardening pass does not apply changes, hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked. It does not execute workflows, mutate files, mutate memory, apply patches, run commands, persist settings, auto-apply policies, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndWorkflowHardeningPassBoundary(): EndToEndWorkflowHardeningPassBoundary {
  return { reviewOnly: true, approvalRequired: true, hardeningApplyAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, patchApplyAllowedFromUi: false, commandExecutionAllowedFromUi: false, policyAutoApplyAllowedFromUi: false, settingsPersistenceAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndWorkflowHardeningPass(model: Pick<EndToEndWorkflowHardeningPassModel, "hardeningPasses">): string {
  return "End-to-end workflow hardening pass summarizes " + model.hardeningPasses.length + " hardening pass review packet. End-to-end workflow hardening pass does not apply changes, hardening changes require explicit operator approval, and unresolved hardening blockers stay blocked.";
}

export function buildEndToEndWorkflowHardeningPassModel(): EndToEndWorkflowHardeningPassModel {
  const hardeningPasses = buildEndToEndWorkflowHardeningPasses();
  const model: EndToEndWorkflowHardeningPassModel = {
    title: "End-to-end workflow hardening pass",
    summary: "",
    hardeningPasses,
    boundary: buildEndToEndWorkflowHardeningPassBoundary(),
    language: [...END_TO_END_WORKFLOW_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "End-to-end workflow hardening pass",
      "End-to-end workflow hardening identity",
      "Hardening groups",
      "Trial/evidence/result/recovery status",
      "Boundary readiness status",
      "Release candidate readiness checklist",
      "Denied hardening actions",
      "Unresolved hardening blockers",
      "Release candidate route",
      "Unified execution gap report route",
      "Next recommended action",
      "End-to-end workflow hardening pass does not apply changes",
      "Hardening changes require explicit operator approval",
      "Unresolved hardening blockers stay blocked",
      "advanced hardening pass details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndWorkflowHardeningPass(model) };
}
