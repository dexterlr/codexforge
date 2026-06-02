"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoProvider } from "../cloud-video-provider-types";

export function CloudVideoProviderPanel({ provider }: { provider: CloudVideoProvider }) {
  return (
    <PreviewFoundationCard title={provider.name}>
      <PreviewFoundationCopy>{provider.kind.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={provider.capabilities.map((capability) => capability.label)} />
      <PreviewFoundationCopy>{provider.costRisk.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{provider.fallbackPolicy.plainEnglish}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
