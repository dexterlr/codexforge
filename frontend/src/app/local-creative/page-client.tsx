"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalCreativeProviderRegistryPanel } from "@/lib/codexforge/local-creative-provider-registry/components";

export default function LocalCreativePageClient() {
  return (
    <CodexForgeAppShell activePath="/local-creative" workspaceLabel="Local Creative" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalCreativeProviderRegistryPanel />
    </CodexForgeAppShell>
  );
}
