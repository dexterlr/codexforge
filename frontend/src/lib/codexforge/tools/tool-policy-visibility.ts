import type { CodexForgeToolPolicyDecision } from "@/lib/codexforge/tools/tool-policy-guard";

export type CodexForgeToolPolicyTone =
  | "allowed"
  | "approval-required"
  | "blocked"
  | "error";

export type CodexForgeVisibleToolPolicy = {
  title: string;
  tone: CodexForgeToolPolicyTone;
  badge: string;
  summary: string;
  nextAction: string;
  bullets: string[];
  audit: string[];
};

function clean(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function list(items: unknown): string[] {
  if (!Array.isArray(items)) return [];

  return Array.from(
    new Set(
      items
        .map((item) => clean(item))
        .filter((item): item is string => !!item)
    )
  );
}

function formatToolList(label: string, tools: string[]): string | null {
  return tools.length > 0 ? `${label}: ${tools.join(", ")}` : null;
}

export function buildVisibleToolPolicy(
  decision: CodexForgeToolPolicyDecision | null | undefined
): CodexForgeVisibleToolPolicy | null {
  if (!decision) return null;

  const tool = decision.normalizedToolName ?? decision.toolName ?? "unknown-tool";
  const domain = decision.domain ?? "general";
  const approvalTools = list(decision.approvalRequiredTools);
  const blockedTools = list(decision.blockedTools);
  const readOnlyTools = list(decision.readOnlyTools);
  const mutationTools = list(decision.mutationTools);

  const approvalLine = formatToolList("Approval-required tools", approvalTools);
  const blockedLine = formatToolList("Blocked tools", blockedTools);
  const readOnlyLine = formatToolList("Read-only tools", readOnlyTools);
  const mutationLine = formatToolList("Mutation or external tools", mutationTools);

  if (decision.blocked) {
    return {
      title: "Tool blocked by policy",
      tone: "blocked",
      badge: "Blocked",
      summary: decision.reason,
      nextAction:
        "Choose a safe planning/research path or change the request so it does not require a blocked tool.",
      bullets: [
        `Tool: ${tool}`,
        `Domain: ${domain}`,
        blockedLine,
        "This action cannot be unlocked by approval because the runtime policy marks it as blocked.",
      ].filter((item): item is string => !!item),
      audit: [
        `HTTP status: ${decision.status}`,
        `Decision source: ${decision.source}`,
        `Approval satisfied: ${decision.approvalSatisfied ? "yes" : "no"}`,
        approvalLine,
        blockedLine,
      ].filter((item): item is string => !!item),
    };
  }

  if (decision.requiresApproval && !decision.approvalSatisfied) {
    return {
      title: "Approval required before tool execution",
      tone: "approval-required",
      badge: "Approval required",
      summary: decision.reason,
      nextAction:
        "Review the requested action, generate or attach an approval id, then retry with approvalState.approved=true and approvalState.approvalId.",
      bullets: [
        `Tool: ${tool}`,
        `Domain: ${domain}`,
        approvalLine,
        "The tool was not run. CodexForge is waiting for explicit approval.",
      ].filter((item): item is string => !!item),
      audit: [
        `HTTP status: ${decision.status}`,
        `Decision source: ${decision.source}`,
        `Approval satisfied: ${decision.approvalSatisfied ? "yes" : "no"}`,
        approvalLine,
        mutationLine,
      ].filter((item): item is string => !!item),
    };
  }

  if (decision.allowed) {
    return {
      title: decision.requiresApproval
        ? "Tool approved for execution"
        : "Tool allowed by policy",
      tone: "allowed",
      badge: decision.requiresApproval ? "Approved" : "Allowed",
      summary: decision.reason,
      nextAction: decision.requiresApproval
        ? "Continue execution and preserve the approval id in the audit trail."
        : "Continue execution. No approval gate was required for this tool.",
      bullets: [
        `Tool: ${tool}`,
        `Domain: ${domain}`,
        decision.requiresApproval
          ? "Approval was satisfied before execution."
          : "Tool is read-only or otherwise allowed by runtime policy.",
      ],
      audit: [
        `HTTP status: ${decision.status}`,
        `Decision source: ${decision.source}`,
        `Approval satisfied: ${decision.approvalSatisfied ? "yes" : "no"}`,
        readOnlyLine,
        approvalLine,
      ].filter((item): item is string => !!item),
    };
  }

  return {
    title: "Tool policy error",
    tone: "error",
    badge: "Policy error",
    summary: decision.reason,
    nextAction: "Fix the tool request and retry.",
    bullets: [
      `Tool: ${tool}`,
      `Domain: ${domain}`,
    ],
    audit: [
      `HTTP status: ${decision.status}`,
      `Decision source: ${decision.source}`,
      approvalLine,
      blockedLine,
    ].filter((item): item is string => !!item),
  };
}

export function buildToolPolicyText(
  decision: CodexForgeToolPolicyDecision | null | undefined
): string[] {
  const visible = buildVisibleToolPolicy(decision);
  if (!visible) return [];

  return [
    visible.title,
    visible.summary,
    `Next action: ${visible.nextAction}`,
    ...visible.bullets,
    ...visible.audit,
  ];
}

export function serializeVisibleToolPolicy(
  decision: CodexForgeToolPolicyDecision | null | undefined
) {
  const visible = buildVisibleToolPolicy(decision);

  return visible
    ? {
        visible,
        lines: buildToolPolicyText(decision),
      }
    : null;
}
