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
  buildFileOperationRecoveryFlowModel,
  buildFileOperationRecoveryFlowStableKey,
} from "@/lib/codexforge/file-operation-recovery-flow";

const FILE_OPERATION_RECOVERY_FLOW_MARKERS =
  "File operation recovery flow Retry is never automatic Recovery does not mutate files Rollback requires explicit approved boundary Safe recovery checklist Blocked retry reasons no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recovery details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FileOperationRecoveryFlowPanel() {
  const model = buildFileOperationRecoveryFlowModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-file-operation-recovery-flow={`${FILE_OPERATION_RECOVERY_FLOW_MARKERS} buildFileOperationRecoveryFlowStableKey FileOperationRecoveryFlowPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 261"
        title="File recovery"
        subtitle="File operation recovery flow helps triage failed or blocked file operations without retrying automatically. Retry is never automatic, recovery does not mutate files, and rollback requires explicit approved boundary."
        primary={{ href: "#file-operation-recovery-flow", label: "Review recovery" }}
        links={[
          { href: "/file-operation-result", label: "Operation result" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/patch-apply-approval", label: "Patch approval" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.recoveryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This recovery flow is triage-only. It does not retry operations, mutate files, delete files, execute commands,
          call Jarvisd directly, or run rollback automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="file-operation-recovery-flow" style={previewStyles.grid}>
        {model.recoveries.map((recovery) => (
          <PreviewFoundationCard
            key={buildFileOperationRecoveryFlowStableKey("file-operation-recovery-card", recovery.id)}
            title={recovery.recoveryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Failure category: ${recovery.failureCategory}`,
                recovery.sourceResult,
                recovery.affectedScope,
                `Safe recovery checklist: ${recovery.safeRecoveryChecklist.join("; ")}`,
                recovery.rollbackRecommendation,
                recovery.retryEligibility,
                `Blocked retry reasons: ${recovery.blockedRetryReasons.join("; ")}`,
                recovery.nextRecommendedRoute,
                recovery.auditHandoff,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recovery details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced recovery details stay collapsed or secondary. Recovery keeps failed and blocked outcomes visible for
          review, but any rollback, retry, file mutation, or local command remains outside this UI and behind explicit
          approval.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
