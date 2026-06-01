"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { SafeEnvKeyDetectionPanel } from "@/lib/codexforge/safe-env-key-detection/components";
export default function EnvReadinessPageClient() { return <CodexForgeAppShell activePath="/env-readiness" workspaceLabel="Env Readiness" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><SafeEnvKeyDetectionPanel /></CodexForgeAppShell>; }
