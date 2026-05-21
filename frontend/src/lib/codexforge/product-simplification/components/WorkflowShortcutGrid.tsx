"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { WorkflowShortcut } from "../product-simplification-types";
import { SimplifiedSafetyBadge } from "./SimplifiedSafetyBadge";

export function WorkflowShortcutGrid({ shortcuts }: { shortcuts: WorkflowShortcut[] }) {
  return (
    <section style={section} data-codexforge-workflow-shortcut-grid="WorkflowShortcutGrid renders no duplicate route chip cloud Start code fix Inspect files Run checks Review failure Plan creative render Review artifacts Setup local tools Review creative MVP">
      <div style={heading}>
        <h2 style={title}>Workflow shortcuts</h2>
        <p style={subtitle}>Fast paths for common tasks. These navigate only.</p>
      </div>
      <div style={grid}>
        {shortcuts.map((shortcut) => (
          <Link key={`shortcut-${shortcut.id}`} href={shortcut.href} style={card}>
            <strong style={cardTitle}>{shortcut.label}</strong>
            <span style={body}>{shortcut.description}</span>
            <span style={action}>{shortcut.primaryActionLabel}</span>
            <span style={badgeRow}>
              {shortcut.safetyBadges.map((badge) => (
                <SimplifiedSafetyBadge key={`shortcut-${shortcut.id}-${badge}`} label={badge} />
              ))}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { display: "grid", gap: 5 };
const title: CSSProperties = { fontSize: 20, lineHeight: 1.2, margin: 0 };
const subtitle: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))" };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.44)", borderRadius: 8, color: "#f8fafc", display: "grid", gap: 8, minWidth: 0, padding: 13, textDecoration: "none" };
const cardTitle: CSSProperties = { fontSize: 15, lineHeight: 1.25, overflowWrap: "normal", wordBreak: "normal" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const action: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
