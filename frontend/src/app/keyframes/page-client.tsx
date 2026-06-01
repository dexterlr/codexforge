"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { KeyframePlanBuilderPanel } from "@/lib/codexforge/keyframe-plan-builder/components";
export default function KeyframesPageClient() { return <CodexForgeAppShell activePath="/keyframes" workspaceLabel="Keyframes" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><KeyframePlanBuilderPanel /></CodexForgeAppShell>; }
