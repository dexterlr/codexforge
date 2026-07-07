import {
  JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES,
} from "../jarvis-permission-approval-engine-map/jarvis-permission-approval-engine-policies";
import {
  JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST,
} from "../jarvis-shared-backend-adapter-contract-map/jarvis-shared-backend-adapter-contract-manifest";
import type {
  JarvisTaskPlannerToolRouterApprovalDecisionStatus,
  JarvisTaskPlannerToolRouterCapabilityId,
  JarvisTaskPlannerToolRouterPlanRecord,
  JarvisTaskPlannerToolRouterPlannedRouteTarget,
} from "./jarvis-task-planner-tool-router-model";

type PlannerRouteDescriptor = Readonly<{
  capabilityId: JarvisTaskPlannerToolRouterCapabilityId;
  userGoalExample: string;
  requestEnvelopeName: `${string}Envelope`;
  plannedRouteTarget: JarvisTaskPlannerToolRouterPlannedRouteTarget;
  selectionReason: string;
  routeSummary: string;
}>;

const JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_DESCRIPTORS = [
  {
    capabilityId: "video.generate",
    userGoalExample:
      "Review a storyboard-to-video request and route it to the video workspace without executing generation.",
    requestEnvelopeName: "JarvisPlannerVideoGenerateReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-video-route-wiring",
    selectionReason:
      "Video generation goals stay in a review-only route that points at the video workspace and a backend-only adapter handoff.",
    routeSummary:
      "Video route review only keeps provider execution blocked while the planner previews dry-run routing required and backend-only route required.",
  },
  {
    capabilityId: "website.create",
    userGoalExample:
      "Review a request to create a product website and route it to the website workspace without frontend creation.",
    requestEnvelopeName: "JarvisPlannerWebsiteCreateReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-website-route-wiring",
    selectionReason:
      "Website creation stays in a review-only route with human review required before any execution and no website creation execution.",
    routeSummary:
      "Website route review only keeps approval check required, blocked action summary only, and backend adapter routing review only visible in one manifest.",
  },
  {
    capabilityId: "avatar.prepare",
    userGoalExample:
      "Review an avatar preparation goal and route it to the avatar workspace with dry-run routing only.",
    requestEnvelopeName: "JarvisPlannerAvatarPrepareReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-avatar-route-wiring",
    selectionReason:
      "Avatar preparation remains dry-run only and points to a backend-only route candidate instead of any generation surface.",
    routeSummary:
      "Avatar route review only keeps approval packet request readiness only and no avatar generation execution in the routing layer.",
  },
  {
    capabilityId: "chatbot.plan",
    userGoalExample:
      "Review a chatbot planning goal and route it to the chatbot brain workspace without autonomous execution.",
    requestEnvelopeName: "JarvisPlannerChatbotPlanReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-chatbot-brain-route-wiring",
    selectionReason:
      "Chatbot planning stays review-only because Jarvis plans and routes while backend-owned adapters execute only after future explicit approval.",
    routeSummary:
      "Chatbot brain route review only keeps no chatbot autonomous execution, audit preview only, and memory boundary preview only in view.",
  },
  {
    capabilityId: "trading.paperReview",
    userGoalExample:
      "Review a paper trading strategy goal and route it to the trading workspace without any trading execution.",
    requestEnvelopeName: "JarvisPlannerTradingPaperReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-trading-route-wiring",
    selectionReason:
      "Trading review remains blocked until backend-owned execution exists, so the planner can only prepare operator review and blocked action summaries.",
    routeSummary:
      "Trading route review only keeps trading risk high, audit preview only, and hard kill switch checks ready without enabling paper trading execution.",
  },
  {
    capabilityId: "workflow.prepare",
    userGoalExample:
      "Review a workflow preparation goal and route it to the workflow workspace without dispatching workers or schedules.",
    requestEnvelopeName: "JarvisPlannerWorkflowPrepareReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-workflow-route-wiring",
    selectionReason:
      "Workflow preparation stays backend-only with worker dispatch blocked and approval-and-audit posture visible before future execution.",
    routeSummary:
      "Workflow route review only keeps blocked action summary only, lock manager check required, and idempotency check required in the plan graph.",
  },
  {
    capabilityId: "render.publishReview",
    userGoalExample:
      "Review a render and publish goal and route it to the render publish workspace without rendering, exporting, or publishing.",
    requestEnvelopeName: "JarvisPlannerRenderPublishReviewEnvelope",
    plannedRouteTarget: "/jarvis-task-planner-render-publish-route-wiring",
    selectionReason:
      "Render publish review stays kill-switch blocked and backend-only so the planner can only preview the route and blocked execution posture.",
    routeSummary:
      "Render publish route review only keeps no render execution, no export execution, no publish execution, and replay block check required visible.",
  },
] as const satisfies readonly PlannerRouteDescriptor[];

function findManifest(capabilityId: JarvisTaskPlannerToolRouterCapabilityId) {
  const manifest = JARVIS_SHARED_BACKEND_ADAPTER_CONTRACT_MANIFEST.find(
    (entry) => entry.capabilityId === capabilityId
  );
  if (!manifest) {
    throw new Error(`Missing adapter manifest for ${capabilityId}`);
  }
  return manifest;
}

function findPolicy(capabilityId: JarvisTaskPlannerToolRouterCapabilityId) {
  const policy = JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES.find(
    (entry) => entry.capabilityId === capabilityId
  );
  if (!policy) {
    throw new Error(`Missing permission policy for ${capabilityId}`);
  }
  return policy;
}

function mapApprovalDecisionStatus(
  approvalMode: (typeof JARVIS_PERMISSION_APPROVAL_ENGINE_POLICIES)[number]["approvalMode"]
): JarvisTaskPlannerToolRouterApprovalDecisionStatus {
  switch (approvalMode) {
    case "review-only":
      return "review-only";
    case "dry-run-only":
      return "dry-run-only";
    case "manual-approval-required":
      return "approval-required";
    case "manual-approval-and-audit-required":
      return "approval-and-audit-required";
    case "manual-human-review-required":
      return "human-review-required";
    case "blocked-until-backend-owned-adapter":
      return "blocked-until-backend-owned-adapter";
  }
}

export const JARVIS_TASK_PLANNER_TOOL_ROUTER_PLAN_RECORDS =
  JARVIS_TASK_PLANNER_TOOL_ROUTER_ROUTE_DESCRIPTORS.map((descriptor) => {
    const manifest = findManifest(descriptor.capabilityId);
    const policy = findPolicy(descriptor.capabilityId);

    return {
      capabilityId: descriptor.capabilityId,
      featureDomain: manifest.featureDomain,
      workspaceLabel: manifest.workspaceLabel,
      userGoalExample: descriptor.userGoalExample,
      requestEnvelopeName: descriptor.requestEnvelopeName,
      selectedAdapterId: manifest.adapterId,
      plannedRouteTarget: descriptor.plannedRouteTarget,
      riskTier: manifest.riskTier,
      permissionDecisionStatus: policy.permissionPosture,
      approvalDecisionStatus: mapApprovalDecisionStatus(policy.approvalMode),
      dryRunRouteRequired: true,
      backendOnlyRouteRequired: true,
      blockedActions: policy.blockedActionCategories,
      approvalPacketReadiness: policy.approvalPacketReadiness,
      approvalPacketRequestPosture: "approval packet request readiness only",
      auditPreviewPosture: "audit preview only",
      resultLedgerPreviewPosture: "result ledger preview only",
      memoryBoundaryPreviewPosture: "memory boundary preview only",
      killSwitchCheckPosture: "kill switch check required",
      lockManagerCheckPosture: "lock manager check required",
      idempotencyCheckPosture: "idempotency check required",
      replayBlockPosture: "replay block check required",
      humanReviewPosture: "human review required before any execution",
      executionPosture:
        "task planner and tool router completion does not enable provider/render/export/publish/workers/trading/automation",
      userGoalReview: {
        goalId: `goal-${descriptor.capabilityId}`,
        reviewPosture: "user goal review only",
        userGoalExample: descriptor.userGoalExample,
        goalSummary: descriptor.routeSummary,
      },
      requestEnvelopeReview: {
        reviewPosture: "request envelope review only",
        requestEnvelopeName: descriptor.requestEnvelopeName,
        reviewFields: [
          "goal summary",
          "capability hint",
          "workspace label",
          "blocked actions",
        ],
      },
      planGraphReview: {
        graphId: `graph-${descriptor.capabilityId}`,
        reviewPosture: "plan graph review only",
        notes: [
          "plan graph review only",
          "plan step review only",
          "risk check required",
          "permission check required",
          "approval check required",
          "dry-run routing required",
          "backend-only route required",
        ],
        steps: [
          {
            stepId: "step-1",
            reviewPosture: "plan step review only",
            title: "Review user goal",
            checkpoint: "user goal review only",
            blockedActions: [],
          },
          {
            stepId: "step-2",
            reviewPosture: "plan step review only",
            title: "Select capability and route candidate",
            checkpoint: "capability selection review only",
            blockedActions: [],
          },
          {
            stepId: "step-3",
            reviewPosture: "plan step review only",
            title: "Preview permission, approval, and dry-run routing",
            checkpoint: "dry-run routing required",
            blockedActions: policy.blockedActionCategories,
          },
        ],
      },
      capabilitySelectionReview: {
        reviewPosture: "capability selection review only",
        capabilityId: descriptor.capabilityId,
        featureDomain: manifest.featureDomain,
        workspaceLabel: manifest.workspaceLabel,
        selectionReason: descriptor.selectionReason,
      },
      routeCandidateReview: {
        toolRouterContractPosture: "tool router contract review only",
        backendAdapterRoutingPosture: "backend adapter routing review only",
        selectedAdapterId: manifest.adapterId,
        plannedRouteTarget: descriptor.plannedRouteTarget,
        dryRunRouteRequired: true,
        backendOnlyRouteRequired: true,
      },
      permissionCheckReview: {
        reviewPosture: "permission check required",
        permissionDecisionStatus: policy.permissionPosture,
        reasons: policy.denialReasons,
      },
      approvalCheckReview: {
        reviewPosture: "approval check required",
        approvalDecisionStatus: mapApprovalDecisionStatus(policy.approvalMode),
        approvalPacketReadiness: policy.approvalPacketReadiness,
        summary: policy.notes.join("; "),
      },
      dryRunRoutingReview: {
        reviewPosture: "dry-run routing required",
        dryRunRouteRequired: true,
        backendOnlyRouteRequired: true,
        routeSummary:
          "Jarvis plans and routes; backend-owned adapters execute only after future explicit approval.",
      },
      blockedActionSummaryReview: {
        reviewPosture: "blocked action summary only",
        blockedActions: policy.blockedActionCategories,
        summary: policy.denialReasons.join("; "),
      },
      approvalPacketRequestReview: {
        reviewPosture: "approval packet request readiness only",
        approvalPacketReadiness: policy.approvalPacketReadiness,
        requiredApprovers: policy.operatorRoles,
      },
      humanOperatorReview: {
        reviewPosture: "human review required before any execution",
        operatorRoles: policy.operatorRoles,
        operatorDecisionPreviewPosture: "operator decision preview only",
      },
    } satisfies JarvisTaskPlannerToolRouterPlanRecord;
  });
