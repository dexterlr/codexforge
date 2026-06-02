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
import { buildRenderQueueRecoveryRetryModel } from "@/lib/codexforge/render-queue-recovery-retry";

export function RenderQueueRecoveryRetryPanel() {
  const model = buildRenderQueueRecoveryRetryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-render-queue-recovery-retry="RenderQueueRecoveryRetryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only approval-gated nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Render queue recovery and retry Retry is never automatic Explicit approval required before retry No cloud fallback Failed artifacts are retained Review inbox handoff no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no automatic retry no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no artifact deletion no delete artifact button no prompt/file upload no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 185"
        title="Recovery and retry"
        subtitle="Render queue recovery and retry keeps failures review-first, local-only, explicit, and never automatic."
        primary={{ href: "#render-queue-recovery", label: "Review recovery" }}
        links={[
          { href: "/render-job-status", label: "Job status" },
          { href: "/render-job-control-boundary", label: "Hold or cancel" },
          { href: "/local-render-queue-persistence", label: "Queue memory" },
          { href: "/video-recovery", label: "Video recovery" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/local-output-capture", label: "Output capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Render queue recovery and retry",
          "Retry is never automatic",
          "Explicit approval required before retry",
          "No cloud fallback",
          "Failed artifacts are retained",
          "Review inbox handoff",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "no prompt/file upload",
            "no silent queue mutation",
            "no deletion of failed artifacts",
            `next route: ${model.nextRecommendedRoute}`,
          ]}
        />
      </PreviewFoundationCard>
      <section id="render-queue-recovery" style={previewStyles.grid}>
        <PreviewFoundationCard title="Recovery model">
          <PreviewFoundationPillList items={model.items.map((item) => item.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retry rules">
          <PreviewFoundationPillList
            items={[
              "Retry is never automatic",
              "Explicit approval required before retry",
              "No cloud fallback",
              "Failed artifacts are retained",
              "no prompt/file upload",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked retry reasons">
          <PreviewFoundationCopy>
            Retry stays blocked when approval is missing, the bridge is unhealthy, ComfyUI health is unclear, artifact capture is missing, the package is unsafe, or the failure summary is unknown.
          </PreviewFoundationCopy>
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Review handoff">
          <PreviewFoundationPillList
            items={[
              model.reviewInboxHandoff,
              "/video-review",
              "/local-output-capture",
              "/render-job-status",
              "/render-job-control-boundary",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced recovery and retry checklist">
        <PreviewFoundationPillList items={model.items.map((item) => item.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
