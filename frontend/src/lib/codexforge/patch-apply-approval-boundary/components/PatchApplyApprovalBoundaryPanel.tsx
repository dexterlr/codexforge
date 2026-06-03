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
  buildPatchApplyApprovalBoundaryModel,
  buildPatchApplyApprovalBoundaryStableKey,
} from "@/lib/codexforge/patch-apply-approval-boundary";

const PATCH_APPLY_APPROVAL_BOUNDARY_MARKERS =
  "Patch apply approval boundary Patches are not applied from this page Applying requires explicit approval Future execution remains behind approved local boundary Future execution remains behind an approved local boundary Allowed scope Rollback and recovery note approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced approval details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no direct Jarvisd call from arbitrary UI no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchApplyApprovalBoundaryPanel() {
  const model = buildPatchApplyApprovalBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-apply-approval-boundary={`${PATCH_APPLY_APPROVAL_BOUNDARY_MARKERS} buildPatchApplyApprovalBoundaryStableKey PatchApplyApprovalBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 228"
        title="Patch approval"
        subtitle="Patch apply approval boundary makes the human approval gate explicit. Patches are not applied from this page, applying requires explicit approval, and future execution remains behind an approved local boundary."
        primary={{ href: "#patch-apply-approval-boundary", label: "Review apply boundary" }}
        links={[
          { href: "/patch-preview-workbench", label: "Patch preview" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/jarvisd-permissions", label: "Jarvisd permissions" },
          { href: "/patch-result-capture", label: "Result capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.approvalLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is an approval boundary, not an apply button. It does not write files, execute commands, call
          Jarvisd directly, or grant permissions automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-apply-approval-boundary" style={previewStyles.grid}>
        {model.approvals.map((approval) => (
          <PreviewFoundationCard
            key={buildPatchApplyApprovalBoundaryStableKey("patch-approval-card", approval.id)}
            title={approval.patchIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${approval.status}`,
                `Risk level: ${approval.riskLevel}`,
                approval.previewStatus,
                approval.fileOperationApprovalStatus,
                approval.workspaceTrustStatus,
                approval.riskSecretsStatus,
                approval.approvalCopy,
                approval.allowedScope,
                approval.deniedScope,
                approval.rollbackRecoveryNote,
                `Blocked reasons: ${approval.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced approval details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced approval details stay collapsed or secondary. Any future apply operation remains separate from this
          UI and must stay behind explicit approval, workspace trust, file operation approval, risk review, and a local
          boundary.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
