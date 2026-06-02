"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { AssetDependencyGroup } from "../asset-dependency-types";

export function AssetDependencyGroupPanel({ groups }: { groups: AssetDependencyGroup[] }) {
  return (
    <PreviewFoundationCard title="Dependency groups">
      <PreviewFoundationCopy>Groups explain what should be reviewed together before draft, finishing, or export handoff.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={groups.map((group) => `${group.title}: ${group.dependencies.length} asset(s)`)} />
    </PreviewFoundationCard>
  );
}
