"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetyRisk } from "../video-generation-safety-types";

export function VideoSafetyRiskPanel({ risks }: { risks: VideoSafetyRisk[] }) {
  return (
    <PreviewFoundationCard title="Risks">
      <PreviewFoundationCopy>Risks explain what can go wrong before anything is generated.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risks.map((risk) => `${risk.severity}: ${risk.label}`)} />
      <PreviewFoundationCopy>{risks[0]?.mitigation ?? "Review risk mitigation before a real trial."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
