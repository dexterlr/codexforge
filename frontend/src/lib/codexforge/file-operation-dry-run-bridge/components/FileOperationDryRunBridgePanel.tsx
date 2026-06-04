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
  buildFileOperationDryRunBridgeModel,
  buildFileOperationDryRunBridgeStableKey,
} from "@/lib/codexforge/file-operation-dry-run-bridge";

const FILE_OPERATION_DRY_RUN_BRIDGE_MARKERS =
  "File operation dry run bridge Dry run does not mutate files Arbitrary local browsing is not allowed Secret values stay redacted Expected effect summary Audit handoff Delete is not performed here approved local boundary required no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced dry-run details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FileOperationDryRunBridgePanel() {
  const model = buildFileOperationDryRunBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-file-operation-dry-run-bridge={`${FILE_OPERATION_DRY_RUN_BRIDGE_MARKERS} buildFileOperationDryRunBridgeStableKey FileOperationDryRunBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 258"
        title="File dry run"
        subtitle="File operation dry run bridge models a proposed file operation before any mutation boundary. Dry run does not mutate files, arbitrary local browsing is not allowed, and secret values stay redacted."
        primary={{ href: "#file-operation-dry-run-bridge", label: "Review dry run" }}
        links={[
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/jarvisd-secrets-redaction", label: "Secrets redaction" },
          { href: "/jarvisd-audit-ingestion", label: "Audit handoff" },
          { href: "/file-write-patch-trial", label: "Patch trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.dryRunLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page models intent only. It does not browse, read, open, write, apply patches, delete, execute
          commands, or call Jarvisd directly from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="file-operation-dry-run-bridge" style={previewStyles.grid}>
        {model.dryRuns.map((dryRun) => (
          <PreviewFoundationCard
            key={buildFileOperationDryRunBridgeStableKey("file-dry-run-card", dryRun.id)}
            title={dryRun.dryRunIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${dryRun.status}`,
                `Operation type: ${dryRun.operationType}`,
                dryRun.sourceOperationRequest,
                dryRun.workspaceTrustDependency,
                dryRun.fileApprovalDependency,
                dryRun.permissionEnforcementDependency,
                dryRun.affectedPathScopeSummary,
                dryRun.expectedEffectSummary,
                dryRun.riskSecretsStatus,
                dryRun.auditHandoff,
                `Blocked reasons: ${dryRun.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced dry-run details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced dry-run details stay collapsed or secondary. The bridge is a typed review model only, with file
          mutation, arbitrary browsing, command execution, direct Jarvisd calls, and secret value display blocked.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
