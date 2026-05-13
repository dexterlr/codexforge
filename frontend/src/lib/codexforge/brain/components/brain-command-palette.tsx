"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  searchBrainCommands,
  type CodexForgeBrainCommand,
  type CodexForgeBrainCommandCategory,
  type CodexForgeBrainCommandSearchResult,
} from "./commands";
import { BrainEmptyState, BrainReadOnlyBadge } from "./ui";

type BrainCommandPaletteProps = {
  open: boolean;
  commands: readonly CodexForgeBrainCommand[];
  history?: readonly CodexForgeBrainCommand[];
  onActivateCommand: (command: CodexForgeBrainCommand) => void;
  onClose: () => void;
};

const CATEGORY_LABELS: Record<CodexForgeBrainCommandCategory, string> = {
  navigation: "Navigation",
  focus: "Focus",
  graph: "Graph",
  replay: "Replay",
  lineage: "Lineage",
  topology: "Topology",
  recommendations: "Recommendations",
  health: "Health",
  agents: "Agents",
  files: "Files",
  memory: "Memory",
  safety: "Safety",
  help: "Help",
};

function isActivatable(command: CodexForgeBrainCommand): boolean {
  return command.safety === "read-only" && !command.disabledReason;
}

function groupResults(results: readonly CodexForgeBrainCommandSearchResult[]) {
  const groups = new Map<
    CodexForgeBrainCommandCategory,
    CodexForgeBrainCommandSearchResult[]
  >();

  for (const result of results) {
    const current = groups.get(result.command.category) ?? [];
    current.push(result);
    groups.set(result.command.category, current);
  }

  return Array.from(groups.entries()).map(([category, groupResults]) => ({
    category,
    label: CATEGORY_LABELS[category],
    results: groupResults,
  }));
}

export function BrainCommandPalette({
  open,
  commands,
  history = [],
  onActivateCommand,
  onClose,
}: BrainCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const results = useMemo(
    () => searchBrainCommands(commands, query).slice(0, 80),
    [commands, query]
  );
  const groups = useMemo(() => groupResults(results), [results]);
  const selectedResult = results[selectedIndex] ?? results[0] ?? null;

  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!open) {
    return null;
  }

  function activate(command: CodexForgeBrainCommand): void {
    if (!isActivatable(command)) return;
    onActivateCommand(command);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => Math.min(results.length - 1, current + 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => Math.max(0, current - 1));
      return;
    }

    if (event.key === "Enter" && selectedResult) {
      event.preventDefault();
      activate(selectedResult.command);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Brain command palette"
      data-codexforge-brain-command-palette
      onKeyDown={handleKeyDown}
      style={overlayStyle}
    >
      <div style={paletteStyle}>
        <div style={headerStyle}>
          <div>
            <div style={eyebrowStyle}>Brain command palette</div>
            <h2 style={titleStyle}>Keyboard cognitive navigation</h2>
          </div>
          <BrainReadOnlyBadge label="read-only commands" />
          <button type="button" onClick={onClose} style={closeStyle}>
            Escape
          </button>
        </div>

        <input
          ref={inputRef}
          aria-label="Search read-only Brain commands"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search modes, panels, focus targets, health, replay, topology..."
          data-codexforge-brain-command-search
          style={inputStyle}
        />

        {history.length > 0 ? (
          <section style={historyStyle}>
            <div style={eyebrowStyle}>Session history</div>
            <div style={historyGridStyle}>
              {history.slice(0, 5).map((command) => (
                <button
                  key={`history:${command.id}`}
                  type="button"
                  data-codexforge-brain-command-result
                  data-codexforge-brain-command-safety={command.safety}
                  onClick={() => activate(command)}
                  disabled={!isActivatable(command)}
                  style={historyButtonStyle}
                >
                  {command.label}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div style={resultFrameStyle}>
          {results.length === 0 ? (
            <BrainEmptyState
              title="No matching read-only Brain commands."
              detail="Try graph, health, topology, replay, focus, agents, or status."
              style={emptyStyle}
            />
          ) : (
            groups.map((group) => (
              <section
                key={group.category}
                data-codexforge-brain-command-category={group.category}
                style={groupStyle}
              >
                <div style={categoryHeaderStyle}>
                  <span>{group.label}</span>
                  <span>{group.results.length}</span>
                </div>
                <div style={resultListStyle}>
                  {group.results.map((result) => {
                    const globalIndex = results.findIndex(
                      (item) => item.command.id === result.command.id
                    );
                    const selected = globalIndex === selectedIndex;
                    const command = result.command;
                    const activatable = isActivatable(command);

                    return (
                      <button
                        key={command.id}
                        type="button"
                        data-codexforge-brain-command-result
                        data-codexforge-brain-command-safety={command.safety}
                        disabled={!activatable}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        onClick={() => activate(command)}
                        aria-label={`${command.label}: ${command.description}`}
                        style={{
                          ...resultStyle,
                          borderColor: selected
                            ? "rgba(125,211,252,0.62)"
                            : "rgba(255,255,255,0.09)",
                          background: selected
                            ? "rgba(14,165,233,0.16)"
                            : "rgba(255,255,255,0.045)",
                          opacity: activatable ? 1 : 0.58,
                          cursor: activatable ? "pointer" : "not-allowed",
                        }}
                      >
                        <div style={resultMainStyle}>
                          <strong>{command.label}</strong>
                          <span>{command.description}</span>
                          {command.disabledReason ? (
                            <span style={disabledReasonStyle}>
                              {command.disabledReason}
                            </span>
                          ) : null}
                        </div>
                        <div style={resultMetaStyle}>
                          <span
                            data-codexforge-brain-command-safety={command.safety}
                            style={safetyStyle}
                          >
                            {command.safety}
                          </span>
                          {command.shortcut ? (
                            <span style={shortcutStyle}>{command.shortcut}</span>
                          ) : null}
                          <span style={scoreStyle}>{result.score.toFixed(2)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 80,
  display: "grid",
  placeItems: "start center",
  padding: "8vh 16px 16px",
  background: "rgba(2,6,23,0.70)",
  backdropFilter: "blur(12px)",
};

const paletteStyle: CSSProperties = {
  width: "min(920px, 100%)",
  maxHeight: "84vh",
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.28)",
  background:
    "radial-gradient(circle at 20% 0%, rgba(14,165,233,0.24), transparent 34%), rgba(15,23,42,0.98)",
  color: "rgba(241,245,249,0.96)",
  boxShadow: "0 32px 120px rgba(0,0,0,0.50)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
  flexWrap: "wrap",
};

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(125,211,252,0.28)",
  background: "rgba(2,6,23,0.66)",
  color: "inherit",
  borderRadius: 8,
  padding: "13px 14px",
  outline: "none",
  fontSize: 14,
};

const historyStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.035)",
};

const historyGridStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
};

const historyButtonStyle: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(14,165,233,0.10)",
  color: "inherit",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 11,
  fontWeight: 800,
  cursor: "pointer",
};

const resultFrameStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  overflow: "auto",
  paddingRight: 3,
};

const groupStyle: CSSProperties = {
  display: "grid",
  gap: 7,
};

const categoryHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  color: "rgba(186,230,253,0.88)",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
};

const resultListStyle: CSSProperties = {
  display: "grid",
  gap: 7,
};

const resultStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 10,
  alignItems: "start",
  textAlign: "left",
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  color: "inherit",
  minWidth: 0,
};

const resultMainStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
  fontSize: 12,
  lineHeight: 1.45,
};

const resultMetaStyle: CSSProperties = {
  display: "flex",
  gap: 6,
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "end",
};

const safetyStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  border: "1px solid rgba(34,197,94,0.20)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.94)",
  fontSize: 10,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const shortcutStyle: CSSProperties = {
  borderRadius: 6,
  padding: "3px 6px",
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(14,165,233,0.10)",
  color: "rgba(224,242,254,0.94)",
  fontSize: 10,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const scoreStyle: CSSProperties = {
  color: "rgba(148,163,184,0.86)",
  fontSize: 10,
  fontWeight: 800,
};

const disabledReasonStyle: CSSProperties = {
  color: "rgba(254,243,199,0.88)",
};

const emptyStyle: CSSProperties = {
  fontSize: 13,
};

const closeStyle: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  color: "rgba(226,232,240,0.86)",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 11,
  fontWeight: 900,
  cursor: "pointer",
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
  fontSize: 20,
  lineHeight: 1.15,
};
