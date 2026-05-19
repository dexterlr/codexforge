"use client";

import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { buildConsolidationSummary, type ConsolidationSummary } from "../index";
import { CockpitConsolidationPanel } from "./CockpitConsolidationPanel";
import { ConsolidationEmptyState } from "./ConsolidationEmptyState";
import { ConsolidationPlanPanel } from "./ConsolidationPlanPanel";
import { ConsolidationSafetyNotice } from "./ConsolidationSafetyNotice";
import { button, grid, item, muted, panel, pill, safeText, title } from "./ConsolidationStyles";
import { RouteConsolidationPanel } from "./RouteConsolidationPanel";
import { SharedNextActionPanel } from "./SharedNextActionPanel";
import { SharedReadinessPanel } from "./SharedReadinessPanel";
import { SurfaceMapPanel } from "./SurfaceMapPanel";
import { WorkflowEntrypointsPanel } from "./WorkflowEntrypointsPanel";

type ConsolidationOverviewProps = {
  summary?: ConsolidationSummary;
};

export function ConsolidationOverview({ summary: providedSummary }: ConsolidationOverviewProps) {
  const summary = useMemo(() => providedSummary ?? buildConsolidationSummary(), [providedSummary]);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard
      ?.writeText(text)
      .then(() => setCopiedLabel(label))
      .catch(() => setCopiedLabel(null));
  }

  const planText = summary.consolidationPlan.items
    .map((planItem) => `${planItem.priority}. ${planItem.title}: ${planItem.detail}`)
    .join("\n");
  const phase56Prompt = "Proceed to Phase 56 Real Local Project Reader. Build read-only local project discovery, stable project tree, file preview, selected file context handoff, and safety copy. Do not execute commands from UI, do not write files without approval, do not mutate Brain graph, do not call appendEvent from UI, do not call saveBrainGraph from UI, preserve latest-message authority, and keep validation manual.";

  if (summary.surfaceMap.items.length === 0) return <ConsolidationEmptyState />;

  return (
    <CodexForgeAppShell activePath="/consolidation" workspaceLabel="Consolidation Pass" nextActionContext={{ activeHref: "/consolidation", cleanCheckpointRecommended: summary.deepRouteCount === 0 }}>
      <div style={{ display: "grid", gap: 16, ...safeText }} data-codexforge-consolidation-overview="ConsolidationOverview renders premium dark operator cockpit read-only no command execution no file writes without approval no graph mutation preserve latest-message authority stable keys no raw JSON in main UI">
        <section style={{ ...panel, background: "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(20,184,166,0.16), rgba(3,7,18,0.92))" }}>
          <span style={pill}>Phase 55 Consolidation Pass</span>
          <h1 style={{ ...title, fontSize: 30 }}>Consolidation</h1>
          <p style={muted}>Read-only route and cockpit consolidation model for clearer operation, fewer overlapping dashboards, and Phase 56 Real Local Project Reader readiness.</p>
          <div style={grid}>
            <article style={item}><strong>{summary.primaryRouteCount}</strong><span style={muted}>primary routes</span></article>
            <article style={item}><strong>{summary.secondaryRouteCount}</strong><span style={muted}>secondary routes</span></article>
            <article style={item}><strong>{summary.deepRouteCount}</strong><span style={muted}>deep governance routes</span></article>
            <article style={item}><strong>{summary.workflowEntrypointCount}</strong><span style={muted}>workflow entrypoints</span></article>
          </div>
          <p style={muted}>{summary.summary.join(" ")}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 }}>
            <button type="button" style={button} onClick={() => copyText("consolidation summary", summary.summary.join("\n"))}>Copy consolidation summary</button>
            <button type="button" style={button} onClick={() => copyText("Phase 56 handoff", phase56Prompt)}>Copy Phase 56 file reader prompt</button>
            {copiedLabel ? <span style={muted}>Copied {copiedLabel}</span> : null}
          </div>
        </section>

        <ConsolidationSafetyNotice safetyCopy={summary.safetyCopy} />
        <SurfaceMapPanel surfaceMap={summary.surfaceMap} />
        <RouteConsolidationPanel routePlan={summary.routePlan} />
        <CockpitConsolidationPanel audit={summary.cockpitAudit} />
        <SharedReadinessPanel model={summary.readinessModel} />
        <SharedNextActionPanel model={summary.nextActionModel} onCopyPrompt={(prompt) => copyText("next action prompt", prompt)} />
        <WorkflowEntrypointsPanel workflows={summary.workflowEntrypoints} />
        <ConsolidationPlanPanel plan={summary.consolidationPlan} onCopyPlan={() => copyText("consolidation plan", planText)} onCopyPhase56={() => copyText("Phase 56 handoff", phase56Prompt)} />
      </div>
    </CodexForgeAppShell>
  );
}
