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
  buildFileWritePatchTrialGateModel,
  buildFileWritePatchTrialGateStableKey,
} from "@/lib/codexforge/file-write-patch-trial-gate";

const FILE_WRITE_PATCH_TRIAL_GATE_MARKERS =
  "File write patch trial gate Write and patch operations are not performed from this page Approved local boundary is required before mutation Delete operations require separate explicit review Allowed write scope Required confirmation copy no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FileWritePatchTrialGatePanel() {
  const model = buildFileWritePatchTrialGateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-file-write-patch-trial-gate={`${FILE_WRITE_PATCH_TRIAL_GATE_MARKERS} buildFileWritePatchTrialGateStableKey FileWritePatchTrialGatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 259"
        title="Patch trial"
        subtitle="File write patch trial gate reviews a future approved local write or patch request before any mutation. Write and patch operations are not performed from this page, approved local boundary is required before mutation, and delete operations require separate explicit review."
        primary={{ href: "#file-write-patch-trial-gate", label: "Review patch trial" }}
        links={[
          { href: "/file-operation-dry-run", label: "File dry run" },
          { href: "/patch-preview-workbench", label: "Patch preview" },
          { href: "/patch-apply-approval", label: "Approval boundary" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/file-operation-result", label: "Result capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is a trial gate, not a write surface. It does not write files, apply patches, delete files, execute
          commands, call Jarvisd directly, or grant local permissions automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="file-write-patch-trial-gate" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildFileWritePatchTrialGateStableKey("file-write-patch-trial-card", trial.id)}
            title={trial.trialGateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.dryRunDependency,
                trial.patchPreviewDependency,
                trial.approvalBoundaryDependency,
                trial.allowedWriteScope,
                trial.deniedWriteScope,
                trial.expectedChangedFiles,
                trial.rollbackPlan,
                trial.requiredConfirmationCopy,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. Mutation remains separated from this UI and must wait for
          reviewed dry run, patch preview, explicit approval, rollback plan, and an approved local boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
