import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

type FocusAreaCard = {
  label: string;
  value: string;
};

type DirectionCardData = {
  title: string;
  text: string;
};

function getCapabilityCards(): FocusAreaCard[] {
  return [
    {
      label: "Websites",
      value: "Plan, scaffold, wire, iterate, and deploy site work.",
    },
    {
      label: "Game servers",
      value: "Design themed servers, content, infra, admin, and rollout flows.",
    },
    {
      label: "Movies",
      value: "Turn scripts into shot plans, asset plans, and production stages.",
    },
    {
      label: "Trading",
      value: "Support research, dashboards, risk notes, and execution-safe workflows.",
    },
    {
      label: "Creative tools",
      value: "Coordinate Blender, ComfyUI, Unreal, and production pipelines.",
    },
  ];
}

function getDirectionCards(): DirectionCardData[] {
  return [
    {
      title: "Workspace shell",
      text: "This page should be the operational shell for planning, conversation, repo-aware context, memory, and guided execution.",
    },
    {
      title: "Brain and memory",
      text: "CodexForge should accumulate useful project state over time instead of acting like a stateless chat box.",
    },
    {
      title: "Execution clarity",
      text: "Plans, diffs, approvals, snapshots, and run state should stay visible without turning the main workspace into a raw operator console.",
    },
  ];
}

function CapabilityCard() {
  const capabilityCards = getCapabilityCards();

  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>CodexForge direction</div>

      <div style={capabilityGridStyle}>
        {capabilityCards.map((card) => (
          <div key={card.label} style={capabilityCardStyle}>
            <div style={capabilityLabelStyle}>{card.label}</div>
            <div style={capabilityValueStyle}>{card.value}</div>
          </div>
        ))}
      </div>

      <div style={productCardStyle}>
        <div style={productCardTitleStyle}>Product posture</div>
        <div style={productCardTextStyle}>
          This is the main CodexForge workspace. Operator mechanics belong in
          the dedicated operator surface, while this page stays focused on
          planning, memory, conversation, context, and safe execution guidance.
        </div>
      </div>
    </div>
  );
}

function DirectionCard({ title, text }: DirectionCardData) {
  return (
    <div style={directionCardStyle}>
      <div style={directionCardTitleStyle}>{title}</div>
      <div style={directionCardTextStyle}>{text}</div>
    </div>
  );
}

function ProductDirectionPanel() {
  const cards = getDirectionCards();

  return (
    <div style={styles.statusCard}>
      <div style={styles.panelTitle}>What this page should become</div>

      <div style={directionGridStyle}>
        {cards.map((card) => (
          <DirectionCard key={card.title} title={card.title} text={card.text} />
        ))}
      </div>
    </div>
  );
}

export function WorkspaceInsightsPanel() {
  return (
    <div style={insightsRowStyle}>
      <CapabilityCard />
      <ProductDirectionPanel />
    </div>
  );
}

const capabilityGridStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const capabilityCardStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  display: "grid",
  gap: 6,
};

const capabilityLabelStyle: React.CSSProperties = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  opacity: 0.72,
};

const capabilityValueStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.55,
  opacity: 0.9,
};

const productCardStyle: React.CSSProperties = {
  marginTop: 12,
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(22,101,52,0.12)",
  display: "grid",
  gap: 6,
};

const productCardTitleStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 850,
};

const productCardTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  opacity: 0.86,
};

const directionGridStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
  marginTop: 10,
};

const directionCardStyle: React.CSSProperties = {
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(15,23,42,0.18)",
  display: "grid",
  gap: 8,
};

const directionCardTitleStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
};

const directionCardTextStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.6,
  opacity: 0.84,
};

const insightsRowStyle: React.CSSProperties = {
  display: "grid",
  gap: 14,
};