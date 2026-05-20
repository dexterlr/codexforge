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
      workspaceLabel="Video Render Job Preview"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <VideoRenderJobPreviewPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
