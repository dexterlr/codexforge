"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoCapability } from "../cloud-video-provider-types";

export function CloudVideoCapabilityPanel({ capabilities }: { capabilities: CloudVideoCapability[] }) {
  return (
    <PreviewFoundationCard title="Fallback capabilities">
      <PreviewFoundationCopy>Capabilities explain when cloud may help after local work is reviewed.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={capabilities.map((capability) => capability.label)} />
      <PreviewFoundationCopy>{capabilities[0]?.localFirstCheck ?? "Local-first review comes before cloud."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
