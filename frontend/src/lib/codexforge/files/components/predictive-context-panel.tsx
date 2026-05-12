"use client";

import type { CSSProperties } from "react";
import { calculateFileRisk } from "../file-risk";
import type {
  CodexForgeFileDependency,
  CodexForgeFileNode,
  CodexForgeFileRuntimeContextSignal,
} from "../types";

type PredictiveContextPanelProps = {
  file: CodexForgeFileNode | null;
  files: CodexForgeFileNode[];
  dependencies: CodexForgeFileDependency[];
  runtimeSignals?: CodexForgeFileRuntimeContextSignal[];
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(1, Number(value.toFixed(2))));
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim()))).sort();
}

function dependencyPaths(
  file: CodexForgeFileNode,
  dependencies: CodexForgeFileDependency[]
): string[] {
  return unique(
    dependencies
      .filter((dependency) => dependency.fromPath === file.path || dependency.toPath === file.path)
      .flatMap((dependency) => [dependency.fromPath, dependency.toPath])
      .filter((path) => path !== file.path)
  );
}

function suggestedAction(file: CodexForgeFileNode, riskLevel: string): string {
  if (riskLevel === "critical" || riskLevel === "high") {
    return "Trace dependencies and run the closest smoke before planning an edit.";
  }

  if (file.kind === "smoke") {
    return "Run this smoke after reviewing the behavior it protects.";
  }

  if (file.kind === "component") {
    return "Inspect related runtime signals before changing component state.";
  }

  return "Review related files, then prepare a preview-only patch plan.";
}

export function PredictiveContextPanel({
  file,
  files,
  dependencies,
  runtimeSignals = [],
}: PredictiveContextPanelProps) {
  if (!file) {
    return (
      <section data-codexforge-predictive-context-panel style={panel}>
        <div style={headerRow}>
          <div>
            <div style={eyebrow}>Predictive context</div>
            <h2 style={title}>Context not connected</h2>
          </div>
          <span style={sourcePill}>Predictive context runtime</span>
        </div>
        <p style={bodyText}>
          Select a file to see confidence, relevance reasons, risk hints, related files,
          memory links, task focus, and the next safe action.
        </p>
      </section>
    );
  }

  const risk = calculateFileRisk(file);
  const relatedPaths = dependencyPaths(file, dependencies);
  const relatedFiles = relatedPaths
    .map((path) => files.find((candidate) => candidate.path === path))
    .filter((candidate): candidate is CodexForgeFileNode => Boolean(candidate))
    .slice(0, 4);
  const matchingSignals = runtimeSignals
    .filter((signal) => signal.filePath === file.path)
    .slice(0, 4);
  const topReasons = unique([
    `Architecture role: ${file.architectureRole}`,
    `Risk level: ${risk.level}`,
    ...file.concepts.slice(0, 3).map((concept) => `Concept: ${concept}`),
    ...matchingSignals.flatMap((signal) => signal.reasons ?? []),
  ]).slice(0, 5);
  const memories = unique([...file.relatedMemory, ...matchingSignals.map((signal) => signal.label)]).slice(0, 5);
  const riskHints = unique([
    risk.summary,
    ...risk.signals.map((signal) => signal.reason),
    ...file.safeEditPreview.riskHints,
  ]).slice(0, 4);
  const confidence = clampScore(
    0.42 +
      relatedFiles.length * 0.08 +
      file.relatedMemory.length * 0.04 +
      matchingSignals.length * 0.08 +
      (risk.level === "critical" || risk.level === "high" ? 0.12 : 0.04)
  );

  return (
    <section data-codexforge-predictive-context-panel style={panel}>
      <div style={headerRow}>
        <div>
          <div style={eyebrow}>Predictive context</div>
          <h2 style={title}>Why this file matters</h2>
        </div>
        <span style={sourcePill}>Predictive context runtime</span>
      </div>

      <div style={confidenceGrid}>
        <Metric label="Context confidence" value={`${Math.round(confidence * 100)}%`} />
        <Metric label="Task focus" value={file.kind} />
      </div>

      <InfoBlock label="Context reasons" values={topReasons} />
      <InfoBlock
        label="Related files"
        values={relatedFiles.map((item) => item.path)}
        fallback="No dependency neighbors in the current deterministic index."
      />
      <InfoBlock
        label="Relevant memories"
        values={memories}
        fallback="No related memories are attached to this file yet."
      />
      <InfoBlock label="Risk hints" values={riskHints} />
      <InfoBlock label="Architecture role" values={[file.architectureRole]} />
      <InfoBlock label="Next safe action" values={[suggestedAction(file, risk.level)]} />
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InfoBlock({
  label,
  values,
  fallback = "No signals available yet.",
}: {
  label: string;
  values: string[];
  fallback?: string;
}) {
  const visible = values.length ? values : [fallback];

  return (
    <div style={infoBlock}>
      <strong>{label}</strong>
      <div style={listWrap}>
        {visible.slice(0, 5).map((value) => (
          <span key={value} style={listItem}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "linear-gradient(180deg, rgba(14,165,233,0.12), rgba(255,255,255,0.04))",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const headerRow: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.68,
};

const title: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 16,
  lineHeight: 1.2,
};

const sourcePill: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.28)",
  background: "rgba(14,165,233,0.14)",
  borderRadius: 7,
  padding: "5px 7px",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  whiteSpace: "nowrap",
};

const confidenceGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const metric: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 11,
};

const infoBlock: CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.10)",
  paddingTop: 9,
  display: "grid",
  gap: 7,
  fontSize: 12,
};

const listWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const listItem: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.055)",
  borderRadius: 7,
  padding: "6px 7px",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const bodyText: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.76,
};
