"use client";

import { rhCopy, rhPanel, rhTitle } from "./RunHistoryStyles";

export function RunHistoryEmptyState() {
  return (
    <section style={rhPanel} data-codexforge-run-history-empty-state="RunHistoryEmptyState renders deterministic sample/recent placeholders clearly labeled no hidden persistence session supplied record copyable only">
      <h2 style={rhTitle}>No persisted run database</h2>
      <p style={rhCopy}>This timeline uses supplied records or deterministic sample records. It does not auto-save, auto-persist into Brain, auto-promote memory, auto-run validation, or auto-apply patches.</p>
    </section>
  );
}
