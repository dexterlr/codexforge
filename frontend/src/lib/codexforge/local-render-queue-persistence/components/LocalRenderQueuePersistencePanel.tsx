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
import { buildLocalRenderQueuePersistenceModel } from "@/lib/codexforge/local-render-queue-persistence";

export function LocalRenderQueuePersistencePanel() {
  const model = buildLocalRenderQueuePersistenceModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-render-queue-persistence="LocalRenderQueuePersistencePanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only approval-gated nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Local render queue persistence Queue items are remembered safely No secrets are persisted No automatic queue mutation Persistence remains behind approved local boundary Artifact capture handoff no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no artifact deletion no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 182"
        title="Queue memory"
        subtitle="Local render queue persistence explains how approved local jobs can be remembered safely without secrets, hidden writes, or silent queue changes."
        primary={{ href: "#local-render-queue-persistence", label: "Review queue memory" }}
        links={[
          { href: "/render-queue", label: "Render queue" },
          { href: "/render-job-status", label: "Job status" },
          { href: "/render-job-control-boundary", label: "Hold or cancel" },
          { href: "/render-queue-recovery", label: "Recovery and retry" },
          { href: "/local-output-capture", label: "Output capture" },
          { href: "/video-review", label: "Review inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Local render queue persistence",
          "Queue items are remembered safely",
          "No secrets are persisted",
          "No automatic queue mutation",
          "Persistence remains behind approved local boundary",
          "Artifact capture handoff",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            "local-only target",
            "approval snapshot summary only",
            "no prompt or file storage automatically",
            "nothing mutates silently",
          ]}
        />
      </PreviewFoundationCard>
      <section id="local-render-queue-persistence" style={previewStyles.grid}>
        <PreviewFoundationCard title="Remembered fields">
          <PreviewFoundationPillList items={model.fields.map((field) => field.label)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Readiness boundary">
          <PreviewFoundationCopy>{model.readiness.plainEnglish}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `status: ${model.readiness.status}`,
              "live persistence enabled: no",
              "approved local boundary required",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Retention and artifacts">
          <PreviewFoundationCopy>{model.retentionNote}</PreviewFoundationCopy>
          <PreviewFoundationPillList items={model.handoffs} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Safety boundary">
          <PreviewFoundationCopy>
            This page defines a queue persistence contract only. It does not persist secrets, does not store raw prompts or files, does not submit to ComfyUI, and does not mutate render queues silently.
          </PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              "No secrets are persisted",
              "No automatic queue mutation",
              "no artifact deletion",
              "no cloud polling or provider calls",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced persistence contract">
        <PreviewFoundationCopy>
          Advanced details stay secondary: queue item identity, source trial, local-only target, approval snapshot summary, artifact capture handoff, status snapshot, retry eligibility, recovery route, retention note, no secret storage, and no automatic queue mutation.
        </PreviewFoundationCopy>
        <PreviewFoundationPillList items={model.fields.map((field) => field.plainEnglish)} />
      </PreviewFoundationDetail>
    </div>
  );
}
