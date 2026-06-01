import type { VideoPromptBuilderSummary } from "./video-prompt-builder-types";
import { buildDefaultVideoPromptIntents, buildVideoPromptIntent } from "./video-prompt-intent";
import { buildVideoPromptStructure } from "./video-prompt-structure";
import { buildVideoPromptStyle } from "./video-prompt-style";
import { buildVideoPromptShotLanguage } from "./video-prompt-shot-language";
import { buildVideoPromptNegativeGuidance } from "./video-prompt-negative-guidance";
import { buildVideoPromptSafety } from "./video-prompt-safety";
import { buildVideoPromptHandoff } from "./video-prompt-handoff";

export function buildVideoPromptBuilderSummary(): VideoPromptBuilderSummary {
  const intent = buildVideoPromptIntent();
  const structure = buildVideoPromptStructure(intent);
  const style = buildVideoPromptStyle(intent);
  const shotLanguage = buildVideoPromptShotLanguage();
  const negativeGuidance = buildVideoPromptNegativeGuidance();
  const safety = buildVideoPromptSafety();
  const handoff = buildVideoPromptHandoff(structure, style, shotLanguage, negativeGuidance);
  return {
    intents: buildDefaultVideoPromptIntents(),
    structure,
    style,
    shotLanguage,
    negativeGuidance,
    safety,
    handoff,
    summary: "A rough idea is now a clean video prompt, with storyboard handoff ready and generation still blocked.",
  };
}

export function summarizeVideoPromptBuilder(summary = buildVideoPromptBuilderSummary()): string {
  return `${summary.intents.length} friendly prompt types, prompt ready to copy, storyboard handoff ready, no provider calls, no ComfyUI calls, no generation.`;
}
