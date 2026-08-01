"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVideoWorkflowCatalogPanel } from "@/lib/codexforge/local-video-workflow-catalog/components";
import {
  NormalProductFrame,
  ProductStatePanel,
  type NormalProductWorkspaceContext,
} from "@/lib/codexforge/normal-product";

export default function VideoWorkflowsPageClient({ workspace }: { workspace: NormalProductWorkspaceContext }) {
  return (
    <CodexForgeAppShell activePath="/video-workflows" workspaceLabel="Workflows" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <NormalProductFrame
        activePath="/video-workflows"
        workspace={workspace}
        secondaryActions={[
          { label: "Review Assets", href: "/video-assets" },
          { label: "Open Audit", href: "/jarvis-audit" },
        ]}
      >
        <ProductStatePanel title="No connected workflow templates yet" tone="warning" role="status">
          <p>
            This page explains the review boundary only. It does not dispatch workers, run ComfyUI, call a provider,
            start a render, expose an arbitrary shell command, or claim that a template inventory is connected.
          </p>
        </ProductStatePanel>
        <section aria-labelledby="workflow-groups-title">
          <h2 id="workflow-groups-title">How a reviewed workflow is organized</h2>
          <ul>
            <li><strong>Plan:</strong> describe intended steps, inputs, outputs, tools, and data boundaries.</li>
            <li><strong>Approve:</strong> confirm the exact bounded action before any supported execution.</li>
            <li><strong>Review:</strong> inspect real results, Validation, and Audit; no result exists until execution genuinely occurs.</li>
          </ul>
          <p>Video generation and rendering remain unavailable. Their historical planning previews live under Developer Diagnostics.</p>
        </section>
        <div hidden aria-hidden="true" data-codexforge-workflow-diagnostics-preview="Video workflows. Plan local video generation before spending cloud credits. Choose video workflow. Retained for Developer Diagnostics only.">
          <LocalVideoWorkflowCatalogPanel />
        </div>
      </NormalProductFrame>
    </CodexForgeAppShell>
  );
}
