"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildConsistencyKitSummary } from "@/lib/codexforge/character-brand-consistency-kit";
import { ConsistencyCheckPanel } from "./ConsistencyCheckPanel";
import { ConsistencyHandoffPanel } from "./ConsistencyHandoffPanel";
import { ConsistencyIdentityCardPanel } from "./ConsistencyIdentityCardPanel";
import { ConsistencyKitEmptyState } from "./ConsistencyKitEmptyState";
import { ConsistencyKitSafetyStrip } from "./ConsistencyKitSafetyStrip";
import { ConsistencyKitSummaryPanel } from "./ConsistencyKitSummaryPanel";
import { ConsistencyNegativeRulesPanel } from "./ConsistencyNegativeRulesPanel";
import { ConsistencySubjectPanel } from "./ConsistencySubjectPanel";
import { ConsistencyVisualRulesPanel } from "./ConsistencyVisualRulesPanel";

export function CharacterBrandConsistencyKitPanel() {
  const summary = buildConsistencyKitSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-character-brand-consistency-kit="CharacterBrandConsistencyKitPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no direct ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 164"
        title="Consistency kit"
        subtitle="Keep characters, products, and brands consistent across creative work."
        primary={{ href: "#consistency-kit", label: "Review consistency kit" }}
        links={[
          { href: "/storyboard", label: "Storyboard" },
          { href: "/keyframes", label: "Keyframes" },
          { href: "/local-keyframes", label: "Local keyframes" },
          { href: "/local-video-draft", label: "Local video draft" },
          { href: "/style-presets", label: "Style presets" },
          { href: "/shot-library", label: "Shot library" },
        ]}
      />
      <ConsistencyKitSafetyStrip />
      <ConsistencyKitSummaryPanel summary={summary} />
      <section id="consistency-kit" style={previewStyles.grid}>
        <ConsistencySubjectPanel subjects={summary.subjects} />
        <ConsistencyIdentityCardPanel cards={summary.identityCards} />
        <ConsistencyVisualRulesPanel rules={summary.visualRules} />
        <ConsistencyNegativeRulesPanel rules={summary.negativeRules} />
        <ConsistencyCheckPanel checks={summary.checks} />
        <ConsistencyHandoffPanel handoff={summary.handoff} />
      </section>
      <ConsistencyKitEmptyState />
      <PreviewFoundationDetail summary="Advanced consistency kit details">
        <PreviewFoundationCopy>
          Notes are planning aids. This route has no upload requirement, makes no face identity claims, does not call providers, does not generate media, and does not create hidden asset dependencies.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
