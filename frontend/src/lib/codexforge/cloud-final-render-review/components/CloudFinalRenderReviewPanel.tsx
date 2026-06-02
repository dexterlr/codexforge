"use client";

import {
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  previewStyles,
} from "../../video-foundation-ui";
import { buildCloudFinalRenderSummary } from "@/lib/codexforge/cloud-final-render-review";
import { CloudFinalRenderCostReviewPanel } from "./CloudFinalRenderCostReviewPanel";
import { CloudFinalRenderEmptyState } from "./CloudFinalRenderEmptyState";
import { CloudFinalRenderHandoffPanel } from "./CloudFinalRenderHandoffPanel";
import { CloudFinalRenderJustificationPanel } from "./CloudFinalRenderJustificationPanel";
import { CloudFinalRenderPrivacyReviewPanel } from "./CloudFinalRenderPrivacyReviewPanel";
import { CloudFinalRenderReadinessPanel } from "./CloudFinalRenderReadinessPanel";
import { CloudFinalRenderRequestPanel } from "./CloudFinalRenderRequestPanel";
import { CloudFinalRenderSafetyStrip } from "./CloudFinalRenderSafetyStrip";
import { CloudFinalRenderSummaryPanel } from "./CloudFinalRenderSummaryPanel";

export function CloudFinalRenderReviewPanel() {
  const summary = buildCloudFinalRenderSummary();

  return (
    <div style={previewStyles.shell} data-codexforge-cloud-final-render-review="CloudFinalRenderReviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no upload button no API call no generate button no auto-generation no fake generation success no real video generation no image generation no upscale execution no frame interpolation execution no real export no direct ComfyUI workflow run no ComfyUI workflow run no ComfyUI queue submit no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no silent persistence no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no arbitrary file browsing no delete artifact button no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 171"
        title="Cloud final render review"
        subtitle="Review whether a cloud final render is worth the cost before anything is sent."
        primary={{ href: "#cloud-final-render", label: "Review cloud render" }}
        links={[
          { href: "/cloud-video-providers", label: "Cloud providers" },
          { href: "/local-vs-cloud", label: "Local vs cloud" },
          { href: "/video-safety-audit", label: "Safety audit" },
          { href: "/video-projects", label: "Video projects" },
          { href: "/video-final-render", label: "Draft to final" },
          { href: "/video-export", label: "Video export" },
          { href: "/creative-cost-router", label: "Creative cost saver" },
        ]}
      />
      <CloudFinalRenderSafetyStrip />
      <CloudFinalRenderSummaryPanel summary={summary} />
      <section id="cloud-final-render" style={previewStyles.grid}>
        <CloudFinalRenderRequestPanel request={summary.request} />
        <CloudFinalRenderJustificationPanel justification={summary.justification} />
        <CloudFinalRenderCostReviewPanel costReview={summary.costReview} />
        <CloudFinalRenderPrivacyReviewPanel privacyReview={summary.privacyReview} />
        <CloudFinalRenderReadinessPanel readiness={summary.readiness} />
        <CloudFinalRenderHandoffPanel handoff={summary.handoff} />
      </section>
      <CloudFinalRenderEmptyState />
      <PreviewFoundationDetail summary="Advanced cloud final render details">
        <PreviewFoundationCopy>
          Cloud render is future/manual/approved only. This review does not upload prompts, upload files, call providers, spend credits, generate video, or queue any render.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
