import type { CodexForgePlanDomain } from "@/lib/codexforge/types";

export type CodexForgeAgentRoleId =
  | "orchestrator"
  | "planner"
  | "repo-inspector"
  | "coder"
  | "reviewer"
  | "tester"
  | "researcher"
  | "web-builder"
  | "debugger"
  | "automation-operator"
  | "trading-researcher"
  | "blender-operator"
  | "design-director"
  | "marketing-strategist"
  | "deck-strategist"
  | "video-producer"
  | "movie-producer"
  | "comfyui-operator"
  | "unreal-operator"
  | "game-server-architect";

export type CodexForgeToolPermission =
  | "read-only"
  | "approval-required"
  | "blocked-by-default";

export type CodexForgeAgentToolName =
  | "read-file"
  | "list-files"
  | "search-project"
  | "snapshot-project"
  | "generate-diff"
  | "apply-diff"
  | "write-file"
  | "run-command"
  | "run-tests"
  | "build-web-app"
  | "browser-control"
  | "desktop-control"
  | "camera-control"
  | "voice-control"
  | "render-job"
  | "external-api"
  | "market-data"
  | "broker-execution"
  | "blender-python"
  | "comfyui-queue"
  | "unreal-automation"
  | "deck-export"
  | "video-render";

export type CodexForgeAgentOutputKind =
  | "answer"
  | "plan"
  | "inspection"
  | "patch-proposal"
  | "review"
  | "test-plan"
  | "research-brief"
  | "creative-brief"
  | "workflow"
  | "risk-report";

export type CodexForgeAgentOperatingMode =
  | "solo"
  | "lead"
  | "support"
  | "review";

export type CodexForgeAgentToolPolicy = {
  readonly tool: CodexForgeAgentToolName;
  readonly permission: CodexForgeToolPermission;
  readonly reason: string;
};

export type CodexForgeAgentOutputContract = {
  readonly kind: CodexForgeAgentOutputKind;
  readonly mustInclude: readonly string[];
  readonly shouldAvoid: readonly string[];
};

export type CodexForgeAgentRole = {
  readonly id: CodexForgeAgentRoleId;
  readonly label: string;
  readonly domain: CodexForgePlanDomain | "cross-domain";
  readonly mode: CodexForgeAgentOperatingMode;
  readonly mission: string;
  readonly strengths: readonly string[];
  readonly defaultTools: readonly CodexForgeAgentToolPolicy[];
  readonly outputContract: CodexForgeAgentOutputContract;
  readonly handoffRules: readonly string[];
  readonly safetyRules: readonly string[];
};

export type CodexForgeAgentTeamSelection = {
  readonly domain: CodexForgePlanDomain;
  readonly primaryRole: CodexForgeAgentRole;
  readonly supportRoles: readonly CodexForgeAgentRole[];
  readonly reviewRoles: readonly CodexForgeAgentRole[];
  readonly allowedTools: readonly CodexForgeAgentToolPolicy[];
  readonly approvalRequiredTools: readonly CodexForgeAgentToolPolicy[];
  readonly blockedTools: readonly CodexForgeAgentToolPolicy[];
  readonly reasons: readonly string[];
};

export type CodexForgeAgentTeamSelectionInput = {
  readonly domain: CodexForgePlanDomain;
  readonly tags?: readonly string[];
  readonly explicitFileRequest?: boolean;
  readonly requestedPaths?: readonly string[];
  readonly requestedVerbs?: readonly string[];
};
