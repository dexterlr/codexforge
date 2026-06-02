import type { ConsistencyHandoff, ConsistencySubject } from "./consistency-kit-types";
import { buildDefaultConsistencySubjects } from "./consistency-subject";

export function buildConsistencyHandoff(subjects: ConsistencySubject[] = buildDefaultConsistencySubjects()): ConsistencyHandoff {
  return {
    id: "consistency-handoff-001",
    copyLabel: "Copy consistency handoff allowed",
    handoffText: subjects
      .map(
        (subject) =>
          `${subject.label}: must keep ${subject.mustKeep.join(", ")}; must avoid ${subject.mustAvoid.join(", ")}; colors ${subject.colors.join(", ")}; silhouette ${subject.silhouette}.`
      )
      .join(" "),
    reviewReminder: "Notes are planning aids. Review them before reuse; this page does not call providers or mutate memory.",
  };
}
