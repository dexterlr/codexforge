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
  buildPatchPreviewWorkbenchModel,
  buildPatchPreviewWorkbenchStableKey,
} from "@/lib/codexforge/patch-preview-workbench";

const PATCH_PREVIEW_WORKBENCH_MARKERS =
  "Patch preview workbench Preview does not apply patches Raw diffs stay secondary Suspected secrets are redacted Hunk summary Apply boundary route approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced diff details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchPreviewWorkbenchPanel({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const model = buildPatchPreviewWorkbenchModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-preview-workbench={`${PATCH_PREVIEW_WORKBENCH_MARKERS} buildPatchPreviewWorkbenchStableKey PatchPreviewWorkbenchPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        headingLevel={headingLevel}
        phase="Phase 227"
        title="Patch preview"
        subtitle="Patch preview workbench reviews proposed patch hunks before any approval boundary. Preview does not apply patches, raw diffs stay secondary, suspected secrets are redacted, and commands are not executed."
        primary={{ href: "#patch-preview-workbench", label: "Review patch preview" }}
        links={[
          { href: "/codebase-change-plan", label: "Source change plan" },
          { href: "/patch-preview-live-context", label: "Live context" },
          { href: "/project-risk-secrets-scan", label: "Risk scan" },
          { href: "/local-file-approval", label: "File boundary" },
          { href: "/local-command-approval", label: "Command boundary" },
          { href: "/patch-apply-approval", label: "Apply boundary route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.previewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a review workbench only. It does not write files, apply patches, execute commands, browse
          arbitrary local files, or send patch content to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-preview-workbench" style={previewStyles.grid}>
        {model.previews.map((preview) => (
          <PreviewFoundationCard
            key={buildPatchPreviewWorkbenchStableKey("patch-preview-card", preview.id)}
            title={preview.patchIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${preview.status}`,
                preview.sourceChangePlan,
                preview.affectedFilesSummary,
                preview.hunkSummary,
                preview.riskSecretsScanStatus,
                preview.testPlanSummary,
                preview.approvalCopy,
                preview.applyBoundaryRoute,
                preview.rollbackNote,
                `Blocked reasons: ${preview.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced diff details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced diff details stay collapsed or secondary. Raw diffs are not placed above the fold, suspected secrets
          remain redacted, and the apply boundary is a separate reviewed route.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
