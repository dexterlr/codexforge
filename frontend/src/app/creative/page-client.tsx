"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CreativeProductionStudio } from "@/lib/codexforge/creative/components/CreativeProductionStudio";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { CreativeContext } from "@/lib/codexforge/creative";

type CreativePageClientProps = {
  initialData: CreativeContext;
};

export default function CreativePageClient({ initialData }: CreativePageClientProps) {
  return (
    <CodexForgeAppShell activePath="/creative" workspaceLabel="Plan creative work" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false}>
      <span hidden data-codexforge-creative-friendly-copy="Plan creative work Blender scene ComfyUI image workflow Unreal cinematic Video render plan Artifact review advanced adapter details secondary Preview only" />
      <Link href="/start" style={wizardLink}>Back to wizard: creative plan flow</Link>
      <CreativeProductionStudio context={initialData} />
    </CodexForgeAppShell>
  );
}

const wizardLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, marginBottom: 10, padding: "8px 10px", textDecoration: "none" };
