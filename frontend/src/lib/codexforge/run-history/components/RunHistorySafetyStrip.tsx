"use client";

import { rhCopy, rhPill } from "./RunHistoryStyles";

export function RunHistorySafetyStrip() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }} data-codexforge-run-history-safety-strip="RunHistorySafetyStrip renders no auto-promotion no Brain auto-mutation no auto-persist into Brain review required preserve latest-message authority no unsafe execution buttons no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text">
      {["Review required", "Copyable only", "No Brain auto-mutation", "No auto-promotion", "Latest-message authority"].map((label) => <span key={`run-history-safety-${label}`} style={rhPill}>{label}</span>)}
      <span style={rhCopy}>Session/supplied records only; no hidden persistence, no command execution, no file writes.</span>
    </div>
  );
}
