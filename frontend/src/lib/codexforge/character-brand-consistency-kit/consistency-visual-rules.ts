import type { ConsistencySubject, ConsistencyVisualRules } from "./consistency-kit-types";
import { buildDefaultConsistencySubjects } from "./consistency-subject";

export function buildConsistencyVisualRules(
  subjects: ConsistencySubject[] = buildDefaultConsistencySubjects()
): ConsistencyVisualRules[] {
  return subjects.map((subject) => ({
    id: `consistency-visual-rules-${subject.id}`,
    subjectId: subject.id,
    mustKeep: subject.mustKeep,
    colors: subject.colors,
    materials: subject.materials,
    silhouette: subject.silhouette,
    cameraAngleRules: subject.cameraAngleRules,
  }));
}
