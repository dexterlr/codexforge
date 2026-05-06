import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { AgentTeamSection } from "@/lib/codexforge/chat/components/agent-team-section";
import {
  DiffPreviewSection,
  DiffSection,
  getApprovalCount,
  getDiffPreviewCount,
  getPendingApprovalCount,
} from "@/lib/codexforge/chat/components/diff-approval-sections";
import {
  ExecutionSection,
  SnapshotSection,
} from "@/lib/codexforge/chat/components/execution-snapshot-sections";
import { StructuredSections } from "@/lib/codexforge/chat/components/structured-sections";
import {
  getGroundingSections,
  getNonGroundingSections,
  GroundingSection,
  ToolEvidenceSummary,
  ToolsSection,
} from "@/lib/codexforge/chat/components/grounding-inspection-section";
import {
  getDomainLabel,
  getNextAction,
  getStructuredPlan,
  getStructuredStatusLabel,
  getStructuredSummaryMeta,
} from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

type StructuredReplyBlockProps = {
  structured?: CodexForgeStructuredReply | null;
};

/* ================= HELPERS ================= */

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
    )
  );
}

function hasItems(items?: string[] | null): items is string[] {
  return Array.isArray(items) && items.length > 0;
}

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


/* ================= SMALL UI PIECES ================= */

function MetaChip({ children }: { children: React.ReactNode }) {
  return <span style={metaChip}>{children}</span>;
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
    <div style={styles.structuredCard}>
      <div style={styles.structuredTitle}>{title}</div>
      {children}
    </div>
  );
}

function ParagraphBlock({
  title,
  text,
}: {
  title: string;
  text?: string | null;
}) {
  const safeText = normalizeString(text);
  if (!safeText) return null;

  return (
    <StructuredCard title={title}>
      <div style={styles.structuredParagraph}>{safeText}</div>
    </StructuredCard>
  );
}

function BulletList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div style={styles.structuredList}>
      {items.map((item, idx) => (
        <div key={`${idx}-${item}`} style={styles.structuredListItem}>
          <span style={styles.structuredBullet}>
            {ordered ? `${idx + 1}.` : "ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢"}
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
  const safeItems = normalizeStringArray(items);
  if (safeItems.length === 0) return null;

  return (
    <StructuredCard title={title}>
      <BulletList items={safeItems} ordered={ordered} />
    </StructuredCard>
  );
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
    stepCount > 0 ? plural(stepCount, "step") : null,
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
  ].filter(Boolean) as string[];

  if (stats.length === 0) return null;

  return (
    <div style={metaRow}>
      {stats.map((stat) => (
        <MetaChip key={stat}>{stat}</MetaChip>
      ))}
    </div>
  );
}

/* ================= CORE SECTIONS ================= */

function HeroSection({
  structured,
}: {
  structured: CodexForgeStructuredReply;
}) {
  const title = normalizeString(structured.title);
  const summary = normalizeString(structured.summary);

  if (!title && !summary) return null;

  const meta = getStructuredSummaryMeta(structured);
  const plan = getStructuredPlan(structured);
  const status = getStructuredStatusLabel(structured);
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
      {summary ? <div style={styles.structuredHeroText}>{summary}</div> : null}

      <SummaryStats
        mode={meta.modeLabel}
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

function PlanSection({
  goal,
  steps,
  files,
  commands,
  risks,
  notes,
  tags,
  domain,
  nextAction,
}: {
  goal: string;
  steps: string[];
  files?: string[];
  commands?: string[];
  risks?: string[];
  notes?: string[];
  tags?: string[];
  domain?: CodexForgePlanDomain;
  nextAction?: string | null;
}) {
  const domainLabel = getDomainLabel(domain ?? null);

  return (
    <>
      <ParagraphBlock title="Plan goal" text={goal} />
      <ParagraphBlock title="Next action" text={nextAction} />

      {domainLabel ? <ParagraphBlock title="Domain" text={domainLabel} /> : null}

      <ListSection title="Execution steps" items={steps} ordered />
      <ListSection title="Tags" items={tags} />
      <ListSection title="Files to touch" items={files} />
      <ListSection title="Commands to run" items={commands} />
      <ListSection title="Risks" items={risks} />
      <ListSection title="Notes" items={notes} />
    </>
  );
}

/* ================= MAIN ================= */

export function StructuredReplyBlock({
  structured,
}: StructuredReplyBlockProps) {
  if (!structured) return null;

  const plan = getStructuredPlan(structured);
  const nextAction = getNextAction(plan);
  const tags = normalizeStringArray(plan?.tags ?? structured.tags);

  const hasFallbackGoal = !plan && !!normalizeString(structured.goal);
  const fallbackDomainLabel = getDomainLabel(
    (structured.domain as CodexForgePlanDomain | null | undefined) ?? null
  );

  return (
    <div style={styles.structuredWrap}>
      <HeroSection structured={structured} />
      <AgentTeamSection structured={structured} />

      <ExecutionSection structured={structured} />
      <SnapshotSection structured={structured} />
      <DiffPreviewSection structured={structured} />
      <DiffSection structured={structured} />

      {plan ? (
        <PlanSection
          goal={plan.goal}
          steps={plan.steps}
          files={plan.files}
          commands={plan.commands}
          risks={plan.risks}
          notes={plan.notes}
          tags={plan.tags}
          domain={plan.domain}
          nextAction={nextAction}
        />
      ) : null}

      {hasFallbackGoal ? <ParagraphBlock title="Goal" text={structured.goal} /> : null}

      <ListSection title="Context" items={structured.context} />
      <ListSection title="What I understood" items={structured.understanding} />

      {!plan ? (
        <>
          <ListSection
            title="Domain"
            items={fallbackDomainLabel ? [fallbackDomainLabel] : []}
          />
          <ListSection title="Tags" items={tags} />
          <ListSection title="Files to check" items={structured.files} />
          <ListSection title="Commands to run" items={structured.commands} />
          <ListSection title="Risks" items={structured.risks} />
          <ListSection title="Next steps" items={structured.nextSteps} ordered />
        </>
      ) : null}      {getGroundingSections(structured.sections).length === 0 ? (
        <ToolsSection tools={structured.tools} />
      ) : null}
      <ListSection title="Status" items={structured.status} />
      <StructuredSections sections={getNonGroundingSections(structured.sections)} />
    </div>
  );
}

/* ================= EXTRA STYLES ================= */

const metaRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 6,
};

const metaChip: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 10,
  fontWeight: 800,
  letterSpacing: 0.2,
  textTransform: "uppercase",
};

const statsGrid: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 2,
};

const statChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  fontSize: 11,
  fontWeight: 800,
};
