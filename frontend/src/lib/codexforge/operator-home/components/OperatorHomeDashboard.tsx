"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  GuardedVideoPipelineRail,
  MainPagesGodTierUxStatusRail,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildOperatorHomeSummary,
  type OperatorHomeSummary,
} from "../index";
import { OperatorHomeHero } from "./OperatorHomeHero";
import { OperatorHomeLaunchGrid } from "./OperatorHomeLaunchGrid";
import { OperatorHomeNextActionPanel } from "./OperatorHomeNextActionPanel";
import { OperatorHomeRecentWorkflowPanel } from "./OperatorHomeRecentWorkflowPanel";
import { OperatorHomeSafetyPanel } from "./OperatorHomeSafetyPanel";
import { OperatorHomeStatusStrip } from "./OperatorHomeStatusStrip";
import { OperatorHomeSystemMap } from "./OperatorHomeSystemMap";
import { OperatorHomeValidationPanel } from "./OperatorHomeValidationPanel";

type OperatorHomeDashboardProps = {
  summary?: OperatorHomeSummary;
};

export function OperatorHomeDashboard({ summary: providedSummary }: OperatorHomeDashboardProps) {
  const summary = useMemo(
    () => providedSummary ?? buildOperatorHomeSummary(),
    [providedSummary]
  );
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard
      ?.writeText(text)
      .then(() => setCopiedLabel(label))
      .catch(() => setCopiedLabel(null));
  }

  return (
    <CodexForgeAppShell
      activePath="/"
      workspaceLabel="Operator Home Dashboard"
      nextActionContext={{ wantsOperatorOverview: true }}
    >
      <div
        style={contentShell}
        data-codexforge-operator-home-dashboard="OperatorHomeDashboard renders CodexForgeAppShell Command Palette local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority Main Pages God Tier UX Upgrade operator-grade navigation"
      >
        <OperatorHomeHero
          surface={summary.surface}
          sessionSummary={summary.sessionSummary}
          nextAction={summary.nextActionPlan.selected}
          copiedLabel={copiedLabel}
        />

        <OperatorHomeStatusStrip health={summary.health} />
        <MainPagesGodTierUxStatusRail title="Operator-grade navigation and execution boundaries" tone="home" />
        <GuardedVideoPipelineRail compact />

        <div style={layout}>
          <div style={mainColumn}>
            <OperatorHomeLaunchGrid launcher={summary.launcher} />
            <OperatorHomeSystemMap launcher={summary.launcher} />
          </div>
          <aside style={sideColumn}>
            <OperatorHomeNextActionPanel
              plan={summary.nextActionPlan}
              onCopyPrompt={(prompt) => copyText("next prompt", prompt)}
            />
            <OperatorHomeSafetyPanel surface={summary.surface} />
            <OperatorHomeRecentWorkflowPanel
              surface={summary.surface}
              routes={summary.routes}
              nextActionPlan={summary.nextActionPlan}
            />
            <OperatorHomeValidationPanel
              plan={summary.nextActionPlan}
              onCopyValidationChecklist={(checklist) =>
                copyText("validation checklist", checklist)
              }
            />
          </aside>
        </div>
      </div>
    </CodexForgeAppShell>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const contentShell: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
  width: "100%",
  ...safeText,
};

const layout: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  minWidth: 0,
  width: "100%",
};

const mainColumn: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
};

const sideColumn: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
};
