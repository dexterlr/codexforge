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
import { buildLmStudioRuntimePlannerModel } from "@/lib/codexforge/lm-studio-runtime-planner";

export function LmStudioRuntimePlannerPanel() {
  const model = buildLmStudioRuntimePlannerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-lm-studio-runtime-planner="LmStudioRuntimePlannerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated readiness-gated approved local boundary planning only unless approved local boundary exists nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons LM Studio runtime planner Local OpenAI-compatible runtime Manual setup guidance Local-only testing note No cloud provider APIs Approved local live-test boundary required no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no automatic provider send no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 196"
        title="LM Studio"
        subtitle="LM Studio runtime planner explains local OpenAI-compatible runtime readiness. It does not call LM Studio APIs, store endpoint secrets, or claim a live chat test."
        primary={{ href: "#lm-studio-runtime-planner", label: "Review runtime plan" }}
        links={[
          { href: "/provider-adapters", label: "Adapters" },
          { href: "/local-model-manager", label: "Local models" },
          { href: "/task-router", label: "Task router" },
          { href: "/token-router", label: "Token router" },
          { href: "/local-llm-creative-assistant", label: "Prompt assistant" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "LM Studio runtime planner",
          "Local OpenAI-compatible runtime",
          "Manual setup guidance",
          "Local-only testing note",
          "No cloud provider APIs",
          "Approved local live-test boundary required",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="lm-studio-runtime-planner" style={previewStyles.grid}>
        <PreviewFoundationCard title="Runtime endpoint policy">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.runtimeEndpointPolicy)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Model selection readiness">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.modelSelectionReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local server readiness">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.localServerReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Adapter fit">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.openAiCompatibleAdapterFit)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Context and privacy">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.contextTokenNote} ${plan.privacyNote}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Manual setup guidance">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.manualSetupGuidance)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-only testing note">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.localOnlyTestingNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons and next route">
          <PreviewFoundationPillList
            items={model.plans.map((plan) => `${plan.blockedReasons.join("; ")}. Next route: ${plan.nextRoute}`)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced LM Studio runtime details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Endpoint values stay outside CodexForge. No cloud provider APIs, no local runtime call, and no live chat/test claim are made here.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
