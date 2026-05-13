"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildRuntimeHealthDashboard,
  buildRuntimeHealthFixtureDashboard,
  summarizeRuntimeSafetyPosture,
  summarizeSmokeCoverage,
  summarizeSubsystemReadiness,
  type CodexForgeRuntimeSmokeCoverageItem,
  type CodexForgeRuntimeSubsystemReadiness,
} from "@/lib/codexforge/brain/runtime";
import { BrainHealthInspector } from "./brain-health-inspector";
import { BrainSubsystemStatusCard } from "./brain-subsystem-status-card";

type BrainSystemStatusPanelProps = {
  graph?: CodexForgeBrainGraph;
};

const PIPELINE = [
  "event-store",
  "graph-reducer",
  "context-assembler",
  "cognitive-memory",
  "predictive-context",
  "agents",
  "recommendations",
  "brain-ui",
] as const;

export function BrainSystemStatusPanel({ graph }: BrainSystemStatusPanelProps) {
  const dashboard = useMemo(() => {
    if (!graph || graph.nodes.length === 0) {
      return buildRuntimeHealthFixtureDashboard();
    }

    return buildRuntimeHealthDashboard({
      generatedAt: graph.meta.updatedAt,
      smokeCoverageDescriptors: [
        { id: "brain-runtime", present: true, coverageLevel: 1, reason: "Brain runtime smoke descriptor supplied." },
        { id: "files-runtime", present: true, coverageLevel: 1, reason: "Files runtime smoke descriptor supplied." },
        { id: "agent-runtime", present: true, coverageLevel: 1, reason: "Agent runtime smoke descriptor supplied." },
        { id: "predictive-context", present: true, coverageLevel: 1, reason: "Predictive context smoke descriptor supplied." },
      ],
    });
  }, [graph]);
  const [selectedSubsystemId, setSelectedSubsystemId] = useState<string | null>(null);
  const [selectedSmokeId, setSelectedSmokeId] = useState<string | null>(null);
  const selectedSubsystem =
    dashboard.subsystemReadiness.find((item) => item.id === selectedSubsystemId) ??
    dashboard.subsystemReadiness[0] ??
    null;
  const selectedSmoke =
    dashboard.smokeCoverage.find((item) => item.id === selectedSmokeId) ?? null;

  return (
    <section data-codexforge-brain-system-status-panel style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Cognitive system status</div>
          <h2 style={titleStyle}>Runtime readiness board</h2>
        </div>
        <span
          data-codexforge-brain-approval-boundary-status
          style={pillStyle}
        >
          approval boundary {dashboard.safetyPosture.status}
        </span>
      </div>

      <div data-codexforge-brain-cognition-pipeline style={pipelineStyle}>
        {PIPELINE.map((item, index) => (
          <div key={item} style={pipelineStepStyle}>
            <strong>{item}</strong>
            <span>{index + 1}</span>
          </div>
        ))}
      </div>

      <div style={layoutStyle}>
        <div style={mainStyle}>
          <section data-codexforge-brain-subsystem-grid style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={eyebrowStyle}>Subsystem readiness</div>
              <span>{summarizeSubsystemReadiness(dashboard.subsystemReadiness)}</span>
            </div>
            <div style={gridStyle}>
              {dashboard.subsystemReadiness.map((subsystem) => (
                <BrainSubsystemStatusCard
                  key={subsystem.id}
                  subsystem={subsystem}
                  onInspect={(item: CodexForgeRuntimeSubsystemReadiness) => {
                    setSelectedSubsystemId(item.id);
                    setSelectedSmokeId(null);
                  }}
                />
              ))}
            </div>
          </section>

          <section data-codexforge-brain-smoke-coverage style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={eyebrowStyle}>Smoke coverage map</div>
              <span>{summarizeSmokeCoverage(dashboard.smokeCoverage)}</span>
            </div>
            <div style={smokeGridStyle}>
              {dashboard.smokeCoverage.slice(0, 10).map((smoke) => (
                <button
                  key={smoke.id}
                  type="button"
                  onClick={() => {
                    setSelectedSmokeId(smoke.id);
                    setSelectedSubsystemId(null);
                  }}
                  style={smokeStyle}
                >
                  <strong>{smoke.label}</strong>
                  <span>{(smoke.coverageLevel * 100).toFixed(0)} percent</span>
                  <span>{smoke.status}</span>
                </button>
              ))}
            </div>
          </section>

          <section data-codexforge-brain-safety-posture style={safetyStyle}>
            <div style={eyebrowStyle}>Safety posture</div>
            <strong>{summarizeRuntimeSafetyPosture(dashboard.safetyPosture)}</strong>
            <span>{dashboard.safetyPosture.summary}</span>
          </section>
        </div>

        <BrainHealthInspector
          subsystem={selectedSmoke ? null : selectedSubsystem}
          smoke={selectedSmoke}
          safety={dashboard.safetyPosture}
        />
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "radial-gradient(circle at 22% 0%, rgba(20,184,166,0.18), transparent 34%), rgba(15,23,42,0.86)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const pipelineStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))",
  gap: 8,
};

const pipelineStepStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.16)",
  background: "rgba(14,165,233,0.08)",
  fontSize: 11,
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(270px, 0.35fr)",
  gap: 12,
  alignItems: "start",
};

const mainStyle: CSSProperties = {
  display: "grid",
  gap: 12,
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const sectionHeaderStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  color: "rgba(226,232,240,0.76)",
  fontSize: 11,
  lineHeight: 1.4,
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 8,
};

const smokeGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
  gap: 8,
};

const smokeStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "inherit",
  textAlign: "left",
  cursor: "pointer",
  fontSize: 11,
  lineHeight: 1.4,
};

const safetyStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(251,191,36,0.18)",
  background: "rgba(251,191,36,0.08)",
  color: "rgba(254,243,199,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(251,191,36,0.12)",
  color: "rgba(254,243,199,0.94)",
  fontSize: 10,
  fontWeight: 900,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};
