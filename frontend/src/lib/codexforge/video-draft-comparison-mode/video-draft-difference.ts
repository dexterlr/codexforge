import type { VideoDraftDifference } from "./video-draft-comparison-types";

export function buildVideoDraftDifference(input: Partial<VideoDraftDifference> = {}): VideoDraftDifference {
  return {
    id: input.id ?? "video-draft-difference-prompt",
    category: input.category ?? "prompt",
    plainEnglish: input.plainEnglish ?? "Compare what changed in plain English before choosing a next action.",
  };
}
