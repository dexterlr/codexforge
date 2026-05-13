import React from "react";
import type { CodexForgeVisibleAgentRuntimeSummary } from "@/lib/codexforge/chat/agent-runtime-visibility";
import { shouldShowAgentRuntimePanel } from "@/lib/codexforge/chat/agent-runtime-visibility";

type AgentRuntimePanelProps = {
  summary?: CodexForgeVisibleAgentRuntimeSummary | null;
};

function List({
  items,
  emptyLabel,
}: {
  items: readonly string[];
  emptyLabel: string;
}) {
  const visible = items.map((item) => item.trim()).filter(Boolean);

  return (
    <div style={listStyle}>
      {visible.length > 0 ? (
        visible.map((item) => (
          <div key={item} style={listItemStyle}>
            <span style={bulletStyle} />
            <span>{item}</span>
          </div>
        ))
      ) : (
        <div style={emptyStyle}>{emptyLabel}</div>
      )}
    </div>
  );
}

function StepList({
  steps,
  emptyLabel,
}: {
  steps: CodexForgeVisibleAgentRuntimeSummary["readOnlySteps"];
  emptyLabel: string;
}) {
  return (
    <List
      emptyLabel={emptyLabel}
      items={steps.map((step) => `${step.agent}: ${step.label}`)}
    />
  );
}

function Section({
  title,
  children,
  marker,
}: {
  title: string;
  children: React.ReactNode;
  marker?: Record<string, true>;
}) {
  return (
    <section style={sectionStyle} {...marker}>
      <div style={sectionTitleStyle}>{title}</div>
      {children}
    </section>
  );
}

export function AgentRuntimePanel({ summary }: AgentRuntimePanelProps) {
  if (!shouldShowAgentRuntimePanel(summary)) return null;

  const visibleSummary = summary as CodexForgeVisibleAgentRuntimeSummary;
  const supportAgents = visibleSummary.supportAgents.join(", ");
  const reviewerAgents = visibleSummary.reviewerAgents.join(", ");

  return (
    <div style={panelStyle} data-codexforge-agent-runtime-panel>
      <Section title="Agent route">
        <div style={routeGridStyle}>
          <div style={primaryTileStyle} data-codexforge-agent-primary>
            <div style={eyebrowStyle}>Primary</div>
            <div style={primaryStyle}>{visibleSummary.primaryAgent}</div>
            <div style={mutedStyle}>{visibleSummary.reasoningSummary}</div>
          </div>

          <div style={tileStyle} data-codexforge-agent-support>
            <div style={eyebrowStyle}>Support</div>
            <div style={compactValueStyle}>{supportAgents || "None"}</div>
          </div>

          <div style={tileStyle} data-codexforge-agent-reviewers>
            <div style={eyebrowStyle}>Reviewers</div>
            <div style={compactValueStyle}>{reviewerAgents || "None"}</div>
          </div>
        </div>
        <div style={routeReasonStyle}>Why this route: {visibleSummary.routeReason}</div>
      </Section>

      <Section title="Plan lanes">
        <div style={laneGridStyle}>
          <div style={laneStyle} data-codexforge-agent-readonly-steps>
            <div style={laneTitleStyle}>Read-only</div>
            <StepList
              steps={visibleSummary.readOnlySteps}
              emptyLabel="No read-only steps surfaced."
            />
          </div>

          <div style={laneStyle} data-codexforge-agent-approval-steps>
            <div style={laneTitleStyle}>Approval-required</div>
            <StepList
              steps={visibleSummary.approvalRequiredSteps}
              emptyLabel="No approval-required steps."
            />
          </div>

          <div style={laneStyle} data-codexforge-agent-blocked-steps>
            <div style={laneTitleStyle}>Blocked</div>
            <StepList
              steps={visibleSummary.blockedSteps}
              emptyLabel="No blocked steps."
            />
          </div>
        </div>
      </Section>

      <Section
        title="Review gates"
        marker={{ "data-codexforge-agent-review-gates": true }}
      >
        <List items={visibleSummary.reviewChecklist} emptyLabel="No review checklist." />
        <List
          items={visibleSummary.reviews.map(
            (review) =>
              `${review.reviewer} ${review.status}: ${review.summary}`
          )}
          emptyLabel="No reviewer output."
        />
      </Section>

      <Section title="Risks">
        <List items={visibleSummary.risks} emptyLabel="No runtime risks surfaced." />
        <List items={visibleSummary.handoffs} emptyLabel="No handoffs required." />
      </Section>

      <Section
        title="Next safe action"
        marker={{ "data-codexforge-agent-next-action": true }}
      >
        <div style={nextActionStyle}>{visibleSummary.recommendedNextAction}</div>
        <div style={confidenceStyle}>Confidence {visibleSummary.confidence}</div>
      </Section>
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background:
    "linear-gradient(180deg, rgba(8,13,24,0.98), rgba(12,18,30,0.94))",
  boxShadow: "0 18px 44px rgba(0,0,0,0.28)",
  color: "rgba(241,245,249,0.96)",
};

const sectionStyle: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.92)",
};

const routeGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
  gap: 8,
};

const tileStyle: React.CSSProperties = {
  display: "grid",
  gap: 5,
  minHeight: 82,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
};

const primaryTileStyle: React.CSSProperties = {
  ...tileStyle,
  border: "1px solid rgba(125,211,252,0.26)",
  background: "rgba(14,165,233,0.10)",
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(226,232,240,0.68)",
};

const primaryStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 900,
};

const compactValueStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  lineHeight: 1.35,
};

const mutedStyle: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.45,
  color: "rgba(226,232,240,0.72)",
};

const routeReasonStyle: React.CSSProperties = {
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(15,23,42,0.72)",
  fontSize: 12,
  lineHeight: 1.45,
  color: "rgba(226,232,240,0.76)",
};

const laneGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
  gap: 8,
};

const laneStyle: React.CSSProperties = {
  display: "grid",
  alignContent: "start",
  gap: 7,
  minHeight: 112,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.035)",
};

const laneTitleStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
};

const listStyle: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

const listItemStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "8px minmax(0, 1fr)",
  gap: 7,
  alignItems: "start",
  fontSize: 12,
  lineHeight: 1.45,
  color: "rgba(241,245,249,0.88)",
};

const bulletStyle: React.CSSProperties = {
  width: 5,
  height: 5,
  marginTop: 6,
  borderRadius: 999,
  background: "rgba(56,189,248,0.9)",
};

const emptyStyle: React.CSSProperties = {
  fontSize: 12,
  color: "rgba(148,163,184,0.82)",
};

const nextActionStyle: React.CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  fontSize: 13,
  fontWeight: 850,
};

const confidenceStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  color: "rgba(186,230,253,0.86)",
};
