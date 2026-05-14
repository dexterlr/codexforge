"use client";

import type { CSSProperties } from "react";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { MissionControlSummary } from "../mission-control-types";
import { MissionActivityTimeline } from "./MissionActivityTimeline";
import { MissionHealthBoard } from "./MissionHealthBoard";
import { MissionHero } from "./MissionHero";
import { MissionLaunchPad } from "./MissionLaunchPad";
import { MissionNextActions } from "./MissionNextActions";
import { MissionReadinessBoard } from "./MissionReadinessBoard";
import { MissionSafetyBoundary } from "./MissionSafetyBoundary";
import { MissionSurfaceGrid } from "./MissionSurfaceGrid";
import { MissionSystemMap } from "./MissionSystemMap";

export function MissionControlDashboard({ summary }: { summary: MissionControlSummary }) {
  return (
    <main
      style={page}
      data-codexforge-mission-control-ui="MissionControlDashboard renders approval gated approval required no silent desktop control broker execution blocked"
    >
      <div style={shell}>
        <CodexForgeGlobalNav compact />
        <MissionHero summary={summary} />
        <div style={layout}>
          <div style={mainColumn}>
            <MissionSystemMap map={summary.systemMap} />
            <MissionHealthBoard report={summary.health} />
            <MissionSurfaceGrid registry={summary.registry} />
            <MissionReadinessBoard readiness={summary.readiness} />
          </div>
          <aside style={sideColumn}>
            <MissionNextActions actions={summary.nextActions} />
            <MissionLaunchPad registry={summary.registry} />
            <MissionActivityTimeline timeline={summary.activity} />
            <MissionSafetyBoundary boundary={summary.safety} />
          </aside>
        </div>
      </div>
    </main>
  );
}

const page: CSSProperties = {
  minHeight: "100vh",
  color: "#f8fafc",
  background:
    "radial-gradient(900px 520px at 12% 8%, rgba(20,184,166,0.18), transparent 58%)," +
    "radial-gradient(760px 460px at 88% 18%, rgba(99,102,241,0.18), transparent 58%)," +
    "linear-gradient(180deg, #02040a 0%, #050814 100%)",
  padding: "18px min(4vw, 44px) 30px",
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const shell: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gap: 16, minWidth: 0 };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 450px), 0.65fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
