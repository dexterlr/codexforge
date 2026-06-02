import type { ConsistencyNegativeRules, ConsistencySubject } from "./consistency-kit-types";
import { buildDefaultConsistencySubjects } from "./consistency-subject";

export function buildConsistencyNegativeRules(
  subjects: ConsistencySubject[] = buildDefaultConsistencySubjects()
): ConsistencyNegativeRules[] {
  return subjects.map((subject) => ({
    id: `consistency-negative-rules-${subject.id}`,
    subjectId: subject.id,
    mustAvoid: subject.mustAvoid,
    negativePromptNotes: [
      "Negative rules should travel with the prompt, keyframe plan, or draft request.",
      "They are reviewed planning notes, not an automatic filter.",
    ],
  }));
}
