import type { VideoDraftSelection } from "./video-draft-comparison-types";

export function buildVideoDraftSelection(input: Partial<VideoDraftSelection> = {}): VideoDraftSelection {
  return {
    id: input.id ?? "video-draft-selection",
    selectedDraftId: input.selectedDraftId ?? "video-draft-record-a",
    decision: input.decision ?? "unknown",
    plainEnglish: input.plainEnglish ?? "Select a winner later after real drafts exist, or choose retry, upscale, or finish.",
  };
}
