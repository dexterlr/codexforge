"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CloudVideoProviderFallbackRegistryPanel } from "@/lib/codexforge/cloud-video-provider-fallback-registry/components";

export default function CloudVideoProvidersPageClient() {
  return (
    <CodexForgeAppShell activePath="/cloud-video-providers" workspaceLabel="Cloud Video Providers" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CloudVideoProviderFallbackRegistryPanel />
    </CodexForgeAppShell>
  );
}
