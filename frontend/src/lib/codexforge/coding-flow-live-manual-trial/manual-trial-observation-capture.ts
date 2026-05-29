import type { ManualTrialObservationCapture } from "./live-manual-trial-types";

export function buildManualTrialObservationCapture(): ManualTrialObservationCapture {
  return { prompts: ["What was the next step?", "Where did the operator hesitate?", "Was safety copy clear?", "Did latest-message authority stay visible?"], copyTemplate: "Manual trial observation: step, screen, friction, expected next fix, safety impact.", latestMessageAuthorityReminder: "preserve latest-message authority" };
}
