"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell"; import { TaskModelRouterPanel } from "@/lib/codexforge/task-model-router/components";
export default function TaskRouterPageClient(){ return <CodexForgeAppShell activePath="/task-router" workspaceLabel="Task Router" nextActionContext={{ wantsOperatorOverview:false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><TaskModelRouterPanel/></CodexForgeAppShell>; }
