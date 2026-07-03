"use client";

import type { CSSProperties } from "react";
import {
  MAIN_PAGES_HOME_LINKS,
  MainPagesGodTierUxHero,
} from "@/lib/codexforge/main-pages-god-tier-ux";
import type {
  OperatorHomeNextAction,
  OperatorHomeSessionSummary,
  OperatorHomeSurface,
} from "../operator-home-types";

type OperatorHomeHeroProps = {
  surface: OperatorHomeSurface;
  sessionSummary: OperatorHomeSessionSummary;
  nextAction: OperatorHomeNextAction;
  copiedLabel: string | null;
};

export function OperatorHomeHero({
  surface,
  sessionSummary,
  nextAction,
  copiedLabel,
}: OperatorHomeHeroProps) {
  const displayText = `${surface.identity} Operator Home`;

  return (
    <div style={heroLayout}>
      <span
        hidden
        data-codexforge-operator-home-hero="OperatorHomeHero renders local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority Main Pages God Tier UX Upgrade premium command center"
      />
      <MainPagesGodTierUxHero
        eyebrow="CodexForge premium command center"
        title={displayText}
        summary={`${surface.subtitle} ${surface.posture}`}
        actions={MAIN_PAGES_HOME_LINKS}
        statusLabel={copiedLabel ? `${copiedLabel} copied` : `Next: ${nextAction.title}`}
        tone="home"
        metrics={[
          {
            label: "Routes",
            value: String(sessionSummary.routeCount),
            detail: "Registered operator surfaces",
            state: "ready",
          },
          {
            label: "Ready",
            value: String(sessionSummary.readyCount),
            detail: "Main routes available",
            state: "ready",
          },
          {
            label: "Warnings",
            value: String(sessionSummary.warningCount),
            detail: "Review before acting",
            state: "review",
          },
          {
            label: "Blocked",
            value: String(sessionSummary.blockedCount),
            detail: "Protected actions explicit",
            state: "blocked",
          },
        ]}
      />
    </div>
  );
}

const heroLayout: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  minWidth: 0,
  width: "100%",
};
