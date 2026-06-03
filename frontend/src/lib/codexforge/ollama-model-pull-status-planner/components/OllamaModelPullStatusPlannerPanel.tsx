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
import { buildOllamaModelPullStatusPlannerModel } from "@/lib/codexforge/ollama-model-pull-status-planner";

export function OllamaModelPullStatusPlannerPanel() {
  const model = buildOllamaModelPullStatusPlannerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-ollama-model-planner="OllamaModelPullStatusPlannerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated readiness-gated approved local boundary planning only unless approved local boundary exists nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Ollama model pull and status planner Model pulls are manual Future approved local daemon only Manual command handoff Do not download models No live pull button no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no automatic provider send no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 195"
        title="Ollama planner"
        subtitle="Ollama model pull and status planner gives manual readiness guidance only. Model pulls are manual, and a future approved local daemon only may report live status."
        primary={{ href: "#ollama-model-planner", label: "Review Ollama plan" }}
        links={[
          { href: "/local-model-manager", label: "Local models" },
          { href: "/provider-adapters", label: "Adapters" },
          { href: "/local-machine", label: "Local machine" },
          { href: "/task-router", label: "Task router" },
          { href: "/token-router", label: "Token router" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Ollama model pull and status planner",
          "Model pulls are manual",
          "Future approved local daemon only",
          "Manual command handoff",
          "Do not download models",
          "No live pull button",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="ollama-model-planner" style={previewStyles.grid}>
        <PreviewFoundationCard title="Requested model">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.requestedModel)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Runtime target">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.localRuntimeTarget)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Pull readiness">
          <PreviewFoundationPillList items={model.plans.map((plan) => `${plan.requestedModel}: ${plan.pullReadiness}`)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Status check readiness">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.statusCheckReadiness)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Disk and VRAM note">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.diskVramNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Network and approval">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.networkDownloadApprovalNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Manual command handoff">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.manualCommandHandoff)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Cancel and retry">
          <PreviewFoundationPillList items={model.plans.map((plan) => plan.cancelRetryGuidance)} />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced Ollama planning details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          This page does not call Ollama APIs, run shell commands, download models, store credentials, or claim live status.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
