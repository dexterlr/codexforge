import type { CSSProperties } from "react";
import type { ProjectFileRiskReport } from "../local-project-reader-types";
import { buildLocalProjectReaderStableKey } from "../local-project-reader-types";

export function ProjectFileRiskPanel({ report }: { report: ProjectFileRiskReport | null }) {
  return (
    <section
      data-codexforge-project-file-risk-panel="ProjectFileRiskPanel renders deterministic risk report apply-diff write-file run-command graph/runtime"
      style={panel}
    >
      <div style={header}>
        <div style={eyebrow}>Risk</div>
        {report ? <span style={level(report.level)}>{report.level}</span> : null}
      </div>
      {report ? (
        <>
          <p style={body}>{report.summary}</p>
          <div style={factorList}>
            {report.factors.length ? (
              report.factors.map((factor, index) => (
                <div key={buildLocalProjectReaderStableKey("risk", report.path, factor.id, index)} style={factorCard}>
                  <strong>{factor.label}</strong>
                  <span>
                    {factor.level} - {factor.points} points
                  </span>
                </div>
              ))
            ) : (
              <div style={factorCard}>No elevated deterministic risk factors.</div>
            )}
          </div>
          <p style={body}>{report.safeHandling}</p>
        </>
      ) : (
        <p style={body}>Select a file to classify risk.</p>
      )}
    </section>
  );
}

function level(value: ProjectFileRiskReport["level"]): CSSProperties {
  const color =
    value === "blocked" || value === "critical"
      ? "#fecaca"
      : value === "high"
        ? "#fed7aa"
        : value === "medium"
          ? "#fde68a"
          : "#bbf7d0";
  return {
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: 8,
    color,
    fontSize: 11,
    fontWeight: 900,
    padding: "5px 7px",
    textTransform: "uppercase",
  };
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.68)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 9,
  minWidth: 0,
};

const header: CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const body: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const factorList: CSSProperties = {
  display: "grid",
  gap: 7,
};

const factorCard: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(2,6,23,0.42)",
  borderRadius: 8,
  color: "#e2e8f0",
  display: "grid",
  fontSize: 12,
  gap: 4,
  lineHeight: 1.35,
  padding: 9,
  overflowWrap: "anywhere",
};

