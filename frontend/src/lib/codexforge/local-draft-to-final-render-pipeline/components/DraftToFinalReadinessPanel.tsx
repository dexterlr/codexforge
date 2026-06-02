"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DraftToFinalReadiness } from "../draft-to-final-types";

export function DraftToFinalReadinessPanel({ readiness }: { readiness: DraftToFinalReadiness }) {
  return (
    <PreviewFoundationCard title="Readiness checks">
      <PreviewFoundationCopy>Every readiness item should be reviewed before a draft becomes a future final render candidate.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={readiness.checks.map((check) => `${check.label}: ${check.ready ? "ready" : "needs review"}`)}
      />
    </PreviewFoundationCard>
  );
}
