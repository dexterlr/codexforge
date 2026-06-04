import type {
  PrRiskCheck,
  PrRiskChecklistBoundary,
  PrRiskChecklistModel,
} from "./pr-risk-checklist-types";
import { buildPrRiskChecklistStableKey } from "./pr-risk-checklist-types";

export const PR_RISK_CHECKLIST_LANGUAGE = [
  "PR risk checklist",
  "PR risk review does not approve merges automatically",
  "Suspected secrets are redacted",
  "High-risk changes require explicit review",
  "Test and validation coverage",
  "Migration config env risk",
] as const;

export function buildPrRiskCheck(
  input: Omit<PrRiskCheck, "id"> & { idHint: string }
): PrRiskCheck {
  const { idHint, ...check } = input;
  return {
    id: buildPrRiskChecklistStableKey("pr-risk-checklist", idHint, input.status),
    ...check,
  };
}

export function buildPrRiskChecks(): PrRiskCheck[] {
  return [
    buildPrRiskCheck({
      idHint: "reviewed-pr-prep-risk",
      status: "risk-review-required",
      riskChecklistIdentity:
        "Risk checklist identity: reviewed PR merge and release risk checklist created from /pull-request-prep-review.",
      sourcePrPrep:
        "Source PR prep: /pull-request-prep-review supplies branch/tag dependency, commit summary, changed areas, validation status, and suggested PR copy.",
      changedAreas:
        "Changed areas: summarize UI routes, library models, scripts, smoke coverage, docs, tests, config, and release handoff language in plain English.",
      riskCategories: [
        "Merge conflict risk",
        "Release handoff risk",
        "Config or environment naming risk",
        "UX/navigation risk",
        "Validation gap risk",
        "Suspected secret redaction risk",
      ],
      testValidationCoverage:
        "Test and validation coverage: list smoke scripts, targeted checks, skipped provider tests, and blocked validation reasons before PR handoff.",
      secretsScanStatus:
        "Secrets scan status: suspected secrets are redacted and secret values are never included in checklist copy.",
      migrationConfigEnvRisk:
        "Migration config env risk: identify schema, config, route, variable-name, and deployment setting risks without showing environment values.",
      uxNavigationRisk:
        "UX/navigation risk: confirm labels, route order, command entries, novice-friendly copy, and no duplicate menus before handoff.",
      releaseNotesRoute:
        "Release notes route: /release-notes-draft-builder turns reviewed risk notes into draft release notes without publishing a release.",
      blockedReasons: [
        "PR risk review does not approve merges automatically",
        "Suspected secrets are redacted",
        "High-risk changes require explicit review",
      ],
      advancedChecklistDetails:
        "Advanced checklist details: this page reviews risk only. It does not call GitHub APIs, create PRs, merge, push, create branches, create tags, mutate files, apply patches, call providers, publish releases, or display secrets.",
    }),
    buildPrRiskCheck({
      idHint: "blocked-missing-pr-prep",
      status: "blocked",
      riskChecklistIdentity:
        "Risk checklist identity: blocked checklist because source PR prep, validation, or secrets scan status is missing.",
      sourcePrPrep:
        "Source PR prep: blocked until /pull-request-prep-review supplies reviewed PR prep copy.",
      changedAreas:
        "Changed areas: unavailable until changed areas summary is reviewed.",
      riskCategories: [
        "Missing PR prep",
        "Missing validation coverage",
        "Missing risk/secrets status",
      ],
      testValidationCoverage:
        "Test and validation coverage: blocked until tests, smoke scripts, or blocked validation reasons are reviewed.",
      secretsScanStatus:
        "Secrets scan status: blocked until suspected secrets stay redacted.",
      migrationConfigEnvRisk:
        "Migration config env risk: blocked until config and variable-name risk is reviewed without environment values.",
      uxNavigationRisk:
        "UX/navigation risk: blocked until route and command navigation risk is reviewed.",
      releaseNotesRoute:
        "Release notes route: /release-notes-draft-builder remains blocked until checklist risk is reviewed.",
      blockedReasons: [
        "Source PR prep missing",
        "Validation coverage missing",
        "Approved local boundary required",
      ],
      advancedChecklistDetails:
        "Advanced checklist details: blocked risk reviews cannot create PRs, merge, call GitHub APIs, push, mutate files, publish releases, call providers, or include secrets.",
    }),
  ];
}

export function buildPrRiskChecklistBoundary(): PrRiskChecklistBoundary {
  return {
    reviewOnly: true,
    automaticMergeApprovalAllowed: false,
    pullRequestCreationAllowedFromUi: false,
    pullRequestMergeAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    branchCreationAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    releasePublishAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    suspectedSecretsRedacted: true,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    secretsIncludedAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    environmentValuesDisplayedAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizePrRiskChecklist(
  model: Pick<PrRiskChecklistModel, "checks">
): string {
  return `PR risk checklist prepares ${model.checks.length} merge and release risk review shape(s). PR risk review does not approve merges automatically, suspected secrets are redacted, and high-risk changes require explicit review.`;
}

export function buildPrRiskChecklistModel(): PrRiskChecklistModel {
  const checks = buildPrRiskChecks();
  const model: PrRiskChecklistModel = {
    title: "PR risk checklist",
    summary: "",
    checks,
    boundary: buildPrRiskChecklistBoundary(),
    checklistLanguage: [...PR_RISK_CHECKLIST_LANGUAGE],
    advancedDetails: [
      "PR risk checklist",
      "PR risk review does not approve merges automatically",
      "Suspected secrets are redacted",
      "High-risk changes require explicit review",
      "Risk checklist identity",
      "Source PR prep",
      "Changed areas",
      "Risk categories",
      "Test and validation coverage",
      "Secrets scan status",
      "Migration config env risk",
      "UX/navigation risk",
      "Release notes route",
      "Blocked reasons",
      "Approved local boundary required",
      "release actions are not run from arbitrary UI",
      "advanced checklist details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePrRiskChecklist(model) };
}
