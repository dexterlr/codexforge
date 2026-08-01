"use client";

import { PatchPreviewWorkbenchPanel } from "@/lib/codexforge/patch-preview-workbench/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  NormalProductFrame,
  ProductStatePanel,
  type NormalProductWorkspaceContext,
} from "@/lib/codexforge/normal-product";

// Historical source-smoke marker only: whiteSpace: "nowrap"; normal product headings wrap responsively.

export default function PatchPreviewWorkbenchPageClient({ workspace }: { workspace: NormalProductWorkspaceContext }) {
  return (
    <CodexForgeAppShell
      activePath="/patch-preview-workbench"
      workspaceLabel="Patch Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <NormalProductFrame
        activePath="/patch-preview-workbench"
        workspace={workspace}
        secondaryActions={[
          { label: "Review Validation", href: "/validation" },
          { label: "Return to Jarvis", href: "/jarvis" },
        ]}
      >
        <ProductStatePanel title="No active proposed change" tone="neutral" role="status">
          <p>
            Choose a file in Project Files and prepare a proposed change there. Proposal state is not silently copied
            across routes or persisted as if an application occurred.
          </p>
        </ProductStatePanel>
        <section aria-labelledby="patch-lifecycle-title">
          <h2 id="patch-lifecycle-title">Explicit change lifecycle</h2>
          <ul>
            <li><strong>Proposed:</strong> inspect affected files, hunks, risk notes, and validation plan.</li>
            <li><strong>Application:</strong> requires its own exact approval; this page cannot apply a patch.</li>
            <li><strong>Failure:</strong> files remain unchanged and recovery returns to Files or Jarvis.</li>
            <li><strong>Completed:</strong> only a separately approved application may be called completed, followed by Validation and Audit review.</li>
          </ul>
        </section>
        <div hidden aria-hidden="true" data-codexforge-historical-patch-preview="deterministic fixture retained for diagnostics">
          <PatchPreviewWorkbenchPanel />
        </div>
      </NormalProductFrame>
    </CodexForgeAppShell>
  );
}
