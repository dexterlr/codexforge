"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
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
        data-codexforge-operator-home-dashboard="OperatorHomeDashboard renders CodexForgeAppShell Command Palette local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority"
      >
        <OperatorHomeHero
          surface={summary.surface}
          sessionSummary={summary.sessionSummary}
          nextAction={summary.nextActionPlan.selected}
          copiedLabel={copiedLabel}
        />

        <OperatorHomeStatusStrip health={summary.health} />

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
  gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 420px)",
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
