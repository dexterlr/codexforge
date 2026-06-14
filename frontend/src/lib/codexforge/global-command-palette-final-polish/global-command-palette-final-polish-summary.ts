import type {
  GlobalCommandPaletteFinalPolish,
  GlobalCommandPaletteFinalPolishBoundary,
  GlobalCommandPaletteFinalPolishModel,
} from "./global-command-palette-final-polish-types";
import { buildGlobalCommandPaletteFinalPolishStableKey } from "./global-command-palette-final-polish-types";

export const GLOBAL_COMMAND_PALETTE_FINAL_POLISH_LANGUAGE = [
  "Global command palette final polish",
  "Global command palette final polish does not execute commands",
  "Command changes require explicit operator approval",
  "Unsafe command shortcuts remain blocked",
  "Command groups",
  "Duplicate command checklist",
] as const;

export function buildGlobalCommandPaletteFinalPolish(
  input: Omit<GlobalCommandPaletteFinalPolish, "id"> & { idHint: string }
): GlobalCommandPaletteFinalPolish {
  const { idHint, ...review } = input;
  return {
    id: buildGlobalCommandPaletteFinalPolishStableKey("global-command-palette-final-polish", idHint, input.status),
    ...review,
  };
}

export function buildGlobalCommandPaletteFinalPolishes(): GlobalCommandPaletteFinalPolish[] {
  return [
    buildGlobalCommandPaletteFinalPolish({
      idHint: "discoverability-safety-review",
      status: "blocked",
      commandPalettePolishIdentity:
        "Command palette polish identity: global-command-palette-final-polish-discoverability-safety-review.",
      commandGroups: [
        "Command groups: navigation, approval review, evidence review, result review, recovery review, settings review, cockpit review, safety review, and copy-only handoff commands.",
      ],
      routeDiscoverabilityChecklist: [
        "Route discoverability checklist: cohesion, approval, evidence, result, recovery, settings, cockpit, command palette, release readiness, and foundation milestone routes are visible without duplicate menus.",
      ],
      duplicateCommandChecklist: [
        "Duplicate command checklist: duplicate command labels, duplicate route hrefs, duplicate shortLabel values, and unclear command aliases stay blocked.",
      ],
      safetyCommandChecklist: [
        "Safety command checklist: unsafe command shortcuts remain blocked and visible as review-only safety language, not executable controls.",
      ],
      deniedCommandActions: [
        "Denied command actions: execute commands, run shell, run git, run tests, run builds, run smoke, call providers, call local models, call connectors, create automations, persist settings, mutate files, or mutate memory.",
      ],
      unresolvedCommandBlockers: [
        "Unresolved command blockers: duplicate commands, unclear command labels, missing safety wording, unsafe shortcuts, and missing review-only route labels.",
      ],
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /readiness remains the review-only release readiness dashboard.",
      foundationMilestoneReviewRoute:
        "Foundation milestone review route: /codexforge-foundation-release-candidate reviews foundation readiness without executing workflows.",
      nextRecommendedAction:
        "Next recommended action: keep command palette polish blocked until duplicate command and safety command checklists are reviewed outside this page.",
      advancedCommandPaletteDetails:
        "Advanced command palette details: global command palette final polish is review-only. Global command palette final polish does not execute commands, command changes require explicit operator approval, and unsafe command shortcuts remain blocked. It does not execute commands, run shell, run git, run tests, run builds, run smoke, persist settings, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildGlobalCommandPaletteFinalPolishBoundary(): GlobalCommandPaletteFinalPolishBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    globalCommandPaletteFinalPolishDoesNotExecuteCommands: true,
    commandChangesRequireExplicitOperatorApproval: true,
    unsafeCommandShortcutsRemainBlocked: true,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    settingsPersistenceAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeGlobalCommandPaletteFinalPolish(
  model: Pick<GlobalCommandPaletteFinalPolishModel, "reviews">
): string {
  return `Global command palette final polish summarizes ${model.reviews.length} command palette posture without executing commands. Command changes require explicit operator approval, and unsafe command shortcuts remain blocked.`;
}

export function buildGlobalCommandPaletteFinalPolishModel(): GlobalCommandPaletteFinalPolishModel {
  const reviews = buildGlobalCommandPaletteFinalPolishes();
  const model: GlobalCommandPaletteFinalPolishModel = {
    title: "Global command palette final polish",
    summary: "",
    reviews,
    boundary: buildGlobalCommandPaletteFinalPolishBoundary(),
    commandLanguage: [...GLOBAL_COMMAND_PALETTE_FINAL_POLISH_LANGUAGE],
    advancedDetails: [
      "Global command palette final polish",
      "Command palette polish identity",
      "Command groups",
      "Route discoverability checklist",
      "Duplicate command checklist",
      "Safety command checklist",
      "Denied command actions",
      "Unresolved command blockers",
      "Release readiness dashboard route",
      "Foundation milestone review route",
      "Next recommended action",
      "Global command palette final polish does not execute commands",
      "Command changes require explicit operator approval",
      "Unsafe command shortcuts remain blocked",
      "advanced command palette details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeGlobalCommandPaletteFinalPolish(model) };
}
