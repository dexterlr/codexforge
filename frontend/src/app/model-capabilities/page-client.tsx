"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell"; import { ModelCapabilityMatrixPanel } from "@/lib/codexforge/model-capability-matrix/components";
export default function ModelCapabilitiesPageClient(){ return <CodexForgeAppShell activePath="/model-capabilities" workspaceLabel="Model Capabilities" nextActionContext={{ wantsOperatorOverview:false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><ModelCapabilityMatrixPanel/></CodexForgeAppShell>; }
