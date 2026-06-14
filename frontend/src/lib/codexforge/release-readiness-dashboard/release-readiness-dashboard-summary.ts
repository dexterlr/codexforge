import type {
  ReleaseReadinessDashboard,
  ReleaseReadinessDashboardBoundary,
  ReleaseReadinessDashboardModel,
} from "./release-readiness-dashboard-types";
import { buildReleaseReadinessDashboardStableKey } from "./release-readiness-dashboard-types";

export const RELEASE_READINESS_DASHBOARD_LANGUAGE = [
  "Release readiness dashboard",
  "Release readiness dashboard does not approve release",
  "Release readiness requires explicit operator approval",
  "Unresolved release risks stay blocked",
  "Readiness groups",
  "Smoke build docs status checklist",
] as const;

export function buildReleaseReadinessDashboard(
  input: Omit<ReleaseReadinessDashboard, "id"> & { idHint: string }
): ReleaseReadinessDashboard {
  const { idHint, ...dashboard } = input;
  return {
    id: buildReleaseReadinessDashboardStableKey("release-readiness-dashboard", idHint, input.status),
    ...dashboard,
  };
}

export function buildReleaseReadinessDashboards(): ReleaseReadinessDashboard[] {
  return [
    buildReleaseReadinessDashboard({
      idHint: "review-only-release-rollup",
      status: "blocked",
      releaseReadinessDashboardIdentity:
        "Release readiness dashboard identity: release-readiness-dashboard-review-only-release-rollup.",
      readinessGroups: [
        "Readiness groups: smoke, build, docs, status, approval, evidence, result, recovery, hardening, live-capable lanes, Foundation 500, and daily workflow candidate.",
      ],
      smokeBuildDocsStatusChecklist: [
        "Smoke build docs status checklist: local build, all-smoke, checkpoint documentation smoke, command UI simplification smoke, repo hygiene smoke, server smoke, and status docs need operator-reviewed logs before any release claim.",
      ],
      approvalEvidenceResultRecoveryHardeningChecklist: [
        "Approval/evidence/result/recovery/hardening checklist: each policy lane remains review-only until explicit operator approval and evidence exist outside this page.",
      ],
      liveCapableLaneReadinessChecklist: [
        "Live-capable lane readiness checklist: provider, local model, connector, automation, and unified daily workflow lanes stay blocked unless a bounded approved boundary exists.",
      ],
      deniedReadinessActions: [
        "Denied readiness actions: approve release, claim CI passed, execute workflows, launch a real daily workflow, call providers, call local models, call connectors, create automations, ingest evidence, store outputs, trigger recovery, apply hardening, mutate files, or mutate memory.",
      ],
      unresolvedReleaseRisks: [
        "Unresolved release risks: missing validation logs, unresolved approval scope, incomplete evidence review, unsafe result reuse, recovery gaps, hardening blockers, and missing live-capable boundaries.",
      ],
      foundation500MilestoneRoute:
        "Foundation 500 milestone route: /codexforge-foundation-500-milestone-review records milestone status without live execution claims.",
      firstRealDailyWorkflowCandidateRoute:
        "First real daily workflow candidate route: /first-real-daily-workflow-candidate previews a realistic daily workflow without launching it.",
      nextRecommendedAction:
        "Next recommended action: gather validation evidence and review unresolved release risks before any explicit operator release decision.",
      advancedReadinessDetails:
        "Advanced readiness details: release readiness dashboard is review-only. Release readiness dashboard does not approve release, release readiness requires explicit operator approval, and unresolved release risks stay blocked. It does not claim CI passed, execute workflows, launch real daily workflow, approve release, apply readiness, call providers, call local models, call connectors, create automations, store outputs, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildReleaseReadinessDashboardBoundary(): ReleaseReadinessDashboardBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    releaseReadinessDashboardDoesNotApproveRelease: true,
    releaseReadinessRequiresExplicitOperatorApproval: true,
    unresolvedReleaseRisksStayBlocked: true,
    releaseApprovalAllowedFromUi: false,
    ciPassedClaimedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    resultIngestionAllowedFromUi: false,
    recoveryTriggerAllowedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeReleaseReadinessDashboard(
  model: Pick<ReleaseReadinessDashboardModel, "dashboards">
): string {
  return `Release readiness dashboard summarizes ${model.dashboards.length} readiness posture without approving release. Release readiness requires explicit operator approval, and unresolved release risks stay blocked.`;
}

export function buildReleaseReadinessDashboardModel(): ReleaseReadinessDashboardModel {
  const dashboards = buildReleaseReadinessDashboards();
  const model: ReleaseReadinessDashboardModel = {
    title: "Release readiness dashboard",
    summary: "",
    dashboards,
    boundary: buildReleaseReadinessDashboardBoundary(),
    readinessLanguage: [...RELEASE_READINESS_DASHBOARD_LANGUAGE],
    advancedDetails: [
      "Release readiness dashboard",
      "Release readiness dashboard identity",
      "Readiness groups",
      "Smoke build docs status checklist",
      "Approval evidence result recovery hardening checklist",
      "Live-capable lane readiness checklist",
      "Denied readiness actions",
      "Unresolved release risks",
      "Foundation 500 milestone route",
      "First real daily workflow candidate route",
      "Next recommended action",
      "Release readiness dashboard does not approve release",
      "Release readiness requires explicit operator approval",
      "Unresolved release risks stay blocked",
      "advanced readiness details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeReleaseReadinessDashboard(model) };
}
