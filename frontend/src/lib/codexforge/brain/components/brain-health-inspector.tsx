import type { CSSProperties } from "react";
import type {
  CodexForgeRuntimeHealthSignal,
  CodexForgeRuntimeSafetyPosture,
  CodexForgeRuntimeSmokeCoverageItem,
  CodexForgeRuntimeSubsystemReadiness,
} from "@/lib/codexforge/brain/runtime";
import { buildStableReactKey } from "./brain-react-key";

type BrainHealthInspectorProps = {
  signal?: CodexForgeRuntimeHealthSignal | null;
  subsystem?: CodexForgeRuntimeSubsystemReadiness | null;
  smoke?: CodexForgeRuntimeSmokeCoverageItem | null;
  safety?: CodexForgeRuntimeSafetyPosture | null;
};

export function BrainHealthInspector({
  signal,
  subsystem,
  smoke,
  safety,
}: BrainHealthInspectorProps) {
  const rows = buildRows({ signal, subsystem, smoke, safety });

  return (
    <aside data-codexforge-brain-health-inspector data-codexforge-brain-overflow-guard style={panelStyle}>
      <div>
        <div style={eyebrowStyle}>Health inspector</div>
        <h3 style={titleStyle}>{rows.title}</h3>
      </div>
      <div style={rowsStyle}>
        {rows.items.map((item, index) => (
          <div key={buildStableReactKey("health-row", [rows.title, item.label], index)} style={rowStyle}>
            <span style={eyebrowStyle}>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <List title="Evidence" items={rows.evidence} />
      <List title="Reasons" items={rows.reasons} />
      <div style={actionStyle}>
        <span style={eyebrowStyle}>Next safe action</span>
        <strong>{rows.nextAction}</strong>
        <span>{rows.approval}</span>
      </div>
    </aside>
  );
}

function buildRows({
  signal,
  subsystem,
  smoke,
  safety,
}: BrainHealthInspectorProps): {
  title: string;
  items: { label: string; value: string }[];
  evidence: readonly string[];
  reasons: readonly string[];
  nextAction: string;
  approval: string;
} {
  if (signal) {
    return {
      title: signal.title,
      items: [
        { label: "Severity", value: signal.severity },
        { label: "Status", value: signal.status },
        { label: "Source", value: signal.source },
        { label: "Subsystem", value: signal.relatedSubsystem ?? "none" },
      ],
      evidence: signal.evidence,
      reasons: signal.reasons,
      nextAction: signal.nextSafeAction.detail,
      approval: signal.nextSafeAction.approvalRequired ? "approval-required" : "read-only",
    };
  }

  if (subsystem) {
    return {
      title: subsystem.label,
      items: [
        { label: "Severity", value: subsystem.severity },
        { label: "Status", value: subsystem.status },
        { label: "Source", value: subsystem.source },
        { label: "Subsystem", value: subsystem.id },
      ],
      evidence: subsystem.evidence,
      reasons: subsystem.reasons,
      nextAction: subsystem.nextSafeAction.detail,
      approval: subsystem.nextSafeAction.approvalRequired ? "approval-required" : "read-only",
    };
  }

  if (smoke) {
    return {
      title: smoke.label,
      items: [
        { label: "Severity", value: smoke.coverageLevel >= 1 ? "info" : "medium" },
        { label: "Status", value: smoke.status },
        { label: "Source", value: "smoke coverage" },
        { label: "Subsystem", value: smoke.id },
      ],
      evidence: smoke.evidence,
      reasons: [smoke.reason],
      nextAction: smoke.nextSafeAction.detail,
      approval: smoke.nextSafeAction.approvalRequired ? "approval-required" : "read-only",
    };
  }

  if (safety) {
    return {
      title: "Safety posture",
      items: [
        { label: "Severity", value: safety.severity },
        { label: "Status", value: safety.status },
        { label: "Source", value: "safety posture" },
        { label: "Subsystem", value: "approval-boundary" },
      ],
      evidence: safety.boundaries.map((item) => `${item.label}:${item.status}`),
      reasons: safety.warnings,
      nextAction: safety.readOnlyActions[0]?.detail ?? safety.summary,
      approval: "read-only inspection; repair requires explicit approval",
    };
  }

  return {
    title: "No health item selected",
    items: [
      { label: "Severity", value: "info" },
      { label: "Status", value: "ready" },
      { label: "Source", value: "health dashboard" },
      { label: "Subsystem", value: "health-dashboard" },
    ],
    evidence: ["Select a health signal, subsystem, smoke item, or safety boundary."],
    reasons: ["Read-only health inspector is available."],
    nextAction: "Inspect the top runtime health signal.",
    approval: "read-only",
  };
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div style={listStyle}>
      <div style={eyebrowStyle}>{title}</div>
      {(items.length > 0 ? items : ["No detail available."]).slice(0, 5).map((item, index) => (
        <div key={buildStableReactKey("health-list", [title, item], index)} style={listItemStyle}>
          {item}
        </div>
      ))}
    </div>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 13,
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(125,211,252,0.22)",
  background:
    "radial-gradient(circle at 12% 0%, rgba(14,165,233,0.14), transparent 32%), linear-gradient(180deg, rgba(2,6,23,0.58), rgba(15,23,42,0.42))",
  minWidth: 0,
  maxHeight: 520,
  overflow: "auto",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
};

const rowsStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  gap: 7,
};

const rowStyle: CSSProperties = {
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

const listStyle: CSSProperties = {
  display: "grid",
  gap: 6,
};

const listItemStyle: CSSProperties = {
  padding: 8,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.07)",
  background: "rgba(255,255,255,0.045)",
  color: "rgba(226,232,240,0.78)",
  fontSize: 11,
  lineHeight: 1.45,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const actionStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 14,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "linear-gradient(180deg, rgba(34,197,94,0.12), rgba(34,197,94,0.055))",
  color: "rgba(220,252,231,0.92)",
  fontSize: 11,
  lineHeight: 1.45,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
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
  fontSize: 15,
  lineHeight: 1.25,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};
