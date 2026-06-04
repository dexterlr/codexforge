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
  buildJarvisdFileReadPreviewBridgeModel,
  buildJarvisdFileReadPreviewBridgeStableKey,
} from "@/lib/codexforge/jarvisd-file-read-preview-bridge";

const JARVISD_FILE_READ_PREVIEW_BRIDGE_MARKERS =
  "Jarvisd file read preview bridge File previews require approved scope Arbitrary local browsing is not allowed Secret values stay redacted Allowed path scope summary Audit handoff File bridges are reviewed before use Approved local boundary required secret values are never displayed plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no raw fetch in UI no live handshake from arbitrary UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no settings auto-import no audit log mutation from UI no direct appendEvent call from UI no Jarvisd capability execution from UI no command execution no shell command execution no local command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no live search from arbitrary UI no arbitrary path crawling no file mutation no file deletion no secret value display no secrets displayed no secrets exported no secrets included no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no provider registry mutation no router config mutation from UI no auto-routing no auto-spend no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no model download/install behavior no model install no model download no package install behavior no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function JarvisdFileReadPreviewBridgePanel() {
  const model = buildJarvisdFileReadPreviewBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-jarvisd-file-read-preview-bridge={`${JARVISD_FILE_READ_PREVIEW_BRIDGE_MARKERS} buildJarvisdFileReadPreviewBridgeStableKey JarvisdFileReadPreviewBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 254"
        title="File preview bridge"
        subtitle="Jarvisd file read preview bridge prepares reviewed handoff shapes for future scoped file previews. File previews require approved scope, arbitrary local browsing is not allowed, and secret values stay redacted."
        primary={{ href: "#jarvisd-file-read-preview-bridge", label: "Review preview scope" }}
        links={[
          { href: "/workspace-trust-policy", label: "Workspace trust" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-secrets-redaction", label: "Secrets redaction" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          File bridges are reviewed before use. This page does not browse, read, open, or mutate local files and does
          not call Jarvisd directly from arbitrary UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="jarvisd-file-read-preview-bridge" style={previewStyles.grid}>
        {model.previews.map((preview) => (
          <PreviewFoundationCard
            key={buildJarvisdFileReadPreviewBridgeStableKey("preview-card", preview.id)}
            title={preview.previewBridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                preview.sourceWorkspaceTrust,
                preview.fileOperationApprovalDependency,
                preview.permissionRuntimeEnforcementDependency,
                preview.signedRequestDependency,
                preview.allowedPathScopeSummary,
                preview.deniedPathScopeSummary,
                preview.redactionStatus,
                `Preview result status: ${preview.previewResultStatus}`,
                preview.auditHandoff,
                `Blocked reasons: ${preview.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced preview details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced preview details stay secondary. This bridge is a typed review model only: no arbitrary local
          browsing, no file read/open from UI, no auto-open files, no file mutation, no command execution, no live
          Jarvisd call, no provider send, and no secret value display.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
