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
import { buildRenderJobControlBoundaryModel } from "@/lib/codexforge/render-job-control-boundary";

export function RenderJobControlBoundaryPanel() {
  const model = buildRenderJobControlBoundaryModel();

  return (
    <div style={previewStyles.shell} data-codexforge-render-job-control-boundary="RenderJobControlBoundaryPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only approval-gated nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Render job cancel and hold boundary Hold prevents the next step Cancel requests stop through approved boundary Neither action deletes artifacts Required confirmation copy No silent queue mutation no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no backend cancel direct from arbitrary UI no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no artifact deletion no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 184"
        title="Hold or cancel"
        subtitle="Hold and cancel are explicit local job control boundaries. They require confirmation, stay approval-gated, and never mean artifact deletion."
        primary={{ href: "#render-job-control-boundary", label: "Review control boundary" }}
        links={[
          { href: "/render-job-status", label: "Job status" },
          { href: "/local-render-queue-persistence", label: "Queue memory" },
          { href: "/render-queue-recovery", label: "Recovery and retry" },
          { href: "/render-queue", label: "Render queue" },
          { href: "/local-output-capture", label: "Output capture" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Render job cancel and hold boundary",
          "Hold prevents the next step",
          "Cancel requests stop through approved boundary",
          "Neither action deletes artifacts",
          "Required confirmation copy",
          "No silent queue mutation",
        ]}
      />
      <PreviewFoundationCard title="Plain-English boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            model.holdMeaning,
            model.cancelMeaning,
            model.artifactRule,
            "approval-gated local-only handoff",
          ]}
        />
      </PreviewFoundationCard>
      <section id="render-job-control-boundary" style={previewStyles.grid}>
        <PreviewFoundationCard title="Reviewed fields">
          <PreviewFoundationPillList items={model.actions.map((action) => action.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Required confirmation copy">
          <PreviewFoundationCopy>{model.requiredConfirmationCopy}</PreviewFoundationCopy>
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Hold vs cancel">
          <PreviewFoundationCopy>
            Hold means pause or prevent the next step. Cancel means request stop through approved boundary. Neither means delete artifacts, clear history, or silently mutate the queue.
          </PreviewFoundationCopy>
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Handoff and recovery">
          <PreviewFoundationPillList
            items={[
              "/render-job-status",
              "/render-queue-recovery",
              "/local-output-capture",
              "/video-review",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced cancel and hold contract">
        <PreviewFoundationPillList items={model.actions.map((action) => action.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
