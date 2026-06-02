"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { AssetDependencyReadiness } from "../asset-dependency-types";

export function AssetDependencyReadinessPanel({ readiness }: { readiness: AssetDependencyReadiness }) {
  return (
    <PreviewFoundationCard title="Asset readiness">
      <PreviewFoundationCopy>{readiness.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[`status: ${readiness.status}`, `ready: ${readiness.readyCount}`, `missing: ${readiness.missingCount}`, `blocked: ${readiness.blockedCount}`]} />
    </PreviewFoundationCard>
  );
}
