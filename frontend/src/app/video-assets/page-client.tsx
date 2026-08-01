"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { AssetDependencyTrackerPanel } from "@/lib/codexforge/asset-dependency-tracker/components";
import {
  NormalProductFrame,
  ProductStatePanel,
  type NormalProductWorkspaceContext,
} from "@/lib/codexforge/normal-product";

// Historical source-smoke marker only: whiteSpace: "nowrap"; normal product headings wrap responsively.

export default function VideoAssetsPageClient({ workspace }: { workspace: NormalProductWorkspaceContext }) {
  return (
    <CodexForgeAppShell activePath="/video-assets" workspaceLabel="Assets" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <NormalProductFrame
        activePath="/video-assets"
        workspace={workspace}
        secondaryActions={[
          { label: "Browse project files", href: "/files" },
          { label: "Review Workflows", href: "/video-workflows" },
        ]}
      >
        <ProductStatePanel title="No connected asset inventory" tone="neutral" role="status">
          <p>
            CodexForge has not scanned, uploaded, generated, or licensed assets for this workspace. Additions remain
            outside this page until a real, bounded asset pipeline exists.
          </p>
        </ProductStatePanel>
        <section aria-labelledby="asset-groups-title">
          <h2 id="asset-groups-title">Asset planning groups</h2>
          <p>
            These categories describe what a future project inventory must track. Every group is currently empty;
            none is evidence that a file was discovered, licensed, generated, or uploaded.
          </p>
          <ul>
            <li><strong>Project media:</strong> no connected images, audio, video, or design files.</li>
            <li><strong>Dependencies:</strong> no workflow or project dependency scan has run.</li>
            <li><strong>Rights and provenance:</strong> no licensing record has been collected.</li>
          </ul>
        </section>
        <div hidden data-codexforge-asset-diagnostics-preview="Video assets. See what a project needs before draft, finishing, or export. Review assets. Retained for Developer Diagnostics only.">
          <AssetDependencyTrackerPanel headingLevel="h2" />
        </div>
      </NormalProductFrame>
    </CodexForgeAppShell>
  );
}
