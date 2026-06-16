import type { FirstControlledLaunchReview, FirstControlledLaunchReviewBoundary, FirstControlledLaunchReviewModel } from "./first-controlled-launch-review-types";
import { buildFirstControlledLaunchReviewStableKey } from "./first-controlled-launch-review-types";

export const FIRST_CONTROLLED_LAUNCH_REVIEW_LANGUAGE = [
  "First controlled launch review",
  "First controlled launch review does not execute launch",
  "Controlled launch decisions require explicit operator approval",
  "Unresolved controlled launch blockers stay blocked",
  "Launch review groups",
  "Boundary approval checklist",
] as const;

const FIRST_CONTROLLED_LAUNCH_REVIEW_SAFETY_DETAILS = [
  "no controlled launch execution",
  "no controlled launch auto-proceed",
  "no launch decision persistence",
  "no workflow execution",
  "no Daily Beta 1 launch execution",
  "no launch approval automation",
  "no launch readiness lock automation",
  "no go-live behavior",
  "no evidence ingestion",
  "no result persistence",
  "no recovery trigger",
  "no hardening apply behavior",
  "no handoff send behavior",
  "no provider API calls",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no connector data persistence",
  "no automation execution",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no conditional watch creation",
  "no polling loop creation",
  "no background job creation",
  "no notification sending",
  "no approval automation",
  "no approval decision persistence",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no patch apply behavior",
  "no file mutation",
  "no file write",
  "no file deletion",
  "no export/write behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries",
  "actual server/build/project execution still requires approved execution boundaries",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no output storage",
  "no connector data storage",
  "no automation data storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
  "no obvious duplicate React key patterns",
] as const;

export function buildFirstControlledLaunchReview(input: Omit<FirstControlledLaunchReview, "id"> & { idHint: string }): FirstControlledLaunchReview {
  const { idHint, ...firstControlledLaunchReview } = input;
  return { id: buildFirstControlledLaunchReviewStableKey("first-controlled-launch-review", idHint, input.status), ...firstControlledLaunchReview };
}

export function buildFirstControlledLaunchReviews(): FirstControlledLaunchReview[] {
  return [
    buildFirstControlledLaunchReview({
      idHint: "daily-beta-1-first-controlled-launch-review",
      status: "blocked",
      firstControlledLaunchReviewIdentity: "First controlled launch review identity: daily-beta-1-first-controlled-launch-review reviews first controlled launch readiness and results without executing launch.",
      launchReviewGroups: [
        "Launch review groups: launch plan status, boundary approval checklist, operator decision checklist, rollback/monitoring checklist, denied launch review actions, unresolved launch review blockers, controlled launch evidence route, controlled launch result route, and next recommended action.",
        "Launch review groups stay review-only; this page does not execute launch, proceed automatically, persist launch decisions, call providers, call local models, call connectors, create automations, or mutate files.",
      ],
      launchPlanStatus: [
        "Launch plan status: the first controlled launch plan remains blocked until evidence, result, recovery, hardening, candidate, handoff, and readiness-lock reviews are complete.",
        "Launch plan status is honest that actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries.",
      ],
      boundaryApprovalChecklist: [
        "Boundary approval checklist: provider, local model, connector, automation, file/test/project execution, shell, git, build, smoke, evidence, result, recovery, rollback, monitoring, support, credential, output, and memory boundaries must be explicitly approved before execution.",
        "Boundary approval checklist keeps unresolved controlled launch blockers blocked and does not grant launch approval.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: controlled launch decisions require explicit operator approval and are not persisted by this UI.",
        "Operator decision checklist keeps go/no-go, launch approval, recovery, hardening, handoff, and readiness lock decisions outside this review page.",
      ],
      rollbackMonitoringChecklist: [
        "Rollback/monitoring checklist: rollback owner, stop conditions, monitoring owner, support owner, communication owner, and evidence owner remain manual review items.",
        "Rollback/monitoring checklist confirms no rollback trigger, no monitoring job creation, no polling loop creation, and no notification sending from UI.",
      ],
      deniedLaunchReviewActions: [
        "Denied launch review actions: execute launch, proceed automatically, approve launch, persist launch decisions, launch Daily Beta 1, go live, run commands, run tests, apply patches, call providers, call local models, call connectors, create automations, trigger recovery, apply hardening, send handoff, lock readiness, store credentials, store outputs, or mutate memory.",
      ],
      unresolvedLaunchReviewBlockers: [
        "Unresolved controlled launch blockers stay blocked: missing boundary approval, missing operator decision, missing rollback owner, missing monitoring owner, missing support owner, missing evidence review, missing result review, and missing approved execution boundaries.",
      ],
      controlledLaunchEvidenceRoute: "Controlled launch evidence route: /first-controlled-launch-evidence-review reviews controlled launch evidence without ingesting it automatically.",
      controlledLaunchResultRoute: "Controlled launch result route: /first-controlled-launch-result-review reviews controlled launch results before reuse without storing live outputs.",
      nextRecommendedAction: "Next recommended action: keep first controlled launch execution blocked, review controlled launch evidence and results, and request explicit operator approval only after blockers are resolved outside this page.",
      advancedFirstControlledLaunchReviewDetails: `Advanced first controlled launch review details: ${FIRST_CONTROLLED_LAUNCH_REVIEW_SAFETY_DETAILS.join("; ")}.`,
    }),
  ];
}

export function buildFirstControlledLaunchReviewBoundary(): FirstControlledLaunchReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, controlledLaunchExecutionAllowedFromUi: false, controlledLaunchAutoProceedAllowedFromUi: false, launchDecisionPersistenceAllowedFromUi: false, workflowExecutionAllowedFromUi: false, launchApprovalAutomationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeFirstControlledLaunchReview(model: Pick<FirstControlledLaunchReviewModel, "firstControlledLaunchReviews">): string {
  return "First controlled launch review reviews " + model.firstControlledLaunchReviews.length + " controlled launch review packet without executing launch. Controlled launch decisions require explicit operator approval, and unresolved controlled launch blockers stay blocked.";
}

export function buildFirstControlledLaunchReviewModel(): FirstControlledLaunchReviewModel {
  const firstControlledLaunchReviews = buildFirstControlledLaunchReviews();
  const model: FirstControlledLaunchReviewModel = {
    title: "First controlled launch review",
    summary: "",
    firstControlledLaunchReviews,
    boundary: buildFirstControlledLaunchReviewBoundary(),
    language: [...FIRST_CONTROLLED_LAUNCH_REVIEW_LANGUAGE],
    advancedDetails: [
      "First controlled launch review",
      "First controlled launch review identity",
      "Launch review groups",
      "Launch plan status",
      "Boundary approval checklist",
      "Operator decision checklist",
      "Rollback monitoring checklist",
      "Denied launch review actions",
      "Unresolved launch review blockers",
      "Controlled launch evidence route",
      "Controlled launch result route",
      "Next recommended action",
      "First controlled launch review does not execute launch",
      "Controlled launch decisions require explicit operator approval",
      "Unresolved controlled launch blockers stay blocked",
      "advanced first controlled launch review details collapsed/secondary",
      ...FIRST_CONTROLLED_LAUNCH_REVIEW_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeFirstControlledLaunchReview(model) };
}
