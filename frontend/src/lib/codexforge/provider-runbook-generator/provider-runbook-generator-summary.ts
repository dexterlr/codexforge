import type {
  ProviderRunbook,
  ProviderRunbookGeneratorBoundary,
  ProviderRunbookGeneratorModel,
} from "./provider-runbook-generator-types";
import { buildProviderRunbookGeneratorStableKey } from "./provider-runbook-generator-types";

export const PROVIDER_RUNBOOK_GENERATOR_LANGUAGE = [
  "Provider runbook generator",
  "Runbooks do not include secrets",
  "Commands are manual-only",
  "Credential safety checklist",
  "Live-test gate checklist",
  "Failure recovery step",
] as const;

export function buildProviderRunbook(
  input: Omit<ProviderRunbook, "id"> & { idHint: string }
): ProviderRunbook {
  const { idHint, ...runbook } = input;
  return {
    id: buildProviderRunbookGeneratorStableKey("provider-runbook-generator", idHint, input.reviewStatus),
    ...runbook,
  };
}

export function buildProviderRunbooks(): ProviderRunbook[] {
  return [
    buildProviderRunbook({
      idHint: "local-first-provider-setup",
      runbookIdentity:
        "Runbook identity: local-first provider setup runbook for profile review, credential safety, test gates, and governance handoff.",
      providerSetupChecklist: [
        "Confirm provider profile label and intended use",
        "Confirm local-first option before cloud fallback",
        "Confirm setup remains profile-only until approval",
      ],
      credentialSafetyChecklist: [
        "Keep API keys out of UI, copied output, route params, and localStorage",
        "Use environment or secure credential path outside this runbook",
        "Record only present, missing, not checked, or manual profile labels",
      ],
      liveTestGateChecklist: [
        "Review provider, model, prompt summary, and budget before any future live test",
        "Confirm no prompt or file is sent automatically",
        "Confirm test result capture is manual and redacted",
      ],
      privacyClassifierStep:
        "Privacy classifier step: classify prompt and file context before any provider-send approval.",
      budgetGuardrailStep:
        "Budget guardrail step: review spend limit, token limit, warning threshold, and blocked reason before live use.",
      failureRecoveryStep:
        "Failure recovery step: use reviewed retry checklist, local fallback, and blocked reasons before any retry.",
      auditReviewStep:
        "Audit review step: check redacted audit summaries for approval status, privacy class, budget status, and recovery route.",
      manualOnlyCommandsHandoff:
        "Manual-only commands/handoff: commands are written as operator notes only; this page does not run shell commands.",
      excludedSecretsNote:
        "Excluded secrets note: runbooks do not include secrets, API keys, passwords, raw tokens, environment values, private prompts, or file contents.",
      reviewStatus: "ready-for-review",
      advancedRunbookDetails:
        "Advanced runbook details: setup, testing, recovery, and governance remain human-operated and do not call provider APIs, export API keys, or mutate settings.",
    }),
    buildProviderRunbook({
      idHint: "cloud-provider-test-recovery",
      runbookIdentity:
        "Runbook identity: cloud provider test and recovery runbook for a future approval-gated live test.",
      providerSetupChecklist: [
        "Confirm provider and model labels match the reviewed profile",
        "Confirm manual credential path exists outside this UI",
        "Confirm rollback and recovery notes are understandable",
      ],
      credentialSafetyChecklist: [
        "Never paste secrets into the runbook",
        "Never copy API keys into audit views or policy bundles",
        "Never export credentials as provider settings",
      ],
      liveTestGateChecklist: [
        "Confirm privacy class is approved",
        "Confirm budget guardrail is approved",
        "Confirm operator approval exists before live traffic",
      ],
      privacyClassifierStep:
        "Privacy classifier step: redact sensitive data and keep raw sensitive content secondary before approval.",
      budgetGuardrailStep:
        "Budget guardrail step: stop if token or spend caps are missing, unclear, or above the operator-approved scope.",
      failureRecoveryStep:
        "Failure recovery step: failed provider tests route to recovery review; no automatic retry or cloud fallback runs.",
      auditReviewStep:
        "Audit review step: record result status and redacted details manually after the operator has reviewed the outcome.",
      manualOnlyCommandsHandoff:
        "Manual-only commands/handoff: copy runbook steps to the operator; commands are manual-only and never executed here.",
      excludedSecretsNote:
        "Excluded secrets note: runbook output excludes API keys, passwords, tokens, billing identifiers, raw prompts, and private logs.",
      reviewStatus: "needs-approval",
      advancedRunbookDetails:
        "Advanced runbook details: this generator does not browse arbitrary files, run commands, call cloud providers, export settings, import settings, or store credentials.",
    }),
  ];
}

export function buildProviderRunbookGeneratorBoundary(): ProviderRunbookGeneratorBoundary {
  return {
    runbooksIncludeSecretsAllowed: false,
    shellCommandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    apiKeyExportAllowed: false,
    credentialStorageAllowed: false,
    automaticLiveTestAllowed: false,
    automaticProviderSendAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    settingsAutoExportAllowed: false,
    settingsAutoImportAllowed: false,
    providerRegistryMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
  };
}

export function summarizeProviderRunbookGenerator(
  model: Pick<ProviderRunbookGeneratorModel, "runbooks">
): string {
  return `Provider runbook generator prepares ${model.runbooks.length} operator-readable runbook(s). Runbooks do not include secrets, commands are manual-only, and no provider API or shell command is run from this page.`;
}

export function buildProviderRunbookGeneratorModel(): ProviderRunbookGeneratorModel {
  const runbooks = buildProviderRunbooks();
  const model: ProviderRunbookGeneratorModel = {
    title: "Provider runbook generator",
    summary: "",
    runbooks,
    boundary: buildProviderRunbookGeneratorBoundary(),
    runbookLanguage: [...PROVIDER_RUNBOOK_GENERATOR_LANGUAGE],
    advancedDetails: [
      "Provider runbook generator",
      "Runbooks do not include secrets",
      "Commands are manual-only",
      "Credential safety checklist",
      "Live-test gate checklist",
      "Privacy classifier step",
      "Budget guardrail step",
      "Failure recovery step",
      "Audit review step",
      "Manual-only commands/handoff",
      "Excluded secrets note",
      "No shell command execution",
      "No provider APIs are called",
      "No API key export",
      "No settings auto-export",
      "No settings auto-import",
    ],
  };
  return { ...model, summary: summarizeProviderRunbookGenerator(model) };
}
