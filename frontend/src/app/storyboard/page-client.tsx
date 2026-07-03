"use client";
import { GuardedVideoPipelineRail } from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { StoryboardPlannerPanel } from "@/lib/codexforge/storyboard-planner/components";
export default function StoryboardPageClient() { return <CodexForgeAppShell activePath="/storyboard" workspaceLabel="Storyboard" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><GuardedVideoPipelineRail title="Storyboard guarded video pipeline" compact /><StoryboardPlannerPanel /></CodexForgeAppShell>; }
