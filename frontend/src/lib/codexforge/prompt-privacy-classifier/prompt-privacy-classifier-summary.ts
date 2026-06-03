import type {
  PromptPrivacyClassifierBoundary,
  PromptPrivacyClassifierItem,
  PromptPrivacyClassifierModel,
} from "./prompt-privacy-classifier-types";
import { buildPromptPrivacyClassifierStableKey } from "./prompt-privacy-classifier-types";

export const PROMPT_PRIVACY_CLASSIFIER_LANGUAGE = [
  "Prompt privacy classifier",
  "Classification does not send prompts anywhere",
  "Files and prompts are not sent automatically",
  "Sensitive data flags",
  "Local-first recommendation",
  "Raw sensitive content stays secondary",
] as const;

export function buildPromptPrivacyClassifierItem(
  input: Omit<PromptPrivacyClassifierItem, "id"> & { idHint: string }
): PromptPrivacyClassifierItem {
  const { idHint, ...classification } = input;
  return {
    id: buildPromptPrivacyClassifierStableKey(
      "prompt-privacy-classifier",
      idHint,
      input.privacyClass,
      input.providerSendReadiness
    ),
    ...classification,
  };
}

export function buildPromptPrivacyClassifierItems(): PromptPrivacyClassifierItem[] {
  return [
    buildPromptPrivacyClassifierItem({
      idHint: "private-project-context",
      promptContextSummary:
        "Prompt/context summary: private project debugging request with a short summary only; raw code and files stay out of the first view.",
      privacyClass: "sensitive",
      sensitiveDataFlags: [
        "private project context",
        "possible file paths",
        "possible proprietary code",
      ],
      fileContextSendRisk:
        "File/context send risk: high until the human chooses exact excerpts, removes secrets, and confirms the provider boundary.",
      localFirstRecommendation:
        "Local-first recommendation: summarize locally first and use a local model when private code or file context is not needed in cloud.",
      providerSendReadiness: "needs-redaction",
      redactionGuidance:
        "Redaction guidance: remove secrets, personal data, private file paths, raw logs, and unrelated context before any reviewed provider handoff.",
      approvalRequirement:
        "Approval requirement: explicit approval is required for provider, model, prompt summary, file scope, privacy class, and budget guardrail.",
      blockedReasons: [
        "Raw prompt has not been reviewed",
        "File context has not been scoped",
        "Budget guardrail and provider route are not approved",
      ],
      handoffRoute: "/provider-budget-guardrails",
      rawSensitiveContentHandling:
        "Raw sensitive content stays secondary and should be replaced with a short reviewed summary before any provider-send review.",
    }),
    buildPromptPrivacyClassifierItem({
      idHint: "public-doc-summary",
      promptContextSummary:
        "Prompt/context summary: public documentation summary with no files, no secrets, and no private memory payload.",
      privacyClass: "public",
      sensitiveDataFlags: [
        "no secret flag",
        "no file attachment",
        "no private memory payload",
      ],
      fileContextSendRisk:
        "File/context send risk: low when the prompt uses public text and no hidden attachments, but the classifier still does not send it.",
      localFirstRecommendation:
        "Local-first recommendation: use local summarization first when quality is enough and cloud spend is not needed.",
      providerSendReadiness: "local-first",
      redactionGuidance:
        "Redaction guidance: keep only the necessary public excerpt and remove account names, credentials, private URLs, or internal notes.",
      approvalRequirement:
        "Approval requirement: provider-send readiness still needs a human to approve scope, budget, and route before any live traffic.",
      blockedReasons: [
        "Provider live-test gate has not approved the send",
        "Router change is not approved",
      ],
      handoffRoute: "/router-recommendation-review",
      rawSensitiveContentHandling:
        "Raw sensitive content stays secondary; this example should have none above the fold and no automatic memory storage.",
    }),
  ];
}

export function buildPromptPrivacyClassifierBoundary(): PromptPrivacyClassifierBoundary {
  return {
    classificationSendsPromptsAllowed: false,
    promptOrFileAutoSendAllowed: false,
    providerApiCallsAllowedFromUi: false,
    fileUploadAllowed: false,
    rawSensitiveContentAboveFoldAllowed: false,
    memoryAutoStorageAllowed: false,
    memoryAutoPromotionAllowed: false,
    providerRegistryMutationAllowed: false,
    routerConfigMutationAllowedFromUi: false,
    settingsAutoImportAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizePromptPrivacyClassifier(
  model: Pick<PromptPrivacyClassifierModel, "classifications">
): string {
  return `Prompt privacy classifier prepares ${model.classifications.length} review classification(s). Classification does not send prompts anywhere, files and prompts are not sent automatically, and raw sensitive content stays secondary.`;
}

export function buildPromptPrivacyClassifierModel(): PromptPrivacyClassifierModel {
  const classifications = buildPromptPrivacyClassifierItems();
  const model: PromptPrivacyClassifierModel = {
    title: "Prompt privacy classifier",
    summary: "",
    classifications,
    boundary: buildPromptPrivacyClassifierBoundary(),
    classifierLanguage: [...PROMPT_PRIVACY_CLASSIFIER_LANGUAGE],
    advancedDetails: [
      "Prompt privacy classifier",
      "Classification does not send prompts anywhere",
      "Files and prompts are not sent automatically",
      "Sensitive data flags",
      "Local-first recommendation",
      "Raw sensitive content stays secondary",
      "Provider-send readiness",
      "Redaction guidance",
      "Approval requirement",
      "No automatic provider send",
      "No provider APIs are called",
      "No memory auto-storage",
      "No memory auto-promotion",
      "No settings auto-import",
      "No arbitrary local file browsing",
    ],
  };
  return { ...model, summary: summarizePromptPrivacyClassifier(model) };
}
