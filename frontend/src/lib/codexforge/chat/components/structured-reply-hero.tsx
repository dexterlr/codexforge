import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import {
  getDomainLabel,
  getStructuredPlan,
  getStructuredStatusLabel,
  getStructuredSummaryMeta,
} from "@/lib/codexforge/chat/client-renderers";
import {
  getApprovalCount,
  getDiffPreviewCount,
  getPendingApprovalCount,
} from "@/lib/codexforge/chat/components/diff-approval-sections";
import type { CodexForgeStructuredReply } from "@/lib/codexforge/types";
import {
  hasItems,
  normalizeString,
} from "@/lib/codexforge/chat/components/structured-basic-sections";

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function getMetaNumber(
  meta: ReturnType<typeof getStructuredSummaryMeta>,
  key: string
): number {
  const value = (meta as Record<string, unknown>)[key];
  return asNumber(value) ?? 0;
}

function plural(value: number, singular: string, pluralLabel?: string): string {
  return `${value} ${value === 1 ? singular : pluralLabel ?? `${singular}s`}`;
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return <span style={metaChip}>{children}</span>;
}

function StatChip({ children }: { children: React.ReactNode }) {
  return <span style={statChip}>{children}</span>;
}

function SummaryStats({
  mode,
  status,
  domain,
  toolCount,
  sectionCount,
  stepCount,
  tagCount,
  diffCount,
  diffPreviewCount,
  approvalCount,
  pendingApprovalCount,
  snapshotFileCount,
  logCount,
}: {
  mode?: string | null;
  status?: string | null;
  domain?: string | null;
  toolCount: number;
  sectionCount: number;
  stepCount: number;
  tagCount: number;
  diffCount: number;
  diffPreviewCount: number;
  approvalCount: number;
  pendingApprovalCount: number;
  snapshotFileCount: number | null;
  logCount: number;
}) {
  const stats = [
    mode,
    status,
    domain,
    toolCount > 0 ? plural(toolCount, "tool") : null,
    sectionCount > 0 ? plural(sectionCount, "section") : null,
    tagCount > 0 ? plural(tagCount, "tag") : null,
    diffCount > 0 ? plural(diffCount, "diff") : null,
    diffPreviewCount > 0 ? plural(diffPreviewCount, "preview") : null,
    approvalCount > 0 ? plural(approvalCount, "approval") : null,
    pendingApprovalCount > 0
      ? plural(pendingApprovalCount, "pending approval")
      : null,
    snapshotFileCount !== null ? plural(snapshotFileCount, "snapshot file") : null,
    logCount > 0 ? plural(logCount, "log") : null,
    stepCount > 0 ? plural(stepCount, "step") : null,
  ].filter(Boolean) as string[];

  if (stats.length === 0) return null;

  return (
    <div style={statsGrid}>
      {stats.map((item) => (
        <StatChip key={item}>{item}</StatChip>
      ))}
    </div>
  );
}

export function HeroSection({
  structured,
}: {
  structured: CodexForgeStructuredReply;
}) {
  const title = normalizeString(structured.title);
  const summary = normalizeString(structured.summary);
  const plan = getStructuredPlan(structured);
  const meta = getStructuredSummaryMeta(structured);
  const status = getStructuredStatusLabel(structured.status);
  const domain =
    getDomainLabel(plan?.domain ?? structured.domain ?? null) ?? null;

  const diffPreviewCount =
    getMetaNumber(meta, "diffPreviewCount") ||
    getDiffPreviewCount(structured);

  const approvalCount =
    getMetaNumber(meta, "approvalCount") ||
    getApprovalCount(structured);

  const pendingApprovalCount =
    getMetaNumber(meta, "pendingApprovalCount") ||
    getPendingApprovalCount(structured);

  return (
    <div style={styles.structuredHero}>
      {title ? <div style={styles.structuredHeroTitle}>{title}</div> : null}
      {summary ? <div style={styles.structuredParagraph}>{summary}</div> : null}

      <div style={metaRow}>
        {status ? <MetaChip>{status}</MetaChip> : null}
        {domain ? <MetaChip>{domain}</MetaChip> : null}
        {hasItems(structured.tags) ? (
          <MetaChip>{plural(structured.tags.length, "tag")}</MetaChip>
        ) : null}
      </div>

      <SummaryStats
        mode={structured.mode}
        status={status}
        domain={domain}
        toolCount={meta.toolCount}
        sectionCount={meta.sectionCount}
        stepCount={meta.stepCount}
        tagCount={meta.tagCount}
        diffCount={meta.diffCount}
        diffPreviewCount={diffPreviewCount}
        approvalCount={approvalCount}
        pendingApprovalCount={pendingApprovalCount}
        snapshotFileCount={meta.snapshotFileCount}
        logCount={meta.logCount}
      />
    </div>
  );
}

const metaRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const metaChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
};

const statsGrid: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const statChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
};
