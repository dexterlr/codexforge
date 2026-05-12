"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  codexForgeFileDependencies,
  codexForgeFileFixtures,
} from "../file-fixtures";
import { calculateFileRisk } from "../file-risk";
import { searchFiles } from "../file-search";
import type {
  CodexForgeFileAction,
  CodexForgeFileCommandCenterState,
  CodexForgeFileKind,
  CodexForgeFileRiskLevel,
} from "../types";
import { DependencyMap } from "./dependency-map";
import { ExecutionHistory } from "./execution-history";
import { FileActionBar } from "./file-action-bar";
import { FileInspector } from "./file-inspector";
import { FileTimeline } from "./file-timeline";
import { FileTree } from "./file-tree";
import { RelatedFilesPanel } from "./related-files-panel";
import { SafeEditPreview } from "./safe-edit-preview";

const KIND_FILTERS: Array<CodexForgeFileKind | "all"> = [
  "all",
  "route",
  "component",
  "runtime",
  "memory",
  "tool",
  "smoke",
];

const RISK_FILTERS: Array<CodexForgeFileRiskLevel | "all"> = [
  "all",
  "critical",
  "high",
  "medium",
  "low",
];

export function FilesCommandCenter() {
  const [state, setState] = useState<CodexForgeFileCommandCenterState>({
    query: "",
    selectedPath: codexForgeFileFixtures[0]?.path ?? "",
    kind: "all",
    risk: "all",
    tag: "all",
    dependency: "all",
    recent: false,
  });
  const [activeAction, setActiveAction] = useState<CodexForgeFileAction>("summarize");

  const tags = useMemo(() => {
    return Array.from(new Set(codexForgeFileFixtures.flatMap((file) => file.tags))).sort();
  }, []);

  const visibleFiles = useMemo(() => {
    return searchFiles(codexForgeFileFixtures, state);
  }, [state]);

  const selectedFile = useMemo(() => {
    return (
      codexForgeFileFixtures.find((file) => file.path === state.selectedPath) ??
      visibleFiles[0] ??
      codexForgeFileFixtures[0]
    );
  }, [state.selectedPath, visibleFiles]);

  const riskCounts = useMemo(() => {
    return codexForgeFileFixtures.reduce<Record<CodexForgeFileRiskLevel, number>>(
      (counts, file) => {
        counts[calculateFileRisk(file).level] += 1;
        return counts;
      },
      { low: 0, medium: 0, high: 0, critical: 0 }
    );
  }, []);

  function selectPath(path: string) {
    setState((current) => ({ ...current, selectedPath: path }));
  }

  function setKind(kind: CodexForgeFileKind | "all") {
    setState((current) => ({ ...current, kind }));
  }

  function setRisk(risk: CodexForgeFileRiskLevel | "all") {
    setState((current) => ({ ...current, risk }));
  }

  return (
    <main data-codexforge-files-command-center style={page}>
      <section style={hero}>
        <div style={heroCopy}>
          <div style={eyebrow}>CodexForge Files</div>
          <h1 style={h1}>Files Command Center</h1>
          <p style={lede}>
            AI-native file intelligence for risk, dependencies, lineage, memory
            context, and preview-only edit planning.
          </p>
        </div>
        <div style={summaryGrid}>
          <Stat label="Indexed" value={String(codexForgeFileFixtures.length)} />
          <Stat label="Critical" value={String(riskCounts.critical)} />
          <Stat label="High" value={String(riskCounts.high)} />
          <Stat label="Links" value={String(codexForgeFileDependencies.length)} />
        </div>
      </section>

      <section style={commandBar}>
        <label style={searchWrap}>
          <span style={searchLabel}>Command search</span>
          <input
            value={state.query}
            onChange={(event) =>
              setState((current) => ({ ...current, query: event.target.value }))
            }
            placeholder="Search path, area, concept, risk, memory..."
            style={searchInput}
          />
        </label>

        <div style={chipRow}>
          {KIND_FILTERS.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setKind(kind)}
              style={chip(state.kind === kind)}
            >
              {kind}
            </button>
          ))}
        </div>

        <div style={chipRow}>
          {RISK_FILTERS.map((risk) => (
            <button
              key={risk}
              type="button"
              onClick={() => setRisk(risk)}
              style={chip(state.risk === risk)}
            >
              {risk}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setState((current) => ({ ...current, recent: !current.recent }))}
            style={chip(state.recent)}
          >
            recent
          </button>
        </div>

        <select
          value={state.tag}
          onChange={(event) =>
            setState((current) => ({ ...current, tag: event.target.value }))
          }
          style={select}
          aria-label="Tag filter"
        >
          <option value="all">all tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </section>

      <section style={layout}>
        <FileTree
          files={visibleFiles}
          selectedPath={selectedFile.path}
          onSelectPath={selectPath}
        />

        <div style={middle}>
          <FileInspector file={selectedFile} />
          <FileActionBar
            file={selectedFile}
            activeAction={activeAction}
            onAction={setActiveAction}
          />
          <SafeEditPreview file={selectedFile} action={activeAction} />
          <section style={insightPanel}>
            <div style={eyebrow}>Memory and concepts</div>
            <div style={memoryGrid}>
              {selectedFile.relatedMemory.map((memory) => (
                <div key={memory} style={memoryCard}>
                  {memory}
                </div>
              ))}
              {selectedFile.insights.map((insight) => (
                <div key={insight.id} style={memoryCard}>
                  <strong>{insight.label}</strong>
                  <span>{insight.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside style={rightRail}>
          <DependencyMap file={selectedFile} dependencies={codexForgeFileDependencies} />
          <RelatedFilesPanel
            file={selectedFile}
            files={codexForgeFileFixtures}
            dependencies={codexForgeFileDependencies}
            onSelectPath={selectPath}
          />
          <FileTimeline file={selectedFile} />
          <ExecutionHistory file={selectedFile} />
        </aside>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function chip(active: boolean): CSSProperties {
  return {
    color: "inherit",
    border: active ? "1px solid rgba(16,185,129,0.46)" : "1px solid rgba(255,255,255,0.12)",
    background: active ? "rgba(16,185,129,0.16)" : "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
  };
}

const page: CSSProperties = {
  minHeight: "100vh",
  color: "white",
  background:
    "radial-gradient(900px 420px at 15% 0%, rgba(99,102,241,0.20), transparent 60%)," +
    "radial-gradient(760px 380px at 85% 8%, rgba(16,185,129,0.14), transparent 58%)," +
    "linear-gradient(180deg, #060914 0%, #04060D 100%)",
  padding: "24px",
  display: "grid",
  gap: 14,
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif',
};

const hero: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 520px)",
  gap: 16,
  alignItems: "end",
  maxWidth: 1540,
  width: "100%",
  margin: "0 auto",
};

const heroCopy: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8,
  padding: 18,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.64,
};

const h1: CSSProperties = {
  margin: "6px 0 0",
  fontSize: 34,
  letterSpacing: 0,
};

const lede: CSSProperties = {
  margin: "8px 0 0",
  maxWidth: 780,
  fontSize: 14,
  lineHeight: 1.55,
  opacity: 0.78,
};

const summaryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: 8,
};

const stat: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const commandBar: CSSProperties = {
  maxWidth: 1540,
  width: "100%",
  margin: "0 auto",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gridTemplateColumns: "minmax(260px, 1fr) auto auto 150px",
  gap: 10,
  alignItems: "end",
};

const searchWrap: CSSProperties = {
  display: "grid",
  gap: 6,
};

const searchLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const searchInput: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  color: "white",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.22)",
  borderRadius: 8,
  padding: "11px 12px",
  outline: "none",
  fontSize: 13,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
};

const select: CSSProperties = {
  color: "white",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "#111827",
  borderRadius: 8,
  padding: "10px 9px",
  fontSize: 12,
  fontWeight: 800,
};

const layout: CSSProperties = {
  maxWidth: 1540,
  width: "100%",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "minmax(320px, 0.85fr) minmax(460px, 1.35fr) minmax(300px, 0.75fr)",
  gap: 14,
  alignItems: "start",
};

const middle: CSSProperties = {
  display: "grid",
  gap: 12,
};

const rightRail: CSSProperties = {
  display: "grid",
  gap: 12,
};

const insightPanel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const memoryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const memoryCard: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
};
