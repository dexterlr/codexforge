"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
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
    <main
      style={page}
      data-codexforge-operator-home-dashboard="OperatorHomeDashboard renders local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority"
    >
      <div style={shell}>
        <CodexForgeGlobalNav compact />

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
    </main>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const page: CSSProperties = {
  minHeight: "100vh",
  color: "#f8fafc",
  background:
    "radial-gradient(760px 460px at 10% 5%, rgba(20,184,166,0.17), transparent 58%)," +
    "radial-gradient(860px 520px at 82% 10%, rgba(99,102,241,0.16), transparent 58%)," +
    "radial-gradient(720px 440px at 54% 92%, rgba(14,165,233,0.12), transparent 60%)," +
    "linear-gradient(180deg, #02040a 0%, #050814 100%)",
  padding: "18px min(4vw, 44px) 30px",
  fontFamily:
    "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
  ...safeText,
};

const shell: CSSProperties = {
  display: "grid",
  gap: 16,
  margin: "0 auto",
  maxWidth: 1680,
  minWidth: 0,
  width: "100%",
};

const layout: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
  minWidth: 0,
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
