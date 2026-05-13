import type { CSSProperties } from "react";
import type {
  CodexForgeRuntimeInsight,
  CodexForgeRuntimeRecommendation,
} from "@/lib/codexforge/brain/runtime";
import { buildStableReactKey } from "./brain-react-key";

type BrainInsightInspectorProps = {
  insight?: CodexForgeRuntimeInsight | null;
  recommendation?: CodexForgeRuntimeRecommendation | null;
};

export function BrainInsightInspector({
  insight,
  recommendation,
}: BrainInsightInspectorProps) {
  const selected = insight ?? (recommendation ? {
    id: `insight:${recommendation.id}`,
    recommendationId: recommendation.id,
    kind: recommendation.kind,
    title: recommendation.title,
    detail: recommendation.summary,
    severity: recommendation.severity,
    status: recommendation.status,
    confidence: recommendation.confidence,
    score: recommendation.score,
    timestamp: recommendation.updatedAt,
    evidence: recommendation.evidence,
    relatedNodeIds: recommendation.relatedNodeIds,
    relatedFilePaths: recommendation.relatedFilePaths,
    action: recommendation.nextSafeAction,
    whyItMatters: recommendation.whyItMatters,
  } : null);

  return (
    <aside
      data-codexforge-brain-insight-inspector
      data-codexforge-brain-recommendation-inspector
      data-codexforge-brain-overflow-guard
      style={panelStyle}
    >
      <div>
        <div style={eyebrowStyle}>Insight inspector</div>
        <h3 style={titleStyle}>{selected?.title ?? "No insight selected"}</h3>
      </div>

      {selected ? (
        <>
          <p style={copyStyle}>{selected.detail}</p>
          <div style={statGridStyle}>
            <Stat label="Kind" value={selected.kind} />
            <Stat label="Severity" value={selected.severity} />
            <Stat label="Status" value={selected.status} />
            <Stat label="Confidence" value={selected.confidence.toFixed(2)} />
          </div>

          <Section title="Why it matters" items={[selected.whyItMatters]} />
          <Section
            title="Evidence"
            items={selected.evidence.map((item) => `${item.label}: ${item.detail}`)}
          />
          <Section title="Source refs" items={selected.evidence.map((item) => item.id)} />
          <Section title="Related nodes" items={selected.relatedNodeIds} />
          <Section title="Related files" items={selected.relatedFilePaths} />

          <div style={actionStyle}>
            <div style={eyebrowStyle}>Action safety</div>
            <strong>{selected.action.label}</strong>
            <span>{selected.action.description}</span>
            <span>
              {selected.action.safety} / read-only {selected.action.readOnly ? "yes" : "no"} / approval {selected.action.approvalRequired ? "required" : "not required"}
            </span>
          </div>
        </>
      ) : (
        <p style={copyStyle}>Select a recommendation or queue item to inspect evidence and action boundaries.</p>
      )}
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={statStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Section({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section style={sectionStyle}>
      <div style={eyebrowStyle}>{title}</div>
      {items.length > 0 ? (
        items.slice(0, 8).map((item, index) => (
          <div key={buildStableReactKey("insight-section-row", [title, item], index)} style={rowStyle}>
            {item}
          </div>
        ))
      ) : (
        <div style={emptyStyle}>No signal available.</div>
      )}
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 13,
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(125,211,252,0.18)",
  background:
    "radial-gradient(circle at 10% 0%, rgba(99,102,241,0.13), transparent 34%), linear-gradient(180deg, rgba(2,6,23,0.62), rgba(15,23,42,0.46))",
  alignContent: "start",
  minWidth: 0,
  maxHeight: 560,
  overflow: "auto",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

const statGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  gap: 7,
};

const statStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
  fontSize: 11,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const rowStyle: CSSProperties = {
  padding: 8,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(255,255,255,0.045)",
  color: "rgba(226,232,240,0.75)",
  fontSize: 11,
  lineHeight: 1.45,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const actionStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 10,
  borderRadius: 14,
  border: "1px solid rgba(34,197,94,0.20)",
  background: "linear-gradient(180deg, rgba(34,197,94,0.12), rgba(34,197,94,0.055))",
  color: "rgba(220,252,231,0.9)",
  fontSize: 12,
  lineHeight: 1.45,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const emptyStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontSize: 11,
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
  fontSize: 16,
  lineHeight: 1.25,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.74)",
  fontSize: 12,
  lineHeight: 1.5,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};
