"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalProviderProbePreviewPanel } from "@/lib/codexforge/local-provider-probe-preview/components";
export default function LocalProviderProbesPageClient() { return <CodexForgeAppShell activePath="/local-provider-probes" workspaceLabel="Local Provider Probes" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><LocalProviderProbePreviewPanel /></CodexForgeAppShell>; }
