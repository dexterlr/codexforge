"use client";

import type { CSSProperties } from "react";
import type { EvidenceGroundedReplySections } from "../evidence-grounded-chat-types";

type EvidenceReplyGroundingPanelProps = {
  reply: EvidenceGroundedReplySections;
};

export function EvidenceReplyGroundingPanel({ reply }: EvidenceReplyGroundingPanelProps) {
  return (
    <section data-codexforge-evidence-reply-grounding-panel="EvidenceReplyGroundingPanel renders reply sections include Evidence used reply sections include Confidence and caveats" style={panel}>
      <strong>Reply grounding sections</strong>
      <div style={list}>
        {reply.sections.map((section) => (
          <article key={section.title} style={card}>
            <strong style={heading}>{section.title}</strong>
            {section.items.map((item) => (
              <span key={item} style={itemStyle}>{item}</span>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.28)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const list: CSSProperties = { display: "grid", gap: 7, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, padding: 8, display: "grid", gap: 5, minWidth: 0 };
const heading: CSSProperties = { fontSize: 12, color: "#bfdbfe", overflowWrap: "anywhere" };
const itemStyle: CSSProperties = { fontSize: 11, opacity: 0.76, overflowWrap: "anywhere" };
