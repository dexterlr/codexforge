"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoFailureCase } from "../video-failure-recovery-types";

export function VideoFailureCasePanel({ cases }: { cases: VideoFailureCase[] }) {
  return (
    <PreviewFoundationCard title="Failure cases">
      <PreviewFoundationCopy>Common failure cases are listed in beginner-friendly language so the user can recover without panic.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={cases.map((failureCase) => `${failureCase.kind}: ${failureCase.plainEnglish}`)} />
    </PreviewFoundationCard>
  );
}
