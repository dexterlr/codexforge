"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { UserIntentOption } from "../product-simplification-types";
import { SimplifiedSafetyBadge } from "./SimplifiedSafetyBadge";

export function UserIntentChooser({ intents }: { intents: UserIntentOption[] }) {
  return (
    <section style={section} data-codexforge-user-intent-chooser="UserIntentChooser renders What do you want to do Fix code Inspect project files Run checks Plan creative work Setup local tools plain-English copy">
      <div style={headingBlock}>
        <h2 style={title}>What do you want to do?</h2>
        <p style={subtitle}>Choose a plain-English goal. Advanced routes stay available after the basics.</p>
      </div>
      <div style={grid}>
        {intents.slice(0, 8).map((intent) => (
          <article key={`intent-${intent.id}`} style={card}>
            <div style={cardText}>
              <h3 style={cardTitle}>{intent.label}</h3>
              <p style={body}>{intent.description}</p>
              <p style={outcome}>{intent.userOutcome}</p>
            </div>
            <div style={badgeRow}>
              {intent.safetyPosture.slice(0, 2).map((badge) => (
                <SimplifiedSafetyBadge key={`intent-${intent.id}-${badge}`} label={badge} />
              ))}
            </div>
            <Link href={intent.primaryRoute} style={link}>
              {intent.nextActionLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { display: "grid", gap: 14, minWidth: 0 };
const headingBlock: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const title: CSSProperties = { fontSize: 22, lineHeight: 1.15, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const subtitle: CSSProperties = { color: "#cbd5e1", fontSize: 14, lineHeight: 1.55, margin: 0 };
const grid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.44)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const cardText: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const cardTitle: CSSProperties = { fontSize: 17, lineHeight: 1.25, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const body: CSSProperties = { color: "#dbeafe", fontSize: 13, lineHeight: 1.5, margin: 0 };
const outcome: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0 };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const link: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 10px", textAlign: "center", textDecoration: "none" };
