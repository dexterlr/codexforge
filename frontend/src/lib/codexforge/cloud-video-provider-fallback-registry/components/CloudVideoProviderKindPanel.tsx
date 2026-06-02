"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoProviderKind } from "../cloud-video-provider-types";

export function CloudVideoProviderKindPanel({ kinds }: { kinds: CloudVideoProviderKind[] }) {
  return (
    <PreviewFoundationCard title="Provider kinds">
      <PreviewFoundationCopy>Provider kinds are labels for review only. They are not active integrations.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={kinds.map((kind) => kind.label)} />
    </PreviewFoundationCard>
  );
}
