"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderConnectionTestPanel } from "@/lib/codexforge/provider-connection-test-ux/components";
export default function ProviderTestsPageClient() { return <CodexForgeAppShell activePath="/provider-tests" workspaceLabel="Provider Tests" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><ProviderConnectionTestPanel /></CodexForgeAppShell>; }
