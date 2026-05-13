import type { CSSProperties } from "react";
import type { CodexForgeRuntimeRecommendation } from "@/lib/codexforge/brain/runtime";
import { buildStableReactKey } from "./brain-react-key";

type BrainRecommendationCardProps = {
  recommendation: CodexForgeRuntimeRecommendation;
  onInspect?: (recommendation: CodexForgeRuntimeRecommendation) => void;
};

export function BrainRecommendationCard({
  recommendation,
  onInspect,
}: BrainRecommendationCardProps) {
  return (
    <article
      data-codexforge-brain-recommendation-card
      data-codexforge-brain-recommendation-severity={recommendation.severity}
      style={cardStyle}
    >
      <div style={headerStyle}>
        <div style={{ display: "grid", gap: 5, minWidth: 0 }}>
          <div style={metaStyle}>
            <span style={severityStyle(recommendation.severity)}>{recommendation.severity}</span>
            <span>{recommendation.kind}</span>
          </div>
          <h3 style={titleStyle}>{recommendation.title}</h3>
        </div>
        <div style={scoreStyle}>
          {(recommendation.score * 100).toFixed(0)}
          <span style={scoreLabelStyle}>score</span>
        </div>
      </div>

      <p style={copyStyle}>{recommendation.summary}</p>

      <div style={metricGridStyle}>
        <Metric label="Confidence" value={recommendation.confidence.toFixed(2)} />
        <Metric label="Status" value={recommendation.status} />
        <Metric label="Evidence" value={String(recommendation.evidence.length)} />
      </div>

      <div data-codexforge-brain-recommendation-evidence style={evidenceStyle}>
        {recommendation.evidence.slice(0, 3).map((item, index) => (
          <div
            key={buildStableReactKey("recommendation-evidence", [recommendation.id, item.id], index)}
            data-codexforge-brain-no-duplicate-key-risk
            style={evidenceRowStyle}
          >
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
          </div>
        ))}
      </div>

      <div
        data-codexforge-brain-recommendation-action
        style={actionStyle}
      >
        <strong>{recommendation.nextSafeAction.label}</strong>
        <span>{recommendation.nextSafeAction.description}</span>
        <span style={pillStyle}>
          {recommendation.nextSafeAction.readOnly ? "read-only" : "approval required"}
        </span>
      </div>

      {onInspect ? (
        <button
          type="button"
          onClick={() => onInspect(recommendation)}
          style={buttonStyle}
        >
          Inspect
        </button>
      ) : null}
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function severityStyle(severity: string): CSSProperties {
  const color =
    severity === "critical"
      ? "rgba(248,113,113,0.95)"
      : severity === "high"
        ? "rgba(251,146,60,0.95)"
        : severity === "medium"
          ? "rgba(250,204,21,0.95)"
          : "rgba(125,211,252,0.94)";
  return {
    color,
    fontWeight: 900,
  };
}

const cardStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(2,6,23,0.44)",
  minWidth: 0,
  overflowWrap: "normal",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "start",
  minWidth: 0,
};

const metaStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  color: "rgba(226,232,240,0.68)",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  overflowWrap: "normal",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.25,
  overflowWrap: "normal",
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.74)",
  fontSize: 12,
  lineHeight: 1.5,
  overflowWrap: "normal",
};

const scoreStyle: CSSProperties = {
  display: "grid",
  gap: 1,
  justifyItems: "end",
  fontSize: 18,
  fontWeight: 900,
  color: "rgba(186,230,253,0.95)",
};

const scoreLabelStyle: CSSProperties = {
  fontSize: 9,
  color: "rgba(226,232,240,0.58)",
  textTransform: "uppercase",
};

const metricGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 92px), 1fr))",
  gap: 7,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  padding: 8,
  borderRadius: 8,
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
  fontSize: 11,
  overflowWrap: "normal",
};

const evidenceStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const evidenceRowStyle: CSSProperties = {
  display: "grid",
  gap: 3,
  padding: 8,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  color: "rgba(226,232,240,0.72)",
  fontSize: 11,
  lineHeight: 1.45,
  overflowWrap: "normal",
};

const actionStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.20)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.9)",
  fontSize: 12,
  lineHeight: 1.45,
  overflowWrap: "normal",
};

const pillStyle: CSSProperties = {
  justifySelf: "start",
  borderRadius: 999,
  padding: "2px 7px",
  background: "rgba(255,255,255,0.08)",
  fontSize: 10,
  fontWeight: 900,
};

const buttonStyle: CSSProperties = {
  appearance: "none",
  border: "1px solid rgba(125,211,252,0.24)",
  borderRadius: 8,
  background: "rgba(14,165,233,0.12)",
  color: "rgba(240,249,255,0.95)",
  padding: "8px 10px",
  fontSize: 12,
  fontWeight: 850,
  cursor: "pointer",
};

const eyebrowStyle: CSSProperties = {
  fontSize: 9,
  fontWeight: 900,
  letterSpacing: 0,
  color: "rgba(186,230,253,0.78)",
  textTransform: "uppercase",
};
