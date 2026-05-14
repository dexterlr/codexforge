import type {
  CodexForgeCapabilityApprovalBoundary,
  CodexForgeCapabilityDescriptor,
  CodexForgeCapabilityId,
  CodexForgeCapabilitySafetyClass,
} from "./capability-types";
import { getCodexForgeCapabilityBridgeDescriptor } from "@/lib/codexforge/tools/capability-bridge-manifest";

function requireCapability(
  capabilityOrId: CodexForgeCapabilityDescriptor | CodexForgeCapabilityId
): CodexForgeCapabilityDescriptor {
  if (typeof capabilityOrId !== "string") return capabilityOrId;

  const capability = getCodexForgeCapabilityBridgeDescriptor(capabilityOrId);
  if (!capability) {
    throw new Error(`Unknown CodexForge capability: ${capabilityOrId}`);
  }

  return capability;
}

export function isCapabilityExecutionBlocked(
  capabilityOrId: CodexForgeCapabilityDescriptor | CodexForgeCapabilityId
): boolean {
  const capability = requireCapability(capabilityOrId);
  return (
    capability.id === "broker-execution" ||
    capability.status === "blocked" ||
    capability.consent === "blocked" ||
    capability.adapters.some((adapter) => adapter.executionMode === "blocked" || adapter.blocksByDefault)
  );
}

export function classifyCapabilitySafety(
  capabilityOrId: CodexForgeCapabilityDescriptor | CodexForgeCapabilityId
): CodexForgeCapabilitySafetyClass {
  const capability = requireCapability(capabilityOrId);

  if (isCapabilityExecutionBlocked(capability)) return "blocked";
  if (capability.consent === "explicit-session-consent") return "explicit-session-consent";
  if (capability.adapters.some((adapter) => adapter.executionMode === "local-safe-simulated")) {
    return "local-safe-simulated";
  }
  if (capability.operatorMode === "creative-production") return "creative-approval-gated";
  if (capability.operatorMode === "research" || capability.operatorMode === "market-research") {
    return "research-approval-gated";
  }

  return "read-only";
}

export function buildCapabilityApprovalBoundary(
  capabilityOrId: CodexForgeCapabilityDescriptor | CodexForgeCapabilityId
): CodexForgeCapabilityApprovalBoundary {
  const capability = requireCapability(capabilityOrId);
  const blocked = isCapabilityExecutionBlocked(capability);
  const requiresApproval =
    !blocked &&
    (capability.consent === "approval-required" ||
      capability.consent === "explicit-session-consent" ||
      capability.adapters.some((adapter) => adapter.requiresApproval));

  return {
    capabilityId: capability.id,
    title: `${capability.label} approval boundary`,
    required: requiresApproval,
    blocked,
    consent: capability.consent,
    operatorMessage: blocked
      ? "Execution is blocked in the cockpit. Use planning, audit, or research-only flows."
      : requiresApproval
        ? "Approval required before execution. This cockpit only prepares previews and approval context."
        : "Read-only inspection can proceed without an execution approval.",
    allowedNow: blocked
      ? ["Inspect policy", "Review roadmap", "Prepare non-executable plan"]
      : ["Inspect readiness", "Preview plan", "Review adapter health"],
    requiresApprovalBefore:
      capability.consent === "explicit-session-consent"
        ? ["Explicit session consent", "Visible active state", "Operator confirmation"]
        : requiresApproval
          ? ["Execution request", "Side-effect preview", "Operator confirmation"]
          : [],
    neverAllowedInCockpit:
      capability.id === "broker-execution"
        ? ["No live orders", "No account mutation", "No broker action"]
        : ["No silent automation", "No hidden side effects"],
  };
}

export function summarizeCapabilityPolicy(
  capabilityOrId: CodexForgeCapabilityDescriptor | CodexForgeCapabilityId
): string {
  const capability = requireCapability(capabilityOrId);
  const safety = classifyCapabilitySafety(capability);

  if (capability.id === "trading-research") {
    return "Trading research is research-only, approval-gated, not financial advice, and has no live orders.";
  }
  if (capability.id === "broker-execution") {
    return "Broker execution is blocked. No live orders, account mutation, or broker action is allowed.";
  }
  if (capability.id === "pc-bridge" || capability.id === "camera-inspection") {
    return "Explicit session consent is required before any future local control or inspection.";
  }
  if (capability.operatorMode === "creative-production") {
    return "Creative production is preview-only here and approval required before execution.";
  }
  if (safety === "local-safe-simulated") {
    return "Render job is local-safe/simulated and does not launch external creative tools.";
  }

  return "Capability policy allows deterministic planning and inspection inside the cockpit.";
}
