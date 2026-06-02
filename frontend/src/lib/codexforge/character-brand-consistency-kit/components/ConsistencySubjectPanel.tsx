"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ConsistencySubject } from "../consistency-kit-types";

export function ConsistencySubjectPanel({ subjects }: { subjects: ConsistencySubject[] }) {
  return (
    <PreviewFoundationCard title="Subjects">
      <PreviewFoundationCopy>
        Subject kinds include character, brand, product, location, vehicle, object, mascot, environment, and style-system.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={subjects.map(
          (subject) =>
            `${subject.id}: ${subject.label}; subject kind ${subject.subjectKind}; approval status ${subject.approvalStatus}`
        )}
      />
    </PreviewFoundationCard>
  );
}
