import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { CodexForgeLocalActionBar } from "@/lib/codexforge/navigation";

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
    <CodexForgeLocalActionBar
      title="AI Workspace"
      subtitle="Chat, memory, tool state, and execution context"
      status={sliderOpen ? "Workspace panel open" : "Ready"}
    >
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
    </CodexForgeLocalActionBar>
  );
}

const topActionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "flex-end",
};
