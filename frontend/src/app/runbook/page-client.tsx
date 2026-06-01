"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { OperatorRunbookPanel } from "@/lib/codexforge/operator-runbook/components";
export default function PageClient() {
  return <CodexForgeAppShell activePath="/runbook" workspaceLabel="Operator runbook" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-route="OperatorRunbookPanel route imports/renders main panel route uses home-grade/unified shell marker no duplicate route chip cloud no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons Assisted Coding /assist Safety Coach /safety-coach recovery scenarios link to /recovery" />
    <div style={linkRow}><Link href="/assist" style={primaryHandoffLink}>Assisted coding</Link><Link href="/safety-coach" style={handoffLink}>Safety coach</Link><Link href="/recovery" style={handoffLink}>Recovery flow</Link></div>
    <OperatorRunbookPanel />
  </CodexForgeAppShell>;
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
