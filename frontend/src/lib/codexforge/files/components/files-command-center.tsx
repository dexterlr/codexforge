"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  codexForgeFileDependencies,
  codexForgeFileFixtures,
} from "../file-fixtures";
import { buildFileBrainContext } from "../file-brain-context";
import {
  buildFileToChatPrompt,
  buildFileWorkspacePrompt,
  summarizeFileChatBridge,
} from "../file-chat-bridge";
import { buildFileReadinessBoard } from "../file-readiness";
import {
  buildFileSafeActionQueue,
  selectFileSafeNextAction,
} from "../file-safe-next-action";
import { buildFileWorkflow, summarizeFileWorkflow } from "../file-workflow";
import { calculateFileRisk } from "../file-risk";
import { buildCodexForgeFileReactKey, searchFiles } from "../file-search";
import { buildPatchPreviewPlan } from "@/lib/codexforge/patch-preview";
import { PatchPreviewCockpit } from "@/lib/codexforge/patch-preview/components";
import { CodexForgeLocalActionBar } from "@/lib/codexforge/navigation";
import type {
  CodexForgeFileAction,
  CodexForgeFileCommandCenterState,
  CodexForgeFileDependency,
  CodexForgeFileKind,
  CodexForgeFileNode,
  CodexForgeFileRiskLevel,
  CodexForgeFilesApiResponse,
} from "../types";
import { DependencyMap } from "./dependency-map";
import { ExecutionHistory } from "./execution-history";
import { FileActionBar } from "./file-action-bar";
import { FileBrainContextPanel } from "./FileBrainContextPanel";
import { FileChatHandoffPanel } from "./FileChatHandoffPanel";
import { FileCognitiveContextPanel } from "./FileCognitiveContextPanel";
import { FileInspector } from "./file-inspector";
import { FileOpenInBrainLink } from "./FileOpenInBrainLink";
import { FileReadinessBoard } from "./FileReadinessBoard";
import { FileSafeNextActionPanel } from "./FileSafeNextActionPanel";
import { FileSafePlanPanel } from "./FileSafePlanPanel";
import { FileTimeline } from "./file-timeline";
import { FileTree } from "./file-tree";
import { FileWorkflowRail } from "./FileWorkflowRail";
import { FilesCommandPalette } from "./FilesCommandPalette";
import { PredictiveContextPanel } from "./predictive-context-panel";
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

type FilesCommandCenterProps = {
  initialData?: CodexForgeFilesApiResponse;
};

export function FilesCommandCenter({ initialData }: FilesCommandCenterProps) {
  const initialFiles = initialData?.files.length
    ? initialData.files
    : codexForgeFileFixtures;
  const [state, setState] = useState<CodexForgeFileCommandCenterState>({
    query: "",
    selectedPath: initialData?.selectedFile?.path ?? initialFiles[0]?.path ?? "",
    kind: "all",
    risk: "all",
    tag: "all",
    dependency: "all",
    recent: false,
  });
  const [activeAction, setActiveAction] = useState<CodexForgeFileAction>("summarize");
  const sourceFiles = initialFiles;
  const sourceDependencies = initialData?.dependencies.length
    ? initialData.dependencies
    : codexForgeFileDependencies;

  const tags = useMemo(() => {
    return Array.from(new Set(sourceFiles.flatMap((file) => file.tags))).sort();
  }, [sourceFiles]);

  const visibleFiles = useMemo(() => {
    return searchFiles(sourceFiles, state);
  }, [sourceFiles, state]);

  const selectedFile = useMemo(() => {
    return (
      sourceFiles.find((file) => file.path === state.selectedPath) ??
      visibleFiles[0] ??
      sourceFiles[0] ??
      initialFiles[0]
    );
  }, [initialFiles, sourceFiles, state.selectedPath, visibleFiles]);

  const runtimeContextSignals = useMemo(() => {
    const liveSignals = initialData?.runtimeContextSignals.filter(
      (signal) => signal.filePath === selectedFile?.path
    );
    if (liveSignals?.length) return liveSignals;

    return selectedFile
      ? selectedFile.insights.map((insight) => ({
          id: `${selectedFile.path}:insight:${insight.id}`,
          filePath: selectedFile.path,
          label: insight.label,
          source: "fixture" as const,
          strength: "medium" as const,
          detail: insight.detail,
          reasons: [insight.value],
        }))
      : [];
  }, [initialData?.runtimeContextSignals, selectedFile]);

  const fileWorkflow = useMemo(() => {
    return buildFileWorkflow({
      selectedFile,
      files: sourceFiles,
      dependencies: sourceDependencies,
      runtimeSignals: runtimeContextSignals,
    });
  }, [runtimeContextSignals, selectedFile, sourceDependencies, sourceFiles]);

  const fileBrainContext = useMemo(() => {
    return buildFileBrainContext({
      file: selectedFile,
      files: sourceFiles,
      dependencies: sourceDependencies,
    });
  }, [selectedFile, sourceDependencies, sourceFiles]);

  const fileReadinessBoard = useMemo(() => {
    return buildFileReadinessBoard({
      file: selectedFile,
      cognitiveContext: fileWorkflow.cognitiveContext,
      fileBrainContext,
      safePlan: fileWorkflow.safeEditPlan,
    });
  }, [fileBrainContext, fileWorkflow.cognitiveContext, fileWorkflow.safeEditPlan, selectedFile]);

  const patchPreviewPlan = useMemo(() => {
    const relatedPaths = sourceDependencies
      .filter(
        (dependency) =>
          dependency.fromPath === selectedFile.path ||
          dependency.toPath === selectedFile.path
      )
      .map((dependency) =>
        dependency.fromPath === selectedFile.path ? dependency.toPath : dependency.fromPath
      );

    return buildPatchPreviewPlan({
      selectedFilePath: selectedFile.path,
      goal: `Prepare a safe preview-only patch plan for ${selectedFile.name}.`,
      fileRole: selectedFile.architectureRole,
      relatedBrainContextSummary: fileBrainContext.summary,
      relatedBrainMemoryCount: fileBrainContext.relatedNodes.length,
      capabilityPolicyPosture:
        "Files command center allows deterministic preview planning only; apply and mutation remain approval-gated and blocked in Phase 6.",
      expectedTouchedFiles: relatedPaths,
      hasTestsOrSmokeScripts:
        fileBrainContext.relatedSmokeScripts.length > 0 ||
        fileWorkflow.suggestedSmokeTests.length > 0,
      appearsSafetyCritical:
        selectedFile.tags.includes("safety") ||
        selectedFile.tags.includes("policy") ||
        selectedFile.path.includes("/tools/") ||
        selectedFile.path.includes("/capabilities/"),
      requiresApproval: true,
    });
  }, [fileBrainContext, fileWorkflow.suggestedSmokeTests, selectedFile, sourceDependencies]);

  const fileSafeActionQueue = useMemo(() => {
    return buildFileSafeActionQueue({
      file: selectedFile,
      brainContext: fileBrainContext,
      readinessBoard: fileReadinessBoard,
      suggestedSmokeTests: fileWorkflow.suggestedSmokeTests,
    });
  }, [fileBrainContext, fileReadinessBoard, fileWorkflow.suggestedSmokeTests, selectedFile]);

  const fileSafeNextAction = useMemo(() => {
    return selectFileSafeNextAction(fileSafeActionQueue);
  }, [fileSafeActionQueue]);

  const fileChatPrompt = useMemo(() => {
    return buildFileToChatPrompt({
      file: selectedFile,
      brainContext: fileBrainContext,
      readinessBoard: fileReadinessBoard,
      safeNextAction: fileSafeNextAction,
      suggestedSmokeTests: fileWorkflow.suggestedSmokeTests,
      patchPreviewPlan,
    });
  }, [fileBrainContext, fileReadinessBoard, fileSafeNextAction, fileWorkflow.suggestedSmokeTests, patchPreviewPlan, selectedFile]);

  const fileWorkspacePrompt = useMemo(() => {
    return buildFileWorkspacePrompt({
      file: selectedFile,
      brainContext: fileBrainContext,
      readinessBoard: fileReadinessBoard,
      safeNextAction: fileSafeNextAction,
      suggestedSmokeTests: fileWorkflow.suggestedSmokeTests,
      patchPreviewPlan,
    });
  }, [fileBrainContext, fileReadinessBoard, fileSafeNextAction, fileWorkflow.suggestedSmokeTests, patchPreviewPlan, selectedFile]);

  const fileChatBridgeSummary = useMemo(() => {
    return summarizeFileChatBridge({
      file: selectedFile,
      brainContext: fileBrainContext,
      readinessBoard: fileReadinessBoard,
      safeNextAction: fileSafeNextAction,
      suggestedSmokeTests: fileWorkflow.suggestedSmokeTests,
      patchPreviewPlan,
    });
  }, [fileBrainContext, fileReadinessBoard, fileSafeNextAction, fileWorkflow.suggestedSmokeTests, patchPreviewPlan, selectedFile]);

  const patchPreviewPrompt = useMemo(() => {
    return [
      "CodexForge Safe Patch Preview handoff",
      "",
      `Selected file: ${patchPreviewPlan.selectedFilePath}`,
      `Goal: ${patchPreviewPlan.goal}`,
      `Risk: ${patchPreviewPlan.riskLevel}`,
      `Brain context: ${patchPreviewPlan.relatedBrainContextSummary}`,
      `Policy posture: ${patchPreviewPlan.capabilityPolicyPosture}`,
      "",
      "Instructions",
      "- Inspect first.",
      "- Produce preview diff only.",
      "- Do not write files without approval.",
      "- Do not run commands without approval.",
      "- Keep apply blocked in Phase 6.",
      "",
      "Suggested tests",
      ...patchPreviewPlan.suggestedTests.map((test) => `- ${test}`),
      "",
      "Rollback",
      ...patchPreviewPlan.rollbackNotes.map((note) => `- ${note}`),
    ].join("\n");
  }, [patchPreviewPlan]);

  const riskCounts = useMemo(() => {
    return sourceFiles.reduce<Record<CodexForgeFileRiskLevel, number>>(
      (counts, file) => {
        counts[calculateFileRisk(file).level] += 1;
        return counts;
      },
      { low: 0, medium: 0, high: 0, critical: 0 }
    );
  }, [sourceFiles]);

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
    <main
      data-codexforge-files-command-center
      data-codexforge-files-source={initialData ? "live-read-only-runtime" : "deterministic-fixtures"}
      data-codexforge-files-preview-only="true"
      style={page}
    >
      <CodexForgeLocalActionBar
        title="Files Command Center"
        subtitle="File intelligence for risk, dependencies, lineage, memory context, and preview-only edit planning"
        status="preview-only"
      >
        <Stat label="Indexed" value={String(sourceFiles.length)} />
        <Stat label="Critical" value={String(riskCounts.critical)} />
        <Stat label="High" value={String(riskCounts.high)} />
        <Stat label="Links" value={String(sourceDependencies.length)} />
      </CodexForgeLocalActionBar>

      <section style={liveStrip}>
        <div>
          <span style={statusDot()} />
          <strong>Deterministic local intelligence</strong>
          <span style={statusText}>
            {initialData
              ? `Live bounded scan of ${initialData.summary.scannedFiles} files with readonly runtime signals.`
              : "Fixed Phase 3A fixtures, no network calls, no filesystem reads, no write/apply behavior."}
          </span>
        </div>
        <span style={readonlyPill}>preview-only</span>
      </section>

      <section
        data-codexforge-file-workflow-summary
        style={workflowSummary}
      >
        <div>
          <span style={statusDot()} />
          <strong>{summarizeFileWorkflow(fileWorkflow)}</strong>
        </div>
        <FileOpenInBrainLink filePath={selectedFile.path} />
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
              key={buildCodexForgeFileReactKey("kind-filter", [kind], 0)}
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
              key={buildCodexForgeFileReactKey("risk-filter", [risk], 0)}
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
            <option key={buildCodexForgeFileReactKey("tag-filter", [tag], 0)} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </section>

      <section
        data-codexforge-files-responsive-layout
        data-codexforge-files-overflow-guard
        style={layout}
      >
        <FileTree
          files={visibleFiles}
          selectedPath={selectedFile.path}
          onSelectPath={selectPath}
        />

        <div style={middle}>
          <FileWorkflowRail workflow={fileWorkflow} />
          <FilesCommandPalette workflow={fileWorkflow} />
          <FileBrainContextPanel context={fileBrainContext} />
          <FileChatHandoffPanel
            filePath={selectedFile.path}
            prompt={fileChatPrompt}
            workspacePrompt={fileWorkspacePrompt}
            summary={fileChatBridgeSummary}
          />
          <section style={insightPanel} data-codexforge-files-task-suggestions>
            <div style={eyebrow}>Task Autopilot signal</div>
            <p style={railBody}>
              Selected file can contribute task signals for review-gated task suggestions in /tasks. This panel is
              preview-only and performs no file mutation.
            </p>
          </section>
          <PatchPreviewCockpit
            plan={selectedFile ? patchPreviewPlan : null}
            patchPrompt={patchPreviewPrompt}
          />
          <FileInspector file={selectedFile} />
          <FileActionBar
            file={selectedFile}
            activeAction={activeAction}
            onAction={setActiveAction}
          />
          <FileReadinessBoard board={fileReadinessBoard} />
          <FileSafeNextActionPanel
            action={fileSafeNextAction}
            queue={fileSafeActionQueue}
          />
          <FileSafePlanPanel plan={fileWorkflow.safeEditPlan} />
          <SafeEditPreview file={selectedFile} action={activeAction} />
          <section style={insightPanel}>
            <div style={eyebrow}>Memory and concepts</div>
            <div style={memoryGrid}>
              {selectedFile.relatedMemory.map((memory) => (
                <div
                  key={buildCodexForgeFileReactKey("memory", [selectedFile.path, memory], 0)}
                  style={memoryCard}
                >
                  {memory}
                </div>
              ))}
              {selectedFile.insights.map((insight) => (
                <div
                  key={buildCodexForgeFileReactKey("insight", [selectedFile.path, insight.id], 0)}
                  style={memoryCard}
                >
                  <strong>{insight.label}</strong>
                  <span>{insight.value}</span>
                </div>
              ))}
            </div>
          </section>
          <PreviewPanel
            file={selectedFile}
            preview={initialData?.previews[selectedFile.path]}
          />
        </div>

        <aside style={rightRail}>
          <FileCognitiveContextPanel context={fileWorkflow.cognitiveContext} />
          <PredictiveContextPanel
            file={selectedFile}
            files={sourceFiles}
            dependencies={sourceDependencies}
            runtimeSignals={runtimeContextSignals}
          />
          <DependencyMap file={selectedFile} dependencies={sourceDependencies} />
          <DependencyTracePanel
            selectedFile={selectedFile}
            dependencies={sourceDependencies}
            summary={
              initialData?.dependencyTrace.filePath === selectedFile.path
                ? initialData.dependencyTrace.summary
                : "Deterministic dependency map derived from Phase 3A fixture relationships."
            }
          />
          <RelatedFilesPanel
            file={selectedFile}
            files={sourceFiles}
            dependencies={sourceDependencies}
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

function PreviewPanel({
  file,
  preview,
}: {
  file: CodexForgeFileNode;
  preview?: CodexForgeFilesApiResponse["previews"][string];
}) {
  const previewText = preview?.preview.trim()
    ? preview.preview
    : `${file.path}

${file.summary}

Architecture role: ${file.architectureRole}
Owner area: ${file.ownerArea}
Risk and edit planning are preview-only in Phase 3.`;

  return (
    <section data-codexforge-files-preview-panel style={insightPanel}>
      <div style={eyebrow}>Read-only preview</div>
      <pre style={previewBox}>{previewText}</pre>
      {preview ? (
        <div style={tinyBlock}>
          <strong>{preview.language}</strong>
          <span>
            {preview.lineCount} lines, {preview.byteLength} bytes
            {preview.truncated ? ", truncated preview" : ""}
          </span>
        </div>
      ) : null}
    </section>
  );
}

function DependencyTracePanel({
  selectedFile,
  dependencies,
  summary,
}: {
  selectedFile: CodexForgeFileNode;
  dependencies: CodexForgeFileDependency[];
  summary: string;
}) {
  const active = dependencies.filter(
    (dependency) =>
      dependency.fromPath === selectedFile.path || dependency.toPath === selectedFile.path
  );

  return (
    <section data-codexforge-files-dependency-trace style={railPanel}>
      <div style={eyebrow}>Dependency trace</div>
      <p style={railBody}>{summary}</p>
      <TinyList
        label="links"
        values={active.map((dependency) => dependency.summary)}
        fallback={String(active.length)}
      />
      <TinyList
        label="ids"
        values={active.map((dependency) => dependency.id)}
        fallback="0"
      />
    </section>
  );
}

function TinyList({
  label,
  values,
  fallback,
}: {
  label: string;
  values: string[];
  fallback: string;
}) {
  return (
    <div style={tinyBlock}>
      <strong>{label}</strong>
      <span>{values.length ? values.slice(0, 4).join(", ") : fallback}</span>
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

function statusDot(): CSSProperties {
  return {
    width: 8,
    height: 8,
    borderRadius: 999,
    display: "inline-block",
    marginRight: 8,
    background: "#34d399",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
  gap: 8,
};

const liveStrip: CSSProperties = {
  maxWidth: 1540,
  width: "100%",
  margin: "0 auto",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: "10px 12px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  fontSize: 12,
};

const workflowSummary: CSSProperties = {
  maxWidth: 1540,
  width: "100%",
  margin: "0 auto",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: "10px 12px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  fontSize: 12,
  minWidth: 0,
};

const statusText: CSSProperties = {
  marginLeft: 8,
  opacity: 0.7,
};

const readonlyPill: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.34)",
  background: "rgba(52,211,153,0.12)",
  borderRadius: 7,
  padding: "5px 8px",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
  gap: 14,
  alignItems: "start",
  minWidth: 0,
};

const middle: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const rightRail: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const insightPanel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const railPanel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const railBody: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.76,
};

const previewBox: CSSProperties = {
  margin: 0,
  maxHeight: 260,
  overflow: "auto",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.25)",
  borderRadius: 8,
  padding: 10,
  fontSize: 11,
  lineHeight: 1.45,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
};

const tinyBlock: CSSProperties = {
  borderTop: "1px solid rgba(255,255,255,0.08)",
  paddingTop: 8,
  display: "grid",
  gap: 4,
  fontSize: 11,
  lineHeight: 1.4,
  overflowWrap: "anywhere",
};

const memoryGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
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
