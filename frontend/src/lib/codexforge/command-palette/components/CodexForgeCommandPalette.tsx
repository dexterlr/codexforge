"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { buildCodexForgeCommandGroups } from "../command-groups";
import { buildCodexForgeCommandPaletteSummary, summarizeCodexForgeCommandPaletteSession } from "../command-palette-summary";
import type { CodexForgeCommand, CodexForgeCommandRouteAvailability } from "../command-palette-types";
import { buildCodexForgeCommands } from "../command-registry";
import { searchCodexForgeCommands } from "../command-search";
import { buildCodexForgeCommandSafetyReport } from "../command-safety";
import { buildCodexForgeCommandShortcuts } from "../command-shortcuts";
import { CommandPaletteEmptyState } from "./CommandPaletteEmptyState";
import { CommandPaletteFooter } from "./CommandPaletteFooter";
import { CommandPaletteGroup } from "./CommandPaletteGroup";
import { CommandPaletteOverlay } from "./CommandPaletteOverlay";
import { CommandPaletteSafetyPanel } from "./CommandPaletteSafetyPanel";
import { CommandPaletteSearchBox } from "./CommandPaletteSearchBox";
import { CommandPaletteTrigger } from "./CommandPaletteTrigger";

export function buildCodexForgeCommandPaletteStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function CodexForgeCommandPalette({
  routeAvailability,
}: {
  routeAvailability?: CodexForgeCommandRouteAvailability;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const commands = useMemo(
    () => buildCodexForgeCommands({ routeAvailability, includeEducationalBlockedCommands: true }),
    [routeAvailability]
  );
  const trimmedQuery = query.trimStart();
  const developerSearch = trimmedQuery.toLowerCase().startsWith("dev:");
  const effectiveQuery = developerSearch ? trimmedQuery.slice(4).trimStart() : query;
  const searchableCommands = useMemo(
    () => commands.filter((command) =>
      developerSearch ? command.group !== "User features" : command.group === "User features"
    ),
    [commands, developerSearch]
  );
  const results = useMemo(() => {
    return searchCodexForgeCommands(searchableCommands, effectiveQuery, developerSearch ? 60 : 12);
  }, [developerSearch, effectiveQuery, searchableCommands]);
  const rankedCommands = useMemo(() => results.map((result) => result.command), [results]);
  const groups = useMemo(() => buildCodexForgeCommandGroups(rankedCommands), [rankedCommands]);
  const visibleCommands = useMemo(() => groups.flatMap((group) => group.commands), [groups]);
  const safetyReport = useMemo(
    () => buildCodexForgeCommandSafetyReport(searchableCommands),
    [searchableCommands]
  );
  const shortcuts = useMemo(() => buildCodexForgeCommandShortcuts(), []);
  const summary = useMemo(
    () => buildCodexForgeCommandPaletteSummary(searchableCommands),
    [searchableCommands]
  );
  const selectedCommand = visibleCommands[selectedIndex];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onPaletteKeyDown(event: KeyboardEvent) {
      const searchHasFocus =
        event.target instanceof HTMLInputElement &&
        event.target.hasAttribute("data-codexforge-command-palette-search-box");
      if (!searchHasFocus) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => Math.min(current + 1, Math.max(visibleCommands.length - 1, 0)));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => Math.max(current - 1, 0));
      }
      if (event.key === "Enter" && selectedCommand) {
        event.preventDefault();
        selectCommand(selectedCommand);
      }
    }

    window.addEventListener("keydown", onPaletteKeyDown);
    return () => window.removeEventListener("keydown", onPaletteKeyDown);
  }, [open, selectedCommand, visibleCommands.length]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (selectedIndex >= visibleCommands.length) setSelectedIndex(0);
  }, [selectedIndex, visibleCommands.length]);

  function closePalette() {
    setOpen(false);
    setQuery("");
    setCopiedLabel(null);
  }

  function selectCommand(command: CodexForgeCommand) {
    if (command.disabledReason) return;
    if (command.copyPayload) {
      void navigator.clipboard
        ?.writeText(command.copyPayload)
        .then(() => setCopiedLabel(command.label))
        .catch(() => setCopiedLabel(null));
      return;
    }
    if (command.href) {
      window.location.assign(command.href);
      return;
    }
  }

  return (
    <div
      data-codexforge-command-palette="CodexForgeCommandPalette renders Command Palette Ctrl+K Cmd+K Escape no command execution without approval no file writes without approval preserve latest-message authority Main Pages God Tier UX Upgrade premium command center review-only UX upgrade"
      style={root}
    >
      <CommandPaletteTrigger onOpen={() => setOpen(true)} />
      {open ? (
        <CommandPaletteOverlay onClose={closePalette}>
          <div style={header}>
            <div style={titleBlock}>
              <span style={eyebrow}>Global Command Palette</span>
              <h2 style={title}>Safe command discovery</h2>
              <p style={summaryText}>{summarizeCodexForgeCommandPaletteSession(summary)}</p>
            </div>
            <button type="button" onClick={closePalette} style={closeButton} aria-label="Close Command Palette">
              Escape
            </button>
          </div>
          <CommandPaletteSearchBox
            value={query}
            onChange={setQuery}
            activeDescendantId={selectedCommand ? `codexforge-command-${selectedCommand.id}` : undefined}
          />
          <p id="codexforge-command-palette-search-help" style={searchHelp}>
            Search normal product areas. Type <strong>dev:</strong> to enter Developer Diagnostics search.
          </p>
          {copiedLabel ? <div role="status" aria-live="polite" style={copyNotice}>{copiedLabel} copied</div> : null}
          <CommandPaletteSafetyPanel report={safetyReport} />
          <div id="codexforge-command-palette-results" role="listbox" aria-label="Command palette results" style={list} data-codexforge-command-palette-list-key={buildCodexForgeCommandPaletteStableKey([query || "empty", String(visibleCommands.length)])}>
            {groups.length > 0 ? (
              groups.map((group) => (
                <CommandPaletteGroup
                  key={group.id}
                  group={group}
                  selectedId={selectedCommand?.id}
                  onSelect={selectCommand}
                />
              ))
            ) : (
              <CommandPaletteEmptyState />
            )}
          </div>
          <CommandPaletteFooter shortcuts={shortcuts} />
        </CommandPaletteOverlay>
      ) : null}
    </div>
  );
}

const root: CSSProperties = {
  minWidth: 0,
};

const header: CSSProperties = {
  alignItems: "start",
  display: "flex",
  gap: 12,
  justifyContent: "space-between",
  minWidth: 0,
};

const titleBlock: CSSProperties = {
  display: "grid",
  gap: 4,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#5eead4",
  fontSize: 11,
  fontWeight: 950,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  fontSize: 20,
  letterSpacing: 0,
  margin: 0,
  overflowWrap: "anywhere",
};

const summaryText: CSSProperties = {
  color: "#94a3b8",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const searchHelp: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  lineHeight: 1.4,
  margin: 0,
};

const closeButton: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.18)",
  background: "rgba(15,23,42,0.75)",
  borderRadius: 8,
  color: "#cbd5e1",
  cursor: "pointer",
  fontSize: 11,
  fontWeight: 900,
  padding: "8px 9px",
};

const copyNotice: CSSProperties = {
  border: "1px solid rgba(94,234,212,0.24)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 12,
  fontWeight: 900,
  padding: 9,
  overflowWrap: "anywhere",
};

const list: CSSProperties = {
  display: "grid",
  gap: 13,
  maxHeight: "46vh",
  minWidth: 0,
  overflowY: "auto",
  paddingRight: 2,
};
