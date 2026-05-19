"use client";

import type { ValidationOutputCapture } from "../index";
import { vrCard, vrCopy, vrInput, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

type Props = { capture: ValidationOutputCapture; manualOutput: string; onManualOutputChange: (value: string) => void };

export function ValidationOutputCapturePanel({ capture, manualOutput, onManualOutputChange }: Props) {
  return (
    <section style={vrCard} data-codexforge-validation-output-capture-panel="ValidationOutputCapturePanel renders output capture supports stdout excerpt supports stderr excerpt caps output length manual paste supported no auto-persistence">
      <strong style={vrTitle}>Output Capture</strong>
      <span style={vrPill}>captured={String(capture.outputCaptured)} failures={capture.failureCount}</span>
      <textarea style={vrInput} rows={7} value={manualOutput} onChange={(event) => onManualOutputChange(event.target.value)} placeholder="Paste manual validation output excerpt" />
      <ul style={vrList}>
        {capture.items.map((item) => <li key={item.id} style={vrCopy}>{item.command}: {item.status} {item.truncated ? "truncated" : ""}</li>)}
      </ul>
    </section>
  );
}
