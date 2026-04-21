import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type ToolbarStatusProps = {
  busy: boolean;
  statusText: string;
  conversationState: string;
};

export function ToolbarStatus({
  busy,
  statusText,
  conversationState,
}: ToolbarStatusProps) {
  return (
    <div style={styles.toolbar}>
      <div style={toolbarLeft}>
        <span style={styles.badge}>
          <span
            aria-hidden="true"
            style={{
              ...statusDot,
              background: busy
                ? "rgba(245,158,11,0.95)"
                : "rgba(16,185,129,0.95)",
              boxShadow: busy
                ? "0 0 0 4px rgba(245,158,11,0.15)"
                : "0 0 0 4px rgba(16,185,129,0.15)",
            }}
          />
          {statusText}
        </span>

        <span style={styles.subtleText}>{conversationState}</span>
      </div>

      <div style={styles.subtleText}>Stored in localStorage for fast iteration</div>
    </div>
  );
}

const toolbarLeft: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const statusDot: React.CSSProperties = {
  display: "inline-block",
  width: 8,
  height: 8,
  borderRadius: 999,
  marginRight: 8,
};