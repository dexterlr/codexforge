import type { CSSProperties } from "react";
import { listCodexForgeAgentRuntimeProfiles } from "@/lib/codexforge/agents/runtime";

export function BrainAgentActivityPanel() {
  const profiles = listCodexForgeAgentRuntimeProfiles();
  const primary = profiles.filter((profile) =>
    ["PlannerAgent", "ExecutionAgent"].includes(profile.role)
  );
  const support = profiles.filter((profile) =>
    ["ResearchAgent", "MemoryCuratorAgent", "GraphOptimizerAgent"].includes(profile.role)
  );
  const reviewers = profiles.filter((profile) =>
    ["VerificationAgent", "RefactorAgent", "RiskAnalysisAgent"].includes(profile.role)
  );

  return (
    <section data-codexforge-brain-agent-activity style={panelStyle}>
      <div>
        <div style={eyebrowStyle}>Agent runtime</div>
        <h2 style={titleStyle}>Read-only activity lanes</h2>
      </div>
      <div style={laneGridStyle}>
        <Lane title="Primary lane" profiles={primary} />
        <Lane title="Support lane" profiles={support} />
        <Lane title="Reviewer lane" profiles={reviewers} />
      </div>
      <div style={gateStyle}>
        <strong>Review gates: </strong>
        scope clarity, write scope, approval gate visibility, validation coverage,
        schema drift, graph mutation safety, external access risk.
      </div>
      <div style={safeStyle}>
        Approval-safe positioning: this panel displays registry profiles only and never triggers execution.
      </div>
    </section>
  );
}

function Lane({
  title,
  profiles,
}: {
  title: string;
  profiles: ReturnType<typeof listCodexForgeAgentRuntimeProfiles>;
}) {
  return (
    <div style={laneStyle}>
      <div style={sectionTitleStyle}>{title}</div>
      {profiles.map((profile) => (
        <div key={profile.role} style={agentStyle}>
          <strong>{profile.role}</strong>
          <span style={mutedStyle}>{profile.permission}</span>
          <span style={mutedStyle}>{profile.safeBoundaries[0]}</span>
        </div>
      ))}
    </div>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(15,23,42,0.76)",
};

const laneGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
  gap: 10,
};

const laneStyle: CSSProperties = {
  display: "grid",
  alignContent: "start",
  gap: 8,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const agentStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 9,
  borderRadius: 8,
  background: "rgba(15,23,42,0.72)",
  fontSize: 12,
  lineHeight: 1.4,
};

const gateStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(251,191,36,0.18)",
  background: "rgba(251,191,36,0.08)",
  fontSize: 12,
  lineHeight: 1.5,
};

const safeStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  fontSize: 12,
  lineHeight: 1.5,
};

const mutedStyle: CSSProperties = {
  color: "rgba(226,232,240,0.72)",
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const sectionTitleStyle: CSSProperties = {
  ...eyebrowStyle,
  color: "rgba(226,232,240,0.78)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};
