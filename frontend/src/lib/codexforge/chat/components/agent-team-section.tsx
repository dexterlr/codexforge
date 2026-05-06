import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import type { CodexForgeStructuredReply } from "@/lib/codexforge/types";

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function plural(value: number, singular: string, pluralLabel?: string): string {
  return `${value} ${value === 1 ? singular : pluralLabel ?? `${singular}s`}`;
}

function StatChip({ children }: { children: React.ReactNode }) {
  return <span style={statChip}>{children}</span>;
}

function StructuredCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.structuredCard}>
      <div style={styles.structuredTitle}>{title}</div>
      {children}
    </section>
  );
}

function BulletList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}) {
  const normalized = normalizeStringArray(items);
  if (normalized.length === 0) return null;

  return (
    <div style={styles.structuredList}>
      {normalized.map((item, idx) => (
        <div key={`${idx}-${item}`} style={styles.structuredListItem}>
          <span style={styles.structuredBullet}>
            {ordered ? `${idx + 1}.` : "-"}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ListSection({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items?: string[] | null;
  ordered?: boolean;
}) {
  const normalized = normalizeStringArray(items);
  if (normalized.length === 0) return null;

  return (
    <section style={styles.structuredCard}>
      <div style={styles.structuredTitle}>{title}</div>
      <BulletList items={normalized} ordered={ordered} />
    </section>
  );
}

export function AgentTeamSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const agentTeam = structured?.agentTeam;
  if (!agentTeam) return null;

  const supportLabels = agentTeam.supportRoles.map((role) => role.label);
  const reviewLabels = agentTeam.reviewRoles.map((role) => role.label);
  const approvalTools = agentTeam.approvalRequiredTools.map((tool) => tool.name);
  const blockedTools = agentTeam.blockedTools.map((tool) => tool.name);

  return (
    <StructuredCard title="Agent team">
      <div style={agentTeamHero}>
        <div>
          <div style={agentTeamEyebrow}>Primary agent</div>
          <div style={agentTeamPrimary}>{agentTeam.primaryRole.label}</div>
          <div style={styles.structuredParagraph}>
            {agentTeam.primaryRole.mission}
          </div>
        </div>

        <div style={approvalHeroStats}>
          <StatChip>{agentTeam.domain}</StatChip>
          {supportLabels.length > 0 ? (
            <StatChip>{plural(supportLabels.length, "support role")}</StatChip>
          ) : null}
          {approvalTools.length > 0 ? (
            <StatChip>{plural(approvalTools.length, "approval tool")}</StatChip>
          ) : null}
          {blockedTools.length > 0 ? (
            <StatChip>{plural(blockedTools.length, "blocked tool")}</StatChip>
          ) : null}
        </div>
      </div>

      <ListSection title="Support team" items={supportLabels} />
      <ListSection title="Review team" items={reviewLabels} />
      <ListSection title="Approval-required tools" items={approvalTools} />
      <ListSection title="Blocked tools" items={blockedTools} />
      <ListSection title="Routing reasons" items={agentTeam.reasons} />
    </StructuredCard>
  );
}

const statChip: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
};

const agentTeamHero: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.06)",
};

const agentTeamEyebrow: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0.4,
  textTransform: "uppercase",
  opacity: 0.72,
};

const agentTeamPrimary: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 900,
  letterSpacing: -0.1,
};
