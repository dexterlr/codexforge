import { listCodexForgeCapabilityBridgeDescriptors } from "@/lib/codexforge/tools/capability-bridge-manifest";
import { buildAdapterHealthReport, summarizeAdapterHealth } from "./adapter-health";
import { buildArtifactLedger, summarizeArtifactLedger } from "./artifact-ledger";
import { buildCapabilityReadinessMap } from "./capability-readiness";
import { buildCapabilityRoadmap } from "./capability-roadmap";
import { buildCreativeProductionPlan } from "./creative-production";
import type {
  CodexForgeAdapterHealth,
  CodexForgeCapabilityArtifact,
  CodexForgeCapabilityDescriptor,
  CodexForgeCapabilityReadiness,
  CodexForgeCapabilityRoadmapItem,
  CodexForgeCreativeProductionPlan,
} from "./capability-types";

export type CodexForgeCapabilityContext = {
  capabilities: CodexForgeCapabilityDescriptor[];
  readiness: CodexForgeCapabilityReadiness[];
  adapters: CodexForgeAdapterHealth[];
  artifacts: CodexForgeCapabilityArtifact[];
  roadmap: CodexForgeCapabilityRoadmapItem[];
  creativePlans: CodexForgeCreativeProductionPlan[];
  summary: {
    capabilityCount: number;
    adapterHealth: string;
    artifactLedger: string;
    blockedExecution: string;
    operatorMode: string;
  };
};

export function buildCapabilityContext(): CodexForgeCapabilityContext {
  const capabilities = listCodexForgeCapabilityBridgeDescriptors();
  const adapters = buildAdapterHealthReport();
  const artifacts = buildArtifactLedger();
  const creativePlans = [
    buildCreativeProductionPlan("blender-production"),
    buildCreativeProductionPlan("comfyui-production"),
    buildCreativeProductionPlan("unreal-production"),
  ];

  return {
    capabilities,
    readiness: buildCapabilityReadinessMap(),
    adapters,
    artifacts,
    roadmap: buildCapabilityRoadmap(),
    creativePlans,
    summary: {
      capabilityCount: capabilities.length,
      adapterHealth: summarizeAdapterHealth(adapters),
      artifactLedger: summarizeArtifactLedger(artifacts),
      blockedExecution: "Broker execution is visibly blocked.",
      operatorMode: "Operator-controlled preview cockpit",
    },
  };
}
