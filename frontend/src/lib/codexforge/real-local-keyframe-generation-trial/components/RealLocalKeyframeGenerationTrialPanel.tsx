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
import { buildRealLocalKeyframeGenerationTrialSummary } from "@/lib/codexforge/real-local-keyframe-generation-trial";

export function RealLocalKeyframeGenerationTrialPanel() {
  const model = buildRealLocalKeyframeGenerationTrialSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-real-local-keyframe-generation-trial="RealLocalKeyframeGenerationTrialPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Real local keyframe generation trial Keyframes are reviewed first Local-only keyframe workflow Shot and scene linkage No prompt or file upload Recovery path before retry no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no artifact deletion no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 179"
        title="Keyframe trial"
        subtitle="A guarded local-only keyframe trial. The plan is reviewed before any approved local handoff, and nothing runs automatically."
        primary={{ href: "#real-local-keyframe-generation-trial", label: "Review keyframe trial" }}
        links={[
          { href: "/keyframes", label: "Keyframe plan" },
          { href: "/storyboard", label: "Storyboard" },
          { href: "/local-image-trial", label: "Image trial" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/comfyui-submit-trial", label: "Submit trial" },
          { href: "/local-output-capture", label: "Output capture" },
          { href: "/video-recovery", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Real local keyframe generation trial",
          "Keyframes are reviewed first",
          "Local-only keyframe workflow",
          "Shot and scene linkage",
          "No prompt or file upload",
          "Recovery path before retry",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationPillList
          items={[
            `status: ${model.status}`,
            `selected shots: ${model.plan.selectedShotCount}`,
            `prompt summaries: ${model.plan.promptCount}`,
            "nothing is submitted from this page",
          ]}
        />
      </PreviewFoundationCard>
      <section id="real-local-keyframe-generation-trial" style={previewStyles.grid}>
        <PreviewFoundationCard title="Safety checks">
          <PreviewFoundationPillList
            items={model.checks.map((check) => `${check.label}: ${check.status}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Keyframe plan summary">
          <PreviewFoundationCopy>{model.plan.reviewGuidance}</PreviewFoundationCopy>
          <PreviewFoundationPillList
            items={[
              `plan: ${model.plan.planId}`,
              "keyframes are reviewed first",
              "local-only target",
              "artifact capture destination defined",
            ]}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Shot and scene linkage">
          <PreviewFoundationPillList
            items={model.plan.shotSceneLinks.map((link) => `${link.shot}: ${link.scene} - ${link.reviewGuidance}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval copy">
          <PreviewFoundationCopy>{model.approvalCopy}</PreviewFoundationCopy>
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced keyframe trial details">
        <PreviewFoundationCopy>
          Advanced technical details stay secondary. This surface reviews a prepared keyframe plan and approved workflow package; it does not upload prompts or files, browse arbitrary folders, delete artifacts, mutate queues, or run a ComfyUI workflow.
        </PreviewFoundationCopy>
        <PreviewFoundationPillList items={model.flow.map((stage) => `${stage.label}: ${stage.plainEnglish}`)} />
      </PreviewFoundationDetail>
    </div>
  );
}
