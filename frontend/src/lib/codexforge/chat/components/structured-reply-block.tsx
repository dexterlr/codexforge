import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import {
  getDiffMeta,
  getDomainLabel,
  getExecutionMeta,
  getNextAction,
  getSnapshotMeta,
  getStructuredPlan,
  getStructuredStatusLabel,
  getStructuredSummaryMeta,
} from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
  CodexForgeStructuredSection,
  CodexForgeStructuredTool,
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

function getToolAvailabilityLabel(tool: CodexForgeStructuredTool): string {
  if (tool.availability === "ready") return "Ready";
  if (tool.availability === "stub") return "Stub";
  return "Unavailable";
}

function getToolAvailabilityStyle(
  tool: CodexForgeStructuredTool
): React.CSSProperties {
  if (tool.availability === "ready") {
    return styles.toolBadgeReady;
  }

  if (tool.availability === "stub") {
    return styles.toolBadgeStub;
  }

  return styles.toolBadgeUnavailable;
}

function getSectionKey(section: CodexForgeStructuredSection, index: number): string {
  return `${section.title}-${index}`;
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
            {ordered ? `${idx + 1}.` : "•"}
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
  snapshotFileCount: number | null;
  logCount: number;
}) {
  const stats = [
    mode,
    status,
    domain,
    stepCount > 0 ? `${stepCount} step${stepCount === 1 ? "" : "s"}` : null,
    toolCount > 0 ? `${toolCount} tool${toolCount === 1 ? "" : "s"}` : null,
    sectionCount > 0
      ? `${sectionCount} section${sectionCount === 1 ? "" : "s"}`
      : null,
    tagCount > 0 ? `${tagCount} tag${tagCount === 1 ? "" : "s"}` : null,
    diffCount > 0 ? `${diffCount} diff${diffCount === 1 ? "" : "s"}` : null,
    snapshotFileCount !== null
      ? `${snapshotFileCount} snapshot file${
          snapshotFileCount === 1 ? "" : "s"
        }`
      : null,
    logCount > 0 ? `${logCount} log${logCount === 1 ? "" : "s"}` : null,
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
        snapshotFileCount={meta.snapshotFileCount}
        logCount={meta.logCount}
      />
    </div>
  );
}

function ExecutionSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const executionMeta = getExecutionMeta(structured);

  if (
    !executionMeta.hasExecution &&
    !executionMeta.hasCounts &&
    !executionMeta.stepText &&
    !executionMeta.resultSummary
  ) {
    return null;
  }

  return (
    <StructuredCard title="Execution">
      <div style={statsGrid}>
        {executionMeta.stepNumber !== null ? (
          <StatChip>Step {executionMeta.stepNumber}</StatChip>
        ) : null}

        {executionMeta.phaseLabel ? (
          <StatChip>Phase: {executionMeta.phaseLabel}</StatChip>
        ) : null}

        {executionMeta.diffCount !== null ? (
          <StatChip>
            {executionMeta.diffCount} diff
            {executionMeta.diffCount === 1 ? "" : "s"}
          </StatChip>
        ) : null}

        {executionMeta.snapshotFileCount !== null ? (
          <StatChip>
            {executionMeta.snapshotFileCount} snapshot file
            {executionMeta.snapshotFileCount === 1 ? "" : "s"}
          </StatChip>
        ) : null}

        {executionMeta.logCount > 0 ? (
          <StatChip>
            {executionMeta.logCount} log
            {executionMeta.logCount === 1 ? "" : "s"}
          </StatChip>
        ) : null}
      </div>

      {executionMeta.stepText ? (
        <div style={styles.structuredParagraph}>{executionMeta.stepText}</div>
      ) : null}

      {executionMeta.resultSummary ? (
        <div style={executionResultCard}>{executionMeta.resultSummary}</div>
      ) : null}

      {executionMeta.logs.length > 0 ? (
        <div style={{ marginTop: 10 }}>
          <BulletList items={executionMeta.logs} />
        </div>
      ) : null}
    </StructuredCard>
  );
}

function SnapshotSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const snapshotMeta = getSnapshotMeta(structured);

  if (!snapshotMeta.hasSnapshot) return null;

  return (
    <StructuredCard title="Snapshot">
      <div style={statsGrid}>
        {snapshotMeta.fileCount !== null ? (
          <StatChip>
            {snapshotMeta.fileCount} file
            {snapshotMeta.fileCount === 1 ? "" : "s"}
          </StatChip>
        ) : null}

        {snapshotMeta.sampledPathCount > 0 ? (
          <StatChip>
            {snapshotMeta.sampledPathCount} sampled path
            {snapshotMeta.sampledPathCount === 1 ? "" : "s"}
          </StatChip>
        ) : null}
      </div>

      {snapshotMeta.sampledPaths.length > 0 ? (
        <div style={{ marginTop: 10 }}>
          <BulletList items={snapshotMeta.sampledPaths} />
        </div>
      ) : null}
    </StructuredCard>
  );
}

function DiffSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const diffMeta = getDiffMeta(structured);

  if (!diffMeta.hasDiffs) return null;

  return (
    <StructuredCard title="Diff previews">
      <div style={diffList}>
        {diffMeta.diffs.map((diff, index) => (
          <div key={`${diff.filePath}-${index}`} style={diffCard}>
            <div style={diffFilePath}>{diff.filePath}</div>
            <pre style={diffPatch}>{diff.patch}</pre>
          </div>
        ))}
      </div>
    </StructuredCard>
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

      {domainLabel ? (
        <ParagraphBlock title="Domain" text={domainLabel} />
      ) : null}

      <ListSection title="Execution steps" items={steps} ordered />
      <ListSection title="Tags" items={tags} />
      <ListSection title="Files to touch" items={files} />
      <ListSection title="Commands to run" items={commands} />
      <ListSection title="Risks" items={risks} />
      <ListSection title="Notes" items={notes} />
    </>
  );
}

function ToolsSection({
  tools,
}: {
  tools?: CodexForgeStructuredTool[] | null;
}) {
  if (!tools || tools.length === 0) return null;

  return (
    <StructuredCard title="Recommended tools">
      <div style={styles.toolGrid}>
        {tools.map((tool) => (
          <div key={tool.name} style={styles.toolCard}>
            <div style={styles.toolHeader}>
              <div style={styles.toolName}>{tool.name}</div>
              <span
                style={{
                  ...styles.toolBadgeBase,
                  ...getToolAvailabilityStyle(tool),
                }}
              >
                {getToolAvailabilityLabel(tool)}
              </span>
            </div>

            <div style={styles.toolDescription}>{tool.description}</div>
          </div>
        ))}
      </div>
    </StructuredCard>
  );
}

function StructuredSections({
  sections,
}: {
  sections?: CodexForgeStructuredSection[] | null;
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => (
        <ListSection
          key={getSectionKey(section, index)}
          title={section.title}
          items={section.items}
        />
      ))}
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

      <ExecutionSection structured={structured} />
      <SnapshotSection structured={structured} />
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

      {hasFallbackGoal ? (
        <ParagraphBlock title="Goal" text={structured.goal} />
      ) : null}

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
      ) : null}

      <ToolsSection tools={structured.tools} />
      <ListSection title="Status" items={structured.status} />
      <StructuredSections sections={structured.sections} />
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

const executionResultCard: React.CSSProperties = {
  marginTop: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(99,102,241,0.08)",
  fontSize: 13,
  lineHeight: 1.55,
};

const diffList: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const diffCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
};

const diffFilePath: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  opacity: 0.9,
  wordBreak: "break-word",
};

const diffPatch: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.22)",
  fontSize: 12,
  lineHeight: 1.55,
  overflowX: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};