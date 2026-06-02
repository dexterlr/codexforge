"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LiveHealthProbeReadiness } from "../comfyui-live-health-gate-types";

export function LiveHealthProbeReadinessPanel({ readiness }: { readiness: LiveHealthProbeReadiness }) {
  return (
    <PreviewFoundationCard title="Readiness checks">
      <PreviewFoundationCopy>These checks describe readiness only. They do not contact a server.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={readiness.readyChecks} />
      <PreviewFoundationCopy>{readiness.blockedChecks.length > 0 ? `Still blocked: ${readiness.blockedChecks.join(" ")}` : "No blocked checks remain."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
