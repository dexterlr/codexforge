"use client";

import React, { useMemo, useState } from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type ChatComposerProps = {
  input: string;
  busy: boolean;
  onChange: (value: string) => void;
  onClearDraft: () => void;
  onSend: () => void;
};

const PLACEHOLDER =
  'Ask CodexForge something real, e.g. "Plan a feature", "/plan build auth system", "/debug error..."';

/* ================= COMMANDS ================= */

const COMMANDS = [
  { key: "/plan", label: "Plan", hint: "Create a structured execution plan" },
  { key: "/debug", label: "Debug", hint: "Investigate an error step-by-step" },
  { key: "/research", label: "Research", hint: "Break down a topic" },
  { key: "/next", label: "Next step", hint: "Get smallest next action" },
];

function detectCommand(input: string) {
  return COMMANDS.find((cmd) => input.trim().startsWith(cmd.key)) || null;
}

/* ================= COMPONENT ================= */

export const ChatComposer = React.forwardRef<
  HTMLTextAreaElement,
  ChatComposerProps
>(function ChatComposer(
  { input, busy, onChange, onClearDraft, onSend },
  ref
) {
  const [focused, setFocused] = useState(false);

  const trimmed = input.trim();
  const canSend = !busy && trimmed.length > 0;

  const detectedCommand = useMemo(() => detectCommand(input), [input]);

  /* ================= HANDLERS ================= */

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }

  function applyCommand(cmd: string) {
    onChange(cmd + " ");
  }

  /* ================= RENDER ================= */

  return (
    <div style={styles.composerWrap}>
      {/* COMMAND BAR */}
      <div style={commandBar}>
        {COMMANDS.map((cmd) => {
          const active = input.startsWith(cmd.key);

          return (
            <button
              key={cmd.key}
              type="button"
              onClick={() => applyCommand(cmd.key)}
              style={{
                ...commandChip,
                ...(active ? commandChipActive : null),
              }}
            >
              {cmd.label}
            </button>
          );
        })}
      </div>

      {/* TEXTAREA */}
      <textarea
        ref={ref}
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={PLACEHOLDER}
        style={{
          ...styles.composer,
          ...(focused ? composerFocused : null),
        }}
        rows={4}
        aria-label="Message CodexForge"
        spellCheck
      />

      {/* COMMAND HINT */}
      {detectedCommand ? (
        <div style={commandHint}>
          <b>{detectedCommand.label}</b> — {detectedCommand.hint}
        </div>
      ) : null}

      {/* FOOTER */}
      <div style={styles.composerFooter}>
        <div style={styles.composerHint}>
          Enter sends • Shift+Enter newline • Use /commands
        </div>

        <div style={actionsRow}>
          <button
            type="button"
            onClick={onClearDraft}
            style={styles.pillGhostButton}
            disabled={busy && input.length === 0}
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            style={{
              ...styles.sendButton,
              ...(canSend ? sendReady : null),
              ...(!canSend ? styles.sendButtonDisabled : null),
            }}
          >
            {busy ? "Thinking…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
});

ChatComposer.displayName = "ChatComposer";

/* ================= STYLES ================= */

const actionsRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
};

const commandBar: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  marginBottom: 6,
};

const commandChip: React.CSSProperties = {
  fontSize: 11,
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  cursor: "pointer",
};

const commandChipActive: React.CSSProperties = {
  background: "rgba(16,185,129,0.15)",
  border: "1px solid rgba(16,185,129,0.4)",
};

const commandHint: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.7,
  marginTop: 4,
};

const composerFocused: React.CSSProperties = {
  outline: "1px solid rgba(16,185,129,0.4)",
};

const sendReady: React.CSSProperties = {
  boxShadow: "0 0 0 2px rgba(16,185,129,0.25)",
};