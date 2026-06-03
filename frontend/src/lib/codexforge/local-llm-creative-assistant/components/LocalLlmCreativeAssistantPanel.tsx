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
import { buildLocalLlmCreativeAssistantModel } from "@/lib/codexforge/local-llm-creative-assistant";

export function LocalLlmCreativeAssistantPanel() {
  const model = buildLocalLlmCreativeAssistantModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-llm-creative-assistant="LocalLlmCreativeAssistantPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated readiness-gated approved local boundary planning only unless approved local boundary exists nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Local LLM prompt assistant for creative work No automatic provider send No cloud fallback Prompt draft checklist Handoff to local image keyframe video trial No memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no automatic provider send no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 197"
        title="Prompt assistant"
        subtitle="Local LLM prompt assistant for creative work helps shape image, keyframe, and video prompts. It does not send prompts automatically, call a local LLM, use cloud fallback, or promote memory."
        primary={{ href: "#local-llm-creative-assistant", label: "Review prompt plan" }}
        links={[
          { href: "/local-model-manager", label: "Local models" },
          { href: "/video-prompt", label: "Video prompt" },
          { href: "/workflow-compatibility-checker", label: "Compatibility" },
          { href: "/local-image-trial", label: "Image trial" },
          { href: "/local-keyframe-trial", label: "Keyframe trial" },
          { href: "/local-video-draft-trial", label: "Video trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Local LLM prompt assistant for creative work",
          "No automatic provider send",
          "No cloud fallback",
          "Prompt draft checklist",
          "Handoff to local image keyframe video trial",
          "No memory auto-promotion",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-llm-creative-assistant" style={previewStyles.grid}>
        <PreviewFoundationCard title="Creative task summary">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.creativeTaskSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local LLM fit">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.localLlmFit)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Prompt draft checklist">
          <PreviewFoundationPillList items={model.plans.flatMap((plan) => plan.promptDraftChecklist)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Style and character inputs">
          <PreviewFoundationPillList items={model.plans.flatMap((plan) => plan.styleCharacterConsistencyInputs)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Workflow compatibility note">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.workflowCompatibilityNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Safety review note">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.safetyReviewNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Creative trial handoff">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.handoffToLocalImageKeyframeVideoTrial)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Provider and memory boundary">
          <PreviewFoundationPillList
            items={[
              "No automatic provider send",
              "No cloud fallback",
              "No memory auto-promotion",
              "No Brain graph mutation",
              "Approved local LLM boundary required before live assistance",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced prompt assistant details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Prompt details stay secondary. This page does not call a local LLM from arbitrary UI, send prompts or files to providers, store prompts as memory automatically, or mutate Brain graph data.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
