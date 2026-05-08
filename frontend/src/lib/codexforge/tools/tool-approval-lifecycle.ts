import type { CodexForgeToolApprovalState } from "@/lib/codexforge/tools/tool-policy-guard";
import type { CodexForgeVisibleToolPolicy } from "@/lib/codexforge/tools/tool-policy-visibility";

export type CodexForgeToolApprovalLifecycleStatus =
  | "idle"
  | "pending"
  | "approved"
  | "denied";

export type CodexForgeToolApprovalLifecycleSnapshot = {
  status: CodexForgeToolApprovalLifecycleStatus;
  approvalId: string | null;
  approvalState: CodexForgeToolApprovalState | null;
  retryEnabled: boolean;
  reason: string;
};

export type CodexForgeToolApprovalActionPayload = {
  approvalId: string;
  approvalState: CodexForgeToolApprovalState;
  visible: CodexForgeVisibleToolPolicy;
};

export function normalizeToolApprovalId(value: string | null | undefined): string | null {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : null;
}

export function buildApprovedToolApprovalState(
  approvalId: string,
  approvedBy = "operator"
): CodexForgeToolApprovalState {
  return {
    approved: true,
    approvalId,
    approvedAt: new Date().toISOString(),
    approvedBy,
  };
}

export function buildDeniedToolApprovalState(
  approvalId: string,
  reason = "Denied by operator"
): CodexForgeToolApprovalState {
  return {
    approved: false,
    approvalId,
    reason,
  };
}

export function buildToolApprovalLifecycleSnapshot(args: {
  visible: CodexForgeVisibleToolPolicy;
  status?: CodexForgeToolApprovalLifecycleStatus;
  approvalState?: CodexForgeToolApprovalState | null;
}): CodexForgeToolApprovalLifecycleSnapshot {
  const approvalId = normalizeToolApprovalId(args.visible.approvalId);
  const alreadySatisfied = args.visible.approvalSatisfied === true;
  const requiresApproval = args.visible.requiresApproval === true;
  const blocked = args.visible.blocked === true;
  const status =
    args.status ??
    (alreadySatisfied ? "approved" : requiresApproval && approvalId ? "pending" : "idle");

  return {
    status,
    approvalId,
    approvalState: args.approvalState ?? null,
    retryEnabled: status === "approved" && !!approvalId && !blocked,
    reason: blocked
      ? "Blocked tools cannot be approved."
      : requiresApproval && approvalId
        ? "Approval id is ready for operator review."
        : "No approval action is required.",
  };
}
