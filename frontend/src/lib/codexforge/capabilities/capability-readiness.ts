import {
  listCodexForgeCapabilityBridgeDescriptors,
  type CodexForgeResolvedCapabilityBridge,
} from "@/lib/codexforge/tools/capability-bridge-manifest";
import type {
  CodexForgeCapabilityReadiness,
  CodexForgeCapabilityRiskLevel,
} from "./capability-types";
import { isCapabilityExecutionBlocked, summarizeCapabilityPolicy } from "./capability-policy";

const riskPenalty: Record<CodexForgeCapabilityRiskLevel, number> = {
  low: 0,
  medium: 10,
  high: 22,
  critical: 40,
};

function sideEffectRisk(capability: CodexForgeResolvedCapabilityBridge): CodexForgeCapabilityReadiness["sideEffectRisk"] {
  const effects = Array.from(new Set(capability.adapters.map((adapter) => adapter.sideEffect)));
  if (effects.length === 0) return capability.allowedSideEffects[0] ?? "none";
  if (effects.length === 1) return effects[0] ?? "none";
  return "mixed";
}

function buildSmokeCoverageHint(capability: CodexForgeResolvedCapabilityBridge): string {
  if (capability.id === "broker-execution") return "Covered by blocked execution policy smokes.";
  if (capability.operatorMode === "creative-production") return "Covered by capability cockpit and adapter registry smokes.";
  if (capability.consent === "explicit-session-consent") return "Covered by explicit consent cockpit assertions.";
  return "Covered by capability bridge, registry, and command center smokes.";
}

function safeNextAction(capability: CodexForgeResolvedCapabilityBridge): string {
  if (capability.id === "broker-execution") return "Keep blocked; design paper-trade-only controls first.";
  if (capability.id === "creative-execution-sandbox") return "Review simulation-only Creative Execution Sandbox before Future Guarded Health Probe or Real Creative Executor MVP.";
  if (capability.consent === "explicit-session-consent") return "Prepare consent UX and visible active state preview.";
  if (capability.operatorMode === "creative-production") return "Prepare production plan and approval boundary preview.";
  if (capability.operatorMode === "market-research") return "Prepare research-only brief with no live orders.";
  if (capability.status === "available") return "Use read-only inspection and preserve audit context.";
  return capability.nextMilestones[0] ?? "Define adapter preview contract.";
}

export function scoreCapabilityReadiness(
  capability: CodexForgeResolvedCapabilityBridge
): number {
  if (capability.id === "broker-execution") return 0;

  const base = capability.status === "available" ? 95 : capability.status === "planned" ? 62 : 8;
  const missingPenalty = capability.missingAdapterToolNames.length * 12;
  const approvalPenalty = capability.consent === "approval-required" ? 8 : 0;
  const consentPenalty = capability.consent === "explicit-session-consent" ? 18 : 0;
  const adapterBonus = capability.adapters.length > 0 ? 8 : 0;
  const score =
    base + adapterBonus - missingPenalty - approvalPenalty - consentPenalty - riskPenalty[capability.riskLevel];

  return Math.max(0, Math.min(100, score));
}

export function buildCapabilityReadiness(
  capability: CodexForgeResolvedCapabilityBridge
): CodexForgeCapabilityReadiness {
  const approvalRequired =
    capability.consent === "approval-required" ||
    capability.consent === "explicit-session-consent" ||
    capability.adapters.some((adapter) => adapter.requiresApproval);
  const score = scoreCapabilityReadiness(capability);
  const executionBlocked = isCapabilityExecutionBlocked(capability);
  const nextMilestone = capability.nextMilestones[0] ?? "Define next safe adapter milestone.";

  return {
    id: capability.id,
    label: capability.label,
    status: capability.id === "broker-execution" ? "blocked" : capability.status,
    riskLevel: capability.id === "broker-execution" ? "critical" : capability.riskLevel,
    operatorMode: capability.operatorMode,
    adapterPresent: capability.adapters.length > 0 && capability.missingAdapterToolNames.length === 0,
    adapterCount: capability.adapters.length,
    missingAdapterToolNames: capability.missingAdapterToolNames,
    approvalRequired,
    executionBlocked,
    consentRequirement: capability.id === "broker-execution" ? "blocked" : capability.consent,
    sideEffectRisk: sideEffectRisk(capability),
    smokeCoverageHint: buildSmokeCoverageHint(capability),
    nextMilestone,
    safeNextAction: safeNextAction(capability),
    score,
    summary: summarizeCapabilityPolicy(capability),
  };
}

export function summarizeCapabilityReadiness(
  readiness: CodexForgeCapabilityReadiness
): string {
  if (readiness.executionBlocked) {
    return `${readiness.label}: blocked, ${readiness.riskLevel} risk, score ${readiness.score}.`;
  }

  return `${readiness.label}: ${readiness.status}, ${readiness.adapterCount} adapter(s), ${readiness.approvalRequired ? "approval-gated" : "read-only"}, score ${readiness.score}.`;
}

export function sortCapabilitiesByReadiness(
  capabilities: CodexForgeCapabilityReadiness[]
): CodexForgeCapabilityReadiness[] {
  return [...capabilities].sort((a, b) => {
    if (a.executionBlocked !== b.executionBlocked) return a.executionBlocked ? 1 : -1;
    if (a.score !== b.score) return b.score - a.score;
    return a.label.localeCompare(b.label);
  });
}

export function buildCapabilityReadinessMap(): CodexForgeCapabilityReadiness[] {
  return sortCapabilitiesByReadiness(
    listCodexForgeCapabilityBridgeDescriptors().map((capability) =>
      buildCapabilityReadiness(capability)
    )
  );
}
