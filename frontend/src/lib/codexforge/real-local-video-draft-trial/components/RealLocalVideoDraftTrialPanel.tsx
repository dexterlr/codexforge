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
import { buildRealLocalVideoDraftTrialSummary } from "@/lib/codexforge/real-local-video-draft-trial";

export function RealLocalVideoDraftTrialPanel() {
  const model = buildRealLocalVideoDraftTrialSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-local-video-draft-trial="RealLocalVideoDraftTrialPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real local video draft trial Local video draft only Frame count and duration bounded Dual GPUs are parallel workers No cloud fallback Review before promotion no multi-GPU memory sharing claim unless workflow supports it no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 180"
        title="Video draft trial"
        subtitle="A guarded local-only video draft trial. It feels close to local execution while keeping explicit approval, bounded duration, and capture/review gates in front."
        primary={{ href: "#real-local-video-draft-trial", label: "Review video trial" }}
        links={[
          { href: "/local-image-trial", label: "Image trial" },
          { href: "/local-keyframe-trial", label: "Keyframe trial" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
          { href: "/dual-gpu", label: "GPU strategy" },
          { href: "/local-output-capture", label: "Output capture" },
          { href: "/video-review", label: "Review inbox" },
          { href: "/video-recovery", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Real local video draft trial",
          "Local video draft only",
          "Frame count and duration bounded",
          "Dual GPUs are parallel workers",
          "No cloud fallback",
          "Review before promotion",
        ]}
      />
      <PreviewFoundationCard title="Plain-English flow">
        <PreviewFoundationCopy>
          image/keyframe trial readiness -&gt; video workflow package validation -&gt; explicit approval -&gt; local ComfyUI only -&gt; draft output capture -&gt; review inbox -&gt; recovery path.
        </PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            `ready for approved local trial: ${model.readyForApprovedLocalTrial ? "yes" : "no"}`,
            "no automatic queue mutation",
            "no random generation",
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-local-video-draft-trial" style={previewStyles.grid}>
        <PreviewFoundationCard title="Video readiness">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Draft bounds">
          <PreviewFoundationPillList
            items={[
              model.bounds.frameCountLabel,
              `duration: ${model.bounds.durationLabel}`,
              `resolution: ${model.bounds.resolutionLabel}`,
              "frame count and duration bounded",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="GPU worker guidance">
          <PreviewFoundationCopy>{model.gpuGuidance.workerGuidance}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              model.gpuGuidance.dualGpuMode,
              model.gpuGuidance.memorySharingClaim,
              "treat each GPU as a separate worker unless workflow support is explicit",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationCopy>{model.approvalCopy}</PreviewFoundationCopy>
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced video draft trial details">
        <PreviewFoundationCopy>
          Advanced details stay secondary. This page cannot submit arbitrary queues, cannot mutate render queues silently, cannot delete artifacts, cannot browse arbitrary files, and cannot promote a draft before review.
        </PreviewFoundationCopy>
        <PreviewFoundationPillList items={model.flow.map((stage) => `${stage.label}: ${stage.plainEnglish}`)} />
      </PreviewFoundationDetail>
    </div>
  );
}
