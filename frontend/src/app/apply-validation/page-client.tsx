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
      <span hidden data-codexforge-apply-validation-route="Apply Validation route imports/renders ApplyValidationHardeningPanel Apply safely validate no auto-apply no auto-run approval required rollback preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <div style={linkRow}>
        <Link href="/workflow-results" style={handoffLink}>Workflow Results: copy reviewed validation handoff</Link>
        <Link href="/run-history" style={handoffLink}>Run History: timeline and next action</Link>
      </div>
      <span hidden data-codexforge-apply-validation-workflow-results="validation output review can create/copy workflow result handoff completion panel can link to /workflow-results completion panel can link to /run-history no auto-run no auto-persistence Workflow Results Run History" />
      <ApplyValidationHardeningPanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
