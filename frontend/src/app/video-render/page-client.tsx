"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { VideoRenderJobPreviewModel } from "@/lib/codexforge/video-render-job-preview";
import { VideoRenderJobPreviewPanel } from "@/lib/codexforge/video-render-job-preview/components/VideoRenderJobPreviewPanel";

type Props = {
  initialData: VideoRenderJobPreviewModel;
};

export default function VideoRenderPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/video-render"
      workspaceLabel="Video render plan"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-video-render-friendly-copy="Video render plan Review render plan Preview only" />
      <VideoRenderJobPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
