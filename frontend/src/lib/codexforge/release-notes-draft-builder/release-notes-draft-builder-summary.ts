import type {
  ReleaseNotesDraft,
  ReleaseNotesDraftBuilderBoundary,
  ReleaseNotesDraftBuilderModel,
} from "./release-notes-draft-builder-types";
import { buildReleaseNotesDraftBuilderStableKey } from "./release-notes-draft-builder-types";

export const RELEASE_NOTES_DRAFT_BUILDER_LANGUAGE = [
  "Release notes draft builder",
  "Release notes are drafts only",
  "No release is published from this page",
  "Secrets are not included in release notes",
  "User-facing summary",
  "Known gaps",
] as const;

export function buildReleaseNotesDraft(
  input: Omit<ReleaseNotesDraft, "id"> & { idHint: string }
): ReleaseNotesDraft {
  const { idHint, ...draft } = input;
  return {
    id: buildReleaseNotesDraftBuilderStableKey(
      "release-notes-draft-builder",
      idHint,
      input.status
    ),
    ...draft,
  };
}

export function buildReleaseNotesDrafts(): ReleaseNotesDraft[] {
  return [
    buildReleaseNotesDraft({
      idHint: "reviewed-release-prep-draft",
      status: "draft-review-required",
      releaseNotesIdentity:
        "Release notes identity: reviewed release notes draft created from commit, diff, test, branch/tag, PR prep, and PR risk summaries.",
      sourceBranchTagHandoff:
        "Source branch/tag handoff: /branch-tag-release-handoff supplies release identity, target branch, tag naming recommendation, push policy, and rollback note.",
      prPrepDependency:
        "PR prep dependency: /pull-request-prep-review supplies suggested PR title, suggested PR description, changed areas, validation, and blocked reasons.",
      userFacingSummary:
        "User-facing summary: explain what changed for the operator in plain English without raw git, raw PR, or secret output.",
      technicalSummary:
        "Technical summary: summarize route, model, component, registry, and smoke-script changes at a high level.",
      validationSummary:
        "Validation summary: list reviewed smoke scripts, targeted checks, skipped provider tests, and remaining blocked validation reasons.",
      knownGaps:
        "Known gaps: note unresolved risk, missing live validation, manual release steps, or follow-up review items without overstating readiness.",
      riskNotes:
        "Risk notes: include PR risk checklist findings, suspected secret redaction status, migration/config/env risk, and UX/navigation risk.",
      copyableReleaseNotesDraft:
        "Copyable release notes draft: Summary - release prep review surfaces were added. Validation - smoke coverage and manual review boundaries remain required. Risks - no release is published here and secrets are excluded.",
      nextRecommendedRoute:
        "Next recommended route: /pr-risk-checklist if risk changes, otherwise use manual release review or a future approved local boundary outside this page.",
      blockedReasons: [
        "Release notes are drafts only",
        "No release is published from this page",
        "Secrets are not included in release notes",
      ],
      advancedDraftDetails:
        "Advanced draft details: this page builds draft copy only. It does not call GitHub APIs, publish releases, create tags, create branches, create PRs, push, merge, mutate files, apply patches, call providers, or display secrets.",
    }),
    buildReleaseNotesDraft({
      idHint: "blocked-missing-risk-review",
      status: "blocked",
      releaseNotesIdentity:
        "Release notes identity: blocked draft because branch/tag handoff, PR prep, or PR risk context is missing.",
      sourceBranchTagHandoff:
        "Source branch/tag handoff: blocked until /branch-tag-release-handoff is reviewed.",
      prPrepDependency:
        "PR prep dependency: blocked until /pull-request-prep-review supplies reviewed PR copy.",
      userFacingSummary:
        "User-facing summary: unavailable until release scope and changed areas are reviewed.",
      technicalSummary:
        "Technical summary: blocked until implementation areas are reviewed.",
      validationSummary:
        "Validation summary: blocked until smoke scripts, targeted checks, or blocked validation reasons are reviewed.",
      knownGaps:
        "Known gaps: blocked until risk and follow-up items are reviewed.",
      riskNotes:
        "Risk notes: blocked until /pr-risk-checklist supplies reviewed risk notes.",
      copyableReleaseNotesDraft:
        "Copyable release notes draft: blocked until branch/tag handoff, PR prep, validation, and risk notes are reviewed.",
      nextRecommendedRoute:
        "Next recommended route: /pr-risk-checklist for reviewed merge and release risk.",
      blockedReasons: [
        "Branch/tag handoff missing",
        "PR prep dependency missing",
        "Approved local boundary required",
      ],
      advancedDraftDetails:
        "Advanced draft details: blocked drafts cannot publish releases, create tags, create PRs, call GitHub APIs, push, merge, mutate files, call providers, or include secrets.",
    }),
  ];
}

export function buildReleaseNotesDraftBuilderBoundary(): ReleaseNotesDraftBuilderBoundary {
  return {
    draftsOnly: true,
    releasePublishAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    branchCreationAllowedFromUi: false,
    pullRequestCreationAllowedFromUi: false,
    pullRequestMergeAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
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

export function summarizeReleaseNotesDraftBuilder(
  model: Pick<ReleaseNotesDraftBuilderModel, "drafts">
): string {
  return `Release notes draft builder prepares ${model.drafts.length} reviewed release notes draft shape(s). Release notes are drafts only, no release is published from this page, and secrets are not included in release notes.`;
}

export function buildReleaseNotesDraftBuilderModel(): ReleaseNotesDraftBuilderModel {
  const drafts = buildReleaseNotesDrafts();
  const model: ReleaseNotesDraftBuilderModel = {
    title: "Release notes draft builder",
    summary: "",
    drafts,
    boundary: buildReleaseNotesDraftBuilderBoundary(),
    draftLanguage: [...RELEASE_NOTES_DRAFT_BUILDER_LANGUAGE],
    advancedDetails: [
      "Release notes draft builder",
      "Release notes are drafts only",
      "No release is published from this page",
      "Secrets are not included in release notes",
      "Release notes identity",
      "Source branch/tag handoff",
      "PR prep dependency",
      "User-facing summary",
      "Technical summary",
      "Validation summary",
      "Known gaps",
      "Risk notes",
      "Copyable release notes draft",
      "Next recommended route",
      "Blocked reasons",
      "Approved local boundary required",
      "release actions are not run from arbitrary UI",
      "advanced draft details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeReleaseNotesDraftBuilder(model) };
}
