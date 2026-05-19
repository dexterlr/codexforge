import type { ContinuityHandoffValidationPlan } from "../index";
import { button, codeBlock, item, muted, panel, pill, title } from "./ContinuityHandoffStyles";

export function HandoffValidationPlanPanel({ plan, onCopy }: { plan: ContinuityHandoffValidationPlan; onCopy?: (label: string, text: string) => void }) {
  return (
    <section style={panel} data-codexforge-handoff-validation-plan-panel="HandoffValidationPlanPanel renders UI cannot execute commands copy only no command execution">
      <h2 style={title}>Validation Plan</h2>
      <p style={muted}>Commands are copy only and manual only. No command execution buttons are provided.</p>
      {plan.commands.map((command) => (
        <div key={command.id} style={item}>
          <span style={pill}>{command.manualOnly ? "manual only" : "review"}</span>
          <strong style={{ overflowWrap: "anywhere" }}>{command.label}</strong>
          <pre style={codeBlock}>{command.command}</pre>
          <p style={muted}>{command.purpose}</p>
          <button type="button" style={button} onClick={() => onCopy?.(command.label, command.command)}>Copy command</button>
        </div>
      ))}
    </section>
  );
}
