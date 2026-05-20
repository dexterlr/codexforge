"use client";

import type { SandboxArtifactSimulation } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, codeStyle, pill, safeText, titleStyle } from "./shared";

export function SandboxArtifactSimulationPanel({ simulation }: { simulation: SandboxArtifactSimulation }) {
  return (
    <SandboxPanel marker="SandboxArtifactSimulationPanel renders">
      <h2 style={titleStyle}>Artifact Simulation</h2>
      <p style={{ margin: 0, color: "#cbd5e1", ...safeText }}>{simulation.noFileWritesGuarantee}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 }}>
        {simulation.items.map((item) => (
          <article key={buildCreativeExecutionSandboxReactKey("artifact", item.artifactId)} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 7, minWidth: 0 }}>
            <span style={pill}>{item.type}</span>
            <strong style={safeText}>{item.label}</strong>
            <div style={codeStyle}>{item.fakePathLabel}</div>
            <span style={{ color: "#cbd5e1", ...safeText }}>{item.provenanceNote}</span>
            <span style={{ color: "#99f6e4", fontSize: 12, ...safeText }}>{item.noFileWrittenGuarantee}</span>
          </article>
        ))}
      </div>
      <SandboxList title="Artifact simulation summary" items={simulation.summary} />
    </SandboxPanel>
  );
}
