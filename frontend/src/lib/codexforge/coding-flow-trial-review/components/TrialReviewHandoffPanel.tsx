"use client";

import type { TrialReviewHandoff } from "../coding-flow-trial-review-types";
import { buttonRow, copy, grid, itemBox, itemTitle, panel, secondaryButton, title } from "./TrialReviewPanelStyles";

export function TrialReviewHandoffPanel({ handoff, onCopy }: { handoff: TrialReviewHandoff; onCopy: (label: string, value: string) => void }) {
  return (
    <section style={panel} data-codexforge-trial-review-handoff-panel="TrialReviewHandoffPanel renders markdown trial review product issue draft UX fix prompt release readiness note">
      <h2 style={title}>{handoff.title}</h2>
      <div style={buttonRow}>
        <button type="button" style={secondaryButton} onClick={() => onCopy("trial review", handoff.markdownTrialReview)}>Copy trial review</button>
        <button type="button" style={secondaryButton} onClick={() => onCopy("UX fix plan", handoff.uxFixPrompt)}>Copy UX fix plan</button>
        <button type="button" style={secondaryButton} onClick={() => onCopy("go/no-go report", handoff.releaseReadinessNote)}>Copy go/no-go report</button>
      </div>
      <div style={grid}>
        {handoff.sections.map((section) => (
          <article key={`trial-handoff-${section.sectionId}`} style={itemBox}>
            <h3 style={itemTitle}>{section.title}</h3>
            <p style={copy}>{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
