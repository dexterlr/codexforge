"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { RealCreativeExecutorMvpDesignModel } from "@/lib/codexforge/real-creative-executor-mvp";
import { RealCreativeExecutorMvpDesign } from "@/lib/codexforge/real-creative-executor-mvp/components/RealCreativeExecutorMvpDesign";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type Props = {
  initialData: RealCreativeExecutorMvpDesignModel;
};

export default function CreativeMvpPageClient({ initialData }: Props) {
  return (
    <CodexForgeAppShell
      activePath="/creative-mvp"
      workspaceLabel="Review MVP candidate"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-creative-mvp-friendly-copy="Review MVP candidate recommended candidate advanced requirement lists collapsed Design only" />
      <Link href="/start" style={wizardLink}>Back to wizard: creative MVP review flow</Link>
      <RealCreativeExecutorMvpDesign model={initialData} />
    </CodexForgeAppShell>
  );
}

const wizardLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, marginBottom: 10, padding: "8px 10px", textDecoration: "none" };
