import type { EndToEndRolloutHardeningPass, EndToEndRolloutHardeningPassBoundary, EndToEndRolloutHardeningPassModel } from "./end-to-end-rollout-hardening-pass-types";
import { buildEndToEndRolloutHardeningPassStableKey } from "./end-to-end-rollout-hardening-pass-types";

export const END_TO_END_ROLLOUT_HARDENING_PASS_LANGUAGE = [
  "End-to-end rollout hardening pass",
  "End-to-end rollout hardening pass does not apply changes",
  "Rollout hardening changes require explicit operator approval",
  "Unresolved rollout hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness checklist",
] as const;

export function buildEndToEndRolloutHardeningPass(input: Omit<EndToEndRolloutHardeningPass, "id"> & { idHint: string }): EndToEndRolloutHardeningPass {
  const { idHint, ...pass } = input;
  return { id: buildEndToEndRolloutHardeningPassStableKey("end-to-end-rollout-hardening-pass", idHint, input.status), ...pass };
}

export function buildEndToEndRolloutHardeningPasses(): EndToEndRolloutHardeningPass[] {
  return [
    buildEndToEndRolloutHardeningPass({
      idHint: "end-to-end-rollout-hardening-pass-packet",
      status: "blocked",
      rolloutHardeningPassIdentity: "Rollout hardening pass identity: end-to-end-rollout-hardening-pass-packet.",
      hardeningGroups: [
        "Hardening groups: rollout review hardening, feedback hardening, regression hardening, boundary readiness hardening, final signoff handoff, and Daily Beta candidate handoff.",
      ],
      rolloutReviewStatus: [
        "Rollout review status: rollout decisions remain blocked until explicit operator approval exists outside this page.",
      ],
      feedbackStatus: [
        "Feedback status: feedback is not auto-ingested and requires operator review before any hardening use.",
      ],
      regressionStatus: [
        "Regression status: regressions are reviewed without running tests, applying fixes, or claiming validation evidence from this page.",
      ],
      boundaryReadinessChecklist: [
        "Boundary readiness checklist: provider, local model, connector, automation, file, test, feedback, memory, credential, output, audit, rollback, and stop boundaries remain approval-gated.",
      ],
      deniedHardeningActions: [
        "Denied hardening actions: apply changes, execute workflows, run rollout, run tests, mutate files, mutate memory, persist settings, approve actions, call providers, call local models, call connectors, or create automations.",
      ],
      unresolvedHardeningBlockers: [
        "Unresolved hardening blockers: missing approved hardening owner, unresolved feedback blockers, unresolved regression blockers, unresolved live boundary blockers, and missing Daily Beta candidate owner.",
      ],
      finalLiveBoundarySignoffRoute: "Final live boundary signoff route: /live-execution-boundary-final-signoff reviews live boundaries without signing off automatically.",
      dailyBetaCandidateRoute: "Daily Beta candidate route: /codexforge-end-to-end-daily-beta-candidate summarizes readiness without going live.",
      nextRecommendedAction: "Next recommended action: keep rollout hardening blocked until approved hardening evidence and explicit operator approval exist outside this page.",
      advancedRolloutHardeningPassDetails: "Advanced rollout hardening pass details: End-to-end rollout hardening pass is review-only. End-to-end rollout hardening pass does not apply changes, rollout hardening changes require explicit operator approval, and unresolved rollout hardening blockers stay blocked. It does not apply changes, execute workflows, run rollout, run tests, mutate files, mutate memory, persist settings, call providers, call local models, call connectors, create automations, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndRolloutHardeningPassBoundary(): EndToEndRolloutHardeningPassBoundary {
  return { reviewOnly: true, approvalRequired: true, hardeningApplyAllowedFromUi: false, workflowExecutionAllowedFromUi: false, rolloutExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndRolloutHardeningPass(model: Pick<EndToEndRolloutHardeningPassModel, "passes">): string {
  return "End-to-end rollout hardening pass summarizes " + model.passes.length + " hardening packet without applying changes. Rollout hardening changes require explicit operator approval, and unresolved rollout hardening blockers stay blocked.";
}

export function buildEndToEndRolloutHardeningPassModel(): EndToEndRolloutHardeningPassModel {
  const passes = buildEndToEndRolloutHardeningPasses();
  const model: EndToEndRolloutHardeningPassModel = {
    title: "End-to-end rollout hardening pass",
    summary: "",
    passes,
    boundary: buildEndToEndRolloutHardeningPassBoundary(),
    language: [...END_TO_END_ROLLOUT_HARDENING_PASS_LANGUAGE],
    advancedDetails: [
      "End-to-end rollout hardening pass",
      "Rollout hardening pass identity",
      "Hardening groups",
      "Rollout review status",
      "Feedback status",
      "Regression status",
      "Boundary readiness checklist",
      "Denied hardening actions",
      "Unresolved hardening blockers",
      "Final live boundary signoff route",
      "Daily Beta candidate route",
      "Next recommended action",
      "End-to-end rollout hardening pass does not apply changes",
      "Rollout hardening changes require explicit operator approval",
      "Unresolved rollout hardening blockers stay blocked",
      "advanced rollout hardening pass details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndRolloutHardeningPass(model) };
}
