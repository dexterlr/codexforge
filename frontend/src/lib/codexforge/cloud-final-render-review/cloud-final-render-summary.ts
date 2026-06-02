import type { CloudFinalRenderSummary } from "./cloud-final-render-types";
import { buildCloudFinalRenderCostReview } from "./cloud-final-render-cost-review";
import { buildCloudFinalRenderHandoff } from "./cloud-final-render-handoff";
import { buildCloudFinalRenderJustification } from "./cloud-final-render-justification";
import { buildCloudFinalRenderPrivacyReview } from "./cloud-final-render-privacy-review";
import { buildDefaultCloudFinalRenderRequest } from "./cloud-final-render-request";
import { buildCloudFinalRenderReadiness } from "./cloud-final-render-readiness";

export function buildCloudFinalRenderSummary(): CloudFinalRenderSummary {
  const request = buildDefaultCloudFinalRenderRequest();
  const justification = buildCloudFinalRenderJustification(request);
  const costReview = buildCloudFinalRenderCostReview();
  const privacyReview = buildCloudFinalRenderPrivacyReview();
  const readiness = buildCloudFinalRenderReadiness(request, justification, costReview, privacyReview);
  const summary: CloudFinalRenderSummary = {
    request,
    justification,
    costReview,
    privacyReview,
    readiness,
    handoff: buildCloudFinalRenderHandoff(request, readiness),
    summary: "",
  };
  return { ...summary, summary: summarizeCloudFinalRenderReview(summary) };
}

export function summarizeCloudFinalRenderReview(summary: CloudFinalRenderSummary): string {
  const warningCount = summary.justification.checks.filter((check) => check.status === "warn").length;
  return `Cloud final render status is ${summary.readiness.status}; ${warningCount} review item(s) still need plain-English approval before any future manual handoff.`;
}
