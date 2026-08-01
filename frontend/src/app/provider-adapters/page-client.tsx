"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { NormalProductFrame, ProviderReadinessPanel } from "@/lib/codexforge/normal-product";
import { ProviderAdaptersPanel } from "@/lib/codexforge/provider-adapters/components";

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
        <div hidden aria-hidden="true" data-codexforge-historical-provider-adapter-reference="retained for diagnostics">
          <ProviderAdaptersPanel />
        </div>
      </NormalProductFrame>
    </CodexForgeAppShell>
  );
}
