import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

export function EmptyState() {
  return (
    <div style={styles.emptyState}>
      <div style={emptyStateTitleStyle}>Ready for a real task.</div>
      <div style={emptyStateTextStyle}>
        Ask CodexForge to inspect the repo, plan an upgrade, design a product
        surface, or prepare an execution-safe task.
      </div>
    </div>
  );
}

const emptyStateTitleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 850,
};

const emptyStateTextStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 14,
  lineHeight: 1.65,
  opacity: 0.78,
  maxWidth: 560,
};