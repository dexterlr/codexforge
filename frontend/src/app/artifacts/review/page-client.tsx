"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CreativeArtifactReviewBoard } from "@/lib/codexforge/creative-artifact-review";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ArtifactsReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/artifacts/review"
      workspaceLabel="Review artifact"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
    >
      <span hidden data-codexforge-artifact-review-friendly-copy="Review artifact provenance safety handoff Review first" />
      <Link href="/start" style={wizardLink}>Back to wizard: artifact review flow</Link>
      <CreativeArtifactReviewBoard />
    </CodexForgeAppShell>
  );
}

const wizardLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, marginBottom: 10, padding: "8px 10px", textDecoration: "none" };
