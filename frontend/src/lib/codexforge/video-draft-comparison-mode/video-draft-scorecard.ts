import type { VideoDraftScorecard } from "./video-draft-comparison-types";

export function buildVideoDraftScorecard(input: Partial<VideoDraftScorecard> = {}): VideoDraftScorecard {
  return {
    id: input.id ?? "video-draft-scorecard-a",
    draftId: input.draftId ?? "video-draft-record-a",
    strengths: input.strengths ?? ["prompt clarity", "planned artifact handoff"],
    concerns: input.concerns ?? ["no real draft supplied yet", "playback not available in this phase"],
  };
}
