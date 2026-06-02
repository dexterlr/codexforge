"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoCostRisk } from "../cloud-video-provider-types";

export function CloudVideoCostRiskPanel({ risks }: { risks: CloudVideoCostRisk[] }) {
  return (
    <PreviewFoundationCard title="Cost and credit risk">
      <PreviewFoundationCopy>Cloud providers can cost money or credits. No credits are spent by this registry.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risks.map((risk) => risk.label)} />
      <PreviewFoundationCopy>{risks[0]?.budgetNote ?? "Budget review is required before future manual cloud use."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
