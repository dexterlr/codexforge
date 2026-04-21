import React from "react";
import type {
  CodexForgeMessage,
  CodexForgeStructuredTool,
} from "@/lib/codexforge/types";

export function getSourceLabel(message: CodexForgeMessage) {
  if (message.source === "local-fallback") return "Local fallback";
  if (message.source === "system") return "System";
  return "API";
}

export function getToolAvailabilityLabel(tool: CodexForgeStructuredTool) {
  if (tool.availability === "ready") return "Ready";
  if (tool.availability === "stub") return "Stub";
  return "Unavailable";
}

export function getToolAvailabilityStyle(
  tool: CodexForgeStructuredTool
): React.CSSProperties {
  if (tool.availability === "ready") {
    return toolBadgeReady;
  }

  if (tool.availability === "stub") {
    return toolBadgeStub;
  }

  return toolBadgeUnavailable;
}

export function renderListSection(title: string, items?: string[]) {
  if (!items || items.length === 0) return null;

  return (
    <div style={structuredCard} key={title}>
      <div style={structuredTitle}>{title}</div>
      <div style={structuredList}>
        {items.map((item, idx) => (
          <div key={`${title}-${idx}`} style={structuredListItem}>
            <span style={structuredBullet}>•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function renderToolsSection(tools?: CodexForgeStructuredTool[]) {
  if (!tools || tools.length === 0) return null;

  return (
    <div style={structuredCard} key="tools">
      <div style={structuredTitle}>Tools</div>
      <div style={toolGrid}>
        {tools.map((tool) => (
          <div key={tool.name} style={toolCard}>
            <div style={toolHeader}>
              <div style={toolName}>{tool.name}</div>
              <span style={{ ...toolBadgeBase, ...getToolAvailabilityStyle(tool) }}>
                {getToolAvailabilityLabel(tool)}
              </span>
            </div>
            <div style={toolDescription}>{tool.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const structuredCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.16)",
};

const structuredTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 13,
};

const structuredList: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const structuredListItem: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "14px minmax(0, 1fr)",
  gap: 8,
  alignItems: "start",
  fontSize: 13,
  lineHeight: 1.55,
};

const structuredBullet: React.CSSProperties = {
  opacity: 0.75,
};

const toolGrid: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

const toolCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

const toolHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

const toolName: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
};

const toolDescription: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.82,
  lineHeight: 1.6,
};

const toolBadgeBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "4px 8px",
  fontSize: 11,
  fontWeight: 800,
  border: "1px solid transparent",
};

const toolBadgeReady: React.CSSProperties = {
  background: "rgba(16,185,129,0.16)",
  borderColor: "rgba(16,185,129,0.32)",
  color: "rgba(220,252,231,0.98)",
};

const toolBadgeStub: React.CSSProperties = {
  background: "rgba(245,158,11,0.16)",
  borderColor: "rgba(245,158,11,0.32)",
  color: "rgba(254,243,199,0.98)",
};

const toolBadgeUnavailable: React.CSSProperties = {
  background: "rgba(239,68,68,0.16)",
  borderColor: "rgba(239,68,68,0.32)",
  color: "rgba(254,226,226,0.98)",
};