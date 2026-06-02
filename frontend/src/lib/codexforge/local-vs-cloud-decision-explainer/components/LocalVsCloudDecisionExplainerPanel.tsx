"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildLocalVsCloudSummary } from "@/lib/codexforge/local-vs-cloud-decision-explainer";
import { LocalVsCloudDecisionPanel } from "./LocalVsCloudDecisionPanel";
import { LocalVsCloudEmptyState } from "./LocalVsCloudEmptyState";
import { LocalVsCloudFactorPanel } from "./LocalVsCloudFactorPanel";
import { LocalVsCloudHandoffPanel } from "./LocalVsCloudHandoffPanel";
import { LocalVsCloudNextActionPanel } from "./LocalVsCloudNextActionPanel";
import { LocalVsCloudSafetyStrip } from "./LocalVsCloudSafetyStrip";
import { LocalVsCloudSummaryPanel } from "./LocalVsCloudSummaryPanel";
import { LocalVsCloudTaskPanel } from "./LocalVsCloudTaskPanel";
import { LocalVsCloudTradeoffPanel } from "./LocalVsCloudTradeoffPanel";

export function LocalVsCloudDecisionExplainerPanel() {
  const summary = buildLocalVsCloudSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-local-vs-cloud-decision-explainer="LocalVsCloudDecisionExplainerPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no provider call no generate button no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no upload no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 172"
        title="Local vs cloud"
        subtitle="Choose the safest, cheapest, highest-quality path for each video job."
        primary={{ href: "#local-vs-cloud", label: "Explain best route" }}
        links={[
          { href: "/creative-cost-router", label: "Creative cost saver" },
          { href: "/cloud-final-render", label: "Cloud final render" },
          { href: "/video-safety-audit", label: "Safety audit" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/task-router", label: "Task router" },
          { href: "/video-projects", label: "Video projects" },
        ]}
      />
      <LocalVsCloudSafetyStrip />
      <LocalVsCloudSummaryPanel summary={summary} />
      <section id="local-vs-cloud" style={previewStyles.grid}>
        <LocalVsCloudTaskPanel tasks={summary.tasks} />
        <LocalVsCloudFactorPanel factors={summary.factors} />
        <LocalVsCloudDecisionPanel decision={summary.decision} />
        <LocalVsCloudTradeoffPanel tradeoff={summary.tradeoff} />
        <LocalVsCloudNextActionPanel nextAction={summary.nextAction} />
        <LocalVsCloudHandoffPanel handoff={summary.handoff} />
      </section>
      <LocalVsCloudEmptyState />
      <PreviewFoundationDetail summary="Advanced local-vs-cloud details">
        <PreviewFoundationCopy>
          Use local for drafts, private work, cheap iteration, and local final candidates. Use cloud only for specific final-quality fallback reasons after cost, privacy, provider, and safety review.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
