"use client";

import type { ValidationCommandCatalog } from "../index";
import { vrCard, vrCopy, vrList, vrPill, vrTitle, vrButton } from "./ValidationRunnerStyles";

type Props = { catalog: ValidationCommandCatalog; selectedIds: readonly string[]; onToggle: (id: string) => void; onCopy?: (label: string, value: string) => void };

export function ValidationCommandCatalogPanel({ catalog, selectedIds, onToggle, onCopy }: Props) {
  return (
    <section style={vrCard} data-codexforge-validation-command-catalog-panel="ValidationCommandCatalogPanel renders npm run build npm run smoke:codexforge:server git diff --check smoke-codexforge-validation-runner.ps1">
      <strong style={vrTitle}>Validation Command Catalog</strong>
      <p style={vrCopy}>{catalog.summary.join(" ")}</p>
      <ul style={vrList}>
        {catalog.items.map((item) => (
          <li key={item.id} style={{ display: "grid", gap: 6, borderTop: "1px solid rgba(148,163,184,0.12)", paddingTop: 8 }}>
            <label style={{ alignItems: "start", display: "flex", gap: 8, minWidth: 0 }}>
              <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => onToggle(item.id)} />
              <span style={{ ...vrCopy, color: "#f8fafc", fontWeight: 800 }}>{item.label}</span>
            </label>
            <code style={vrCopy}>{item.command}</code>
            <span style={vrPill}>{item.category} / {item.riskLevel} / allowlisted={String(item.allowlisted)}</span>
            <button type="button" style={vrButton} onClick={() => onCopy?.("validation command", item.command)}>Copy command</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
