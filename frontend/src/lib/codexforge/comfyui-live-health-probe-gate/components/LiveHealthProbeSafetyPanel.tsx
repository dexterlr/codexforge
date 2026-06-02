"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LiveHealthProbeSafety } from "../comfyui-live-health-gate-types";

export function LiveHealthProbeSafetyPanel({ safety }: { safety: LiveHealthProbeSafety }) {
  return (
    <PreviewFoundationCard title="Safety boundary">
      <PreviewFoundationCopy>A health check is not a render job. It must never send prompts, workflows, or queue changes.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.guarantees} />
      <PreviewFoundationCopy>Blocked: {safety.blocked.join(", ")}.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
