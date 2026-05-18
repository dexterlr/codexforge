import type { CodexForgeCommandShortcut } from "./command-palette-types";

export function buildCodexForgeCommandShortcuts(): CodexForgeCommandShortcut[] {
  return [
    {
      id: "open",
      keys: ["Ctrl+K", "Cmd+K"],
      label: "Open palette",
      description: "Ctrl+K / Cmd+K opens palette.",
    },
    { id: "close", keys: ["Escape"], label: "Close", description: "Escape closes palette." },
    {
      id: "select",
      keys: ["Enter"],
      label: "Select",
      description: "Enter selects highlighted item.",
    },
    {
      id: "navigate",
      keys: ["ArrowUp", "ArrowDown"],
      label: "Navigate",
      description: "Arrow keys navigate commands.",
    },
    {
      id: "copy-route-policy",
      keys: ["Copy", "Route"],
      label: "Action policy",
      description: "Copy actions copy text only. Route actions navigate only.",
    },
  ];
}

export function getCodexForgeCommandPaletteShortcutLabel(): string {
  return "Ctrl+K / Cmd+K";
}

export function summarizeCodexForgeCommandShortcuts(
  shortcuts = buildCodexForgeCommandShortcuts()
): string {
  return shortcuts.map((shortcut) => `${shortcut.label}: ${shortcut.keys.join(" / ")}`).join("; ");
}
