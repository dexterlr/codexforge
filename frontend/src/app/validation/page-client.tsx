"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ValidationRunnerPanel } from "@/lib/codexforge/validation-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ValidationPageClient() {
  return (
    <div
      style={{ minWidth: 0, width: "100%" }}
      data-codexforge-validation-route="Validation route imports and renders ValidationRunnerPanel approval required no arbitrary shell no command execution without approval no file writes preserve latest-message authority"
    >
      <CodexForgeAppShell activePath="/validation" workspaceLabel="Prepare checks" nextActionContext={{ hasRegressionOrFixWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarBadges={false} showSidebarSafetyNotice={false}>
        <span hidden data-codexforge-validation-friendly-copy="Prepare checks choose validation commands simply advanced policy and output routing collapsed Approval required" />
        <div style={linkRow}>
          <Link href="/code-flow" style={wizardLink}>Continue Code Flow: review validation result</Link>
          <Link href="/apply-validation" style={wizardLink}>Apply Validation Hardening: review output routing</Link>
          <Link href="/start" style={wizardLink}>Back to wizard: validation flow</Link>
        </div>
        <span hidden data-codexforge-validation-code-flow="Continue Code Flow Apply Validation Hardening /apply-validation validation plan can use hardened command selection output review can link to apply-validation validation result routing can mention /code-flow or /closed-loop no auto-run" />
        <ValidationRunnerPanel />
      </CodexForgeAppShell>
    </div>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const wizardLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
