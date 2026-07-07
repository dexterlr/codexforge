import type {
  JarvisPermissionApprovalEngineDecisionRecord,
  JarvisPermissionApprovalEngineDecisionStatus,
} from "./jarvis-permission-approval-engine-model";
import { getJarvisPermissionApprovalEnginePolicy } from "./jarvis-permission-approval-engine-policies";

export const JARVIS_PERMISSION_APPROVAL_ENGINE_DECISION_LABELS: Readonly<
  Record<JarvisPermissionApprovalEngineDecisionStatus, string>
> = {
  "allowed-for-review": "allowed for review only",
  "dry-run-only": "dry-run only decision",
  "approval-required": "approval required decision",
  blocked: "blocked decision",
  "kill-switch-blocked": "kill-switch blocked decision",
  unsupported: "unsupported decision",
  "needs-human-operator-review": "human operator review required",
};

export function describeJarvisPermissionApprovalEngineDecisionStatus(
  status: JarvisPermissionApprovalEngineDecisionStatus
) {
  return JARVIS_PERMISSION_APPROVAL_ENGINE_DECISION_LABELS[status];
}

export function buildJarvisPermissionApprovalEngineDecision(input: {
  capabilityId: string;
  requestedAction: "review" | "dry-run" | "execute";
  forceHumanReview?: boolean;
  forceKillSwitch?: boolean;
}): JarvisPermissionApprovalEngineDecisionRecord {
  const policy = getJarvisPermissionApprovalEnginePolicy(input.capabilityId);

  if (!policy) {
    return {
      capabilityId: input.capabilityId,
      requestedAction: input.requestedAction,
      status: "unsupported",
      summary: describeJarvisPermissionApprovalEngineDecisionStatus("unsupported"),
      approvalPacketReadiness: "approval-packet-blocked",
      blockedActionCategories: ["provider execution", "network execution"],
      denialReasons: [
        "unsupported capability",
        "backend-owned adapter required",
      ],
      humanOperatorReviewRequired: true,
      backendOnlyRequired: true,
      killSwitchRequired: true,
      policy: null,
    };
  }

  let status = policy.permissionPosture;

  if (input.forceKillSwitch) {
    status = "kill-switch-blocked";
  } else if (input.forceHumanReview) {
    status = "needs-human-operator-review";
  } else if (input.requestedAction === "execute") {
    status =
      policy.permissionPosture === "dry-run-only"
        ? "dry-run-only"
        : policy.permissionPosture === "allowed-for-review"
          ? "blocked"
          : policy.permissionPosture;
  }

  return {
    capabilityId: input.capabilityId,
    requestedAction: input.requestedAction,
    status,
    summary: describeJarvisPermissionApprovalEngineDecisionStatus(status),
    approvalPacketReadiness: policy.approvalPacketReadiness,
    blockedActionCategories: policy.blockedActionCategories,
    denialReasons: policy.denialReasons,
    humanOperatorReviewRequired:
      status === "needs-human-operator-review" ||
      policy.humanApprovalRequirement === "human approval gate required",
    backendOnlyRequired:
      policy.backendOnlyRequirement === "backend-only-required",
    killSwitchRequired: policy.killSwitchPosture !== null,
    policy,
  };
}

export function buildJarvisPermissionApprovalEngineDecisionCatalog() {
  return [
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "chatbot.plan",
      requestedAction: "review",
    }),
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "avatar.prepare",
      requestedAction: "dry-run",
    }),
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "video.generate",
      requestedAction: "review",
    }),
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "trading.paperReview",
      requestedAction: "review",
    }),
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "render.publishReview",
      requestedAction: "review",
    }),
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "website.create",
      requestedAction: "review",
      forceHumanReview: true,
    }),
    buildJarvisPermissionApprovalEngineDecision({
      capabilityId: "unsupported.capability",
      requestedAction: "review",
    }),
  ] as const;
}
