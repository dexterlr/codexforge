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
      workspaceLabel="Review MVP candidate"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-creative-mvp-friendly-copy="Review MVP candidate recommended candidate advanced requirement lists collapsed Design only" />
      <RealCreativeExecutorMvpDesign model={initialData} />
    </CodexForgeAppShell>
  );
}
