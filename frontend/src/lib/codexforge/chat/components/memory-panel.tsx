"use client";

import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import type { CodexForgeMemoryItem } from "@/lib/codexforge/chat/use-codexforge-chat";

type MemoryPanelProps = {
  memory?: CodexForgeMemoryItem[];
  onPinMemory?: (memoryId: string) => void;
  onUnpinMemory?: (memoryId: string) => void;
  onDeleteMemory?: (memoryId: string) => void;
  onClearMemory?: () => void;
  title?: string;
  emptyText?: string;
  maxRecentItems?: number;
  compact?: boolean;
};

const memoryShell: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const memoryMetaRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const memoryStatsWrap: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const memoryStatChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
  opacity: 0.9,
};

const memoryGroup: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const memoryGroupTitle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0.3,
  textTransform: "uppercase",
  opacity: 0.65,
};

const memoryList: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const memoryCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
};

const memoryHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
};

const memoryBadgeRow: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  alignItems: "center",
};

const memoryBadge: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0.25,
  textTransform: "uppercase",
};

const memoryPinnedBadge: React.CSSProperties = {
  ...memoryBadge,
  border: "1px solid rgba(16,185,129,0.22)",
  background: "rgba(16,185,129,0.15)",
};

const memoryImportanceChip: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  opacity: 0.7,
};

const memoryContent: React.CSSProperties = {
  lineHeight: 1.45,
};

const memoryActions: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

function getMemoryTypeLabel(type: CodexForgeMemoryItem["type"]) {
  if (type === "fact") return "Fact";
  if (type === "decision") return "Decision";
  if (type === "task") return "Task";
  return "Note";
}

function sortPinned(memory: CodexForgeMemoryItem[]) {
  return [...memory].sort((a, b) => b.updatedAt - a.updatedAt);
}

function sortRecent(memory: CodexForgeMemoryItem[]) {
  return [...memory].sort((a, b) => b.updatedAt - a.updatedAt);
}

function MemoryItemCard({
  item,
  onPinMemory,
  onUnpinMemory,
  onDeleteMemory,
}: {
  item: CodexForgeMemoryItem;
  onPinMemory?: (memoryId: string) => void;
  onUnpinMemory?: (memoryId: string) => void;
  onDeleteMemory?: (memoryId: string) => void;
}) {
  const importanceLabel = `${Math.round(item.importance * 100)}% importance`;

  return (
    <div style={memoryCard}>
      <div style={memoryHeader}>
        <div style={memoryBadgeRow}>
          <span style={memoryBadge}>{getMemoryTypeLabel(item.type)}</span>
          {item.pinned ? <span style={memoryPinnedBadge}>Pinned</span> : null}
        </div>

        <span style={memoryImportanceChip}>{importanceLabel}</span>
      </div>

      <div style={memoryContent}>{item.content}</div>

      <div style={memoryActions}>
        {item.pinned ? (
          onUnpinMemory ? (
            <button
              type="button"
              onClick={() => onUnpinMemory(item.id)}
              style={styles.tinyGhostButton}
            >
              Unpin
            </button>
          ) : null
        ) : onPinMemory ? (
          <button
            type="button"
            onClick={() => onPinMemory(item.id)}
            style={styles.tinyGhostButton}
          >
            Pin
          </button>
        ) : null}

        {onDeleteMemory ? (
          <button
            type="button"
            onClick={() => onDeleteMemory(item.id)}
            style={styles.tinyGhostButton}
          >
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function MemoryPanel({
  memory = [],
  onPinMemory,
  onUnpinMemory,
  onDeleteMemory,
  onClearMemory,
  title = "Workspace Memory",
  emptyText = "No memory stored yet. As CodexForge plans work and learns useful project context, it will appear here.",
  maxRecentItems = 6,
  compact = false,
}: MemoryPanelProps) {
  const safeMemory = Array.isArray(memory) ? memory : [];

  const pinned = sortPinned(safeMemory.filter((item) => item.pinned));
  const recent = sortRecent(
    safeMemory.filter((item) => !item.pinned)
  ).slice(0, maxRecentItems);

  const facts = safeMemory.filter((item) => item.type === "fact").length;
  const decisions = safeMemory.filter((item) => item.type === "decision").length;
  const tasks = safeMemory.filter((item) => item.type === "task").length;
  const notes = safeMemory.filter((item) => item.type === "note").length;

  return (
    <div style={memoryShell}>
      {!compact ? (
        <div style={styles.panelText}>
          CodexForge memory stores important project facts, decisions, and task context.
        </div>
      ) : null}

      <div style={memoryMetaRow}>
        <div style={memoryStatsWrap}>
          <div style={memoryStatChip}>{safeMemory.length} items</div>
          <div style={memoryStatChip}>{pinned.length} pinned</div>
          <div style={memoryStatChip}>{facts} facts</div>
          <div style={memoryStatChip}>{decisions} decisions</div>
          <div style={memoryStatChip}>{tasks} tasks</div>
          {!compact ? <div style={memoryStatChip}>{notes} notes</div> : null}
        </div>

        {onClearMemory && safeMemory.length > 0 ? (
          <button
            type="button"
            onClick={onClearMemory}
            style={styles.tinyGhostButton}
          >
            Clear memory
          </button>
        ) : null}
      </div>

      {pinned.length > 0 ? (
        <div style={memoryGroup}>
          <div style={memoryGroupTitle}>Pinned memory</div>
          <div style={memoryList}>
            {pinned.map((item) => (
              <MemoryItemCard
                key={item.id}
                item={item}
                onPinMemory={onPinMemory}
                onUnpinMemory={onUnpinMemory}
                onDeleteMemory={onDeleteMemory}
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={styles.panelText}>No pinned memory yet.</div>
      )}

      {recent.length > 0 ? (
        <div style={memoryGroup}>
          <div style={memoryGroupTitle}>{title === "Workspace Memory" ? "Recent memory" : "Recent"}</div>
          <div style={memoryList}>
            {recent.map((item) => (
              <MemoryItemCard
                key={item.id}
                item={item}
                onPinMemory={onPinMemory}
                onUnpinMemory={onUnpinMemory}
                onDeleteMemory={onDeleteMemory}
              />
            ))}
          </div>
        </div>
      ) : null}

      {safeMemory.length === 0 ? (
        <div style={styles.panelText}>{emptyText}</div>
      ) : null}
    </div>
  );
}