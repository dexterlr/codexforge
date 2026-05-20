import {
  CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION,
  CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE,
  type CodexForgeCapabilityBridgeId,
  type CodexForgeCapabilityBridgeRiskLevel,
  listCodexForgeCapabilityBridgeDescriptors,
} from "@/lib/codexforge/tools/capability-bridge-manifest";

export type CodexForgeSelfUpgradeStatus =
  | "ready"
  | "planned"
  | "approval-gated"
  | "blocked";

export type CodexForgeSelfUpgradePriority = "p0" | "p1" | "p2" | "p3";

export type CodexForgeSelfUpgradeCandidate = {
  id: string;
  title: string;
  capabilityId: CodexForgeCapabilityBridgeId;
  priority: CodexForgeSelfUpgradePriority;
  status: CodexForgeSelfUpgradeStatus;
  riskLevel: CodexForgeCapabilityBridgeRiskLevel;
  rationale: string;
  nextAction: string;
  deliverables: string[];
  validationCommands: string[];
  safetyGates: string[];
  blockedBy: string[];
};

export const CODEXFORGE_SELF_UPGRADE_BACKLOG_VERSION =
  "2026-05-08.self-upgrade-backlog.v1";

function candidate(args: CodexForgeSelfUpgradeCandidate): CodexForgeSelfUpgradeCandidate {
  return args;
}

const BASE_VALIDATION_COMMANDS = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-tool-adapter-registry.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-capability-bridge.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
];

function buildCandidateForCapability(
  capabilityId: CodexForgeCapabilityBridgeId
): CodexForgeSelfUpgradeCandidate {
  switch (capabilityId) {
    case "ai-router":
      return candidate({
        id: "ai-router-provider-configuration-v1",
        title: "AI Router provider configuration v1",
        capabilityId,
        priority: "p1",
        status: "planned",
        riskLevel: "low",
        rationale:
          "CodexForge can now model provider profiles, subscriptions, token budgets, and deterministic route recommendations before any provider execution.",
        nextAction:
          "Add reviewed provider configuration UX and keep secrets in server-side env configuration only.",
        deliverables: [
          "Provider profile configuration review.",
          "Subscription metadata editor.",
          "Route recommendation smoke coverage.",
          "No-secret storage verification.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "No API keys in browser storage.",
          "No provider API calls from deterministic routing.",
          "Blocked when no usable provider profile is configured.",
        ],
        blockedBy: ["Server-side provider adapter configuration not implemented yet."],
      });

    case "self-inspection":
      return candidate({
        id: "self-upgrade-console-v1",
        title: "Self-upgrade console v1",
        capabilityId,
        priority: "p0",
        status: "ready",
        riskLevel: "low",
        rationale:
          "CodexForge already has read-only self-inspection tools and can now produce a ranked upgrade backlog from its own manifests and smokes.",
        nextAction:
          "Render this backlog in the AI workspace and allow one-click planning for the top upgrade.",
        deliverables: [
          "Self-upgrade backlog API.",
          "AI workspace upgrade card.",
          "Ranked next-feature queue.",
          "Smoke assertions for bridge and backlog contracts.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Read-only by default.",
          "No write, diff, shell, desktop, camera, or external access without approval.",
          "Separate suggested upgrades from executed changes.",
        ],
        blockedBy: [],
      });

    case "web-research":
      return candidate({
        id: "approved-web-research-executor-v1",
        title: "Approved web research executor v1",
        capabilityId,
        priority: "p1",
        status: "approval-gated",
        riskLevel: "medium",
        rationale:
          "Web access should become a tool-backed research lane with source capture and no silent browsing.",
        nextAction:
          "Implement a web-research executor that requires explicit approval and returns citations plus freshness metadata.",
        deliverables: [
          "Approval-gated web research route.",
          "Source citation payload.",
          "Research result panel.",
          "Research memory persistence seam.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Explicit approval before network calls.",
          "No credential harvesting.",
          "Citations and source timestamps required.",
        ],
        blockedBy: ["Approved web access executor not implemented yet."],
      });

    case "blender-adapter-preview":
      return candidate({
        id: "blender-adapter-preview-v1",
        title: "Blender Adapter Preview v1",
        capabilityId,
        priority: "p1",
        status: "approval-gated",
        riskLevel: "medium",
        rationale:
          "Blender scene planning can become tangible through typed scene models, Python previews, and future executor packets before any local app execution.",
        nextAction:
          "Review /blender and keep Blender execution, render execution, and file writes blocked until a future guarded creative executor exists.",
        deliverables: [
          "Blender scene input and model.",
          "Object, material, lighting, camera, and render settings preview.",
          "Python script preview.",
          "Future executor packet.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "No Blender execution.",
          "No render execution.",
          "No file writes.",
          "Future executor boundary required.",
        ],
        blockedBy: ["Future guarded creative executor not implemented yet."],
      });

    case "unreal-adapter-preview":
      return candidate({
        id: "unreal-adapter-preview-v1",
        title: "Unreal Adapter Preview v1",
        capabilityId,
        priority: "p1",
        status: "approval-gated",
        riskLevel: "medium",
        rationale:
          "Unreal cinematic and level planning can become tangible through typed level models, command previews, and future executor packets before any local app execution.",
        nextAction:
          "Review /unreal and keep Unreal execution, Unreal Editor launch, render execution, package/build, and file writes blocked until a future guarded creative executor exists.",
        deliverables: [
          "Unreal project input and level model.",
          "Actor, asset, material, Blueprint, Sequencer, and build settings preview.",
          "Command preview.",
          "Future executor packet.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "No Unreal execution.",
          "No Unreal Editor launch.",
          "No render execution.",
          "No package/build.",
          "No file writes.",
          "Future executor boundary required.",
        ],
        blockedBy: ["Future guarded creative executor not implemented yet."],
      });

    case "video-render-job-preview":
      return candidate({
        id: "video-render-job-preview-v1",
        title: "Video Render Job Preview v1",
        capabilityId,
        priority: "p1",
        status: "approval-gated",
        riskLevel: "medium",
        rationale:
          "Video render planning can become tangible through render input, timeline, shot plan, provider plan, queue preview, artifact expectations, approval, policy, and future executor packet before any render execution.",
        nextAction:
          "Review /video-render and keep render execution, Blender execution, ComfyUI execution, Unreal execution, ffmpeg execution, and file writes blocked until a future guarded creative executor exists.",
        deliverables: [
          "Render input and timeline.",
          "Shot plan and provider plan.",
          "Queue preview and artifact plan.",
          "Approval, policy, and future executor packet.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "No render execution.",
          "No Blender, ComfyUI, Unreal, or ffmpeg execution.",
          "No command execution.",
          "No file writes.",
          "Future executor boundary required.",
        ],
        blockedBy: ["Future guarded creative executor not implemented yet."],
      });

    case "blender-production":
      return candidate({
        id: "blender-scene-plan-schema-v1",
        title: "Blender scene-plan schema v1",
        capabilityId,
        priority: "p1",
        status: "approval-gated",
        riskLevel: "high",
        rationale:
          "Blender needs structured scene plans before Python automation can safely mutate files or launch renders.",
        nextAction:
          "Add a schema for objects, materials, geometry nodes, camera, render settings, outputs, and approval checkpoints.",
        deliverables: [
          "Blender scene-plan schema.",
          "Dry-run scene summary.",
          "Approval-gated blender-python request contract.",
          "Render output naming contract.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "No Blender mutation without approval.",
          "Dry-run summary before executing Python.",
          "Render outputs and paths visible before execution.",
        ],
        blockedBy: ["Blender local executor not implemented yet."],
      });

    case "comfyui-production":
      return candidate({
        id: "comfyui-workflow-manifest-v1",
        title: "ComfyUI workflow manifest v1",
        capabilityId,
        priority: "p1",
        status: "approval-gated",
        riskLevel: "high",
        rationale:
          "ComfyUI needs a manifest for prompts, models, seeds, nodes, outputs, and dry-run queue previews.",
        nextAction:
          "Add a workflow manifest schema and render queue preview before any ComfyUI run.",
        deliverables: [
          "ComfyUI workflow manifest schema.",
          "Seed and model metadata contract.",
          "Dry-run queue preview.",
          "Output naming policy.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Approval before workflow execution.",
          "Visible model, seed, prompt, and output path.",
          "No silent external downloads.",
        ],
        blockedBy: ["ComfyUI workflow executor not implemented yet."],
      });

    case "unreal-production":
      return candidate({
        id: "unreal-command-preview-v1",
        title: "Unreal command preview v1",
        capabilityId,
        priority: "p2",
        status: "approval-gated",
        riskLevel: "high",
        rationale:
          "Unreal automation needs explicit command previews and project scope before editor control.",
        nextAction:
          "Add Unreal command preview schema and editor connection health-check contract.",
        deliverables: [
          "Unreal command preview schema.",
          "Editor connection health check.",
          "Project scope guard.",
          "Package/build approval gate.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Approval before editor command execution.",
          "Visible project path and command payload.",
          "No package/build action without separate approval.",
        ],
        blockedBy: ["Unreal local bridge not implemented yet."],
      });

    case "pc-bridge":
      return candidate({
        id: "local-pc-bridge-health-v1",
        title: "Local PC bridge health and consent v1",
        capabilityId,
        priority: "p2",
        status: "approval-gated",
        riskLevel: "high",
        rationale:
          "Desktop control must begin with explicit session consent, health checks, and dry-run action previews.",
        nextAction:
          "Add a local bridge status endpoint and visible session consent state before any PC action.",
        deliverables: [
          "PC bridge health endpoint.",
          "Session consent state.",
          "Dry-run action preview.",
          "Action audit event.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Explicit session consent required.",
          "No silent desktop control.",
          "Every action logged and previewed.",
        ],
        blockedBy: ["Local PC bridge daemon not implemented yet."],
      });

    case "camera-inspection":
      return candidate({
        id: "camera-permission-state-v1",
        title: "Camera permission state v1",
        capabilityId,
        priority: "p2",
        status: "approval-gated",
        riskLevel: "high",
        rationale:
          "Camera access must be visible, consented, local-first, and non-persistent by default.",
        nextAction:
          "Add camera permission state UI and local-only snapshot inspection contract.",
        deliverables: [
          "Camera permission state.",
          "Visible active capture indicator.",
          "Local-only snapshot inspection contract.",
          "No-storage default policy.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Explicit camera consent required.",
          "Visible active camera state.",
          "No recording, storage, or transmission by default.",
        ],
        blockedBy: ["Camera bridge not implemented yet."],
      });

    case "trading-research":
      return candidate({
        id: "paper-trading-research-v1",
        title: "Paper trading research v1",
        capabilityId,
        priority: "p2",
        status: "approval-gated",
        riskLevel: "medium",
        rationale:
          "Trading should start with research, paper-trading summaries, risk modeling, and data freshness, not broker execution.",
        nextAction:
          "Add market research summaries with freshness metadata and paper-trade-only constraints.",
        deliverables: [
          "Trading research summary schema.",
          "Market data freshness indicator.",
          "Paper-trade-only scenario output.",
          "Risk and assumption section.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "No financial advice claims.",
          "No live orders.",
          "Freshness and assumptions visible.",
        ],
        blockedBy: ["Trading research executor not implemented yet."],
      });

    case "broker-execution":
      return candidate({
        id: "broker-risk-cap-design-v1",
        title: "Broker risk-cap design v1",
        capabilityId,
        priority: "p3",
        status: "blocked",
        riskLevel: "critical",
        rationale:
          "Live broker execution remains blocked until risk caps, paper-trade staging, confirmations, and audit trails exist.",
        nextAction:
          "Design broker risk controls without enabling live broker execution.",
        deliverables: [
          "Broker risk cap contract.",
          "Paper-trade-only bridge design.",
          "Multi-confirmation UX design.",
          "Immutable audit trail design.",
        ],
        validationCommands: [...BASE_VALIDATION_COMMANDS],
        safetyGates: [
          "Live broker execution remains blocked.",
          "No account mutation.",
          "No order placement.",
        ],
        blockedBy: [
          "No broker risk controls.",
          "No paper-trade staging.",
          "No live execution approval UX.",
        ],
      });
  }
}

function priorityRank(priority: CodexForgeSelfUpgradePriority): number {
  switch (priority) {
    case "p0":
      return 0;
    case "p1":
      return 1;
    case "p2":
      return 2;
    case "p3":
      return 3;
  }
}

function statusRank(status: CodexForgeSelfUpgradeStatus): number {
  switch (status) {
    case "ready":
      return 0;
    case "planned":
      return 1;
    case "approval-gated":
      return 2;
    case "blocked":
      return 3;
  }
}

export function buildCodexForgeSelfUpgradeBacklog() {
  const bridges = listCodexForgeCapabilityBridgeDescriptors();
  const bridgeIds = new Set(bridges.map((bridge) => bridge.id));

  const candidates = CODEXFORGE_GOD_TIER_FEATURE_SEQUENCE.filter((id) =>
    bridgeIds.has(id)
  )
    .map((id) => buildCandidateForCapability(id))
    .sort((a, b) => {
      const priority = priorityRank(a.priority) - priorityRank(b.priority);
      if (priority !== 0) return priority;

      return statusRank(a.status) - statusRank(b.status);
    });

  const topCandidate =
    candidates.find((item) => item.status === "ready") ??
    candidates.find((item) => item.status === "approval-gated") ??
    candidates[0] ??
    null;

  return {
    version: CODEXFORGE_SELF_UPGRADE_BACKLOG_VERSION,
    bridgeVersion: CODEXFORGE_CAPABILITY_BRIDGE_MANIFEST_VERSION,
    candidateCount: candidates.length,
    readyCount: candidates.filter((item) => item.status === "ready").length,
    approvalGatedCount: candidates.filter((item) => item.status === "approval-gated")
      .length,
    blockedCount: candidates.filter((item) => item.status === "blocked").length,
    topCandidate,
    candidates,
  };
}

export function getCodexForgeTopSelfUpgradeCandidate() {
  return buildCodexForgeSelfUpgradeBacklog().topCandidate;
}
