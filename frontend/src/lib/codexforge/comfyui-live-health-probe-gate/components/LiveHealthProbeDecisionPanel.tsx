"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LiveHealthProbeDecision } from "../comfyui-live-health-gate-types";

export function LiveHealthProbeDecisionPanel({ decision }: { decision: LiveHealthProbeDecision }) {
  return (
    <PreviewFoundationCard title="Gate decision">
      <PreviewFoundationCopy>{decision.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{decision.explanation}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[decision.status, decision.futureProbeAllowed ? "future probe may be reviewed" : "live probe remains blocked"]} />
    </PreviewFoundationCard>
  );
}
