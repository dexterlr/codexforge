"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { GuardedApplyCandidatePlan } from "@/lib/codexforge/guarded-apply-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedApplyCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-apply-candidate"
      workspaceLabel="Guarded apply candidate"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-guarded-apply-candidate-route="Guarded Apply Candidate route imports/renders GuardedApplyCandidatePlan Plan the first guarded apply path Copy candidate plan one file one diff one approval no auto-apply no auto-run execution allowed false no execution in this phase preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
      <div style={linkRow}>
        <Link href="/guarded-apply-mvp" style={primaryHandoffLink}>Guarded Apply MVP</Link>
        <Link href="/apply-guard-review" style={primaryHandoffLink}>Back to Apply Guard Review</Link>
        <Link href="/apply-validation" style={handoffLink}>Review Apply Validation</Link>
        <Link href="/code-flow" style={handoffLink}>Back to Code Flow</Link>
        <Link href="/validation" style={handoffLink}>Separate validation contract</Link>
      </div>
      <span hidden data-codexforge-guarded-apply-mvp-integration="Guarded Apply MVP /guarded-apply-mvp one file one diff one approval evidence capture validation handoff" />
      <GuardedApplyCandidatePlan />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
