import type {
  CodexForgeRecommendationAction,
  CodexForgeRecommendationActionSafety,
} from "./recommendation-types";

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function classifyRecommendationActionSafety(
  action: Pick<CodexForgeRecommendationAction, "approvalRequired" | "readOnly" | "blockedReason"> & {
    label?: string;
    description?: string;
  }
): CodexForgeRecommendationActionSafety {
  if (action.blockedReason) return "blocked";
  if (action.approvalRequired) return "approval-required";
  if (action.readOnly) return "read-only";
  return "deferred";
}

export function buildReadOnlyRecommendationAction(args: {
  id?: string;
  label: string;
  description: string;
}): CodexForgeRecommendationAction {
  return {
    id: args.id ?? `action:read-only:${slug(args.label)}`,
    label: args.label,
    description: args.description,
    safety: "read-only",
    approvalRequired: false,
    readOnly: true,
  };
}

export function buildApprovalRequiredRecommendationAction(args: {
  id?: string;
  label: string;
  description: string;
  blockedReason?: string;
}): CodexForgeRecommendationAction {
  const blockedReason = args.blockedReason;
  return {
    id: args.id ?? `action:approval-required:${slug(args.label)}`,
    label: args.label,
    description: args.description,
    safety: blockedReason ? "blocked" : "approval-required",
    approvalRequired: true,
    readOnly: false,
    blockedReason,
  };
}

export function summarizeRecommendationActionSafety(
  actions: readonly CodexForgeRecommendationAction[]
): string {
  const readOnly = actions.filter((action) => action.safety === "read-only").length;
  const approvalRequired = actions.filter((action) => action.safety === "approval-required").length;
  const blocked = actions.filter((action) => action.safety === "blocked").length;
  const deferred = actions.filter((action) => action.safety === "deferred").length;

  return `${readOnly} read-only, ${approvalRequired} approval-required, ${blocked} blocked, ${deferred} deferred actions.`;
}
