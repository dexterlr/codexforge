import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

const EMPTY_EXAMPLES = [
  "Help me design CodexForge memory.",
  "Plan a website build from zero.",
  "Turn this bug into a debugging checklist.",
] as const;

export function EmptyChatState() {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyTitle}>Start the CodexForge workspace</div>
      <div style={styles.emptyText}>
        Ask it to design a product, debug a problem, plan a feature, or
        research a topic.
      </div>

      <div style={styles.emptyExamples}>
        {EMPTY_EXAMPLES.map((example) => (
          <div key={example} style={styles.exampleChip}>
            “{example}”
          </div>
        ))}
      </div>
    </div>
  );
}