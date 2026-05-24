"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ApplyValidationHardeningPanel } from "@/lib/codexforge/apply-validation-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApplyValidationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/apply-validation"
      workspaceLabel="Apply safely"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-apply-validation-route="Apply Validation route imports/renders ApplyValidationHardeningPanel Review apply Prepare validation checklist apply blocked because preview approval or rollback is missing Apply Guard Review /apply-guard-review can audit policy rollback approval diff path command write separation Copy these checks Run them in your terminal Paste the output back no auto-apply no auto-run approval required rollback preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <div style={linkRow}>
        <Link href="/guarded-apply-candidate" style={primaryHandoffLink}>Guarded Apply Candidate</Link>
        <Link href="/apply-guard-review" style={primaryHandoffLink}>Apply Guard Review</Link>
        <Link href="/validation" style={primaryHandoffLink}>Prepare validation checklist</Link>
        <Link href="/workflow-results" style={handoffLink}>Next: capture result</Link>
        <Link href="/code-flow" style={handoffLink}>Back to Code Flow</Link>
      </div>
      <span hidden data-codexforge-apply-validation-guarded-candidate="Apply policy section can link to Guarded Apply Candidate /guarded-apply-candidate no auto-apply no auto-run" />
      <span hidden data-codexforge-apply-validation-workflow-results="Coding Trial validation guide can link back to live trial validation output review can create/copy workflow result handoff completion panel can link to /workflow-results completion panel can link to /run-history no auto-run no auto-persistence Workflow Results Run History" />
      <ApplyValidationHardeningPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
