"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { GuardedApplyMvpPanel } from "@/lib/codexforge/guarded-apply-mvp/components";

export default function GuardedApplyMvpPageClient() {
  return (
    <CodexForgeAppShell activePath="/guarded-apply-mvp" workspaceLabel="Guarded apply MVP" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <span hidden data-codexforge-guarded-apply-mvp-route="Guarded Apply MVP route imports/renders GuardedApplyMvpPanel Guarded apply MVP One file, one diff, one approval, then validate separately. Guarded Apply MVP Hardening /guarded-apply-mvp/hardening blocked reasons approval messaging rollback checklist no fake apply success Review apply request no auto-apply no auto-run approval required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
      <div style={linkRow}>
        <Link href="/apply-evidence" style={primaryHandoffLink}>Next: capture evidence</Link>
        <Link href="/guarded-apply-mvp/hardening" style={handoffLink}>Hardening notes</Link>
        <Link href="/validation-results" style={handoffLink}>Validate separately</Link>
        <Link href="/code-flow/live-run" style={handoffLink}>Live run</Link>
      </div>
      <GuardedApplyMvpPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
