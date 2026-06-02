"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { AssetDependencyRisk } from "../asset-dependency-types";

export function AssetDependencyRiskPanel({ risk }: { risk: AssetDependencyRisk }) {
  return (
    <PreviewFoundationCard title="Asset risk">
      <PreviewFoundationCopy>{risk.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={risk.issues.length > 0 ? risk.issues : ["No blocked asset issue in this preview"]} />
    </PreviewFoundationCard>
  );
}
