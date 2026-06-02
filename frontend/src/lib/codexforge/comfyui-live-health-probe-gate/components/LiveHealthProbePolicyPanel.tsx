"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LiveHealthProbePolicy } from "../comfyui-live-health-gate-types";

export function LiveHealthProbePolicyPanel({ policy }: { policy: LiveHealthProbePolicy }) {
  return (
    <PreviewFoundationCard title="Policy requirements">
      <PreviewFoundationCopy>Every requirement must pass before a later approved local bridge may attempt a metadata-only health probe.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={policy.requirements} />
      <PreviewFoundationCopy>{policy.failures.length > 0 ? `Blocked checks: ${policy.failures.join(" ")}` : "All policy checks are satisfied."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
