"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { NormalProductFrame, ProviderReadinessPanel } from "@/lib/codexforge/normal-product";

export default function ProviderAdaptersPageClient() {
  return (
    <CodexForgeAppShell activePath="/provider-adapters" workspaceLabel="Providers" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <NormalProductFrame
        activePath="/provider-adapters"
        secondaryActions={[
          { label: "Review Safety", href: "/jarvis-safety" },
          { label: "Open Audit", href: "/jarvis-audit" },
        ]}
      >
        <ProviderReadinessPanel />
      </NormalProductFrame>
    </CodexForgeAppShell>
  );
}
