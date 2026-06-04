import type {
  JarvisdSettingsExportImportReviewModel,
  JarvisdSettingsReviewBoundary,
  JarvisdSettingsReviewPackage,
} from "./jarvisd-settings-export-import-review-types";
import { buildJarvisdSettingsExportImportReviewStableKey } from "./jarvisd-settings-export-import-review-types";

export const JARVISD_SETTINGS_EXPORT_IMPORT_REVIEW_LANGUAGE = [
  "Jarvisd settings export import review",
  "Secrets are never exported",
  "Imports are not applied automatically",
  "Settings packages are reviewed before use",
  "Excluded secret fields",
  "Rollback note",
] as const;

export function buildJarvisdSettingsReviewPackage(
  input: Omit<JarvisdSettingsReviewPackage, "id"> & { idHint: string }
): JarvisdSettingsReviewPackage {
  const { idHint, ...settingsPackage } = input;
  return {
    id: buildJarvisdSettingsExportImportReviewStableKey(
      "jarvisd-settings-export-import-review",
      idHint,
      input.reviewStatus
    ),
    ...settingsPackage,
  };
}

export function buildJarvisdSettingsReviewPackages(): JarvisdSettingsReviewPackage[] {
  return [
    buildJarvisdSettingsReviewPackage({
      idHint: "local-boundary-settings-review",
      settingsPackageIdentity:
        "Settings package identity: jarvisd-local-boundary-review-package with non-secret labels only.",
      includedNonSecretSettings: [
        "daemon display name",
        "capability registry revision label",
        "permission boundary route label",
        "audit retention summary",
        "manual recovery handoff route",
      ],
      excludedSecretFields: [
        "API keys",
        "passwords",
        "raw tokens",
        "environment values",
        "private file paths",
        "raw audit payloads",
      ],
      redactionStatus:
        "Redaction status: ready for review because secret fields are excluded and audit entries are summarized.",
      compatibilityNotes:
        "Compatibility notes: compare Jarvisd contract, health/version probe, capability registry, and permission boundary labels before any future approved use.",
      importRisk:
        "Import risk: low for review-only non-secret labels, blocked for automatic config mutation or daemon apply.",
      reviewChecklist: [
        "Confirm secrets are never exported",
        "Confirm imports are not applied automatically",
        "Confirm settings packages are reviewed before use",
        "Confirm rollback note is understandable",
      ],
      approvalRequirement:
        "Approval requirement: a human must approve a future local settings boundary before any import can be applied.",
      rollbackNote:
        "Rollback note: keep a before/after checklist of non-secret route labels and boundary labels before any future approved apply.",
      releaseAuditRoute: "/jarvisd-release-audit",
      reviewStatus: "draft-review",
      advancedPackageDetails:
        "Advanced package details: this review does not export secrets, import settings, mutate config, browse arbitrary files, or call Jarvisd.",
    }),
    buildJarvisdSettingsReviewPackage({
      idHint: "recovery-profile-import-risk",
      settingsPackageIdentity:
        "Settings package identity: jarvisd-recovery-profile-import-risk-review for manual recovery defaults.",
      includedNonSecretSettings: [
        "recovery checklist label",
        "audit dependency label",
        "permission dependency label",
        "release audit route",
        "manual handoff wording",
      ],
      excludedSecretFields: [
        "local credentials",
        "machine identifiers",
        "private daemon logs",
        "provider billing data",
        "unredacted audit entries",
      ],
      redactionStatus:
        "Redaction status: blocked until the reviewer confirms machine identifiers and unredacted audit entries are absent.",
      compatibilityNotes:
        "Compatibility notes: recovery wording can be reused only if the future Jarvisd daemon boundary still requires explicit approval.",
      importRisk:
        "Import risk: medium because incorrect recovery defaults could imply execution if imported without review.",
      reviewChecklist: [
        "Confirm no local process action is implied",
        "Confirm no file path is imported from arbitrary browsing",
        "Confirm no provider registry is changed silently",
        "Confirm release audit route is present",
      ],
      approvalRequirement:
        "Approval requirement: approval required before any future settings package changes daemon defaults or recovery wording.",
      rollbackNote:
        "Rollback note: record the previous recovery copy and permission route labels before future approved use.",
      releaseAuditRoute: "/jarvisd-release-audit",
      reviewStatus: "needs-approval",
      advancedPackageDetails:
        "Advanced package details: imports remain manual review items; no config is changed and no local file is opened from this page.",
    }),
  ];
}

export function buildJarvisdSettingsReviewBoundary(): JarvisdSettingsReviewBoundary {
  return {
    secretsExportedAllowed: false,
    secretsDisplayedAllowed: false,
    importsAppliedAutomaticallyAllowed: false,
    settingsAutoExportAllowed: false,
    settingsAutoImportAllowed: false,
    configMutationAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdSettingsExportImportReview(
  model: Pick<JarvisdSettingsExportImportReviewModel, "packages">
): string {
  return `Jarvisd settings export import review prepares ${model.packages.length} non-secret settings package review(s). Secrets are never exported, imports are not applied automatically, and settings packages are reviewed before use.`;
}

export function buildJarvisdSettingsExportImportReviewModel(): JarvisdSettingsExportImportReviewModel {
  const packages = buildJarvisdSettingsReviewPackages();
  const model: JarvisdSettingsExportImportReviewModel = {
    title: "Jarvisd settings export import review",
    summary: "",
    packages,
    boundary: buildJarvisdSettingsReviewBoundary(),
    reviewLanguage: [...JARVISD_SETTINGS_EXPORT_IMPORT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Jarvisd settings export import review",
      "Secrets are never exported",
      "Imports are not applied automatically",
      "Settings packages are reviewed before use",
      "Settings package identity",
      "Included non-secret settings",
      "Excluded secret fields",
      "Redaction status",
      "Compatibility notes",
      "Import risk",
      "Review checklist",
      "Approval requirement",
      "Rollback note",
      "Release audit route",
      "No config mutation",
      "No arbitrary local file browsing",
    ],
  };
  return { ...model, summary: summarizeJarvisdSettingsExportImportReview(model) };
}
