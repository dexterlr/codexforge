"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainCommand } from "./commands";
import type { CodexForgeBrainCommandMode } from "./brain-command-center-types";

type BrainQuickJumpPanelProps = {
  commands: readonly CodexForgeBrainCommand[];
  activeMode: CodexForgeBrainCommandMode;
  onCommand: (command: CodexForgeBrainCommand) => void;
};

const QUICK_COMMAND_IDS = [
  "brain.mode.runtime-health",
  "brain.mode.system-status",
  "brain.mode.graph",
  "brain.mode.focus-mode",
  "brain.mode.drilldown",
  "brain.mode.knowledge-topology",
  "brain.mode.replay",
  "brain.mode.lineage",
  "brain.mode.recommendations",
  "brain.mode.insight-queue",
] as const;

function isActivatable(command: CodexForgeBrainCommand): boolean {
  return command.safety === "read-only" && !command.disabledReason;
}

export function BrainQuickJumpPanel({
  commands,
  activeMode,
  onCommand,
}: BrainQuickJumpPanelProps) {
  const commandLookup = new Map(commands.map((command) => [command.id, command]));
  const quickCommands = QUICK_COMMAND_IDS.map((id) => commandLookup.get(id)).filter(
    (command): command is CodexForgeBrainCommand => Boolean(command)
  );

  return (
    <section data-codexforge-brain-quick-jump-panel style={panelStyle}>
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Quick jump</div>
          <h2 style={titleStyle}>High-signal cognitive surfaces</h2>
        </div>
        <span style={pillStyle}>read-only</span>
      </div>

      <div style={gridStyle}>
        {quickCommands.map((command) => {
          const active = command.targetMode === activeMode;
          const activatable = isActivatable(command);

          return (
            <button
              key={command.id}
              type="button"
              data-codexforge-brain-quick-jump-command
              disabled={!activatable}
              onClick={() => {
                if (activatable) onCommand(command);
              }}
              style={{
                ...buttonStyle,
                borderColor: active
                  ? "rgba(125,211,252,0.56)"
                  : "rgba(255,255,255,0.09)",
                background: active
                  ? "rgba(14,165,233,0.16)"
                  : "rgba(255,255,255,0.04)",
                opacity: activatable ? 1 : 0.6,
              }}
            >
              <strong>{command.label.replace("Jump to ", "")}</strong>
              <span>{command.shortcut ?? command.kind}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(15,23,42,0.72)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  gap: 8,
};

const buttonStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  textAlign: "left",
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  color: "inherit",
  cursor: "pointer",
  fontSize: 12,
  lineHeight: 1.35,
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(34,197,94,0.10)",
  color: "rgba(220,252,231,0.94)",
  fontSize: 10,
  fontWeight: 900,
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
  lineHeight: 1.2,
};

