import type { CodexForgeNavigationRouteHref } from "../navigation-shell/navigation-shell-types";

export type CodexForgeCommandKind =
  | "route"
  | "safe-action"
  | "copy-command"
  | "copy-prompt"
  | "review"
  | "handoff"
  | "validation"
  | "stabilization"
  | "memory-review"
  | "creative-preview"
  | "patch-preview";

export type CodexForgeCommandGroup =
  | "Navigate"
  | "Stabilize"
  | "Patch workflow"
  | "Verification"
  | "Memory"
  | "Runtime"
  | "Handoff"
  | "Creative"
  | "Validation"
  | "Safety"
  | "Next action";

export type CodexForgeCommandSafetyLevel =
  | "safe"
  | "review-gated"
  | "copy-only"
  | "blocked";

export type CodexForgeCommand = {
  id: string;
  label: string;
  description: string;
  group: CodexForgeCommandGroup;
  kind: CodexForgeCommandKind;
  href?: CodexForgeNavigationRouteHref;
  copyPayload?: string;
  safetyLevel: CodexForgeCommandSafetyLevel;
  requiresReview: boolean;
  disabledReason?: string;
  keywords: string[];
  noMutation: boolean;
  priority: number;
};

export type CodexForgeCommandInput = Partial<Omit<CodexForgeCommand, "id" | "label">> & {
  id: string;
  label: string;
};

export type CodexForgeCommandRouteAvailability = Partial<
  Record<CodexForgeNavigationRouteHref, boolean>
>;

export type CodexForgeCommandRegistryOptions = {
  routeAvailability?: CodexForgeCommandRouteAvailability;
  includeEducationalBlockedCommands?: boolean;
};

export type CodexForgeCommandSearchResult = {
  command: CodexForgeCommand;
  score: number;
  matchedFields: string[];
};

export type CodexForgeCommandGroupModel = {
  id: string;
  label: CodexForgeCommandGroup;
  description: string;
  priority: number;
  commands: CodexForgeCommand[];
};

export type CodexForgeCommandGroupInput = Partial<CodexForgeCommandGroupModel> & {
  label: CodexForgeCommandGroup;
  commands?: CodexForgeCommand[];
};

export type CodexForgeCommandSafetyItem = {
  id: string;
  label: string;
  blocked: boolean;
  reason: string;
  priority: number;
};

export type CodexForgeCommandSafetyReport = {
  items: CodexForgeCommandSafetyItem[];
  blockedCount: number;
  posture: "copy-link-review-only" | "blocked-mutation-present";
};

export type CodexForgeCommandShortcut = {
  id: string;
  keys: string[];
  label: string;
  description: string;
};

export type CodexForgePaletteNextActionContext = {
  hasStabilizationBlockers?: boolean;
  needsVerificationReview?: boolean;
  needsRegressionTriage?: boolean;
  needsRegressionFixQueue?: boolean;
  needsPatchPreview?: boolean;
  needsPreviewDiff?: boolean;
  needsApplyGateReview?: boolean;
  cleanCheckpointRecommended?: boolean;
};

export type CodexForgeCommandPaletteSummary = {
  commandCount: number;
  enabledCount: number;
  disabledCount: number;
  groups: string[];
  mutationBlockedCount: number;
  nextActionCommand: string;
  safetyPosture: string;
};
