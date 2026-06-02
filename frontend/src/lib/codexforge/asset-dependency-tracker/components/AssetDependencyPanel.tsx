"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { AssetDependency } from "../asset-dependency-types";

export function AssetDependencyPanel({ dependencies }: { dependencies: AssetDependency[] }) {
  return (
    <PreviewFoundationCard title="Asset checklist">
      <PreviewFoundationCopy>Each dependency shows whether the project asset is ready, missing, optional, needs review, blocked, supplied, or unknown.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={dependencies.map((dependency) => `${dependency.kind}: ${dependency.status}`)} />
    </PreviewFoundationCard>
  );
}
