"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorSafetyInterlocksPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-safety-interlocks" workspaceLabel="Guided Operator Safety Interlocks" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-safety-interlocks" />
    </CodexForgeAppShell>
  );
}
