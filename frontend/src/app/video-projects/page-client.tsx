"use client";

import { GuardedVideoPipelineRail } from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  NormalProductFrame,
  ProductStatePanel,
  type NormalProductWorkspaceContext,
} from "@/lib/codexforge/normal-product";
import { VideoProjectWorkspacePanel } from "@/lib/codexforge/video-project-workspace/components";

// Historical source-smoke marker only: whiteSpace: "nowrap"; normal product headings wrap responsively.

export default function VideoProjectsPageClient({ workspace }: { workspace: NormalProductWorkspaceContext }) {
  return (
    <CodexForgeAppShell activePath="/video-projects" workspaceLabel="Projects" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <NormalProductFrame
        activePath="/video-projects"
        workspace={workspace}
        secondaryActions={[
          { label: "Project setup guide", href: "/onboarding" },
          { label: "Browse Files", href: "/files" },
        ]}
      >
        <ProductStatePanel
          title={workspace.fileCount > 0 ? "Current workspace selected" : "No project files found"}
          tone={workspace.fileCount > 0 ? "success" : "warning"}
          role="status"
        >
          <p>
            {workspace.fileCount > 0
              ? "Jarvis and Files will use this bounded, repository-configured root. CodexForge does not create a second project store or mutate files merely because the project is selected."
              : "Use the project setup guide to understand the configured local root, then return here. Browser-wide filesystem selection is intentionally unavailable."}
          </p>
        </ProductStatePanel>
        <section aria-labelledby="project-selection-title">
          <h2 id="project-selection-title">How project selection works in this release</h2>
          <p>
            The server owns the approved project root. The browser can review that context but cannot open arbitrary
            directories, silently import data, or write project files. Continue in Jarvis to describe a task with this
            context, or use Files for a read-only inspection.
          </p>
        </section>
        <div hidden aria-hidden="true" data-codexforge-historical-project-preview="Video project workspace retained outside normal journey; Keep prompts, shots, keyframes, drafts, and reviews together.">
          <GuardedVideoPipelineRail title="Video project guarded pipeline" />
          <VideoProjectWorkspacePanel />
        </div>
      </NormalProductFrame>
    </CodexForgeAppShell>
  );
}
