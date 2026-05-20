"use client";

import type { SandboxVerificationReport } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function SandboxVerificationPanel({ report }: { report: SandboxVerificationReport }) {
  return (
    <SandboxPanel marker="SandboxVerificationPanel renders">
      <h2 style={titleStyle}>Verification</h2>
      <span style={pill}>{report.posture}</span>
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {report.checks.map((check) => (
          <article key={buildCreativeExecutionSandboxReactKey("verification", check.checkId)} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 }}>
            <strong style={safeText}>{check.label}</strong>
            <span style={pill}>{check.status}</span>
            <span style={{ color: "#cbd5e1", ...safeText }}>{check.detail}</span>
          </article>
        ))}
      </div>
      <SandboxList title="Verification summary" items={report.summary} />
    </SandboxPanel>
  );
}
