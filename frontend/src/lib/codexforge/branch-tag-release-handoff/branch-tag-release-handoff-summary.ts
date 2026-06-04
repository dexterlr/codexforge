import type {
  BranchTagReleaseHandoff,
  BranchTagReleaseHandoffBoundary,
  BranchTagReleaseHandoffModel,
} from "./branch-tag-release-handoff-types";
import { buildBranchTagReleaseHandoffStableKey } from "./branch-tag-release-handoff-types";

export const BRANCH_TAG_RELEASE_HANDOFF_LANGUAGE = [
  "Branch tag release handoff",
  "Branches and tags are not created from this page",
  "Push and tag commands are manual only",
  "Secrets are not included in release copy",
  "Tag naming recommendation",
  "Rollback note",
] as const;

export function buildBranchTagReleaseHandoff(
  input: Omit<BranchTagReleaseHandoff, "id"> & { idHint: string }
): BranchTagReleaseHandoff {
  const { idHint, ...handoff } = input;
  return {
    id: buildBranchTagReleaseHandoffStableKey(
      "branch-tag-release-handoff",
      idHint,
      input.status
    ),
    ...handoff,
  };
}

export function buildBranchTagReleaseHandoffs(): BranchTagReleaseHandoff[] {
  return [
    buildBranchTagReleaseHandoff({
      idHint: "reviewed-commit-release-handoff",
      status: "handoff-review-required",
      releaseHandoffIdentity:
        "Release handoff identity: reviewed branch and tag handoff prepared after /git-commit-approval confirms the commit boundary.",
      sourceCommitApproval:
        "Source commit approval: /git-commit-approval supplies the reviewed commit approval copy and confirms commits are not created from arbitrary UI.",
      targetBranchSummary:
        "Target branch summary: use the reviewed release branch name, upstream posture, and protected-branch notes from the approved local boundary packet.",
      tagNamingRecommendation:
        "Tag naming recommendation: prefer a human-readable release tag such as v1.2.3 or codexforge-release-238 after the exact release version is reviewed.",
      validationSummary:
        "Validation summary: include reviewed /test-result-summary status, blocked-test reasons, and any manual verification notes before branch or tag handoff.",
      riskSecretsStatus:
        "Risk/secrets status: suspected secrets stay redacted and secrets are not included in release copy.",
      pushPolicy:
        "Push policy: branches and tags are not created from this page. Push and tag commands are manual only, or future approved local boundary only.",
      rollbackNote:
        "Rollback note: keep the prior reviewed commit, branch, or tag reference available for manual rollback planning before any release action.",
      releaseNotesRoute:
        "Release notes route: /release-notes-draft-builder prepares draft release notes after this branch/tag handoff is reviewed.",
      blockedReasons: [
        "Branches and tags are not created from this page",
        "Push and tag commands are manual only",
        "Secrets are not included in release copy",
      ],
      advancedHandoffDetails:
        "Advanced handoff details: branch and tag instructions are copyable review text only. This page does not run git commands, create branches, create tags, push, mutate files, apply patches, call providers, call GitHub APIs, publish releases, or display secrets.",
    }),
    buildBranchTagReleaseHandoff({
      idHint: "blocked-missing-commit-approval",
      status: "blocked",
      releaseHandoffIdentity:
        "Release handoff identity: blocked handoff because the source commit approval or validation summary is missing.",
      sourceCommitApproval:
        "Source commit approval: blocked until /git-commit-approval supplies reviewed approval copy.",
      targetBranchSummary:
        "Target branch summary: unavailable until reviewed branch posture is supplied by an approved local boundary.",
      tagNamingRecommendation:
        "Tag naming recommendation: blocked until release identity, version, and validation status are reviewed.",
      validationSummary:
        "Validation summary: blocked until tests, blocked-test reasons, or manual validation notes are reviewed.",
      riskSecretsStatus:
        "Risk/secrets status: blocked until suspected secrets stay redacted and excluded from release copy.",
      pushPolicy:
        "Push policy: no push behavior is available. Manual or future approved local boundary required.",
      rollbackNote:
        "Rollback note: blocked until a reviewed prior reference or rollback plan is available.",
      releaseNotesRoute:
        "Release notes route: /release-notes-draft-builder remains blocked until branch/tag handoff is reviewed.",
      blockedReasons: [
        "Source commit approval missing",
        "Validation summary missing",
        "Approved local boundary required",
      ],
      advancedHandoffDetails:
        "Advanced handoff details: blocked handoffs cannot create branches, create tags, run git commands, push, mutate files, call providers, publish releases, or include secrets.",
    }),
  ];
}

export function buildBranchTagReleaseHandoffBoundary(): BranchTagReleaseHandoffBoundary {
  return {
    handoffOnly: true,
    branchCreationAllowedFromUi: false,
    tagCreationAllowedFromUi: false,
    pushBranchesTagsAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    pullRequestCreationAllowedFromUi: false,
    releasePublishAllowedFromUi: false,
    mergeAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
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

export function summarizeBranchTagReleaseHandoff(
  model: Pick<BranchTagReleaseHandoffModel, "handoffs">
): string {
  return `Branch tag release handoff prepares ${model.handoffs.length} reviewed branch/tag handoff shape(s). Branches and tags are not created from this page, push and tag commands are manual only, and secrets are not included in release copy.`;
}

export function buildBranchTagReleaseHandoffModel(): BranchTagReleaseHandoffModel {
  const handoffs = buildBranchTagReleaseHandoffs();
  const model: BranchTagReleaseHandoffModel = {
    title: "Branch tag release handoff",
    summary: "",
    handoffs,
    boundary: buildBranchTagReleaseHandoffBoundary(),
    handoffLanguage: [...BRANCH_TAG_RELEASE_HANDOFF_LANGUAGE],
    advancedDetails: [
      "Branch tag release handoff",
      "Branches and tags are not created from this page",
      "Push and tag commands are manual only",
      "Secrets are not included in release copy",
      "Release handoff identity",
      "Source commit approval",
      "Target branch summary",
      "Tag naming recommendation",
      "Validation summary",
      "Risk/secrets status",
      "Push policy",
      "Rollback note",
      "Release notes route",
      "Blocked reasons",
      "Approved local boundary required",
      "release actions are not run from arbitrary UI",
      "advanced handoff details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeBranchTagReleaseHandoff(model) };
}
