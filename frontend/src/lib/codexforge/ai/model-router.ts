export const CODEXFORGE_MODEL_ROUTER_VERSION = "2026-05-12.model-router.v1";

export type CodexForgeModelProfileId =
  | "planner"
  | "self-upgrade"
  | "safety-review"
  | "chat-fast"
  | "tool-summarizer"
  | "vision-inspection"
  | "computer-use-gated";

export type CodexForgeReasoningEffort = "minimal" | "low" | "medium" | "high";

export type CodexForgeModelRiskGate =
  | "none"
  | "approval-required"
  | "explicit-session-consent"
  | "blocked";

export type CodexForgeModelProfile = {
  id: CodexForgeModelProfileId;
  label: string;
  model: string;
  api: "responses";
  reasoningEffort: CodexForgeReasoningEffort;
  maxOutputTokens: number;
  riskGate: CodexForgeModelRiskGate;
  toolAccess: {
    webSearch: boolean;
    fileSearch: boolean;
    computerUse: boolean;
    cameraInput: boolean;
    localShell: boolean;
  };
  useCases: string[];
  safetyInvariants: string[];
};

export type CodexForgeModelRouterSummary = {
  version: string;
  defaultPlannerModel: string;
  profileCount: number;
  approvalGatedCount: number;
  blockedCount: number;
  profiles: CodexForgeModelProfile[];
};

export const CODEXFORGE_PRIMARY_REASONING_MODEL = "gpt-5.2";
export const CODEXFORGE_FAST_MODEL = "gpt-5-mini";
export const CODEXFORGE_ECONOMY_MODEL = "gpt-5-nano";

export const CODEXFORGE_MODEL_PROFILES: readonly CodexForgeModelProfile[] = [
  {
    id: "planner",
    label: "Planner / orchestrator",
    model: CODEXFORGE_PRIMARY_REASONING_MODEL,
    api: "responses",
    reasoningEffort: "high",
    maxOutputTokens: 12000,
    riskGate: "none",
    toolAccess: {
      webSearch: false,
      fileSearch: true,
      computerUse: false,
      cameraInput: false,
      localShell: false,
    },
    useCases: [
      "multi-step task planning",
      "architecture reasoning",
      "feature sequencing",
      "agent-team orchestration",
    ],
    safetyInvariants: [
      "Planning does not execute tools by itself.",
      "Mutation tools remain approval-gated.",
      "Broker execution remains blocked.",
    ],
  },
  {
    id: "self-upgrade",
    label: "Self-upgrade reviewer",
    model: CODEXFORGE_PRIMARY_REASONING_MODEL,
    api: "responses",
    reasoningEffort: "high",
    maxOutputTokens: 16000,
    riskGate: "none",
    toolAccess: {
      webSearch: false,
      fileSearch: true,
      computerUse: false,
      cameraInput: false,
      localShell: false,
    },
    useCases: [
      "repo self-inspection",
      "ranked upgrade backlog",
      "refactor planning",
      "smoke hardening",
    ],
    safetyInvariants: [
      "Self-upgrade output is advisory until explicit diff approval.",
      "No write, shell, camera, web, or desktop control without the relevant tool gate.",
      "Suggested upgrades must cite inspected evidence when available.",
    ],
  },
  {
    id: "safety-review",
    label: "Safety and policy reviewer",
    model: CODEXFORGE_PRIMARY_REASONING_MODEL,
    api: "responses",
    reasoningEffort: "high",
    maxOutputTokens: 9000,
    riskGate: "none",
    toolAccess: {
      webSearch: false,
      fileSearch: true,
      computerUse: false,
      cameraInput: false,
      localShell: false,
    },
    useCases: [
      "tool policy review",
      "approval gate validation",
      "broker and desktop control review",
    ],
    safetyInvariants: [
      "Broker execution remains blocked.",
      "Desktop and camera workflows require explicit session consent.",
      "Web research requires approval and citations.",
    ],
  },
  {
    id: "chat-fast",
    label: "Fast workspace chat",
    model: CODEXFORGE_FAST_MODEL,
    api: "responses",
    reasoningEffort: "low",
    maxOutputTokens: 5000,
    riskGate: "none",
    toolAccess: {
      webSearch: false,
      fileSearch: false,
      computerUse: false,
      cameraInput: false,
      localShell: false,
    },
    useCases: [
      "short answers",
      "UI copy",
      "simple transformations",
      "low-risk chat",
    ],
    safetyInvariants: [
      "Escalate complex planning to the planner profile.",
      "Do not execute tools.",
    ],
  },
  {
    id: "tool-summarizer",
    label: "Tool result summarizer",
    model: CODEXFORGE_ECONOMY_MODEL,
    api: "responses",
    reasoningEffort: "minimal",
    maxOutputTokens: 3000,
    riskGate: "none",
    toolAccess: {
      webSearch: false,
      fileSearch: false,
      computerUse: false,
      cameraInput: false,
      localShell: false,
    },
    useCases: [
      "summarize tool results",
      "compact logs",
      "generate status labels",
    ],
    safetyInvariants: [
      "Summaries must not invent execution results.",
      "Escalate ambiguous safety state to safety-review.",
    ],
  },
  {
    id: "vision-inspection",
    label: "Vision / camera inspection",
    model: CODEXFORGE_PRIMARY_REASONING_MODEL,
    api: "responses",
    reasoningEffort: "medium",
    maxOutputTokens: 7000,
    riskGate: "explicit-session-consent",
    toolAccess: {
      webSearch: false,
      fileSearch: false,
      computerUse: false,
      cameraInput: true,
      localShell: false,
    },
    useCases: [
      "approved visible camera snapshot inspection",
      "local-only scene understanding",
      "operator-visible visual diagnostics",
    ],
    safetyInvariants: [
      "Camera access requires explicit session consent.",
      "No hidden recording.",
      "No persistence by default.",
    ],
  },
  {
    id: "computer-use-gated",
    label: "Computer use / local PC bridge",
    model: CODEXFORGE_PRIMARY_REASONING_MODEL,
    api: "responses",
    reasoningEffort: "medium",
    maxOutputTokens: 8000,
    riskGate: "blocked",
    toolAccess: {
      webSearch: false,
      fileSearch: false,
      computerUse: true,
      cameraInput: false,
      localShell: false,
    },
    useCases: [
      "future explicit-session desktop automation",
      "approved UI inspection",
      "local bridge dry-run planning",
    ],
    safetyInvariants: [
      "Blocked until local PC bridge consent and audit trail exist.",
      "No silent desktop control.",
      "Every action must be previewed and logged.",
    ],
  },
] as const;

export function listCodexForgeModelProfiles(): CodexForgeModelProfile[] {
  return [...CODEXFORGE_MODEL_PROFILES];
}

export function getCodexForgeModelProfile(
  profileId: CodexForgeModelProfileId
): CodexForgeModelProfile {
  const profile = CODEXFORGE_MODEL_PROFILES.find((entry) => entry.id === profileId);

  if (!profile) {
    throw new Error(`Unknown CodexForge model profile: ${profileId}`);
  }

  return profile;
}

export function getCodexForgeDefaultModelProfile(): CodexForgeModelProfile {
  return getCodexForgeModelProfile("planner");
}

export function buildCodexForgeModelRouterSummary(): CodexForgeModelRouterSummary {
  const profiles = listCodexForgeModelProfiles();

  return {
    version: CODEXFORGE_MODEL_ROUTER_VERSION,
    defaultPlannerModel: getCodexForgeDefaultModelProfile().model,
    profileCount: profiles.length,
    approvalGatedCount: profiles.filter(
      (profile) =>
        profile.riskGate === "approval-required" ||
        profile.riskGate === "explicit-session-consent"
    ).length,
    blockedCount: profiles.filter((profile) => profile.riskGate === "blocked").length,
    profiles,
  };
}

export function isCodexForgeModelProfileToolBlocked(
  profile: CodexForgeModelProfile
): boolean {
  return profile.riskGate === "blocked";
}
