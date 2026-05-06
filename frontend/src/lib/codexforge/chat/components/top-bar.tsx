import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type TopBarProps = {
  sliderOpen: boolean;
  onOpenSlider: () => void;
  onAddSystemMessage: () => void;
  onClearChat: () => void;
};

export function TopBar({
  sliderOpen,
  onOpenSlider,
  onAddSystemMessage,
  onClearChat,
}: TopBarProps) {
  return (
    <div style={styles.topBar}>
      <div style={styles.brandWrap}>
        <div style={styles.brandOrb} />
        <div style={brandTextWrapStyle}>
          <div style={styles.brandTitle}>CodexForge</div>
          <div style={styles.brandSubtitle}>AI Workspace</div>
        </div>
      </div>

      <div style={topActionsStyle}>
        <button
          type="button"
          onClick={onOpenSlider}
          style={styles.pillGhostButton}
          aria-expanded={sliderOpen}
        >
          Workspace
        </button>

        <button
          type="button"
          onClick={onAddSystemMessage}
          style={styles.tinyGhostButton}
        >
          Add system note
        </button>

        <button type="button" onClick={onClearChat} style={styles.tinyGhostButton}>
          Clear
        </button>
      </div>
    </div>
  );
}

const brandTextWrapStyle: React.CSSProperties = {
  display: "grid",
  gap: 2,
};
const topActionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};