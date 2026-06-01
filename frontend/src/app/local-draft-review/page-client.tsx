"use client";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalDraftRenderReviewPanel } from "@/lib/codexforge/local-draft-render-review/components";
export default function LocalDraftReviewPageClient() { return <CodexForgeAppShell activePath="/local-draft-review" workspaceLabel="Local Draft Review" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><LocalDraftRenderReviewPanel /></CodexForgeAppShell>; }
