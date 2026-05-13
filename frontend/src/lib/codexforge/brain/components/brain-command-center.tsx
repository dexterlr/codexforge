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
import { BrainTimelinePanel } from "./brain-timeline-panel";
import { BrainCommandPalette } from "./brain-command-palette";
import { BrainCommandStatusBar } from "./brain-command-status-bar";
import { BrainKeyboardShortcutsPanel } from "./brain-keyboard-shortcuts-panel";
import { BrainQuickJumpPanel } from "./brain-quick-jump-panel";
import {
  buildBrainCommandRegistry,
  matchBrainKeyboardShortcut,
  type CodexForgeBrainCommand,
} from "./commands";
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
}: CodexForgeBrainCommandCenterProps) {
  const [activeMode, setActiveMode] =
    useState<CodexForgeBrainCommandMode>("runtime-health");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<CodexForgeBrainCommand[]>([]);

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
    <section
      data-codexforge-brain-command-center
      style={shellStyle}
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
        </div>
        <div style={headerControlsStyle}>
          <div style={statusGridStyle}>
            <Status label="Nodes" value={String(graph.nodes.length)} />
            <Status label="Edges" value={String(graph.edges.length)} />
            <Status label="Mode" value={activeMode} />
          </div>
          <div style={actionGridStyle}>
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              style={actionButtonStyle}
            >
              Ctrl+K
            </button>
            <button
              type="button"
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

      <div style={panelGridStyle}>
        <BrainRuntimeHealthPanel graph={graph} />
        <BrainSystemStatusPanel graph={graph} />
        <BrainMemoryClustersPanel graph={graph} />
        <BrainAgentActivityPanel />
        <BrainPredictionPanel graph={graph} selectedNode={selectedNode} />
        <BrainRiskPanel graph={graph} />
        <BrainTimelinePanel graph={graph} />
        <BrainReplayPanel graph={graph} />
        <BrainLineagePanel graph={graph} />
        <BrainSemanticHeatmapPanel graph={graph} />
        <BrainKnowledgeTopologyPanel graph={graph} />
        <BrainRecommendationsPanel graph={graph} />
        <BrainInsightQueuePanel graph={graph} />
        <BrainFocusModePanel graph={graph} selectedNodeId={selectedNodeId} />
        <BrainDrilldownPanel graph={graph} selectedNodeId={selectedNodeId} />
      </div>

      <div style={modePanelStyle} data-codexforge-brain-active-mode={activeMode}>
        <ModeSummary mode={activeMode} />
      </div>

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
    </section>
  );
}

function ModeSummary({ mode }: { mode: CodexForgeBrainCommandMode }) {
  const label = mode
    .split("-")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");

  return (
    <div>
      <div style={eyebrowStyle}>Active mode</div>
      <strong style={{ fontSize: 15 }}>{label}</strong>
    </div>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <div style={statusStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const shellStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  marginBottom: 18,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.24)",
  background:
    "radial-gradient(circle at 35% 0%, rgba(14,165,233,0.22), transparent 34%), linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.92))",
  color: "rgba(241,245,249,0.96)",
  boxShadow: "0 22px 80px rgba(2,6,23,0.30)",
};

const headerStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 0.42fr)",
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

const statusStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
  minWidth: 0,
};

const panelGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))",
  gap: 12,
  alignItems: "start",
};

const modePanelStyle: CSSProperties = {
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

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

export default BrainCommandCenter;
