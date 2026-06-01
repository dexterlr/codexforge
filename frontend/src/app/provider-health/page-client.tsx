"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderHealthChecksPanel } from "@/lib/codexforge/provider-health-checks/components";
export default function ProviderHealthPageClient() { return <CodexForgeAppShell activePath="/provider-health" workspaceLabel="Provider Health" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><ProviderHealthChecksPanel /></CodexForgeAppShell>; }
