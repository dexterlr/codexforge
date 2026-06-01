import type { LocalDraftRenderSummary } from "./local-draft-render-types";
import { buildDefaultDraftRenderRequest } from "./draft-render-request";
import { buildDraftRenderReadiness } from "./draft-render-readiness";
import { buildDraftRenderResourcePlan } from "./draft-render-resource-plan";
import { buildDraftRenderSafety } from "./draft-render-safety";
import { buildDraftRenderReviewCheck } from "./draft-render-review-check";
import { buildDraftRenderHandoff } from "./draft-render-handoff";
export function buildLocalDraftRenderSummary(): LocalDraftRenderSummary { const request = buildDefaultDraftRenderRequest(); return { request, readiness: buildDraftRenderReadiness(request), resourcePlan: buildDraftRenderResourcePlan(), safety: buildDraftRenderSafety(), checks: buildDraftRenderReviewCheck(request), handoff: buildDraftRenderHandoff(request), summary: "A future local draft render request is reviewed for prompt, storyboard, keyframes, workflow, resources, approval, artifacts, and recovery." }; }
export function summarizeLocalDraftRenderReview(summary = buildLocalDraftRenderSummary()): string { return `${summary.checks.length} draft review checks, approval required, no auto-run, no ComfyUI call, no provider calls, no cloud spend.`; }
