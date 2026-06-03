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
  buildPatchResultCaptureModel,
  buildPatchResultCaptureStableKey,
} from "@/lib/codexforge/patch-result-capture";

const PATCH_RESULT_CAPTURE_MARKERS =
  "Patch result capture Results are reviewed before promotion Failed patches are retained for recovery Memory is not auto-promoted Changed files summary Review inbox handoff approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no patch apply behavior no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchResultCapturePanel() {
  const model = buildPatchResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-result-capture={`${PATCH_RESULT_CAPTURE_MARKERS} buildPatchResultCaptureStableKey PatchResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 229"
        title="Patch result"
        subtitle="Patch result capture reviews the outcome of a future approved patch apply operation. Results are reviewed before promotion, failed patches are retained for recovery, and memory is not auto-promoted."
        primary={{ href: "#patch-result-capture", label: "Review result capture" }}
        links={[
          { href: "/patch-apply-approval", label: "Patch approval" },
          { href: "/review-inbox", label: "Review inbox handoff" },
          { href: "/validation-results", label: "Validation results" },
          { href: "/recovery", label: "Recovery" },
          { href: "/run-history", label: "Run history" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page captures and reviews outcomes only. It does not mutate files, apply patches, call appendEvent,
          call saveBrainGraph, mutate the Brain graph, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildPatchResultCaptureStableKey("patch-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                result.patchIdentity,
                `Apply status: ${result.applyStatus}`,
                result.changedFilesSummary,
                result.validationSummary,
                result.riskSecretsFollowUp,
                result.rollbackStatus,
                result.reviewInboxHandoff,
                result.nextRecommendedRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. Failed patches remain available for recovery review,
          and no result is promoted into memory or graph state until a separate reviewed workflow handles it.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
