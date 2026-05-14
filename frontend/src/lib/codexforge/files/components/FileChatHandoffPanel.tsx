"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";

export function FileChatHandoffPanel({
  filePath,
  prompt,
  workspacePrompt,
  summary,
}: {
  filePath: string;
  prompt: string;
  workspacePrompt: string;
  summary: string;
}) {
  const [copied, setCopied] = useState<"chat" | "workspace" | "unavailable" | null>(null);

  async function copyPrompt(kind: "chat" | "workspace") {
    try {
      const text = kind === "chat" ? prompt : workspacePrompt;
      await navigator.clipboard.writeText(text);
      setCopied(kind);
    } catch {
      setCopied("unavailable");
    }
  }

  return (
    <section data-codexforge-file-chat-handoff-panel style={panel}>
      <div style={top}>
        <div style={safeWrap}>
          <div style={eyebrow}>Chat handoff</div>
          <strong style={title}>Brain-aware prompt</strong>
        </div>
        <div style={actions}>
          <button
            data-codexforge-copy-brain-aware-prompt
            type="button"
            onClick={() => void copyPrompt("chat")}
            style={button}
          >
            {copied === "chat" ? "Prompt copied" : "Copy brain-aware prompt"}
          </button>
          <button
            type="button"
            onClick={() => void copyPrompt("workspace")}
            style={secondaryButton}
          >
            {copied === "workspace" ? "Workspace copied" : "Copy workspace prompt"}
          </button>
          <Link href="/ai" style={link}>
            Open workspace
          </Link>
        </div>
      </div>

      <p style={body}>{summary}</p>
      {copied === "unavailable" ? (
        <p style={warning}>Clipboard is unavailable in this browser context.</p>
      ) : null}

      <div style={pathBlock}>
        <strong>Selected file</strong>
        <span>{filePath}</span>
      </div>

      <pre data-codexforge-file-chat-prompt-preview style={promptPreview}>{prompt}</pre>
    </section>
  );
}

const safeWrap: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(167,139,250,0.20)",
  background:
    "linear-gradient(145deg, rgba(17,24,39,0.9), rgba(3,7,18,0.78)), radial-gradient(circle at 92% 0%, rgba(167,139,250,0.14), transparent 34%)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  minWidth: 0,
  boxShadow: "0 16px 48px rgba(2,6,23,0.24), inset 0 1px 0 rgba(255,255,255,0.04)",
};

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
  flexWrap: "wrap",
  minWidth: 0,
};

const actions: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.68,
};

const title: CSSProperties = {
  display: "block",
  marginTop: 4,
  fontSize: 16,
  lineHeight: 1.25,
};

const button: CSSProperties = {
  border: "1px solid rgba(52,211,153,0.34)",
  background: "rgba(52,211,153,0.14)",
  color: "white",
  borderRadius: 8,
  padding: "8px 10px",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
  ...safeWrap,
};

const secondaryButton: CSSProperties = {
  ...button,
  border: "1px solid rgba(167,139,250,0.34)",
  background: "rgba(167,139,250,0.12)",
};

const link: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: "8px 10px",
  color: "white",
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 900,
  display: "inline-flex",
  ...safeWrap,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.82,
  ...safeWrap,
};

const warning: CSSProperties = {
  margin: 0,
  border: "1px solid rgba(251,191,36,0.28)",
  background: "rgba(251,191,36,0.10)",
  borderRadius: 8,
  padding: 10,
  fontSize: 12,
  lineHeight: 1.4,
  ...safeWrap,
};

const pathBlock: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
  ...safeWrap,
};

const promptPreview: CSSProperties = {
  margin: 0,
  maxHeight: 260,
  overflow: "auto",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.28)",
  borderRadius: 8,
  padding: 10,
  fontSize: 11,
  lineHeight: 1.45,
  whiteSpace: "pre-wrap",
  ...safeWrap,
};
