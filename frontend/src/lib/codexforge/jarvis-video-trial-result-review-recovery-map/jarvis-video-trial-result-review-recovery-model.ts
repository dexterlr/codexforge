import {
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_DISABLED_PROMOTION_LANE,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_NEXT_ACTION,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_OPERATOR_ACCEPTANCE_CHECKLIST,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_OPERATOR_REVIEW,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_CARDS,
} from "./jarvis-video-trial-result-review-recovery-gates";
import {
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_MILESTONE_REFERENCES,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_PACKET_RECORD,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_LINKS,
} from "./jarvis-video-trial-result-review-recovery-packet";
import {
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_BLOCKED_POSTURES,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_DISPLAY_MARKERS,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_EXECUTION_BLOCKS,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_SHARED_MARKERS,
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_STORAGE_BOUNDARIES,
} from "./jarvis-video-trial-result-review-recovery-safety";
import {
  getJarvisUnifiedWorkspaceShellWorkspace,
  type JarvisUnifiedWorkspaceShellWorkspaceRecord,
} from "../jarvis-unified-workspace-shells-map/jarvis-unified-workspace-shells-workspaces";

export const JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_DESCRIPTION =
  "Review 4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery as a premium, review-only trial result review and recovery console for /jarvis-video. Jarvis is the operating system / top-level control plane. This batch keeps Jarvis-controlled video trial result review and recovery only, trial result review recovery only, /jarvis-video trial result review remains review-only, result review is staged, synthetic result only, recovery remains backend-owned, no result persistence, no retry or fallback execution, operator acceptance required, result envelope review only, result receipt placeholder only, safety review required, privacy review required, redaction review required, approval audit join review only, observability trace review only, quality checklist review only, failure taxonomy review only, recovery plan review only, retry review only, fallback review only, timeout recovery review only, cost rate recovery review only, rollback review only, artifact handoff review only, export publish blocker only, operator acceptance checklist required, disabled promotion lane, status timeline review only, backend runner link review only, controlled trial link review only, product IA link review only, no persistence guard, and no execution guard. It remains disabled by default, hard kill switch protected, backend-only execution path required, and execution-blocked. Static route only; next likely batch: 4042-4073 - Jarvis Video Studio Release Candidate.";

export const JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTE_SPECS = [
  [4010, "jarvis-video-trial-result-review-recovery-boundary-wiring", "/jarvis-video-trial-result-review-recovery-boundary-wiring", "Jarvis Video Trial Result Review Recovery Boundary Wiring", "trial result review recovery only"],
  [4011, "jarvis-video-trial-result-review-recovery-intent-wiring", "/jarvis-video-trial-result-review-recovery-intent-wiring", "Jarvis Video Trial Result Review Recovery Intent Wiring", "Jarvis-controlled video trial result review and recovery only"],
  [4012, "jarvis-video-trial-result-review-recovery-result-envelope-wiring", "/jarvis-video-trial-result-review-recovery-result-envelope-wiring", "Jarvis Video Trial Result Review Recovery Result Envelope Wiring", "result envelope review only"],
  [4013, "jarvis-video-trial-result-review-recovery-result-receipt-wiring", "/jarvis-video-trial-result-review-recovery-result-receipt-wiring", "Jarvis Video Trial Result Review Recovery Result Receipt Wiring", "result receipt placeholder only"],
  [4014, "jarvis-video-trial-result-review-recovery-safety-review-wiring", "/jarvis-video-trial-result-review-recovery-safety-review-wiring", "Jarvis Video Trial Result Review Recovery Safety Review Wiring", "safety review required"],
  [4015, "jarvis-video-trial-result-review-recovery-privacy-review-wiring", "/jarvis-video-trial-result-review-recovery-privacy-review-wiring", "Jarvis Video Trial Result Review Recovery Privacy Review Wiring", "privacy review required"],
  [4016, "jarvis-video-trial-result-review-recovery-redaction-review-wiring", "/jarvis-video-trial-result-review-recovery-redaction-review-wiring", "Jarvis Video Trial Result Review Recovery Redaction Review Wiring", "redaction review required"],
  [4017, "jarvis-video-trial-result-review-recovery-approval-audit-join-wiring", "/jarvis-video-trial-result-review-recovery-approval-audit-join-wiring", "Jarvis Video Trial Result Review Recovery Approval Audit Join Wiring", "approval audit join review only"],
  [4018, "jarvis-video-trial-result-review-recovery-observability-trace-wiring", "/jarvis-video-trial-result-review-recovery-observability-trace-wiring", "Jarvis Video Trial Result Review Recovery Observability Trace Wiring", "observability trace review only"],
  [4019, "jarvis-video-trial-result-review-recovery-quality-checklist-wiring", "/jarvis-video-trial-result-review-recovery-quality-checklist-wiring", "Jarvis Video Trial Result Review Recovery Quality Checklist Wiring", "quality checklist review only"],
  [4020, "jarvis-video-trial-result-review-recovery-failure-taxonomy-wiring", "/jarvis-video-trial-result-review-recovery-failure-taxonomy-wiring", "Jarvis Video Trial Result Review Recovery Failure Taxonomy Wiring", "failure taxonomy review only"],
  [4021, "jarvis-video-trial-result-review-recovery-recovery-plan-wiring", "/jarvis-video-trial-result-review-recovery-recovery-plan-wiring", "Jarvis Video Trial Result Review Recovery Recovery Plan Wiring", "recovery plan review only"],
  [4022, "jarvis-video-trial-result-review-recovery-retry-review-wiring", "/jarvis-video-trial-result-review-recovery-retry-review-wiring", "Jarvis Video Trial Result Review Recovery Retry Review Wiring", "retry review only"],
  [4023, "jarvis-video-trial-result-review-recovery-fallback-review-wiring", "/jarvis-video-trial-result-review-recovery-fallback-review-wiring", "Jarvis Video Trial Result Review Recovery Fallback Review Wiring", "fallback review only"],
  [4024, "jarvis-video-trial-result-review-recovery-timeout-recovery-wiring", "/jarvis-video-trial-result-review-recovery-timeout-recovery-wiring", "Jarvis Video Trial Result Review Recovery Timeout Recovery Wiring", "timeout recovery review only"],
  [4025, "jarvis-video-trial-result-review-recovery-cost-rate-recovery-wiring", "/jarvis-video-trial-result-review-recovery-cost-rate-recovery-wiring", "Jarvis Video Trial Result Review Recovery Cost Rate Recovery Wiring", "cost rate recovery review only"],
  [4026, "jarvis-video-trial-result-review-recovery-rollback-review-wiring", "/jarvis-video-trial-result-review-recovery-rollback-review-wiring", "Jarvis Video Trial Result Review Recovery Rollback Review Wiring", "rollback review only"],
  [4027, "jarvis-video-trial-result-review-recovery-artifact-handoff-review-wiring", "/jarvis-video-trial-result-review-recovery-artifact-handoff-review-wiring", "Jarvis Video Trial Result Review Recovery Artifact Handoff Review Wiring", "artifact handoff review only"],
  [4028, "jarvis-video-trial-result-review-recovery-export-publish-blocker-wiring", "/jarvis-video-trial-result-review-recovery-export-publish-blocker-wiring", "Jarvis Video Trial Result Review Recovery Export Publish Blocker Wiring", "export publish blocker only"],
  [4029, "jarvis-video-trial-result-review-recovery-operator-acceptance-wiring", "/jarvis-video-trial-result-review-recovery-operator-acceptance-wiring", "Jarvis Video Trial Result Review Recovery Operator Acceptance Wiring", "operator acceptance checklist required"],
  [4030, "jarvis-video-trial-result-review-recovery-disabled-promotion-lane-wiring", "/jarvis-video-trial-result-review-recovery-disabled-promotion-lane-wiring", "Jarvis Video Trial Result Review Recovery Disabled Promotion Lane Wiring", "disabled promotion lane"],
  [4031, "jarvis-video-trial-result-review-recovery-status-timeline-wiring", "/jarvis-video-trial-result-review-recovery-status-timeline-wiring", "Jarvis Video Trial Result Review Recovery Status Timeline Wiring", "status timeline review only"],
  [4032, "jarvis-video-trial-result-review-recovery-jarvis-video-update-wiring", "/jarvis-video-trial-result-review-recovery-jarvis-video-update-wiring", "Jarvis Video Trial Result Review Recovery Jarvis Video Update Wiring", "/jarvis-video trial result review remains review-only"],
  [4033, "jarvis-video-trial-result-review-recovery-backend-runner-link-wiring", "/jarvis-video-trial-result-review-recovery-backend-runner-link-wiring", "Jarvis Video Trial Result Review Recovery Backend Runner Link Wiring", "backend runner link review only"],
  [4034, "jarvis-video-trial-result-review-recovery-controlled-trial-link-wiring", "/jarvis-video-trial-result-review-recovery-controlled-trial-link-wiring", "Jarvis Video Trial Result Review Recovery Controlled Trial Link Wiring", "controlled trial link review only"],
  [4035, "jarvis-video-trial-result-review-recovery-product-ia-link-wiring", "/jarvis-video-trial-result-review-recovery-product-ia-link-wiring", "Jarvis Video Trial Result Review Recovery Product IA Link Wiring", "product IA link review only"],
  [4036, "jarvis-video-trial-result-review-recovery-no-persistence-guard-wiring", "/jarvis-video-trial-result-review-recovery-no-persistence-guard-wiring", "Jarvis Video Trial Result Review Recovery No Persistence Guard Wiring", "no persistence guard"],
  [4037, "jarvis-video-trial-result-review-recovery-no-execution-guard-wiring", "/jarvis-video-trial-result-review-recovery-no-execution-guard-wiring", "Jarvis Video Trial Result Review Recovery No Execution Guard Wiring", "no execution guard"],
  [4038, "jarvis-video-trial-result-review-recovery-regression-coverage-wiring", "/jarvis-video-trial-result-review-recovery-regression-coverage-wiring", "Jarvis Video Trial Result Review Recovery Regression Coverage Wiring", "backend-only execution path required"],
  [4039, "jarvis-video-trial-result-review-recovery-operator-review-wiring", "/jarvis-video-trial-result-review-recovery-operator-review-wiring", "Jarvis Video Trial Result Review Recovery Operator Review Wiring", "operator acceptance required"],
  [4040, "jarvis-video-trial-result-review-recovery-readiness-wiring", "/jarvis-video-trial-result-review-recovery-readiness-wiring", "Jarvis Video Trial Result Review Recovery Readiness Wiring", "result review is staged"],
  [4041, "jarvis-video-trial-result-review-recovery-completion", "/jarvis-video-trial-result-review-recovery-completion", "Jarvis Video Trial Result Review Recovery Completion", "trial result review recovery completion does not enable provider/render/export/publish/workers/trading/automation"],
] as const;

type JarvisVideoTrialResultReviewRecoveryRouteSpec =
  (typeof JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTE_SPECS)[number];

export type JarvisVideoTrialResultReviewRecoveryId = "jarvis-video";

export type JarvisVideoTrialResultReviewRecoveryRouteSlug =
  JarvisVideoTrialResultReviewRecoveryRouteSpec[1];

export type JarvisVideoTrialResultReviewRecoveryRouteHref =
  JarvisVideoTrialResultReviewRecoveryRouteSpec[2];

export type JarvisVideoTrialResultReviewRecoveryRouteTitle =
  JarvisVideoTrialResultReviewRecoveryRouteSpec[3];

export type JarvisVideoTrialResultReviewRecoveryRouteFocus =
  JarvisVideoTrialResultReviewRecoveryRouteSpec[4];

export type JarvisVideoTrialResultReviewRecoverySharedRecord = Readonly<{
  workspaceId: JarvisVideoTrialResultReviewRecoveryId;
  capabilityId: "video.generate";
  reviewRecoveryId: string;
  resultReviewStatus: string;
  syntheticResultEnvelope: string;
  resultReceiptPlaceholder: string;
  safetyReview: string;
  privacyReview: string;
  redactionReview: string;
  approvalJoin: string;
  auditJoin: string;
  observabilityTrace: string;
  qualityChecklist: string;
  failureTaxonomy: string;
  recoveryPlan: string;
  retryReview: string;
  fallbackReview: string;
  timeoutRecovery: string;
  costRecovery: string;
  rateRecovery: string;
  rollbackReview: string;
  artifactHandoffReview: string;
  exportPublishBlocker: string;
  operatorAcceptanceChecklist: string;
  disabledPromotionLane: string;
  statusTimeline: string;
  backendRunnerLink: string;
  controlledTrialLink: string;
  productIaLink: string;
  noPersistenceGuard: string;
  noExecutionGuard: string;
  operatorReviewPosture: string;
  readinessPosture: string;
  executionPosture: string;
  nextLikelyBatch: string;
}>;

export const JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_SHARED_RECORD = {
  workspaceId: "jarvis-video",
  capabilityId: "video.generate",
  reviewRecoveryId: "jarvis-video-trial-result-review-recovery-draft-v1",
  resultReviewStatus: "result review is staged",
  syntheticResultEnvelope: "synthetic result only",
  resultReceiptPlaceholder: "result receipt placeholder only",
  safetyReview: "safety review required",
  privacyReview: "privacy review required",
  redactionReview: "redaction review required",
  approvalJoin: "approval audit join review only",
  auditJoin: "approval audit join review only",
  observabilityTrace: "observability trace review only",
  qualityChecklist: "quality checklist review only",
  failureTaxonomy: "failure taxonomy review only",
  recoveryPlan: "recovery plan review only",
  retryReview: "retry review only",
  fallbackReview: "fallback review only",
  timeoutRecovery: "timeout recovery review only",
  costRecovery: "cost rate recovery review only",
  rateRecovery: "cost rate recovery review only",
  rollbackReview: "rollback review only",
  artifactHandoffReview: "artifact handoff review only",
  exportPublishBlocker: "export publish blocker only",
  operatorAcceptanceChecklist: "operator acceptance checklist required",
  disabledPromotionLane: "disabled promotion lane",
  statusTimeline: "status timeline review only",
  backendRunnerLink: "backend runner link review only",
  controlledTrialLink: "controlled trial link review only",
  productIaLink: "product IA link review only",
  noPersistenceGuard: "no persistence guard",
  noExecutionGuard: "no execution guard",
  operatorReviewPosture: "operator acceptance required",
  readinessPosture: "result review is staged",
  executionPosture: "recovery remains backend-owned",
  nextLikelyBatch:
    "next likely batch: 4042-4073 - Jarvis Video Studio Release Candidate",
} as const satisfies JarvisVideoTrialResultReviewRecoverySharedRecord;

function buildJarvisVideoTrialResultReviewRecoveryRouteSummary(
  title: JarvisVideoTrialResultReviewRecoveryRouteTitle,
  focus: JarvisVideoTrialResultReviewRecoveryRouteFocus,
  workspace: JarvisUnifiedWorkspaceShellWorkspaceRecord
) {
  return (
    title +
    " is a First Jarvis-Controlled Video Trial Result Review and Recovery surface for " +
    workspace.label +
    ". Jarvis is the operating system / top-level control plane. It keeps Jarvis-controlled video trial result review and recovery only, trial result review recovery only, /jarvis-video trial result review remains review-only, result review is staged, synthetic result only, recovery remains backend-owned, no result persistence, no retry or fallback execution, operator acceptance required, result envelope review only, result receipt placeholder only, safety review required, privacy review required, redaction review required, approval audit join review only, observability trace review only, quality checklist review only, failure taxonomy review only, recovery plan review only, retry review only, fallback review only, timeout recovery review only, cost rate recovery review only, rollback review only, artifact handoff review only, export publish blocker only, operator acceptance checklist required, disabled promotion lane, status timeline review only, backend runner link review only, controlled trial link review only, product IA link review only, no persistence guard, and no execution guard. Route focus: " +
    focus +
    ". The console remains disabled by default, hard kill switch protected, backend-only execution path required, and execution-blocked. Next likely batch: 4042-4073 - Jarvis Video Studio Release Candidate."
  );
}

function buildJarvisVideoTrialResultReviewRecoveryRouteMarkers(
  phaseNumber: JarvisVideoTrialResultReviewRecoveryRouteSpec[0],
  slug: JarvisVideoTrialResultReviewRecoveryRouteSlug,
  href: JarvisVideoTrialResultReviewRecoveryRouteHref,
  title: JarvisVideoTrialResultReviewRecoveryRouteTitle,
  focus: JarvisVideoTrialResultReviewRecoveryRouteFocus
) {
  return [
    String(phaseNumber) + " " + title,
    slug,
    href,
    title,
    focus,
    "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery",
    "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery Mega Batch v1",
    "First Jarvis-Controlled Video Trial Result Review and Recovery",
    "Jarvis-controlled video trial result review and recovery only",
    "trial result review recovery only",
    "/jarvis-video trial result review remains review-only",
    "result review is staged",
    "synthetic result only",
    "recovery remains backend-owned",
    "no result persistence",
    "no retry or fallback execution",
    "operator acceptance required",
    "next likely batch: 4042-4073 - Jarvis Video Studio Release Candidate",
  ] as const;
}

function buildJarvisVideoTrialResultReviewRecoveryRoute(
  phaseNumber: JarvisVideoTrialResultReviewRecoveryRouteSpec[0],
  slug: JarvisVideoTrialResultReviewRecoveryRouteSlug,
  href: JarvisVideoTrialResultReviewRecoveryRouteHref,
  title: JarvisVideoTrialResultReviewRecoveryRouteTitle,
  focus: JarvisVideoTrialResultReviewRecoveryRouteFocus
) {
  const workspace = getJarvisUnifiedWorkspaceShellWorkspace("jarvis-video");

  return {
    slug,
    href,
    phase: `Phase ${phaseNumber}`,
    phaseNumber,
    title,
    focus,
    workspaceId: "jarvis-video" as const,
    commandLabel: `Go to ${title}`,
    summary: buildJarvisVideoTrialResultReviewRecoveryRouteSummary(
      title,
      focus,
      workspace
    ),
    markerPhrases: buildJarvisVideoTrialResultReviewRecoveryRouteMarkers(
      phaseNumber,
      slug,
      href,
      title,
      focus
    ),
  } as const;
}

export const JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES =
  JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTE_SPECS.map(
    ([phaseNumber, slug, href, title, focus]) =>
      buildJarvisVideoTrialResultReviewRecoveryRoute(
        phaseNumber,
        slug,
        href,
        title,
        focus
      )
  );

export type JarvisVideoTrialResultReviewRecoveryRoute =
  (typeof JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES)[number];

export function buildJarvisVideoTrialResultReviewRecoveryStableKey(
  parts: readonly string[]
) {
  return parts.join("::");
}

export function buildJarvisVideoTrialResultReviewRecoveryRouteModel(
  routeSlug: JarvisVideoTrialResultReviewRecoveryRouteSlug
) {
  const route =
    JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES.find(
      (candidate) => candidate.slug === routeSlug
    ) ?? JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES[0];
  const workspace = getJarvisUnifiedWorkspaceShellWorkspace(route.workspaceId);

  return {
    route,
    workspace,
    routes: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES,
    relatedRoutes: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES.filter(
      (candidate) => candidate.workspaceId === workspace.id
    ),
    sharedRecord: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_SHARED_RECORD,
    packetRecord: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_PACKET_RECORD,
    milestoneReferences:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_MILESTONE_REFERENCES,
    reviewLinks: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_LINKS,
    reviewCards: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_CARDS,
    operatorChecklist:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_OPERATOR_ACCEPTANCE_CHECKLIST,
    disabledPromotionLane:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_DISABLED_PROMOTION_LANE,
    operatorReview: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_OPERATOR_REVIEW,
    nextAction: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_NEXT_ACTION,
    sharedMarkers: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_SHARED_MARKERS,
    displayMarkers: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_DISPLAY_MARKERS,
    blockedPostures: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_BLOCKED_POSTURES,
    executionBlocks:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_EXECUTION_BLOCKS,
    storageBoundaries:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_STORAGE_BOUNDARIES,
  };
}

export function buildJarvisVideoTrialResultReviewRecoveryWorkspaceModel(
  workspaceId: JarvisVideoTrialResultReviewRecoveryId
) {
  const workspace = getJarvisUnifiedWorkspaceShellWorkspace(workspaceId);

  return {
    workspace,
    routes: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_ROUTES.filter(
      (candidate) => candidate.workspaceId === workspaceId
    ),
    sharedRecord: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_SHARED_RECORD,
    packetRecord: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_PACKET_RECORD,
    milestoneReferences:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_MILESTONE_REFERENCES,
    reviewLinks: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_LINKS,
    reviewCards: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_REVIEW_CARDS,
    operatorChecklist:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_OPERATOR_ACCEPTANCE_CHECKLIST,
    disabledPromotionLane:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_DISABLED_PROMOTION_LANE,
    operatorReview: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_OPERATOR_REVIEW,
    nextAction: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_NEXT_ACTION,
    sharedMarkers: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_SHARED_MARKERS,
    displayMarkers: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_DISPLAY_MARKERS,
    blockedPostures: JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_BLOCKED_POSTURES,
    executionBlocks:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_EXECUTION_BLOCKS,
    storageBoundaries:
      JARVIS_VIDEO_TRIAL_RESULT_REVIEW_RECOVERY_STORAGE_BOUNDARIES,
  };
}
