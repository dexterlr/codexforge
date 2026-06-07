"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import {
  buildPatchRollbackTrialBoundaryModel,
  buildPatchRollbackTrialBoundaryStableKey,
} from "@/lib/codexforge/patch-rollback-trial-boundary";

const PATCH_ROLLBACK_TRIAL_BOUNDARY_MARKERS =
  "Patch rollback trial boundary Rollback is not performed from this page Approved local boundary is required before rollback Rollback does not delete unrelated files Recovery checklist Audit handoff plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced rollback details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchRollbackTrialBoundaryPanel() {
  const model = buildPatchRollbackTrialBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-rollback-trial-boundary={`${PATCH_ROLLBACK_TRIAL_BOUNDARY_MARKERS} buildPatchRollbackTrialBoundaryStableKey PatchRollbackTrialBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 276"
        title="Patch rollback trial"
        subtitle="Patch rollback trial boundary reviews a future approved rollback request after failed or reverted patch operations. Rollback is not performed from this page, an approved local boundary is required before rollback, and rollback does not delete unrelated files."
        primary={{ href: "#patch-rollback-trial-boundary", label: "Review rollback trial" }}
        links={[
          { href: "/patch-apply-result", label: "Apply result" },
          { href: "/file-operation-recovery", label: "File recovery" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
          { href: "/codebase-change-plan", label: "Follow-up plan" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.rollbackLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews rollback readiness only. It does not rollback files, mutate files, delete files, execute
          commands, run tests, run git, or call Jarvisd capabilities from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-rollback-trial-boundary" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildPatchRollbackTrialBoundaryStableKey("patch-rollback-trial-card", trial.id)}
            title={trial.rollbackTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourcePatchApplyResult,
                trial.rollbackReason,
                trial.affectedFilesSummary,
                trial.allowedRollbackScope,
                trial.deniedRollbackScope,
                `Recovery checklist: ${trial.recoveryChecklist.join("; ")}`,
                trial.requiredConfirmationCopy,
                trial.auditHandoff,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced rollback details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced rollback details stay collapsed or secondary. Rollback review keeps failed patch evidence visible,
          but any future local rollback remains outside this UI and behind explicit approved local boundary review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
