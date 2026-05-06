import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { AgentTeamSection } from "@/lib/codexforge/chat/components/agent-team-section";
import { StructuredSections } from "@/lib/codexforge/chat/components/structured-sections";
import {
  getGroundingSections,
  getNonGroundingSections,
  GroundingSection,
  ToolEvidenceSummary,
  ToolsSection,
} from "@/lib/codexforge/chat/components/grounding-inspection-section";
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
  CodexForgeApprovalGate,
  CodexForgeDiffPreview,
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

function getSectionKey(section: CodexForgeStructuredSection, index: number): string {
  return `${section.title}-${index}`;
}

function getStructuredDiffPreviews(
  structured?: CodexForgeStructuredReply | null
): CodexForgeDiffPreview[] {
  return Array.isArray(structured?.diffPreviews)
    ? structured.diffPreviews.filter(
        (preview): preview is CodexForgeDiffPreview =>
          !!preview &&
          typeof preview.filePath === "string" &&
          typeof preview.patch === "string"
      )
    : [];
}

function getStructuredApprovals(
  structured?: CodexForgeStructuredReply | null
): CodexForgeApprovalGate[] {
  return Array.isArray(structured?.approvals)
    ? structured.approvals.filter(
        (approval): approval is CodexForgeApprovalGate =>
          !!approval &&
          typeof approval.label === "string" &&
          typeof approval.state === "string"
      )
    : [];
}

function getPreviewStatusLabel(status?: string): string {
  if (status === "ready") return "Ready";
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  if (status === "stale") return "Stale";
  if (status === "applying") return "Applying";
  if (status === "applied") return "Applied";
  if (status === "failed") return "Failed";
  if (status === "draft") return "Draft";
  return "Awaiting approval";
}

function getApprovalStateLabel(state?: string): string {
  if (state === "approved") return "Approved";
  if (state === "rejected") return "Rejected";
  if (state === "stale") return "Stale";
  if (state === "failed") return "Failed";
  if (state === "not-required") return "Not required";
  return "Pending";
}

function getStateChipStyle(state?: string): React.CSSProperties {
  if (state === "approved" || state === "applied") return approvedStateChip;
  if (state === "rejected" || state === "failed") return rejectedStateChip;
  if (state === "stale") return staleStateChip;
  if (state === "applying") return applyingStateChip;
  return pendingStateChip;
}

function summarizePatch(patch: string): {
  additions: number;
  deletions: number;
  hunks: number;
} {
  let additions = 0;
  let deletions = 0;
  let hunks = 0;

  for (const line of patch.split(/\r?\n/)) {
    if (line.startsWith("@@")) hunks += 1;
    if (line.startsWith("+++") || line.startsWith("---")) continue;
    if (line.startsWith("+")) additions += 1;
    if (line.startsWith("-")) deletions += 1;
  }

  return { additions, deletions, hunks };
}

function clampPatchForPreview(patch: string, maxLines = 180): string {
  const lines = patch.split(/\r?\n/);
  if (lines.length <= maxLines) return patch;
  return `${lines.slice(0, maxLines).join("\n")}\n\n... truncated ${
    lines.length - maxLines
  } more line${lines.length - maxLines === 1 ? "" : "s"}`;
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
            {ordered ? `${idx + 1}.` : "ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¢"}
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
    getStructuredDiffPreviews(structured).length ||
    structured.diffPreviewBatch?.previews?.length ||
    0;

  const approvalCount =
    getMetaNumber(meta, "approvalCount") ||
    getStructuredApprovals(structured).length;

  const pendingApprovalCount =
    getMetaNumber(meta, "pendingApprovalCount") ||
    getStructuredApprovals(structured).filter(
      (approval) => approval.state === "pending"
    ).length;

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
          <StatChip>{plural(executionMeta.diffCount, "diff")}</StatChip>
        ) : null}

        {executionMeta.snapshotFileCount !== null ? (
          <StatChip>
            {plural(executionMeta.snapshotFileCount, "snapshot file")}
          </StatChip>
        ) : null}

        {executionMeta.logCount > 0 ? (
          <StatChip>{plural(executionMeta.logCount, "log")}</StatChip>
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
          <StatChip>{plural(snapshotMeta.fileCount, "file")}</StatChip>
        ) : null}

        {snapshotMeta.sampledPathCount > 0 ? (
          <StatChip>{plural(snapshotMeta.sampledPathCount, "sampled path")}</StatChip>
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
    <StructuredCard title="Legacy diffs">
      <div style={diffList}>
        {diffMeta.diffs.map((diff, index) => (
          <div key={`${diff.filePath}-${index}`} style={diffCard}>
            <div style={diffFilePath}>{diff.filePath}</div>
            <pre style={diffPatch}>{clampPatchForPreview(diff.patch)}</pre>
          </div>
        ))}
      </div>
    </StructuredCard>
  );
}

function ApprovalRow({ approval }: { approval: CodexForgeApprovalGate }) {
  return (
    <div style={approvalRow}>
      <div style={approvalRowTop}>
        <span style={approvalLabel}>{approval.label}</span>
        <span style={getStateChipStyle(approval.state)}>
          {getApprovalStateLabel(approval.state)}
        </span>
      </div>

      {approval.reason ? <div style={approvalReason}>{approval.reason}</div> : null}
    </div>
  );
}

function DiffPreviewSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const previews = getStructuredDiffPreviews(structured);
  const approvals = getStructuredApprovals(structured);
  const batch = structured?.diffPreviewBatch;

  const hasDiffPreviews = previews.length > 0 || !!batch || approvals.length > 0;
  if (!hasDiffPreviews) return null;

  return (
    <StructuredCard title="Approval diff previews">
      <div style={approvalHero}>
        <div style={approvalHeroText}>
          Patches are reviewable previews. File mutation should stay blocked
          until the matching approval gate is explicitly approved.
        </div>

        <div style={approvalHeroStats}>
          {previews.length > 0 ? (
            <StatChip>{plural(previews.length, "preview")}</StatChip>
          ) : null}
          {approvals.length > 0 ? (
            <StatChip>{plural(approvals.length, "approval")}</StatChip>
          ) : null}
          {batch?.status ? (
            <span style={getStateChipStyle(batch.status)}>
              Batch: {getPreviewStatusLabel(batch.status)}
            </span>
          ) : null}
        </div>
      </div>

      {batch?.summary ? <div style={batchSummary}>{batch.summary}</div> : null}

      {previews.length > 0 ? (
        <div style={diffList}>
          {previews.map((preview, index) => {
            const patchStats = summarizePatch(preview.patch);
            const approvalState = preview.approval?.state ?? "pending";

            return (
              <div
                key={`${preview.previewId}-${preview.filePath}-${index}`}
                style={diffPreviewCard}
              >
                <div style={diffPreviewHeader}>
                  <div>
                    <div style={diffFilePath}>{preview.filePath}</div>
                    {preview.summary ? (
                      <div style={diffSummary}>{preview.summary}</div>
                    ) : null}
                  </div>

                  <div style={previewBadgeWrap}>
                    <span style={getStateChipStyle(preview.status)}>
                      {getPreviewStatusLabel(preview.status)}
                    </span>
                    <span style={getStateChipStyle(approvalState)}>
                      Approval: {getApprovalStateLabel(approvalState)}
                    </span>
                    <span style={preview.dryRun ? dryRunChip : mutationChip}>
                      {preview.dryRun ? "Dry run" : "Mutation"}
                    </span>
                  </div>
                </div>

                <div style={statsGrid}>
                  <StatChip>+{patchStats.additions}</StatChip>
                  <StatChip>-{patchStats.deletions}</StatChip>
                  <StatChip>{plural(patchStats.hunks, "hunk")}</StatChip>
                  {preview.validation?.status ? (
                    <StatChip>Validation: {preview.validation.status}</StatChip>
                  ) : null}
                  {preview.applyResult ? (
                    <span
                      style={
                        preview.applyResult.ok
                          ? approvedStateChip
                          : rejectedStateChip
                      }
                    >
                      Apply: {preview.applyResult.ok ? "ok" : "failed"}
                    </span>
                  ) : null}
                </div>

                {preview.approval ? <ApprovalRow approval={preview.approval} /> : null}

                <details style={patchDetails}>
                  <summary style={patchSummary}>Review unified patch</summary>
                  <pre style={diffPatch}>{clampPatchForPreview(preview.patch)}</pre>
                </details>
              </div>
            );
          })}
        </div>
      ) : null}

      {approvals.length > 0 ? (
        <div style={approvalList}>
          {approvals.map((approval, index) => (
            <ApprovalRow
              key={`${approval.kind}-${approval.label}-${approval.state}-${index}`}
              approval={approval}
            />
          ))}
        </div>
      ) : null}
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

const executionResultCard: React.CSSProperties = {
  marginTop: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(99,102,241,0.08)",
  fontSize: 13,
  lineHeight: 1.55,
};

const approvalHero: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(59,130,246,0.16)",
  background: "rgba(59,130,246,0.08)",
  marginBottom: 12,
};

const approvalHeroText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.88,
};

const approvalHeroStats: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const batchSummary: React.CSSProperties = {
  marginBottom: 12,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
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

const diffPreviewCard: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.28), rgba(2,6,23,0.18))",
};

const diffPreviewHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

const diffFilePath: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
  opacity: 0.9,
  wordBreak: "break-word",
};

const diffSummary: React.CSSProperties = {
  marginTop: 4,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.76,
};

const previewBadgeWrap: React.CSSProperties = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
  alignItems: "flex-start",
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

const patchDetails: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

const patchSummary: React.CSSProperties = {
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  opacity: 0.86,
};

const approvalList: React.CSSProperties = {
  display: "grid",
  gap: 8,
  marginTop: 12,
};

const approvalRow: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.035)",
};

const approvalRowTop: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "wrap",
};

const approvalLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 900,
};

const approvalReason: React.CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.74,
};

const pendingStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(245,158,11,0.26)",
  background: "rgba(245,158,11,0.12)",
  fontSize: 10,
  fontWeight: 900,
};

const approvedStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(16,185,129,0.26)",
  background: "rgba(16,185,129,0.12)",
  fontSize: 10,
  fontWeight: 900,
};

const rejectedStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(239,68,68,0.26)",
  background: "rgba(239,68,68,0.12)",
  fontSize: 10,
  fontWeight: 900,
};

const staleStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(148,163,184,0.12)",
  fontSize: 10,
  fontWeight: 900,
};

const applyingStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(99,102,241,0.26)",
  background: "rgba(99,102,241,0.12)",
  fontSize: 10,
  fontWeight: 900,
};

const dryRunChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(59,130,246,0.26)",
  background: "rgba(59,130,246,0.12)",
  fontSize: 10,
  fontWeight: 900,
};

const mutationChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(239,68,68,0.26)",
  background: "rgba(239,68,68,0.12)",
  fontSize: 10,
  fontWeight: 900,
};
