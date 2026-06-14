import type {
  DailyOperatorCockpitFinalPolish,
  DailyOperatorCockpitFinalPolishBoundary,
  DailyOperatorCockpitFinalPolishModel,
} from "./daily-operator-cockpit-final-polish-types";
import { buildDailyOperatorCockpitFinalPolishStableKey } from "./daily-operator-cockpit-final-polish-types";

export const DAILY_OPERATOR_COCKPIT_FINAL_POLISH_LANGUAGE = [
  "Daily operator cockpit final polish",
  "Daily operator cockpit final polish does not execute actions",
  "Cockpit changes require explicit operator approval",
  "Unresolved cockpit blockers stay blocked",
  "Cockpit readiness groups",
  "Navigation clarity checklist",
] as const;

export function buildDailyOperatorCockpitFinalPolish(
  input: Omit<DailyOperatorCockpitFinalPolish, "id"> & { idHint: string }
): DailyOperatorCockpitFinalPolish {
  const { idHint, ...review } = input;
  return {
    id: buildDailyOperatorCockpitFinalPolishStableKey("daily-operator-cockpit-final-polish", idHint, input.status),
    ...review,
  };
}

export function buildDailyOperatorCockpitFinalPolishes(): DailyOperatorCockpitFinalPolish[] {
  return [
    buildDailyOperatorCockpitFinalPolish({
      idHint: "daily-readiness-review",
      status: "blocked",
      dailyOperatorCockpitPolishIdentity:
        "Daily operator cockpit polish identity: daily-operator-cockpit-final-polish-daily-readiness-review.",
      cockpitReadinessGroups: [
        "Cockpit readiness groups: navigation clarity, review inbox clarity, approval queue clarity, result history clarity, policy handoff clarity, safety reminders, and release readiness handoff.",
      ],
      navigationClarityChecklist: [
        "Navigation clarity checklist: the operator can see cohesion, approval, evidence, result, recovery, settings, cockpit, and command palette routes without duplicate menus.",
      ],
      reviewInboxClarityChecklist: [
        "Review inbox clarity checklist: review items stay review-only and do not execute actions, fetch connector data, call providers, or mutate memory.",
      ],
      approvalQueueClarityChecklist: [
        "Approval queue clarity checklist: approval required wording stays visible and no approval is granted from this route.",
      ],
      deniedCockpitActions: [
        "Denied cockpit actions: execute actions, persist settings, run workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or promote memory.",
      ],
      unresolvedCockpitBlockers: [
        "Unresolved cockpit blockers: duplicate menu confusion, unclear approval queue state, missing evidence handoff, unsafe result reuse, and unclear recovery next step.",
      ],
      commandPalettePolishRoute:
        "Command palette polish route: /global-command-palette-final-polish reviews command discoverability without executing commands.",
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /readiness remains the review-only release readiness dashboard.",
      nextRecommendedAction:
        "Next recommended action: keep cockpit polish blocked until navigation, review inbox, and approval queue clarity are reviewed outside this page.",
      advancedCockpitDetails:
        "Advanced cockpit details: daily operator cockpit final polish is review-only. Daily operator cockpit final polish does not execute actions, cockpit changes require explicit operator approval, and unresolved cockpit blockers stay blocked. It does not execute actions, persist settings, mutate files, mutate memory, execute workflows, call providers, call local models, call connectors, create automations, send notifications, run commands, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyOperatorCockpitFinalPolishBoundary(): DailyOperatorCockpitFinalPolishBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyOperatorCockpitFinalPolishDoesNotExecuteActions: true,
    cockpitChangesRequireExplicitOperatorApproval: true,
    unresolvedCockpitBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeDailyOperatorCockpitFinalPolish(
  model: Pick<DailyOperatorCockpitFinalPolishModel, "reviews">
): string {
  return `Daily operator cockpit final polish summarizes ${model.reviews.length} cockpit readiness posture without executing actions. Cockpit changes require explicit operator approval, and unresolved cockpit blockers stay blocked.`;
}

export function buildDailyOperatorCockpitFinalPolishModel(): DailyOperatorCockpitFinalPolishModel {
  const reviews = buildDailyOperatorCockpitFinalPolishes();
  const model: DailyOperatorCockpitFinalPolishModel = {
    title: "Daily operator cockpit final polish",
    summary: "",
    reviews,
    boundary: buildDailyOperatorCockpitFinalPolishBoundary(),
    cockpitLanguage: [...DAILY_OPERATOR_COCKPIT_FINAL_POLISH_LANGUAGE],
    advancedDetails: [
      "Daily operator cockpit final polish",
      "Daily operator cockpit polish identity",
      "Cockpit readiness groups",
      "Navigation clarity checklist",
      "Review inbox clarity checklist",
      "Approval queue clarity checklist",
      "Denied cockpit actions",
      "Unresolved cockpit blockers",
      "Command palette polish route",
      "Release readiness dashboard route",
      "Next recommended action",
      "Daily operator cockpit final polish does not execute actions",
      "Cockpit changes require explicit operator approval",
      "Unresolved cockpit blockers stay blocked",
      "advanced cockpit details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyOperatorCockpitFinalPolish(model) };
}
