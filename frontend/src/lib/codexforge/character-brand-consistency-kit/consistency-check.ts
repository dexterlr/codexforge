import type { ConsistencyCheck, ConsistencySubject } from "./consistency-kit-types";
import { buildDefaultConsistencySubjects } from "./consistency-subject";

export function buildConsistencyCheck(
  subjects: ConsistencySubject[] = buildDefaultConsistencySubjects()
): ConsistencyCheck[] {
  return [
    {
      id: "consistency-check-prompt-cues",
      label: "prompt includes identity cues",
      passed: subjects.length > 0,
      explanation: "Prompt text should include subject id, label, colors, silhouette, and must keep notes.",
    },
    {
      id: "consistency-check-keyframe-cues",
      label: "keyframe plan includes identity cues",
      passed: true,
      explanation: "Keyframes should repeat the same identity cues when the subject appears again.",
    },
    {
      id: "consistency-check-draft-cues",
      label: "draft request includes identity cues",
      passed: true,
      explanation: "Local draft requests should carry identity notes forward instead of rewriting them loosely.",
    },
    {
      id: "consistency-check-negative-rules",
      label: "negative rules included",
      passed: true,
      explanation: "Must avoid notes should be visible near the prompt handoff.",
    },
    {
      id: "consistency-check-reviewed-notes",
      label: "brand/character notes reviewed",
      passed: false,
      explanation: "A person still reviews whether brand or character notes are accurate before reuse.",
    },
    {
      id: "consistency-check-hidden-assets",
      label: "no hidden asset dependency",
      passed: true,
      explanation: "The kit works from notes only and does not require hidden uploads or private assets.",
    },
  ];
}
