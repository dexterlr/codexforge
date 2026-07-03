"use client";

import {
  GuardedVideoPipelineRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalMachineCapabilityPanel } from "@/lib/codexforge/local-machine-capability/components";

export default function LocalMachinePageClient() {
  return (
    <CodexForgeAppShell activePath="/local-machine" workspaceLabel="Local Machine" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <MainPagesGodTierUxStatusRail title="Local machine review posture" tone="video" />
      <GuardedVideoPipelineRail title="Local machine guarded video pipeline" compact />
      <LocalMachineCapabilityPanel />
    </CodexForgeAppShell>
  );
}
