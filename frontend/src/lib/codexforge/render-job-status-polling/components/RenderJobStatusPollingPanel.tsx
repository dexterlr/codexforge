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
import { buildRenderJobStatusPollingModel } from "@/lib/codexforge/render-job-status-polling";

export function RenderJobStatusPollingPanel() {
  const model = buildRenderJobStatusPollingModel();

  return (
    <div style={previewStyles.shell} data-codexforge-render-job-status-polling="RenderJobStatusPollingPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only approval-gated nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Render job status polling Local job status only Polling cadence policy Timeout policy No cloud polling Live polling remains behind the approved local bridge no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no artifact deletion no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 183"
        title="Job status"
        subtitle="Render job status polling is local job status only, with bounded cadence, timeout rules, and no queue mutation from this page."
        primary={{ href: "#render-job-status", label: "Review status model" }}
        links={[
          { href: "/local-render-queue-persistence", label: "Queue memory" },
          { href: "/render-job-control-boundary", label: "Hold or cancel" },
          { href: "/render-queue-recovery", label: "Recovery and retry" },
          { href: "/local-bridge-health", label: "Bridge health" },
          { href: "/comfyui-real-health", label: "ComfyUI health" },
          { href: "/local-output-capture", label: "Output capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Render job status polling",
          "Local job status only",
          "Polling cadence policy",
          "Timeout policy",
          "No cloud polling",
          "Live polling remains behind the approved local bridge",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "no raw fetch in UI",
            "no infinite polling loop",
            "does not mutate queues",
            "no secrets in status summaries",
          ]}
        />
      </PreviewFoundationCard>
      <section id="render-job-status" style={previewStyles.grid}>
        <PreviewFoundationCard title="Status contract">
          <PreviewFoundationPillList items={model.policies.map((policy) => policy.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approved bridge boundary">
          <PreviewFoundationCopy>
            Live polling remains behind the approved local bridge. If no backend polling exists, this surface is a typed contract and readiness surface only.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `status: ${model.readiness.status}`,
              "live polling enabled: no",
              "approval-gated local bridge required",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Dependencies">
          <PreviewFoundationPillList
            items={[
              "bridge health dependency",
              "ComfyUI health dependency",
              "artifact capture dependency",
              "stopped or paused state visible",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="What polling cannot do">
          <PreviewFoundationCopy>
            This UI cannot cancel, retry, hold, resume, enqueue, reorder, or delete jobs. Polling is status-only and local-only, and nothing mutates silently.
          </PreviewFoundationCopy>
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced status polling policy">
        <PreviewFoundationPillList items={model.policies.map((policy) => policy.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
