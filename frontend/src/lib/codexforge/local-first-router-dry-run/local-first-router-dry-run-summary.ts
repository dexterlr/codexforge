import type {
  LocalFirstRouterDryRunBoundary,
  LocalFirstRouterDryRunModel,
  LocalFirstRouterDryRunScenario,
} from "./local-first-router-dry-run-types";
import { buildLocalFirstRouterDryRunStableKey } from "./local-first-router-dry-run-types";

export const LOCAL_FIRST_ROUTER_DRY_RUN_LANGUAGE = [
  "Local-first router dry run",
  "Dry run sends no live traffic",
  "Dry run does not spend tokens",
  "Router config is not changed automatically",
  "Local-first decision",
  "Approval handoff",
] as const;

export function buildLocalFirstRouterDryRunScenario(
  input: Omit<LocalFirstRouterDryRunScenario, "id"> & { idHint: string }
): LocalFirstRouterDryRunScenario {
  const { idHint, ...scenario } = input;
  return {
    id: buildLocalFirstRouterDryRunStableKey("local-first-router-dry-run", idHint, input.decisionStatus),
    ...scenario,
  };
}

export function buildLocalFirstRouterDryRunScenarios(): LocalFirstRouterDryRunScenario[] {
  return [
    buildLocalFirstRouterDryRunScenario({
      idHint: "private-provider-policy-summary",
      taskSummary:
        "Task summary: summarize private provider governance notes and produce a short local-first operator answer.",
      candidateLocalProviderModel:
        "Candidate local provider/model: local runtime profile with operator-selected small reasoning model.",
      candidateCloudProviderModel:
        "Candidate cloud provider/model: reviewed premium cloud reasoning model label, approval required before use.",
      localFirstDecision:
        "Local-first decision: choose the local route because the task is private, short, and does not require cloud-only capability.",
      privacyClass:
        "Privacy class: private operational context; prompts and files stay local unless a separate approval packet exists.",
      budgetGuardrailResult:
        "Budget guardrail result: pass for dry run because no live traffic is sent and no tokens are spent.",
      capabilityFit:
        "Capability fit: local model is enough for summarization; cloud quality improvement does not justify automatic send.",
      fallbackRoute: "/provider-failure-recovery",
      blockedReasons: [
        "No approved live provider test",
        "No approved router configuration change",
      ],
      approvalHandoff:
        "Approval handoff: copy privacy class, budget result, local-first decision, fallback route, and blocked reasons to router review.",
      decisionStatus: "local-first",
      advancedRoutingDetails:
        "Advanced routing details: dry-run output is a simulation and does not send prompt payloads, route live provider traffic, spend tokens, or change router config.",
    }),
    buildLocalFirstRouterDryRunScenario({
      idHint: "complex-release-analysis",
      taskSummary:
        "Task summary: analyze provider release readiness and decide whether cloud reasoning should be reviewed as a manual fallback.",
      candidateLocalProviderModel:
        "Candidate local provider/model: local long-context profile for first-pass analysis and redaction.",
      candidateCloudProviderModel:
        "Candidate cloud provider/model: approved cloud reasoning label only after privacy and budget handoff.",
      localFirstDecision:
        "Local-first decision: start local, then require manual approval before any cloud fallback or router change.",
      privacyClass:
        "Privacy class: governance metadata is reviewable, but raw prompts, files, logs, and secrets are blocked from automatic send.",
      budgetGuardrailResult:
        "Budget guardrail result: blocked for live cloud use until spend limit, token limit, and operator approval are present.",
      capabilityFit:
        "Capability fit: local pass can prepare context; cloud reasoning may be useful only after redaction and approval.",
      fallbackRoute: "/router-recommendation-review",
      blockedReasons: [
        "Spend limit not approved",
        "Prompt summary not approved",
        "Cloud fallback cannot run automatically",
      ],
      approvalHandoff:
        "Approval handoff: route the simulated recommendation to router recommendation review; router config is not changed automatically.",
      decisionStatus: "cloud-review-needed",
      advancedRoutingDetails:
        "Advanced routing details: router policy remains unchanged and provider registry labels are not mutated by the dry run.",
    }),
  ];
}

export function buildLocalFirstRouterDryRunBoundary(): LocalFirstRouterDryRunBoundary {
  return {
    dryRunLiveTrafficAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    routerConfigMutationAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    settingsAutoImportAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
  };
}

export function summarizeLocalFirstRouterDryRun(
  model: Pick<LocalFirstRouterDryRunModel, "scenarios">
): string {
  return `Local-first router dry run simulates ${model.scenarios.length} routing decision(s). Dry run sends no live traffic, dry run does not spend tokens, and router config is not changed automatically.`;
}

export function buildLocalFirstRouterDryRunModel(): LocalFirstRouterDryRunModel {
  const scenarios = buildLocalFirstRouterDryRunScenarios();
  const model: LocalFirstRouterDryRunModel = {
    title: "Local-first router dry run",
    summary: "",
    scenarios,
    boundary: buildLocalFirstRouterDryRunBoundary(),
    dryRunLanguage: [...LOCAL_FIRST_ROUTER_DRY_RUN_LANGUAGE],
    advancedDetails: [
      "Local-first router dry run",
      "Dry run sends no live traffic",
      "Dry run does not spend tokens",
      "Router config is not changed automatically",
      "Task summary",
      "Candidate local provider/model",
      "Candidate cloud provider/model",
      "Local-first decision",
      "Privacy class",
      "Budget guardrail result",
      "Capability fit",
      "Fallback route",
      "Blocked reasons",
      "Approval handoff",
      "No provider APIs are called",
      "No auto-routing",
      "No auto-spend",
    ],
  };
  return { ...model, summary: summarizeLocalFirstRouterDryRun(model) };
}
