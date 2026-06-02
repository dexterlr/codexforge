"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { CreativeCostEstimate } from "../creative-cost-saver-types";

export function CreativeCostEstimatePanel({ estimates }: { estimates: CreativeCostEstimate[] }) {
  return (
    <PreviewFoundationCard title="Approximate estimates">
      {estimates.map((estimate) => (
        <PreviewFoundationCopy key={estimate.id}>
          {estimate.localCostPosture}; {estimate.cloudCreditPosture}; {estimate.timePosture}
        </PreviewFoundationCopy>
      ))}
      <PreviewFoundationCopy>Estimates are approximate and no cloud credits are spent.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
