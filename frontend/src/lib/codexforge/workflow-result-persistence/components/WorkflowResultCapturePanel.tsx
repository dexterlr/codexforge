"use client";

import type { WorkflowResultCapture } from "../workflow-result-types";
import { wrCopy, wrList, wrMeta, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultCapturePanel({ capture }: { capture: WorkflowResultCapture }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-capture-panel="WorkflowResultCapturePanel renders capture summary possible-secret review required excluded from memory candidate validation output capped">
      <h2 style={wrTitle}>Capture summary</h2>
      {capture.summary.map((line) => <p key={`workflow-result-capture-summary-${line.slice(0, 30)}`} style={wrCopy}>{line}</p>)}
      <div style={wrList}>
        {capture.items.map((item) => (
          <article key={`workflow-result-capture-item-${item.itemId}`} style={itemBox}>
            <p style={wrMeta}>{item.label}</p>
            <p style={wrCopy}>{item.valueSummary}</p>
            <p style={wrCopy}>Sensitivity: {item.sensitivity}; review required={String(item.reviewRequired)}; memory candidate={String(item.includeInMemoryCandidate)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const itemBox = { borderTop: "1px solid rgba(148,163,184,0.14)", display: "grid", gap: 4, paddingTop: 8 };
