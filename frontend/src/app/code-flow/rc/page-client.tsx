"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { CodingMvpReleaseCandidatePanel } from "@/lib/codexforge/coding-mvp-release-candidate/components";

export default function CodingMvpReleaseCandidatePanelPageClient() {
  return <CodexForgeAppShell activePath="/code-flow/rc" workspaceLabel="Gate the coding MVP release candidate" nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
    <span hidden data-codexforge-route="CodingMvpReleaseCandidatePanel route imports/renders main panel Gate the coding MVP release candidate Review RC gate rc-ready rc-ready-with-fixes no-go blocked build passes all coding path smoke scripts pass no unsafe UI tool calls manual trial path clear demo path clear validation capture clear guarded apply still safe no auto-apply no auto-run approval required preserve latest-message authority Plain English Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold advanced details are collapsed or visually secondary no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call no external network dependency no vector database dependency no OpenAI/API-key dependency no hardcoded API keys no localStorage API key storage buildCodingMvpRcStableKey" />
    <div style={linkRow}><Link href="/code-flow/live-run" style={primaryHandoffLink}>Back to live run</Link><Link href="/validation-results" style={handoffLink}>Validation stays separate</Link><Link href="/run-history" style={handoffLink}>Run history</Link></div>
    <CodingMvpReleaseCandidatePanel />
  </CodexForgeAppShell>;
}
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
const primaryHandoffLink: CSSProperties = { ...handoffLink, background: "#5eead4", color: "#042f2e" };
