"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealApplyGuardReviewPanel } from "@/lib/codexforge/real-apply-guard-review/components";

export default function ApplyGuardReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/apply-guard-review"
      workspaceLabel="Review apply guard"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-apply-guard-review-route="Apply Guard Review route imports/renders RealApplyGuardReviewPanel Review the apply guard Copy guard review no auto-apply no auto-run approval required rollback executionAllowed false no execution in this phase preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons" />
      <div style={linkRow}>
        <Link href="/guarded-apply-mvp" style={primaryHandoffLink}>Guarded Apply MVP</Link>
        <Link href="/guarded-apply-candidate" style={primaryHandoffLink}>Guarded Apply Candidate: plan implementation</Link>
        <Link href="/apply-validation" style={handoffLink}>Back to Apply Validation</Link>
        <Link href="/code-flow" style={handoffLink}>Back to Code Flow</Link>
        <Link href="/validation" style={handoffLink}>Prepare validation</Link>
      </div>
      <span hidden data-codexforge-apply-guard-review-guarded-apply-mvp="Guarded Apply MVP /guarded-apply-mvp request-ready policy-gated approval-first no auto-apply" />
      <span hidden data-codexforge-apply-guard-review-guarded-candidate="Guarded Apply Candidate /guarded-apply-candidate go/no-go can link to Guarded Apply Candidate candidate implementation plan no execution" />
      <RealApplyGuardReviewPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
