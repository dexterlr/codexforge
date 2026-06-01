import type { WorkflowSafetySummary } from "./comfyui-workflow-safety-types";
import { buildWorkflowAssetRisk } from "./workflow-asset-risk";
import { buildWorkflowNodeRisk } from "./workflow-node-risk";
import { buildWorkflowOutputRisk } from "./workflow-output-risk";
import { buildWorkflowResourceRisk } from "./workflow-resource-risk";
import { buildWorkflowSafetyDecision } from "./workflow-safety-decision";
import { buildDefaultWorkflowSafetyChecks } from "./workflow-safety-check";
import { buildWorkflowSafetyHandoff } from "./workflow-safety-handoff";

export function buildWorkflowSafetySummary(): WorkflowSafetySummary {
  const checks = buildDefaultWorkflowSafetyChecks();
  const nodeRisks = [
    buildWorkflowNodeRisk({ id: "workflow-node-risk-custom-node", nodeType: "custom node", riskLabel: "Unknown until named" }),
    buildWorkflowNodeRisk({ id: "workflow-node-risk-unsupported", nodeType: "unsupported node type", riskLabel: "Blocked until reviewed" }),
  ];
  const assetRisks = [
    buildWorkflowAssetRisk({ id: "workflow-asset-risk-missing-model", asset: "missing model", riskLabel: "Confirm before use" }),
    buildWorkflowAssetRisk({ id: "workflow-asset-risk-external-url", asset: "cloud URL reference", riskLabel: "Review link first" }),
  ];
  const resourceRisks = [
    buildWorkflowResourceRisk({ id: "workflow-resource-risk-resolution", resource: "large resolution", riskLabel: "May be slow" }),
    buildWorkflowResourceRisk({ id: "workflow-resource-risk-duration", resource: "long duration or high frames", riskLabel: "Start smaller" }),
  ];
  const outputRisks = [
    buildWorkflowOutputRisk({ id: "workflow-output-risk-destination", destination: "risky output path", riskLabel: "Plan artifact destination" }),
  ];
  const decision = buildWorkflowSafetyDecision();
  const handoff = buildWorkflowSafetyHandoff();

  return {
    checks,
    nodeRisks,
    assetRisks,
    resourceRisks,
    outputRisks,
    decision,
    handoff,
    summary: summarizeWorkflowSafety({ checks, nodeRisks, assetRisks, resourceRisks, outputRisks, decision, handoff, summary: "" }),
  };
}

export function summarizeWorkflowSafety(summary: WorkflowSafetySummary): string {
  return `${summary.checks.length} safety checks, ${summary.nodeRisks.length} node risks, ${summary.assetRisks.length} asset risks, decision: ${summary.decision.status}.`;
}
