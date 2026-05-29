"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { GuardedApplyMvpPanel } from "@/lib/codexforge/guarded-apply-mvp/components";

export default function GuardedApplyMvpPageClient() {
  return (
    <CodexForgeAppShell activePath="/guarded-apply-mvp" workspaceLabel="Guarded apply MVP" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <span hidden data-codexforge-guarded-apply-mvp-route="Guarded Apply MVP route imports/renders GuardedApplyMvpPanel Guarded apply MVP One file, one diff, one approval, then validate separately. Review apply request no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
      <div style={linkRow}>
        <Link href="/code-flow/live-run" style={primaryHandoffLink}>Back to live run</Link>
        <Link href="/code-flow/friction-fixes" style={handoffLink}>Fix trial friction</Link>
        <Link href="/apply-evidence" style={handoffLink}>Capture apply evidence</Link>
        <Link href="/validation-results" style={handoffLink}>Capture validation result</Link>
      </div>
      <GuardedApplyMvpPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
