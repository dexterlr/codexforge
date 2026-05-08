import type { CodexForgeToolPolicyDecision } from "@/lib/codexforge/tools/tool-policy-guard";

export type CodexForgeVisibleToolPolicyTone =
  | "allowed"
  | "approval-required"
  | "blocked"
  | "error";

export type CodexForgeVisibleToolPolicy = {
  title: string;
  tone: CodexForgeVisibleToolPolicyTone;
  badge: string;
  summary: string;
  nextAction: string;
  approvalId?: string | null;
  requiresApproval?: boolean;
  approvalSatisfied?: boolean;
  blocked?: boolean;
  source?: string;
  bullets: string[];
  audit: string[];
};

function formatTool(value: string | null): string {
  return value && value.trim().length > 0 ? value : "unknown-tool";
}

function formatDomain(value: string | null): string {
  return value && value.trim().length > 0 ? value : "general";
}

function firstListLine(label: string, values: string[]): string | null {
  return values.length > 0 ? `${label}: ${values.join(", ")}` : null;
}

function compactList(values: Array<string | null | undefined>): string[] {
  return values.filter((value): value is string => !!value && value.trim().length > 0);
}

function withDecisionFields(
  decision: CodexForgeToolPolicyDecision,
  payload: Omit<
    CodexForgeVisibleToolPolicy,
    "approvalId" | "requiresApproval" | "approvalSatisfied" | "blocked" | "source"
  >
): CodexForgeVisibleToolPolicy {
  return {
    ...payload,
    approvalId: decision.approvalId,
    requiresApproval: decision.requiresApproval,
    approvalSatisfied: decision.approvalSatisfied,
    blocked: decision.blocked,
    source: decision.source,
  };
}

export function buildVisibleToolPolicy(
  decision?: CodexForgeToolPolicyDecision | null
): CodexForgeVisibleToolPolicy | null {
  if (!decision) return null;

  const tool = formatTool(decision.normalizedToolName ?? decision.toolName);
  const domain = formatDomain(decision.domain);
  const approvalLine = firstListLine(
    "Approval-required tools",
    decision.approvalRequiredTools
  );
  const blockedLine = firstListLine("Blocked tools", decision.blockedTools);
  const readOnlyLine = firstListLine("Read-only tools", decision.readOnlyTools);
  const mutationLine = firstListLine("Mutation tools", decision.mutationTools);
  const approvalIdLine = `Approval ID: ${decision.approvalId ?? "not required"}`;

  if (decision.blocked) {
    return withDecisionFields(decision, {
      title: "Tool blocked by policy",
      tone: "blocked",
      badge: "Blocked",
      summary: decision.reason,
      nextAction:
        "Choose a safe planning or research path, or change the request so it does not require a blocked tool.",
      bullets: compactList([
        `Tool: ${tool}`,
        `Domain: ${domain}`,
        blockedLine,
        "This action cannot be unlocked by approval because the runtime policy marks it as blocked.",
      ]),
      audit: compactList([
        approvalIdLine,
        `HTTP status: ${decision.status}`,
        `Decision source: ${decision.source}`,
        `Approval satisfied: ${decision.approvalSatisfied ? "yes" : "no"}`,
        approvalLine,
        blockedLine,
      ]),
    });
  }

  if (decision.requiresApproval && !decision.approvalSatisfied) {
    return withDecisionFields(decision, {
      title: "Approval required before tool execution",
      tone: "approval-required",
      badge: "Approval required",
      summary: decision.reason,
      nextAction:
        "Review the requested action, keep the approval id, then retry with approvalState.approved=true and approvalState.approvalId.",
      bullets: compactList([
        `Tool: ${tool}`,
        `Domain: ${domain}`,
        approvalLine,
        "The tool was not run. CodexForge is waiting for explicit approval.",
      ]),
      audit: compactList([
        approvalIdLine,
        `HTTP status: ${decision.status}`,
        `Decision source: ${decision.source}`,
        `Approval satisfied: ${decision.approvalSatisfied ? "yes" : "no"}`,
        approvalLine,
        mutationLine,
      ]),
    });
  }

  if (decision.allowed) {
    return withDecisionFields(decision, {
      title: decision.requiresApproval
        ? "Tool approved for execution"
        : "Tool allowed by policy",
      tone: "allowed",
      badge: decision.requiresApproval ? "Approved" : "Allowed",
      summary: decision.reason,
      nextAction: decision.requiresApproval
        ? "Continue execution and preserve the approval id in the audit trail."
        : "Continue execution. No approval gate was required for this tool.",
      bullets: compactList([
        `Tool: ${tool}`,
        `Domain: ${domain}`,
        decision.requiresApproval
          ? "Approval was satisfied before execution."
          : "Tool is read-only or otherwise allowed by runtime policy.",
      ]),
      audit: compactList([
        approvalIdLine,
        `HTTP status: ${decision.status}`,
        `Decision source: ${decision.source}`,
        `Approval satisfied: ${decision.approvalSatisfied ? "yes" : "no"}`,
        readOnlyLine,
        approvalLine,
      ]),
    });
  }

  return withDecisionFields(decision, {
    title: "Tool request needs attention",
    tone: "error",
    badge: "Check request",
    summary: decision.reason,
    nextAction: "Fix the tool request and retry.",
    bullets: compactList([`Tool: ${tool}`, `Domain: ${domain}`]),
    audit: compactList([
      approvalIdLine,
      `HTTP status: ${decision.status}`,
      `Decision source: ${decision.source}`,
      approvalLine,
      blockedLine,
    ]),
  });
}

export function serializeVisibleToolPolicy(
  decision?: CodexForgeToolPolicyDecision | null
): CodexForgeVisibleToolPolicy | null {
  return buildVisibleToolPolicy(decision);
}
