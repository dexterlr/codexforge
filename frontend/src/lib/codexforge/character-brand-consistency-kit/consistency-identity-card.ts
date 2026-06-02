import type { ConsistencyIdentityCard, ConsistencySubject } from "./consistency-kit-types";
import { buildDefaultConsistencySubjects } from "./consistency-subject";

export function buildConsistencyIdentityCard(
  subjects: ConsistencySubject[] = buildDefaultConsistencySubjects()
): ConsistencyIdentityCard[] {
  return subjects.map((subject) => ({
    id: `consistency-identity-card-${subject.id}`,
    subjectId: subject.id,
    label: `${subject.label} identity card`,
    notes: [
      `subject id ${subject.id}`,
      `subject kind ${subject.subjectKind}`,
      `description ${subject.description}`,
      `approval status ${subject.approvalStatus}`,
      "No upload requirement.",
      "No face identity claims.",
    ],
  }));
}
