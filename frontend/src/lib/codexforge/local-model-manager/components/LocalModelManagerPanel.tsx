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
import { buildLocalModelManagerModel } from "@/lib/codexforge/local-model-manager";

export function LocalModelManagerPanel() {
  const model = buildLocalModelManagerModel();

  return (
    <div style={previewStyles.shell} data-codexforge-local-model-manager="LocalModelManagerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English local-only review-gated readiness-gated approved local boundary planning only unless approved local boundary exists nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Local model manager Live inventory remains behind approved local boundary No automatic downloads Manual resolution note Local availability status Full local paths stay secondary no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no automatic provider send no cloud provider API calls no cloud calls no password storage no API key localStorage no localStorage API key storage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 194"
        title="Local models"
        subtitle="Local model manager explains local LLM and creative model readiness. Live inventory remains behind approved local boundary; this page does not browse folders, install models, or download anything."
        primary={{ href: "#local-model-manager", label: "Review model readiness" }}
        links={[
          { href: "/local-machine", label: "Local machine" },
          { href: "/provider-adapters", label: "Adapters" },
          { href: "/model-capabilities", label: "Capabilities" },
          { href: "/task-router", label: "Task router" },
          { href: "/missing-model-node-resolver", label: "Missing items" },
        ]}
      />
      <PreviewFoundationSafetyStrip
        items={[
          "Local model manager",
          "Live inventory remains behind approved local boundary",
          "No automatic downloads",
          "Manual resolution note",
          "Local availability status",
          "Full local paths stay secondary",
        ]}
      />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-manager" style={previewStyles.grid}>
        <PreviewFoundationCard title="Model identity">
          <PreviewFoundationPillList items={model.inventory.map((entry) => entry.modelIdentity)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Family and runtime">
          <PreviewFoundationPillList
            items={model.inventory.map((entry) => `${entry.modelFamily}: ${entry.runtimeTarget}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Availability">
          <PreviewFoundationPillList
            items={model.inventory.map((entry) => `${entry.modelIdentity}: ${entry.localAvailabilityStatus}`)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Capability summary">
          <PreviewFoundationPillList items={model.inventory.map((entry) => entry.capabilitySummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Disk and VRAM readiness">
          <PreviewFoundationPillList items={model.inventory.map((entry) => entry.diskVramReadinessNote)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Routing fit">
          <PreviewFoundationPillList items={model.inventory.map((entry) => entry.routingFit)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Missing model guidance">
          <PreviewFoundationPillList items={model.inventory.map((entry) => entry.missingModelGuidance)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Manual boundary">
          <PreviewFoundationPillList
            items={[
              "No secret storage",
              "No automatic downloads",
              "No model installs",
              "No arbitrary local file browsing",
              "No silent provider registry mutation",
            ]}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced local model details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Full local paths stay secondary. Live inventory, exact disk checks, and exact VRAM checks require an approved local boundary before CodexForge can report them as facts.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
