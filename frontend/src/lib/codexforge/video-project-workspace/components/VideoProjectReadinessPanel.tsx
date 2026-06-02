"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoProjectReadiness } from "../video-project-workspace-types";

export function VideoProjectReadinessPanel({ readiness }: { readiness: VideoProjectReadiness }) {
  return (
    <PreviewFoundationCard title="Export readiness">
      <PreviewFoundationCopy>{readiness.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={readiness.checks.map((check) => `${check.label}: ${check.ready ? "ready" : "not ready"}`)} />
    </PreviewFoundationCard>
  );
}
