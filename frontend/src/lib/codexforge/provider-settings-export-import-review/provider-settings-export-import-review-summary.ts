import type {
  ProviderSettingsExportImportReviewModel,
  ProviderSettingsReviewBoundary,
  ProviderSettingsReviewPackage,
} from "./provider-settings-export-import-review-types";
import { buildProviderSettingsExportImportReviewStableKey } from "./provider-settings-export-import-review-types";

export const PROVIDER_SETTINGS_EXPORT_IMPORT_REVIEW_LANGUAGE = [
  "Provider settings export import review",
  "Secrets are never exported",
  "Imports are not applied automatically",
  "Excluded secret fields",
  "Review checklist",
  "Apply handoff",
] as const;

export function buildProviderSettingsReviewPackage(
  input: Omit<ProviderSettingsReviewPackage, "id"> & { idHint: string }
): ProviderSettingsReviewPackage {
  const { idHint, ...settingsPackage } = input;
  return {
    id: buildProviderSettingsExportImportReviewStableKey(
      "provider-settings-export-import-review",
      idHint,
      input.reviewStatus
    ),
    ...settingsPackage,
  };
}

export function buildProviderSettingsReviewPackages(): ProviderSettingsReviewPackage[] {
  return [
    buildProviderSettingsReviewPackage({
      idHint: "local-first-provider-settings",
      settingsPackageSummary:
        "Settings package summary: local-first provider metadata package with provider labels, model preferences, safety posture, and no secret values.",
      includedNonSecretSettings: [
        "provider display names",
        "local-first routing preference",
        "reviewed model family labels",
        "budget guardrail summaries",
        "privacy classification policy labels",
      ],
      excludedSecretFields: [
        "API keys",
        "passwords",
        "raw tokens",
        "environment values",
        "private prompt text",
        "file contents",
      ],
      redactionStatus:
        "Redaction status: ready for review because secret fields are excluded and sensitive prompt content is summarized only.",
      compatibilityNotes:
        "Compatibility notes: package can be compared against current provider profile labels before a separate approved apply handoff.",
      importRisk:
        "Import risk: low for review-only metadata, but provider registry writes stay blocked until explicit approval and rollback notes exist.",
      reviewChecklist: [
        "Confirm secrets are excluded",
        "Confirm budget guardrails are included as estimates only",
        "Confirm privacy labels are non-sensitive summaries",
        "Confirm no provider registry write happens from this page",
      ],
      approvalRequirement:
        "Approval requirement: a human must review included settings, excluded secret fields, compatibility notes, import risk, and rollback note.",
      applyHandoff:
        "Apply handoff: copy the reviewed non-secret package summary into a future approved settings apply boundary; imports are not applied automatically.",
      rollbackNote:
        "Rollback note: keep a human-readable before/after checklist so an approved future apply can be reversed deliberately.",
      reviewStatus: "draft-review",
      advancedPackageDetails:
        "Advanced package details: no settings package is exported, uploaded, browsed from arbitrary files, or imported by this UI.",
    }),
    buildProviderSettingsReviewPackage({
      idHint: "cloud-provider-migration",
      settingsPackageSummary:
        "Settings package summary: cloud provider migration review with non-secret account profile labels and manual credential-reference reminders only.",
      includedNonSecretSettings: [
        "provider kind",
        "account profile status",
        "manual approval requirement",
        "failure recovery route",
        "audit export review route",
      ],
      excludedSecretFields: [
        "secret credential references",
        "API keys",
        "billing identifiers",
        "raw request payloads",
        "private logs",
      ],
      redactionStatus:
        "Redaction status: blocked until the human confirms credential references and billing identifiers are not included.",
      compatibilityNotes:
        "Compatibility notes: provider names and model labels may differ across environments, so import preview needs human matching.",
      importRisk:
        "Import risk: medium because a wrong provider label could affect future routing if applied without review.",
      reviewChecklist: [
        "Confirm no credential value is present",
        "Confirm no settings are applied automatically",
        "Confirm provider registry changes require a separate approval packet",
        "Confirm rollback note is understandable",
      ],
      approvalRequirement:
        "Approval requirement: approval required before any future settings apply, provider registry write, or router change.",
      applyHandoff:
        "Apply handoff: route to a future guarded settings apply review after audit, budget, privacy, and compatibility checks pass.",
      rollbackNote:
        "Rollback note: record the previous provider profile labels and router preferences before any future approved apply.",
      reviewStatus: "needs-approval",
      advancedPackageDetails:
        "Advanced package details: this review does not browse arbitrary local files, upload settings, export secrets, or import changes.",
    }),
  ];
}

export function buildProviderSettingsReviewBoundary(): ProviderSettingsReviewBoundary {
  return {
    secretsExportedAllowed: false,
    importsAppliedAutomaticallyAllowed: false,
    settingsAutoExportAllowed: false,
    settingsAutoImportAllowed: false,
    providerRegistryMutationAllowed: false,
    providerRegistryWriteAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    settingsUploadAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeProviderSettingsExportImportReview(
  model: Pick<ProviderSettingsExportImportReviewModel, "packages">
): string {
  return `Provider settings export import review prepares ${model.packages.length} non-secret settings package review(s). Secrets are never exported, and imports are not applied automatically.`;
}

export function buildProviderSettingsExportImportReviewModel(): ProviderSettingsExportImportReviewModel {
  const packages = buildProviderSettingsReviewPackages();
  const model: ProviderSettingsExportImportReviewModel = {
    title: "Provider settings export import review",
    summary: "",
    packages,
    boundary: buildProviderSettingsReviewBoundary(),
    reviewLanguage: [...PROVIDER_SETTINGS_EXPORT_IMPORT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider settings export import review",
      "Secrets are never exported",
      "Imports are not applied automatically",
      "Excluded secret fields",
      "Review checklist",
      "Apply handoff",
      "Settings package summary",
      "Included non-secret settings",
      "Redaction status",
      "Compatibility notes",
      "Import risk",
      "Rollback note",
      "No auto-export settings",
      "No settings auto-import",
      "No provider registry mutation",
      "No arbitrary local file browsing",
    ],
  };
  return { ...model, summary: summarizeProviderSettingsExportImportReview(model) };
}
