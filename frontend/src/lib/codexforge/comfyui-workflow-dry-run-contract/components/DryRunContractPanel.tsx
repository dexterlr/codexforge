"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DryRunContract } from "../comfyui-dry-run-types";

export function DryRunContractPanel({ contract }: { contract: DryRunContract }) {
  return (
    <PreviewFoundationCard title="Dry run contract">
      <PreviewFoundationCopy>{contract.label}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={contract.scope} />
      <PreviewFoundationCopy>Dry run means: {contract.dryRunMeans.join(", ")}.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
