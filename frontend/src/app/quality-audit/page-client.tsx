"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { FullSystemQualityAuditPanel } from "@/lib/codexforge/full-system-quality-audit/components";
import type { FullSystemQualityAuditSession } from "@/lib/codexforge/full-system-quality-audit";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

type QualityAuditPageClientProps = {
  initialData: FullSystemQualityAuditSession;
};

export default function QualityAuditPageClient({ initialData }: QualityAuditPageClientProps) {
  return (
    <CodexForgeAppShell
      activePath="/quality-audit"
      workspaceLabel="System quality audit"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-quality-audit-route="quality-audit imports/renders FullSystemQualityAuditPanel System quality audit Copy audit summary /code-flow/live-run /guarded-apply-mvp /apply-evidence /validation-results /workflow-results /run-history no auto-apply no auto-run approval required preserve latest-message authority no giant raw JSON above fold advanced details collapsed or visually secondary no unsafe execution buttons" />
      <nav style={linkRow} aria-label="Quality audit handoffs">
        <Link href="/code-flow/live-run" style={primaryHandoffLink}>Fix code</Link>
        <Link href="/files" style={handoffLink}>Pick a file</Link>
        <Link href="/guarded-apply-mvp" style={handoffLink}>Review apply request</Link>
        <Link href="/apply-evidence" style={handoffLink}>Capture apply evidence</Link>
        <Link href="/validation-results" style={handoffLink}>Validate separately</Link>
        <Link href="/workflow-results" style={handoffLink}>Review result</Link>
        <Link href="/run-history" style={handoffLink}>See run history</Link>
      </nav>
      <FullSystemQualityAuditPanel session={initialData} />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
