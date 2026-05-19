"use client";

import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { buildProductReadinessSummary, type ProductReadinessSummary } from "../index";
import { FunctionalWorkflowPanel } from "./FunctionalWorkflowPanel";
import { ModuleConsolidationPanel } from "./ModuleConsolidationPanel";
import { ProductReadinessEmptyState } from "./ProductReadinessEmptyState";
import { ProductReadinessSafetyNotice } from "./ProductReadinessSafetyNotice";
import { ReadinessNextActionsPanel } from "./ReadinessNextActionsPanel";
import { ReadinessScorecardPanel } from "./ReadinessScorecardPanel";
import { RouteReadinessPanel } from "./RouteReadinessPanel";
import { SafetyPostureAuditPanel } from "./SafetyPostureAuditPanel";
import { SmokeCoveragePanel } from "./SmokeCoveragePanel";
import { UxConsistencyPanel } from "./UxConsistencyPanel";
import { button, grid, item, muted, panel, pill, safeText, title, toneColor } from "./ProductReadinessStyles";

type ProductReadinessAuditProps = {
  summary?: ProductReadinessSummary;
};

export function ProductReadinessAudit({ summary: providedSummary }: ProductReadinessAuditProps) {
  const summary = useMemo(() => providedSummary ?? buildProductReadinessSummary(), [providedSummary]);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard
      ?.writeText(text)
      .then(() => setCopiedLabel(label))
      .catch(() => setCopiedLabel(null));
  }

  const readinessSummary = summary.summary.join("\n");
  const consolidationPrompt = "Review Product Readiness Audit consolidation recommendations. Consolidate dashboards, reduce duplicate panels, unify route registry logic, centralize copy-payload logic, and prioritize real workflow before abstract features. Keep this read-only; do not run commands, write files, mutate Brain graph, promote memory, apply diffs, restore snapshots, or auto-persist.";
  const validationChecklist = [
    "npm run build",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-product-readiness-audit.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-continuity-handoff.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-continuity.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1",
    "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-command-palette.ps1",
    "npm run smoke:codexforge:server",
    "git diff --check",
  ].join("\n");

  if (summary.routeCount === 0) return <ProductReadinessEmptyState />;

  return (
    <CodexForgeAppShell activePath="/readiness" workspaceLabel="Product Readiness Audit" nextActionContext={{ activeHref: "/readiness", cleanCheckpointRecommended: summary.safetyBlockerCount === 0 }}>
      <div style={{ display: "grid", gap: 16, ...safeText }} data-codexforge-product-readiness-audit="ProductReadinessAudit renders Product Readiness Audit read-only no command execution no file writes without approval no graph mutation no apply buttons preserve latest-message authority copy-only stable keys no raw JSON in main UI">
        <section style={{ ...panel, background: "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(20,83,45,0.22), rgba(3,7,18,0.9))" }}>
          <span style={pill}>Phase 54</span>
          <h1 style={{ ...title, fontSize: 30 }}>Product Readiness Audit</h1>
          <p style={muted}>Route audit, smoke audit, safety audit, UX consistency audit, duplicate/dead-module audit, consolidation recommendations, and next functional workflow plan.</p>
          <div style={grid}>
            <article style={item}><strong style={{ color: toneColor(summary.overallReadiness) }}>{summary.overallReadiness}</strong><span style={muted}>overall readiness</span></article>
            <article style={item}><strong>{summary.routeCount}</strong><span style={muted}>routes audited</span></article>
            <article style={item}><strong>{summary.smokeCoverageCount}</strong><span style={muted}>smoke targets covered</span></article>
            <article style={item}><strong>{summary.duplicateConsolidationCount}</strong><span style={muted}>consolidation candidates</span></article>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 }}>
            <button type="button" style={button} onClick={() => copyText("readiness summary", readinessSummary)}>Copy readiness summary</button>
            <button type="button" style={button} onClick={() => copyText("consolidation prompt", consolidationPrompt)}>Copy consolidation prompt</button>
            <button type="button" style={button} onClick={() => copyText("validation checklist", validationChecklist)}>Copy validation checklist</button>
            {copiedLabel ? <span style={muted}>Copied {copiedLabel}</span> : null}
          </div>
        </section>

        <ProductReadinessSafetyNotice />
        <ReadinessScorecardPanel scorecard={summary.scorecard} />
        <RouteReadinessPanel audit={summary.routeAudit} />
        <SmokeCoveragePanel audit={summary.smokeAudit} />
        <SafetyPostureAuditPanel audit={summary.safetyAudit} />
        <UxConsistencyPanel audit={summary.uxAudit} />
        <ModuleConsolidationPanel audit={summary.moduleAudit} />
        <FunctionalWorkflowPanel audit={summary.workflowAudit} />
        <ReadinessNextActionsPanel plan={summary.nextActions} onCopyPrompt={(prompt) => copyText("next action prompt", prompt)} />
      </div>
    </CodexForgeAppShell>
  );
}
