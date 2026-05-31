"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RealManualMvpTrialPanel } from "@/lib/codexforge/real-manual-mvp-trial/components";

export default function RealManualMvpTrialPanelPageClient() {
  return <CodexForgeAppShell activePath="/code-flow/real-trial" workspaceLabel="Run the real coding MVP trial" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-route="RealManualMvpTrialPanel route imports/renders main panel Run the real coding MVP trial Start real trial Copy trial checklist Copy validation commands Copy trial report no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildManualMvpTrialStableKey" />
    <div style={linkRow}><Link href="/code-flow/live-run" style={primaryHandoffLink}>Back to live run</Link><Link href="/validation-results" style={handoffLink}>Validation stays separate</Link><Link href="/run-history" style={handoffLink}>Run history</Link></div>
    <RealManualMvpTrialPanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
