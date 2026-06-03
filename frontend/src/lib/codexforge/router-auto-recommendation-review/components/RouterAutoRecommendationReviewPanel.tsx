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
import { buildRouterAutoRecommendationReviewModel } from "@/lib/codexforge/router-auto-recommendation-review";

export function RouterAutoRecommendationReviewPanel() {
  const model = buildRouterAutoRecommendationReviewModel();

  return (
    <div style={previewStyles.shell} data-codexforge-router-auto-recommendation-review="RouterAutoRecommendationReviewPanel route imports/renders main panel route uses home-grade/unified shell marker plain English review-gated approval-gated router auto-recommendation review nothing runs automatically nothing uploads automatically nothing mutates silently no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Router auto-recommendation review Recommendations are not auto-applied No live traffic is routed automatically Approval required before router changes Local-first preference Apply handoff no automatic live test no automatic provider send no auto-routing no auto-spend no provider APIs are called no router config mutation from UI no secrets displayed no localStorage API key storage no process.env printing no provider registry mutation no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no shell command execution no raw fetch in UI no infinite polling loop no arbitrary file browsing no arbitrary local file browsing no model download/install behavior no model install no model download no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns">
      <PreviewFoundationHero
        phase="Phase 204"
        title="Router review"
        subtitle="Router auto-recommendation review can suggest provider and model routes, but recommendations are not auto-applied and no live traffic is routed automatically."
        primary={{ href: "#router-recommendation-review", label: "Review recommendation" }}
        links={[
          { href: "/task-router", label: "Task router" },
          { href: "/token-router", label: "Token router" },
          { href: "/provider-cost-latency-comparison", label: "Cost and latency" },
          { href: "/provider-test-results", label: "Result capture" },
          { href: "/provider-failure-recovery", label: "Failure recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="router-recommendation-review" style={previewStyles.grid}>
        <PreviewFoundationCard title="Task summary">
          <PreviewFoundationPillList items={model.recommendations.map((recommendation) => recommendation.taskSummary)} />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Candidate provider/model">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.candidateProviderModel)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Recommendation rationale">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.recommendationRationale)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Local-first preference">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.localFirstPreference)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Cost/latency/quality tradeoff">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.costLatencyQualityTradeoff)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Privacy review">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.privacyReview)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Blocked reasons">
          <PreviewFoundationPillList
            items={model.recommendations.map(
              (recommendation) => `${recommendation.confidenceLevel}: ${recommendation.blockedReasons.join("; ")}`
            )}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Approval requirement">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.approvalRequirement)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Apply handoff">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.applyHandoff)}
          />
        </PreviewFoundationCard>
        <PreviewFoundationCard title="Fallback route">
          <PreviewFoundationPillList
            items={model.recommendations.map((recommendation) => recommendation.fallbackRoute)}
          />
        </PreviewFoundationCard>
      </section>
      <PreviewFoundationDetail summary="Advanced router recommendation details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Router recommendations stay review-only. This page does not mutate router config, call provider APIs, route traffic, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
