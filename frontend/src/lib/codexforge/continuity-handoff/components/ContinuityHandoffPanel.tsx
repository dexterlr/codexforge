import type { ContinuityHandoffPacketSection } from "../index";
import { item, muted, panel, title } from "./ContinuityHandoffStyles";

export function ContinuityHandoffPanel({ sections }: { sections: readonly ContinuityHandoffPacketSection[] }) {
  return (
    <section style={panel} data-codexforge-handoff-panel="ContinuityHandoffPanel renders packet includes Current State Validation Results Known Risks Memory Posture Brain Continuity Posture Rollback Posture">
      <h2 style={title}>Packet Preview</h2>
      {sections.map((section) => (
        <article key={section.id} style={item}>
          <strong style={{ overflowWrap: "anywhere" }}>{section.title}</strong>
          {section.lines.slice(0, 4).map((line) => (
            <p key={line} style={muted}>{line}</p>
          ))}
        </article>
      ))}
    </section>
  );
}
