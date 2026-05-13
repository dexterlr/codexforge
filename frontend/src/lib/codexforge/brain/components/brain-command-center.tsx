"use client";

import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph";
import { BrainGraphView } from "./brain-graph-view";
import { BrainAgentActivityPanel } from "./brain-agent-activity-panel";
import { BrainMemoryClustersPanel } from "./brain-memory-clusters-panel";
import { BrainModeTabs } from "./brain-mode-tabs";
import { BrainPredictionPanel } from "./brain-prediction-panel";
import { BrainLineagePanel } from "./brain-lineage-panel";
import { BrainKnowledgeTopologyPanel } from "./brain-knowledge-topology-panel";
import { BrainReplayPanel } from "./brain-replay-panel";
import { BrainRecommendationsPanel } from "./brain-recommendations-panel";
import { BrainInsightQueuePanel } from "./brain-insight-queue-panel";
import { BrainFocusModePanel } from "./brain-focus-mode-panel";
import { BrainDrilldownPanel } from "./brain-drilldown-panel";
import { BrainRiskPanel } from "./brain-risk-panel";
import { BrainRuntimeHealthPanel } from "./brain-runtime-health-panel";
import { BrainSystemStatusPanel } from "./brain-system-status-panel";
import { BrainSemanticHeatmapPanel } from "./brain-semantic-heatmap-panel";
import { BrainLiveSnapshotPanel } from "./brain-live-snapshot-panel";
import { BrainSnapshotStatusStrip } from "./brain-snapshot-status-strip";
import { BrainQualityGateStrip } from "./brain-quality-gate-strip";
import { BrainTimelinePanel } from "./brain-timeline-panel";
import { BrainCommandPalette } from "./brain-command-palette";
import { BrainCommandStatusBar } from "./brain-command-status-bar";
import { BrainKeyboardShortcutsPanel } from "./brain-keyboard-shortcuts-panel";
import { BrainQuickJumpPanel } from "./brain-quick-jump-panel";
import {
  BrainDensityControls,
  BrainMetricPill,
  BrainPanelFrame,
  BrainReadOnlyBadge,
  BrainResponsiveShell,
  type BrainDisplayDensity,
} from "./ui";
import {
  buildBrainCommandRegistry,
  matchBrainKeyboardShortcut,
  type CodexForgeBrainCommand,
} from "./commands";
import {
  buildBrainPanelIntegrationFixtureAdapters,
  buildBrainPanelIntegrationReadinessMap,
  summarizeBrainPanelIntegrationReadiness,
  type CodexForgeBrainPanelDataAdapterResult,
  type CodexForgeBrainPanelDataReadiness,
  type CodexForgeBrainPanelId,
} from "@/lib/codexforge/brain/runtime";
import type {
  CodexForgeBrainCommandCenterProps,
  CodexForgeBrainCommandMode,
} from "./brain-command-center-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function getBrainNodeLabel(node: CodexForgeBrainNode): string {
  if (
    isRecord(node.data) &&
    typeof node.data.label === "string" &&
    node.data.label.trim()
  ) {
    return node.data.label.trim();
  }

  return `${node.kind} ${node.id}`;
}

function isTextEntryTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;

  const tagName = target.tagName.toLowerCase();
  return tagName === "input" || tagName === "textarea" || tagName === "select";
}

function shortcutOpensPalette(event: KeyboardEvent<HTMLElement>): boolean {
  return (
    event.key.toLowerCase() === "k" &&
    (event.ctrlKey || event.metaKey) &&
    !event.altKey
  );
}

function normalizeKeyboardKey(key: string): string {
  return key.length === 1 ? key.toUpperCase() : key;
}

export function BrainCommandCenter({
  graph,
  selectedNode,
  selectedNodeId,
  onSelectNode,
  runtimeSnapshot,
  panelData,
  panelReadiness,
  panelIntegrationSummary,
  qualityGateSummary,
}: CodexForgeBrainCommandCenterProps) {
  const [activeMode, setActiveMode] =
    useState<CodexForgeBrainCommandMode>("runtime-health");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [density, setDensity] = useState<BrainDisplayDensity>("comfortable");
  const [commandHistory, setCommandHistory] = useState<CodexForgeBrainCommand[]>([]);

  const fixturePanelData = useMemo(
    () => buildBrainPanelIntegrationFixtureAdapters(),
    []
  );
  const effectivePanelData = useMemo(
    () =>
      ({
        ...fixturePanelData,
        ...(panelData ?? {}),
      }) as Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>,
    [fixturePanelData, panelData]
  );
  const computedReadiness = useMemo(
    () => buildBrainPanelIntegrationReadinessMap(effectivePanelData),
    [effectivePanelData]
  );
  const effectiveReadiness = useMemo(
    () =>
      ({
        ...computedReadiness,
        ...(panelReadiness ?? {}),
      }) as Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>,
    [computedReadiness, panelReadiness]
  );
  const effectiveIntegrationSummary = useMemo(
    () =>
      panelIntegrationSummary ??
      summarizeBrainPanelIntegrationReadiness(
        effectiveReadiness,
        runtimeSnapshot?.generatedAt ?? 0
      ),
    [effectiveReadiness, panelIntegrationSummary, runtimeSnapshot?.generatedAt]
  );

  const focusTargets = useMemo(() => {
    return graph.nodes
      .map((node) => ({
        id: node.id,
        label: getBrainNodeLabel(node),
        kind: node.kind,
      }))
      .sort(
        (left, right) =>
          left.label.localeCompare(right.label, "en", { sensitivity: "base" }) ||
          left.kind.localeCompare(right.kind, "en", { sensitivity: "base" }) ||
          left.id.localeCompare(right.id, "en", { sensitivity: "base" })
      )
      .slice(0, 12);
  }, [graph.nodes]);

  const commands = useMemo(
    () =>
      buildBrainCommandRegistry({
        activeMode,
        selectedNodeId,
        graphNodeCount: graph.nodes.length,
        graphEdgeCount: graph.edges.length,
        focusTargets,
      }),
    [activeMode, focusTargets, graph.edges.length, graph.nodes.length, selectedNodeId]
  );

  const selectedNodeLabel = selectedNode ? getBrainNodeLabel(selectedNode) : null;

  const rememberCommand = useCallback((command: CodexForgeBrainCommand) => {
    setCommandHistory((current) => [
      command,
      ...current.filter((item) => item.id !== command.id),
    ].slice(0, 8));
  }, []);

  const activateCommand = useCallback(
    (command: CodexForgeBrainCommand) => {
      if (command.safety !== "read-only" || command.disabledReason) {
        return;
      }

      rememberCommand(command);

      if (command.kind === "show-shortcuts") {
        setShortcutsOpen(true);
        setPaletteOpen(false);
        return;
      }

      if (command.kind === "close-palette") {
        setPaletteOpen(false);
        setShortcutsOpen(false);
        return;
      }

      if (
        (command.kind === "focus-target" || command.kind === "open-drilldown") &&
        command.targetId
      ) {
        onSelectNode(command.targetId);
      }

      if (command.targetMode) {
        setActiveMode(command.targetMode);
      }

      setPaletteOpen(false);
    },
    [onSelectNode, rememberCommand]
  );

  const handleShortcutCommand = useCallback(
    (commandId?: string) => {
      if (commandId === "brain.palette.open") {
        setPaletteOpen(true);
        return;
      }

      if (commandId === "brain.help.close-palette") {
        setPaletteOpen(false);
        setShortcutsOpen(false);
        return;
      }

      const command = commands.find((item) => item.id === commandId);
      if (command) {
        activateCommand(command);
      }
    },
    [activateCommand, commands]
  );

  const handleCommandCenterKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const textEntry = isTextEntryTarget(event.target);
      const key = normalizeKeyboardKey(event.key);

      if (textEntry && !shortcutOpensPalette(event) && key !== "Escape") {
        return;
      }

      const shortcut = matchBrainKeyboardShortcut(event.nativeEvent, pendingKey);
      if (shortcut) {
        event.preventDefault();
        event.stopPropagation();
        setPendingKey(null);

        if (shortcut.shortcut === "?") {
          setShortcutsOpen(true);
        }

        handleShortcutCommand(shortcut.commandId);
        return;
      }

      if (
        key === "G" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !textEntry
      ) {
        event.preventDefault();
        setPendingKey("G");
        return;
      }

      if (pendingKey) {
        setPendingKey(null);
      }
    },
    [handleShortcutCommand, pendingKey]
  );

  return (
    <BrainResponsiveShell
      data-codexforge-brain-command-center
      data-codexforge-brain-command-center-polished
      data-codexforge-brain-panel-data-integration
      density={density}
      tabIndex={0}
      onKeyDown={handleCommandCenterKeyDown}
    >
      <BrainCommandPalette
        open={paletteOpen}
        commands={commands}
        history={commandHistory}
        onActivateCommand={activateCommand}
        onClose={() => setPaletteOpen(false)}
      />

      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Cognitive command center</div>
          <h2 style={titleStyle}>CodexForge brain runtime</h2>
          <p style={copyStyle}>
            A read-only command layer for runtime health, memory, agents,
            prediction, risks, replay, lineage, timeline, and the preserved graph inspector flow.
          </p>
          <div style={hintRowStyle}>
            <BrainReadOnlyBadge label="read-only command surface" />
            <span style={keyboardHintStyle}>Ctrl+K / Cmd+K palette</span>
            <span style={keyboardHintStyle}>? shortcuts</span>
            <span style={keyboardHintStyle}>G then G graph</span>
          </div>
        </div>
        <div style={headerControlsStyle}>
          <div style={statusGridStyle}>
            <Status label="Nodes" value={String(graph.nodes.length)} />
            <Status label="Edges" value={String(graph.edges.length)} />
            <Status label="Mode" value={activeMode} />
          </div>
          <BrainDensityControls value={density} onChange={setDensity} />
          <div style={actionGridStyle}>
            <button
              type="button"
              aria-label="Open Brain command palette"
              onClick={() => setPaletteOpen(true)}
              style={actionButtonStyle}
            >
              Ctrl+K
            </button>
            <button
              type="button"
              aria-label="Toggle Brain keyboard shortcuts"
              onClick={() => setShortcutsOpen((value) => !value)}
              style={actionButtonStyle}
            >
              Shortcuts
            </button>
          </div>
        </div>
      </div>

      <BrainCommandStatusBar
        activeMode={activeMode}
        commandCount={commands.length}
        historyCount={commandHistory.length}
        selectedNodeId={selectedNodeId}
        selectedNodeLabel={selectedNodeLabel}
        paletteOpen={paletteOpen}
      />

      <BrainSnapshotStatusStrip
        snapshot={runtimeSnapshot}
        summary={effectiveIntegrationSummary}
      />

      {qualityGateSummary ? (
        <BrainQualityGateStrip summary={qualityGateSummary} />
      ) : null}

      <div
        data-codexforge-brain-panel-readiness-summary
        style={readinessSummaryStyle}
      >
        <Status label="Live panels" value={String(effectiveIntegrationSummary.livePanels.length)} />
        <Status label="Mixed panels" value={String(effectiveIntegrationSummary.mixedPanels.length)} />
        <Status label="Fixture panels" value={String(effectiveIntegrationSummary.fixturePanels.length)} />
        <Status label="Unavailable" value={String(effectiveIntegrationSummary.unavailablePanels.length)} />
        <div style={sourceLegendStyle}>
          <span data-codexforge-brain-panel-source-live="true" style={sourceMarkerStyle}>live</span>
          <span data-codexforge-brain-panel-source-mixed="true" style={sourceMarkerStyle}>mixed</span>
          <span data-codexforge-brain-panel-source-fixture="true" style={sourceMarkerStyle}>fixture</span>
        </div>
      </div>

      {graph.nodes.length === 0 ? (
        <BrainPanelFrame
          title="Fixture-backed command center"
          eyebrow="Empty graph fallback"
          description="The command center remains navigable with read-only fixture panels while the preserved graph has no nodes."
          compact
          status={<BrainReadOnlyBadge label="no runtime mutation" />}
        />
      ) : null}

      <BrainQuickJumpPanel
        commands={commands}
        activeMode={activeMode}
        onCommand={activateCommand}
      />

      <BrainKeyboardShortcutsPanel
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />

      <BrainModeTabs activeMode={activeMode} onModeChange={setActiveMode} />

      <div style={getPanelGridStyle(density)}>
        <BrainLiveSnapshotPanel
          snapshot={runtimeSnapshot}
          panelData={effectivePanelData["live-snapshot"]}
        />
        <BrainRuntimeHealthPanel
          graph={graph}
          panelData={effectivePanelData["runtime-health"]}
        />
        <BrainSystemStatusPanel graph={graph} />
        <BrainMemoryClustersPanel
          graph={graph}
          panelData={effectivePanelData.memory}
        />
        <BrainAgentActivityPanel />
        <BrainPredictionPanel graph={graph} selectedNode={selectedNode} />
        <BrainRiskPanel graph={graph} panelData={effectivePanelData.risk} />
        <BrainTimelinePanel graph={graph} />
        <BrainReplayPanel graph={graph} />
        <BrainLineagePanel graph={graph} />
        <BrainSemanticHeatmapPanel
          graph={graph}
          panelData={effectivePanelData["semantic-heatmap"]}
        />
        <BrainKnowledgeTopologyPanel graph={graph} />
        <BrainRecommendationsPanel
          graph={graph}
          panelData={effectivePanelData.recommendations}
        />
        <BrainInsightQueuePanel graph={graph} />
        <BrainFocusModePanel
          graph={graph}
          selectedNodeId={selectedNodeId}
          panelData={effectivePanelData["focus-mode"]}
        />
        <BrainDrilldownPanel graph={graph} selectedNodeId={selectedNodeId} />
      </div>

      <ModeSummary mode={activeMode} />

      <div data-codexforge-brain-graph-preserved style={graphFrameStyle}>
        <BrainGraphView
          graph={graph}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
        />
      </div>

      <div data-codexforge-brain-inspector-preserved style={inspectorNoteStyle}>
        Graph Inspector remains below with the existing selection, pin, archive,
        copy, export, and raw JSON workflows.
      </div>
    </BrainResponsiveShell>
  );
}

function ModeSummary({ mode }: { mode: CodexForgeBrainCommandMode }) {
  const label = mode
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

  return (
    <BrainPanelFrame
      data-codexforge-brain-active-mode={mode}
      title={label}
      eyebrow="Active mode"
      description="Mode state is local to this command surface; graph data and runtime contracts remain unchanged."
      compact
      status={<BrainReadOnlyBadge label="keyboard-first" />}
    />
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <BrainMetricPill label={label} value={value} />
  );
}

const headerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  gap: 14,
  alignItems: "start",
};

const headerControlsStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const statusGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 8,
};

const actionGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const actionButtonStyle: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(14,165,233,0.10)",
  color: "inherit",
  borderRadius: 8,
  padding: "9px 10px",
  fontSize: 11,
  fontWeight: 900,
  cursor: "pointer",
};

const readinessSummaryStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))",
  gap: 8,
  alignItems: "stretch",
};

const sourceLegendStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  alignItems: "center",
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
};

const sourceMarkerStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 8px",
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  color: "rgba(224,242,254,0.86)",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
};

function getPanelGridStyle(density: BrainDisplayDensity): CSSProperties {
  const minWidth = density === "dense" ? 300 : density === "compact" ? 320 : 340;
  const gap = density === "dense" ? 10 : 12;

  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}px), 1fr))`,
    gap,
    alignItems: "start",
  };
}

const graphFrameStyle: CSSProperties = {
  display: "grid",
};

const inspectorNoteStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
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
  fontSize: 24,
  lineHeight: 1.1,
};

const copyStyle: CSSProperties = {
  margin: "8px 0 0",
  maxWidth: 880,
  color: "rgba(226,232,240,0.76)",
  fontSize: 13,
  lineHeight: 1.55,
};

const hintRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
  marginTop: 12,
};

const keyboardHintStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 8px",
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(14,165,233,0.08)",
  color: "rgba(224,242,254,0.86)",
  fontSize: 10,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

export default BrainCommandCenter;
