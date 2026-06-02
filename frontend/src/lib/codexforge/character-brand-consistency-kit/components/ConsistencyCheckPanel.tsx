"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ConsistencyCheck } from "../consistency-kit-types";

export function ConsistencyCheckPanel({ checks }: { checks: ConsistencyCheck[] }) {
  return (
    <PreviewFoundationCard title="Consistency checks">
      <PreviewFoundationCopy>Checks are review reminders, not generation or verification commands.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={checks.map((check) => `${check.label}: ${check.passed ? "reviewed" : "needs review"}; ${check.explanation}`)}
      />
    </PreviewFoundationCard>
  );
}
