import {
  codexForgeToolAdapterRegistry,
  getCodexForgeToolAdapter,
  type CodexForgeToolAdapterDescriptor,
} from "@/lib/codexforge/tools/tool-adapter-registry";

export type CodexForgeCapabilityBridgeId =
  | "self-inspection"
  | "ai-router"
  | "web-research"
  | "pc-bridge"
  | "camera-inspection"
  | "blender-adapter-preview"
  | "unreal-adapter-preview"
  | "blender-production"
  | "unreal-production"
  | "comfyui-production"
  | "trading-research"
  | "broker-execution";

export type CodexForgeCapabilityBridgeStatus =
  | "available"
  | "planned"
  | "blocked";

export type CodexForgeCapabilityBridgeConsent =
  | "none"
  | "approval-required"
  | "explicit-session-consent"
  | "blocked";

export type CodexForgeCapabilityBridgeRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeCapabilityBridgeDescriptor = {
  id: CodexForgeCapabilityBridgeId;
  label: string;
  summary: string;
  status: CodexForgeCapabilityBridgeStatus;
  consent: CodexForgeCapabilityBridgeConsent;
  riskLevel: CodexForgeCapabilityBridgeRiskLevel;
  adapterToolNames: readonly string[];
  allowedSideEffects: readonly CodexForgeToolAdapterDescriptor["sideEffect"][];
  operatorMode:
    | "self-audit"
    | "research"
    | "local-control"
    | "creative-production"
    | "market-research"
    | "blocked-execution";
  safetyInvariants: readonly string[];
  nextMilestones: readonly string[];
};

export type CodexForgeResolvedCapabilityBridge = CodexForgeCapabilityBridgeDescriptor & {
  adapters: CodexForgeToolAdapterDescriptor[];
  missingAdapterToolNames: string[];
};

export const CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION =
  "2026-05-08.capability-bridge.v1";

export const codexForgeCapabilityBridgeManifest = [
  {
    id: "ai-router",
    label: "AI Router",
    summary:
      "Route AI tasks across local models, subscription profiles, and provider metadata with deterministic token efficiency and fallback recommendations.",
    status: "planned",
    consent: "none",
    riskLevel: "low",
    adapterToolNames: [],
    allowedSideEffects: ["none"],
    operatorMode: "self-audit",
    safetyInvariants: [
      "Model routing does not execute external tools by itself.",
      "No provider API keys are stored in browser storage.",
      "Blocked when no usable provider profile is configured.",
    ],
    nextMilestones: [
      "Configure local model and subscription profiles.",
      "Connect approved server-side provider adapters after policy review.",
    ],
  },
  {
    id: "self-inspection",
    label: "Self inspection",
    summary:
      "Inspect CodexForge source, routes, hooks, tools, smokes, and response contracts using read-only local project tools.",
    status: "available",
    consent: "none",
    riskLevel: "low",
    adapterToolNames: ["read-file", "list-files", "search-project", "snapshot-project"],
    allowedSideEffects: ["local-file-read"],
    operatorMode: "self-audit",
    safetyInvariants: [
      "Read-only source inspection is allowed.",
      "Mutation still requires explicit approval through diff or write gates.",
      "Responses must distinguish inspected evidence from planned changes.",
    ],
    nextMilestones: [
      "Expose self-audit recommendations in the AI workspace.",
      "Add a ranked upgrade backlog generated from local inspection.",
    ],
  },
  {
    id: "web-research",
    label: "Web research",
    summary:
      "Perform approved web research with source capture, citation metadata, and no silent browsing.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "medium",
    adapterToolNames: ["web-research"],
    allowedSideEffects: ["external-network"],
    operatorMode: "research",
    safetyInvariants: [
      "No network calls without explicit approval.",
      "Research output must include source attribution.",
      "No credential harvesting or hidden browsing.",
    ],
    nextMilestones: [
      "Add an approved web-research executor.",
      "Persist research citations into memory and task context.",
    ],
  },
  {
    id: "pc-bridge",
    label: "Local PC bridge",
    summary:
      "Operate explicitly approved local PC actions through a narrow bridge contract.",
    status: "planned",
    consent: "explicit-session-consent",
    riskLevel: "high",
    adapterToolNames: ["pc-bridge"],
    allowedSideEffects: ["local-app-control"],
    operatorMode: "local-control",
    safetyInvariants: [
      "No desktop control without explicit session consent.",
      "Every action must be visible, logged, reversible where possible, and approval-gated.",
      "No background surveillance or silent automation.",
    ],
    nextMilestones: [
      "Add local bridge health check endpoint.",
      "Add dry-run action preview before PC bridge execution.",
    ],
  },
  {
    id: "camera-inspection",
    label: "Camera inspection",
    summary:
      "Inspect camera input only after explicit consent and visible active capture state.",
    status: "planned",
    consent: "explicit-session-consent",
    riskLevel: "high",
    adapterToolNames: ["camera-inspect"],
    allowedSideEffects: ["local-app-control"],
    operatorMode: "local-control",
    safetyInvariants: [
      "Camera access requires explicit session consent.",
      "Camera status must be visible while active.",
      "No recording, storage, or transmission unless separately approved.",
    ],
    nextMilestones: [
      "Add camera permission state UI.",
      "Add local-only snapshot inspection with no persistent storage by default.",
    ],
  },
  {
    id: "blender-adapter-preview",
    label: "Blender Adapter Preview",
    summary:
      "Generate deterministic Blender scene models, object/material/light/camera/render plans, Python script previews, and future executor packets without execution.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "medium",
    adapterToolNames: [],
    allowedSideEffects: ["none"],
    operatorMode: "creative-production",
    safetyInvariants: [
      "Blender Adapter Preview capability is preview-only in Phase 62.",
      "Blender execution is blocked.",
      "Render execution and file writes are blocked.",
    ],
    nextMilestones: [
      "Review Blender Adapter Preview v1 at /blender.",
      "Prepare a future guarded creative executor after explicit approval design.",
    ],
  },
  {
    id: "unreal-adapter-preview",
    label: "Unreal Adapter Preview",
    summary:
      "Generate deterministic Unreal level models, actor/asset/material/Blueprint/Sequencer plans, build warnings, command previews, and future executor packets without execution.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "medium",
    adapterToolNames: [],
    allowedSideEffects: ["none"],
    operatorMode: "creative-production",
    safetyInvariants: [
      "Unreal Adapter Preview capability is preview-only in Phase 65.",
      "Unreal execution and Unreal Editor launch are blocked.",
      "Render execution, package/build, and file writes are blocked.",
    ],
    nextMilestones: [
      "Review Unreal Adapter Preview v1 at /unreal.",
      "Prepare Future Guarded Creative Executor after explicit approval design.",
    ],
  },
  {
    id: "blender-production",
    label: "Blender production",
    summary:
      "Run approved Blender automation for scene creation, geometry nodes, materials, renders, and review exports.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "high",
    adapterToolNames: ["blender-python", "render-job", "video-render"],
    allowedSideEffects: ["local-app-control", "none"],
    operatorMode: "creative-production",
    safetyInvariants: [
      "Blender mutations require approval.",
      "Render jobs must expose estimated side effects before execution.",
      "Generated assets must use deterministic naming and review checkpoints.",
    ],
    nextMilestones: [
      "Add Blender scene-plan schema.",
      "Add approved local-safe Blender dry-run output.",
    ],
  },
  {
    id: "unreal-production",
    label: "Unreal production",
    summary:
      "Run approved Unreal Editor automation for levels, assets, blueprints, packaging, and cinematic workflows.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "high",
    adapterToolNames: ["unreal-editor-command", "render-job"],
    allowedSideEffects: ["local-app-control", "none"],
    operatorMode: "creative-production",
    safetyInvariants: [
      "Unreal Editor commands require approval.",
      "Project mutations must be scoped to an approved workspace.",
      "Build or package steps must be explicit and logged.",
    ],
    nextMilestones: [
      "Add Unreal command preview schema.",
      "Add editor connection health check.",
    ],
  },
  {
    id: "comfyui-production",
    label: "ComfyUI production",
    summary:
      "Run approved ComfyUI workflow plans, prompt templates, node graphs, render queues, and asset exports.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "high",
    adapterToolNames: ["comfyui-workflow-run", "render-job"],
    allowedSideEffects: ["local-app-control", "none"],
    operatorMode: "creative-production",
    safetyInvariants: [
      "ComfyUI runs require approval.",
      "Workflow inputs, seeds, models, and output paths must be visible before execution.",
      "Generated output naming must be deterministic.",
    ],
    nextMilestones: [
      "Add ComfyUI workflow manifest schema.",
      "Add dry-run queue preview.",
    ],
  },
  {
    id: "trading-research",
    label: "Trading research",
    summary:
      "Perform approved market research, watchlists, backtest planning, and risk analysis without placing trades.",
    status: "planned",
    consent: "approval-required",
    riskLevel: "medium",
    adapterToolNames: ["trading-research"],
    allowedSideEffects: ["external-network"],
    operatorMode: "market-research",
    safetyInvariants: [
      "Research is not financial advice.",
      "No broker order placement is allowed through research tools.",
      "Risk, assumptions, and data freshness must be explicit.",
    ],
    nextMilestones: [
      "Add paper-trading research summaries.",
      "Add market data freshness indicators.",
    ],
  },
  {
    id: "broker-execution",
    label: "Broker execution",
    summary:
      "Live broker execution remains blocked until explicit broker controls, risk caps, confirmation UX, and audit trails exist.",
    status: "blocked",
    consent: "blocked",
    riskLevel: "critical",
    adapterToolNames: ["broker-execution"],
    allowedSideEffects: ["broker-action"],
    operatorMode: "blocked-execution",
    safetyInvariants: [
      "No live orders.",
      "No account mutation.",
      "No broker action until separate risk controls and explicit confirmations are implemented.",
    ],
    nextMilestones: [
      "Design broker risk cap contract.",
      "Design paper-trade-only bridge before any live broker integration.",
    ],
  },
] as const satisfies readonly CodexForgeCapabilityBridgeDescriptor[];

function resolveBridgeAdapters(
  adapterToolNames: readonly string[]
): Pick<CodexForgeResolvedCapabilityBridge, "adapters" | "missingAdapterToolNames"> {
  const adapters: CodexForgeToolAdapterDescriptor[] = [];
  const missingAdapterToolNames: string[] = [];

  for (const toolName of adapterToolNames) {
    const adapter = getCodexForgeToolAdapter(toolName);

    if (adapter) {
      adapters.push(adapter);
    } else {
      missingAdapterToolNames.push(toolName);
    }
  }

  return { adapters, missingAdapterToolNames };
}

export function listCodexForgeCapabilityBridgeDescriptors(): CodexForgeResolvedCapabilityBridge[] {
  return codexForgeCapabilityBridgeManifest.map((bridge) => ({
    ...bridge,
    ...resolveBridgeAdapters(bridge.adapterToolNames),
  }));
}

export function getCodexForgeCapabilityBridgeDescriptor(
  id: CodexForgeCapabilityBridgeId
): CodexForgeResolvedCapabilityBridge | null {
  return (
    listCodexForgeCapabilityBridgeDescriptors().find((bridge) => bridge.id === id) ??
    null
  );
}

export function buildCodexForgeCapabilityBridgeSummary() {
  const bridges = listCodexForgeCapabilityBridgeDescriptors();

  return {
    version: CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION,
    bridgeCount: bridges.length,
    adapterCount: codexForgeToolAdapterRegistry.length,
    availableBridgeCount: bridges.filter((bridge) => bridge.status === "available")
      .length,
    plannedBridgeCount: bridges.filter((bridge) => bridge.status === "planned")
      .length,
    blockedBridgeCount: bridges.filter((bridge) => bridge.status === "blocked")
      .length,
    highOrCriticalRiskBridgeCount: bridges.filter(
      (bridge) => bridge.riskLevel === "high" || bridge.riskLevel === "critical"
    ).length,
    bridges: bridges.map((bridge) => ({
      id: bridge.id,
      label: bridge.label,
      status: bridge.status,
      consent: bridge.consent,
      riskLevel: bridge.riskLevel,
      operatorMode: bridge.operatorMode,
      adapterToolNames: [...bridge.adapterToolNames],
      adapterCount: bridge.adapters.length,
      missingAdapterToolNames: bridge.missingAdapterToolNames,
      nextMilestone: bridge.nextMilestones[0] ?? null,
    })),
  };
}

export const CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE = [
  "self-inspection",
  "ai-router",
  "web-research",
  "blender-adapter-preview",
  "unreal-adapter-preview",
  "blender-production",
  "comfyui-production",
  "unreal-production",
  "pc-bridge",
  "camera-inspection",
  "trading-research",
  "broker-execution",
] as const satisfies readonly CodexForgeCapabilityBridgeId[];
