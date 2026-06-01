import type { KeyframePlanSummary } from "./keyframe-plan-types";
import { buildDefaultKeyframePlan } from "./keyframe-plan";
import { buildDefaultKeyframeEntries } from "./keyframe-entry";
import { buildKeyframePrompt } from "./keyframe-prompt";
import { buildKeyframeConsistencyNote } from "./keyframe-consistency-note";
import { buildKeyframeGenerationReadiness } from "./keyframe-generation-readiness";
import { buildKeyframeHandoff } from "./keyframe-handoff";
export function buildKeyframePlanSummary(): KeyframePlanSummary { const plan = buildDefaultKeyframePlan(); const entries = buildDefaultKeyframeEntries(); const prompts = entries.map(buildKeyframePrompt); return { plan, entries, prompts, consistency: buildKeyframeConsistencyNote(), readiness: buildKeyframeGenerationReadiness(), handoff: buildKeyframeHandoff(entries, prompts), summary: "Storyboard shots now have planned still frames for later review and local generation." }; }
export function summarizeKeyframePlan(summary = buildKeyframePlanSummary()): string { return `${summary.entries.length} keyframes planned, prompts copyable, video draft handoff ready, no image generation, no provider calls.`; }
