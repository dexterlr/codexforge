import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type LatestReplyCardProps = {
  textLength: number;
  sourceLabel: string;
  structured: boolean;
  toolCount: number;
};

export function LatestReplyCard({
  textLength,
  sourceLabel,
  structured,
  toolCount,
}: LatestReplyCardProps) {
  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>Latest assistant reply</div>
      <div style={styles.panelText}>
        Last reply length: <b>{textLength}</b> characters
      </div>
      <div style={styles.panelText}>
        Source: <b>{sourceLabel}</b>
      </div>
      <div style={styles.panelText}>
        Structured rendering: <b>{structured ? "on" : "text only"}</b>
      </div>
      <div style={styles.panelText}>
        Tools shown: <b>{toolCount}</b>
      </div>
    </div>
  );
}