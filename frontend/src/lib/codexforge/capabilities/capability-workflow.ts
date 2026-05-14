import { getCodexForgeCapabilityBridgeDescriptor } from "@/lib/codexforge/tools/capability-bridge-manifest";
import { buildCapabilityApprovalBoundary } from "./capability-policy";
import { buildCapabilityReadiness } from "./capability-readiness";
import type {
  CodexForgeCapabilityId,
  CodexForgeCapabilityWorkflow,
  CodexForgeCapabilityWorkflowStep,
  CodexForgeCapabilityWorkflowStepStatus,
} from "./capability-types";

export function buildCapabilityWorkflowStep(
  id: string,
  label: string,
  status: CodexForgeCapabilityWorkflowStepStatus,
  summary: string
): CodexForgeCapabilityWorkflowStep {
  return { id, label, status, summary };
}

export function selectNextCapabilityAction(workflow: CodexForgeCapabilityWorkflow): string {
  const blocked = workflow.steps.find((step) => step.status === "blocked");
  if (blocked) return blocked.summary;

  const approval = workflow.steps.find((step) => step.status === "approval-required");
  if (approval) return approval.summary;

  return workflow.steps.find((step) => step.status === "preview-only")?.summary ?? workflow.nextAction;
}

export function buildCapabilityWorkflow(
  capabilityId: CodexForgeCapabilityId
): CodexForgeCapabilityWorkflow {
  const capability = getCodexForgeCapabilityBridgeDescriptor(capabilityId);
  if (!capability) {
    throw new Error(`Unknown CodexForge capability workflow: ${capabilityId}`);
  }

  const readiness = buildCapabilityReadiness(capability);
  const boundary = buildCapabilityApprovalBoundary(capability);
  const steps = [
    buildCapabilityWorkflowStep(
      "inspect-capability",
      "Inspect capability",
      "ready",
      `Inspect ${capability.label} manifest, adapter registrations, and safety invariants.`
    ),
    buildCapabilityWorkflowStep(
      "check-readiness",
      "Check readiness",
      readiness.executionBlocked ? "blocked" : "preview-only",
      summarizeCapabilityWorkflowReadiness(readiness.score, readiness.status)
    ),
    buildCapabilityWorkflowStep(
      "prepare-plan",
      "Prepare plan",
      "preview-only",
      "Prepare a deterministic preview plan without executing tools or mutating runtime state."
    ),
    buildCapabilityWorkflowStep(
      "preview-side-effects",
      "Preview side effects",
      "preview-only",
      `Side-effect posture: ${readiness.sideEffectRisk}.`
    ),
    buildCapabilityWorkflowStep(
      "approval-boundary",
      "Approval boundary",
      boundary.blocked ? "blocked" : boundary.required ? "approval-required" : "ready",
      boundary.operatorMessage
    ),
    buildCapabilityWorkflowStep(
      "future-adapter",
      "Future guarded adapter",
      boundary.blocked ? "blocked" : "approval-required",
      "Execution later must flow through guarded adapters with approval and audit context."
    ),
  ];

  const workflow = {
    capabilityId,
    label: capability.label,
    steps,
    nextAction: readiness.safeNextAction,
    summary: "",
  };

  return {
    ...workflow,
    summary: summarizeCapabilityWorkflow(workflow),
  };
}

function summarizeCapabilityWorkflowReadiness(score: number, status: string): string {
  return `Readiness is ${status} with score ${score}; cockpit remains preview-only.`;
}

export function summarizeCapabilityWorkflow(
  workflow: Omit<CodexForgeCapabilityWorkflow, "summary"> | CodexForgeCapabilityWorkflow
): string {
  const blockedCount = workflow.steps.filter((step) => step.status === "blocked").length;
  const approvalCount = workflow.steps.filter((step) => step.status === "approval-required").length;
  return `${workflow.label} workflow: ${workflow.steps.length} steps, ${approvalCount} approval gate(s), ${blockedCount} blocked gate(s).`;
}
