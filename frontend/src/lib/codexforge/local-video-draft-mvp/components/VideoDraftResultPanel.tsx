"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoDraftResult } from "../local-video-draft-types";

export function VideoDraftResultPanel({ result }: { result: VideoDraftResult }) {
  return (
    <PreviewFoundationCard title="Supplied draft capture">
      <PreviewFoundationCopy>{result.reviewNote}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`result status: ${result.status}`, `draft: ${result.suppliedDraftLabel}`, `capture mode: ${result.captureMode}`]} />
    </PreviewFoundationCard>
  );
}
