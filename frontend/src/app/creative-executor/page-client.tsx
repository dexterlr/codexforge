"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { GuardedCreativeExecutorModel } from "@/lib/codexforge/guarded-creative-executor";
import { GuardedCreativeExecutorPanel } from "@/lib/codexforge/guarded-creative-executor/components/GuardedCreativeExecutorPanel";

type Props = {
  initialData: GuardedCreativeExecutorModel;
};

export default function CreativeExecutorPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/creative-executor"
      workspaceLabel="Review dry run"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-creative-executor-friendly-copy="Review dry run No auto-run advanced executor packet secondary" />
      <GuardedCreativeExecutorPanel model={initialData} />
    </CodexForgeAppShell>
  );
}
