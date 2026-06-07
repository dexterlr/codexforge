import type {
  CodingLoopMvpAudit,
  CodingLoopMvpAuditBoundary,
  CodingLoopMvpAuditModel,
} from "./coding-loop-mvp-audit-types";
import { buildCodingLoopMvpAuditStableKey } from "./coding-loop-mvp-audit-types";

export const CODING_LOOP_MVP_AUDIT_LANGUAGE = [
  "Coding loop MVP audit",
  "Coding MVP audit does not execute commands",
  "Audit does not apply patches or create commits",
  "Secrets are not inspected or displayed",
  "Release decision",
  "Known gaps",
] as const;

export function buildCodingLoopMvpAudit(
  input: Omit<CodingLoopMvpAudit, "id"> & { idHint: string }
): CodingLoopMvpAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildCodingLoopMvpAuditStableKey(
      "coding-loop-mvp-audit",
      idHint,
      input.releaseDecision
    ),
    ...audit,
  };
}

export function buildCodingLoopMvpAudits(): CodingLoopMvpAudit[] {
  return [
    buildCodingLoopMvpAudit({
      idHint: "first-demo-readiness",
      auditIdentity:
        "Audit identity: coding-loop-mvp-audit-first-demo-readiness, a readiness review for the local coding loop MVP.",
      coveredCodingLoopSurfaces: [
        "/codebase-change-plan",
        "/patch-preview-workbench",
        "/file-operation-dry-run",
        "/file-write-patch-trial",
        "/patch-apply-trial",
        "/patch-apply-result",
        "/patch-rollback-trial",
        "/test-command-bridge",
        "/test-execution-trial",
        "/test-result-capture",
        "/git-status-bridge",
        "/git-diff-bridge",
        "/git-commit-trial",
        "/git-commit-result",
        "/review-inbox",
      ],
      projectIntelligenceReadiness:
        "Project intelligence readiness: safe project indexer, project search, dependency map, and risk scan are reviewed surfaces and do not browse arbitrary local files.",
      changePlanReadiness:
        "Change plan readiness: /codebase-change-plan prepares scoped work before patch preview.",
      patchPreviewReadiness:
        "Patch preview readiness: /patch-preview-workbench keeps raw patches secondary and does not apply patches.",
      fileOperationReadiness:
        "File operation readiness: dry run, write patch trial, result capture, and recovery surfaces stay approval-gated and do not mutate files.",
      testOperationReadiness:
        "Test operation readiness: test command bridge, test execution trial, result capture, and recovery bridge do not run tests from arbitrary UI.",
      gitOperationReadiness:
        "Git operation readiness: status, diff, commit trial, and commit result surfaces do not run git commands, create commits, create branches, tag, push, or create pull requests from UI.",
      patchApplyRollbackReadiness:
        "Patch apply/rollback readiness: apply trial, apply result, and rollback trial are review-only; approved local boundary is required before patch apply or rollback.",
      reviewInboxReadiness:
        "Review inbox readiness: result handoffs are reviewed before promotion and memory is not auto-promoted.",
      knownGaps: [
        "First end-to-end demo still needs human-run smoke evidence.",
        "Release readiness depends on reviewed validation output.",
        "Future executor boundaries remain intentionally non-executing from UI.",
      ],
      releaseDecision: "ready with fixes",
      nextRecommendedRoute:
        "Next recommended route: /release-smoke for manual release smoke planning after reviewing known gaps.",
      advancedAuditDetails:
        "Advanced audit details: this audit does not execute commands, run tests, run git, apply patches, create commits, mutate files, inspect secrets, display secrets, call providers, call GitHub APIs, mutate Brain graph, or auto-promote memory.",
    }),
    buildCodingLoopMvpAudit({
      idHint: "blocked-missing-evidence",
      auditIdentity:
        "Audit identity: coding-loop-mvp-audit-blocked-missing-evidence.",
      coveredCodingLoopSurfaces: [
        "/patch-apply-result",
        "/patch-rollback-trial",
        "/review-inbox",
      ],
      projectIntelligenceReadiness:
        "Project intelligence readiness: needs review if no scoped project intelligence summary is present.",
      changePlanReadiness:
        "Change plan readiness: blocked until a reviewed change plan exists.",
      patchPreviewReadiness:
        "Patch preview readiness: blocked until preview and risk status are reviewed.",
      fileOperationReadiness:
        "File operation readiness: blocked until dry run and write patch trial evidence are reviewed.",
      testOperationReadiness:
        "Test operation readiness: blocked until test bridge and result capture evidence are reviewed.",
      gitOperationReadiness:
        "Git operation readiness: blocked until git status, diff, trial, and result handoffs are reviewed.",
      patchApplyRollbackReadiness:
        "Patch apply/rollback readiness: blocked until apply result and rollback trial readiness are reviewed.",
      reviewInboxReadiness:
        "Review inbox readiness: blocked until handoffs are reviewed before promotion.",
      knownGaps: [
        "Missing reviewed test evidence.",
        "Missing reviewed git evidence.",
        "Missing release decision evidence.",
      ],
      releaseDecision: "blocked",
      nextRecommendedRoute:
        "Next recommended route: /review-inbox to resolve blocked handoffs before release readiness.",
      advancedAuditDetails:
        "Advanced audit details: blocked audit records remain read-only and do not trigger local execution.",
    }),
  ];
}

export function buildCodingLoopMvpAuditBoundary(): CodingLoopMvpAuditBoundary {
  return {
    commandsExecutedFromAuditAllowed: false,
    patchApplyAllowedFromAudit: false,
    commitCreationAllowedFromAudit: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    rollbackAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    runCommandCallAllowedFromUi: false,
    brokerExecutionCallAllowedFromUi: false,
    localExecutorApiCallAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesInspectedOrDisplayedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeCodingLoopMvpAudit(
  model: Pick<CodingLoopMvpAuditModel, "audits">
): string {
  return `Coding loop MVP audit prepares ${model.audits.length} release readiness review shape(s). Coding MVP audit does not execute commands, audit does not apply patches or create commits, and secrets are not inspected or displayed.`;
}

export function buildCodingLoopMvpAuditModel(): CodingLoopMvpAuditModel {
  const audits = buildCodingLoopMvpAudits();
  const model: CodingLoopMvpAuditModel = {
    title: "Coding loop MVP audit",
    summary: "",
    audits,
    boundary: buildCodingLoopMvpAuditBoundary(),
    auditLanguage: [...CODING_LOOP_MVP_AUDIT_LANGUAGE],
    advancedDetails: [
      "Coding loop MVP audit",
      "Coding MVP audit does not execute commands",
      "Audit does not apply patches or create commits",
      "Secrets are not inspected or displayed",
      "Audit identity",
      "Covered coding loop surfaces",
      "Project intelligence readiness",
      "Change plan readiness",
      "Patch preview readiness",
      "File operation readiness",
      "Test operation readiness",
      "Git operation readiness",
      "Patch apply/rollback readiness",
      "Review inbox readiness",
      "Known gaps",
      "Release decision: ready, ready with fixes, blocked",
      "Next recommended route",
      "Advanced audit details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCodingLoopMvpAudit(model) };
}
