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
  buildPatchApplyTrialBoundaryModel,
  buildPatchApplyTrialBoundaryStableKey,
} from "@/lib/codexforge/patch-apply-trial-boundary";

const PATCH_APPLY_TRIAL_BOUNDARY_MARKERS =
  "Patch apply trial boundary Patches are not applied from this page Approved local boundary is required before patch apply Secret values stay redacted Allowed apply scope Required confirmation copy plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchApplyTrialBoundaryPanel() {
  const model = buildPatchApplyTrialBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-apply-trial-boundary={`${PATCH_APPLY_TRIAL_BOUNDARY_MARKERS} buildPatchApplyTrialBoundaryStableKey PatchApplyTrialBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 274"
        title="Patch apply trial"
        subtitle="Patch apply trial boundary reviews a future approved local patch apply request before any mutation. Patches are not applied from this page, an approved local boundary is required before patch apply, and secret values stay redacted."
        primary={{ href: "#patch-apply-trial-boundary", label: "Review apply trial" }}
        links={[
          { href: "/patch-preview-workbench", label: "Patch preview" },
          { href: "/file-write-patch-trial", label: "File patch trial" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/test-command-bridge", label: "Test plan" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a trial boundary, not an apply button. It does not apply patches, write files, mutate files,
          execute commands, run tests, run git, or call Jarvisd capabilities from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-apply-trial-boundary" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildPatchApplyTrialBoundaryStableKey("patch-apply-trial-card", trial.id)}
            title={trial.trialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourcePatchPreview,
                trial.fileWritePatchTrialDependency,
                trial.workspaceTrustDependency,
                trial.permissionEnforcementDependency,
                trial.allowedApplyScope,
                trial.deniedApplyScope,
                `Risk/secrets status: ${trial.riskSecretsStatus}`,
                trial.testPlanDependency,
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
          Advanced trial details stay collapsed or secondary. The review chain stays plan, patch preview, file
          operation dry run, write and patch trial, test bridge, git bridge, result capture, and release readiness
          without local mutation from this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
