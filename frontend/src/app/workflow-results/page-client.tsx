"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { WorkflowResultPersistencePanel } from "@/lib/codexforge/workflow-result-persistence/components";

export default function WorkflowResultsPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/workflow-results"
      workspaceLabel="Review workflow results"
      nextActionContext={{ hasRegressionOrFixWork: true, hasFileWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <span hidden data-codexforge-workflow-results-route="Workflow Results route imports/renders WorkflowResultPersistencePanel Review workflow results Capture what happened route failures prepare a clean handoff no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority Focus Mode UX calm workflow layout markers shell without duplicate route chip cloud route hero title does not vertically wrap" />
      <div style={linkRow}>
        <Link href="/run-history" style={handoffLink}>Run History: review recent runs and copy handoffs</Link>
      </div>
      <span hidden data-codexforge-workflow-results-run-history="Workflow Results references Run History /run-history export and handoff can mention run history no auto-persistence" />
      <WorkflowResultPersistencePanel />
    </CodexForgeAppShell>
  );
}

const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 };
const handoffLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", display: "inline-flex", fontSize: 12, fontWeight: 900, padding: "8px 10px", textDecoration: "none" };
