import type { ContinuityHandoffExport } from "../index";
import { button, codeBlock, item, muted, panel, title } from "./ContinuityHandoffStyles";

export function HandoffExportPanel({ exportPayload, onCopy }: { exportPayload: ContinuityHandoffExport; onCopy?: (label: string, text: string) => void }) {
  return (
    <section style={panel} data-codexforge-handoff-export-panel="HandoffExportPanel renders export builds markdown packet export builds next-session prompt copy only no auto-persistence">
      <h2 style={title}>Export</h2>
      <p style={muted}>UI copy only via user action. No filesystem write, no automatic clipboard copy in domain, and no auto-persistence.</p>
      <div style={item}>
        <strong>Markdown packet</strong>
        <button type="button" style={button} onClick={() => onCopy?.("markdown packet", exportPayload.markdownPacket)}>Copy handoff packet</button>
      </div>
      <div style={item}>
        <strong>Next-session prompt</strong>
        <button type="button" style={button} onClick={() => onCopy?.("next-session prompt", exportPayload.nextSessionPrompt)}>Copy next session prompt</button>
      </div>
      <div style={item}>
        <strong>Validation checklist</strong>
        <button type="button" style={button} onClick={() => onCopy?.("validation checklist", exportPayload.validationChecklist)}>Copy validation checklist</button>
      </div>
      <div style={item}>
        <strong>Rollback checklist</strong>
        <button type="button" style={button} onClick={() => onCopy?.("rollback checklist", exportPayload.rollbackChecklist)}>Copy rollback checklist</button>
      </div>
      <div style={item}>
        <strong>Memory review checklist</strong>
        <button type="button" style={button} onClick={() => onCopy?.("memory review checklist", exportPayload.memoryReviewChecklist)}>Copy memory review checklist</button>
      </div>
      <pre style={codeBlock}>{exportPayload.summary.join("\n")}</pre>
    </section>
  );
}
