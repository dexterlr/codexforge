"use client";

import type { RealCreativeExecutorMvpDesignModel } from "@/lib/codexforge/real-creative-executor-mvp";
import { RealCreativeExecutorMvpDesign } from "@/lib/codexforge/real-creative-executor-mvp/components/RealCreativeExecutorMvpDesign";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: RealCreativeExecutorMvpDesignModel;
};

export default function CreativeMvpPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/creative-mvp"
      workspaceLabel="Real Creative Executor MVP Design"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealCreativeExecutorMvpDesign model={initialData} />
    </CodexForgeAppShell>
  );
}
