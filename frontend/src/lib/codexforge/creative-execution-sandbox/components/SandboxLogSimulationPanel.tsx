"use client";

import type { SandboxLogSimulation } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, codeStyle, pill, safeText, titleStyle } from "./shared";

export function SandboxLogSimulationPanel({ simulation }: { simulation: SandboxLogSimulation }) {
  return (
    <SandboxPanel marker="SandboxLogSimulationPanel renders">
      <h2 style={titleStyle}>Log Simulation</h2>
      <span style={pill}>simulated true</span>
      <div style={{ ...codeStyle, maxHeight: 260, overflowY: "auto" }}>
        {simulation.lines.map((line) => (
          <span key={buildCreativeExecutionSandboxReactKey("log", line.lineId, line.order)} style={safeText}>
            {line.order}. [{line.level}] {line.source}: {line.message} ({line.reviewNote})
          </span>
        ))}
      </div>
      <SandboxList title="Log simulation summary" items={simulation.summary} />
    </SandboxPanel>
  );
}
