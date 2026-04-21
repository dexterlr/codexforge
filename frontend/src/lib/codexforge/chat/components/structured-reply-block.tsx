import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import {
  getDiffMeta,
  getDomainLabel,
  getExecutionMeta,
  getNextAction,
  getSnapshotMeta,
  getStructuredPlan,
} from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
  CodexForgeStructuredTool,
} from "@/lib/codexforge/types";

type StructuredReplyBlockProps = {
  structured?: CodexForgeStructuredReply | null;
};

function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function getToolAvailabilityLabel(tool: CodexForgeStructuredTool) {
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

function ListSection({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) {
  const safeItems = normalizeStringArray(items);
  if (safeItems.length === 0) return null;

  return (
    <div style={styles.structuredCard}>
      <div style={styles.structuredTitle}>{title}</div>
      <div style={styles.structuredList}>
        {safeItems.map((item, idx) => (
          <div key={`${title}-${idx}-${item}`} style={styles.structuredListItem}>
            <span style={styles.structuredBullet}>•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryStats({
  mode,
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
    mode ? `${mode}` : null,
    domain ? `${domain}` : null,
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
        <span key={stat} style={metaChip}>
          {stat}
        </span>
      ))}
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
    <div style={styles.structuredCard}>
      <div style={styles.structuredTitle}>Execution</div>

      <div style={statsGrid}>
        {executionMeta.stepNumber !== null ? (
          <span style={statChip}>Step {executionMeta.stepNumber}</span>
        ) : null}

        {executionMeta.phaseLabel ? (
          <span style={statChip}>Phase: {executionMeta.phaseLabel}</span>
        ) : null}

        {executionMeta.diffCount !== null ? (
          <span style={statChip}>
            {executionMeta.diffCount} diff
            {executionMeta.diffCount === 1 ? "" : "s"}
          </span>
        ) : null}

        {executionMeta.snapshotFileCount !== null ? (
          <span style={statChip}>
            {executionMeta.snapshotFileCount} snapshot file
            {executionMeta.snapshotFileCount === 1 ? "" : "s"}
          </span>
        ) : null}

        {executionMeta.logCount > 0 ? (
          <span style={statChip}>
            {executionMeta.logCount} log
            {executionMeta.logCount === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>

      {executionMeta.stepText ? (
        <div style={styles.structuredParagraph}>{executionMeta.stepText}</div>
      ) : null}

      {executionMeta.resultSummary ? (
        <div style={executionResultCard}>{executionMeta.resultSummary}</div>
      ) : null}

      {executionMeta.logs.length > 0 ? (
        <ListSection title="Execution logs" items={executionMeta.logs} />
      ) : null}
    </div>
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
    <div style={styles.structuredCard}>
      <div style={styles.structuredTitle}>Snapshot</div>

      <div style={statsGrid}>
        {snapshotMeta.fileCount !== null ? (
          <span style={statChip}>
            {snapshotMeta.fileCount} file
            {snapshotMeta.fileCount === 1 ? "" : "s"}
          </span>
        ) : null}

        {snapshotMeta.sampledPathCount > 0 ? (
          <span style={statChip}>
            {snapshotMeta.sampledPathCount} sampled path
            {snapshotMeta.sampledPathCount === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>

      {snapshotMeta.sampledPaths.length > 0 ? (
        <ListSection title="Sampled paths" items={snapshotMeta.sampledPaths} />
      ) : null}
    </div>
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
    <div style={styles.structuredCard}>
      <div style={styles.structuredTitle}>Diff previews</div>

      <div style={diffList}>
        {diffMeta.diffs.map((diff) => (
          <div key={diff.filePath} style={diffCard}>
            <div style={diffFilePath}>{diff.filePath}</div>
            <pre style={diffPatch}>{diff.patch}</pre>
          </div>
        ))}
      </div>
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
  return (
    <>
      <div style={styles.structuredCard}>
        <div style={styles.structuredTitle}>Plan goal</div>
        <div style={styles.structuredParagraph}>{goal}</div>
      </div>

      {domain ? (
        <div style={styles.structuredCard}>
          <div style={styles.structuredTitle}>Domain</div>
          <div style={styles.structuredParagraph}>
            {getDomainLabel(domain) ?? "General"}
          </div>
        </div>
      ) : null}

      {nextAction ? (
        <div style={styles.structuredCard}>
          <div style={styles.structuredTitle}>Next action</div>
          <div style={styles.structuredParagraph}>{nextAction}</div>
        </div>
      ) : null}

      <div style={styles.structuredCard}>
        <div style={styles.structuredTitle}>Execution steps</div>
        <div style={styles.structuredList}>
          {steps.map((step, idx) => (
            <div key={`step-${idx}-${step}`} style={styles.structuredListItem}>
              <span style={styles.structuredBullet}>{idx + 1}.</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

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
  tools?: CodexForgeStructuredTool[];
}) {
  if (!tools || tools.length === 0) return null;

  return (
    <div style={styles.structuredCard}>
      <div style={styles.structuredTitle}>Recommended tools</div>
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
    </div>
  );
}

export function StructuredReplyBlock({
  structured,
}: StructuredReplyBlockProps) {
  if (!structured) return null;

  const plan = getStructuredPlan(structured);
  const nextAction = getNextAction(plan);
  const mode = normalizeString(structured.mode);
  const domain = plan?.domain ?? structured.domain ?? undefined;
  const domainLabel = getDomainLabel(domain ?? null);
  const tags = normalizeStringArray(plan?.tags ?? structured.tags);
  const toolCount = structured.tools?.length ?? 0;
  const sectionCount = structured.sections?.length ?? 0;
  const stepCount = plan?.steps.length ?? structured.nextSteps?.length ?? 0;

  const executionMeta = getExecutionMeta(structured);
  const snapshotMeta = getSnapshotMeta(structured);
  const diffMeta = getDiffMeta(structured);

  const logCount = executionMeta.logCount;
  const diffCount = diffMeta.count;
  const snapshotFileCount = snapshotMeta.fileCount;

  return (
    <div style={styles.structuredWrap}>
      {structured.title || structured.summary ? (
        <div style={styles.structuredHero}>
          {structured.title ? (
            <div style={styles.structuredHeroTitle}>{structured.title}</div>
          ) : null}

          {structured.summary ? (
            <div style={styles.structuredHeroText}>{structured.summary}</div>
          ) : null}

          <SummaryStats
            mode={mode}
            domain={domainLabel}
            toolCount={toolCount}
            sectionCount={sectionCount}
            stepCount={stepCount}
            tagCount={tags.length}
            diffCount={diffCount}
            snapshotFileCount={snapshotFileCount}
            logCount={logCount}
          />
        </div>
      ) : null}

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
      ) : structured.goal ? (
        <div style={styles.structuredCard}>
          <div style={styles.structuredTitle}>Goal</div>
          <div style={styles.structuredParagraph}>{structured.goal}</div>
        </div>
      ) : null}

      <ListSection title="Context" items={structured.context} />
      <ListSection title="What I understood" items={structured.understanding} />

      {!plan ? (
        <>
          <ListSection title="Domain" items={domainLabel ? [domainLabel] : []} />
          <ListSection title="Tags" items={tags} />
          <ListSection title="Files to check" items={structured.files} />
          <ListSection title="Commands to run" items={structured.commands} />
          <ListSection title="Risks" items={structured.risks} />
          <ListSection title="Next steps" items={structured.nextSteps} />
        </>
      ) : null}

      <ToolsSection tools={structured.tools} />
      <ListSection title="Status" items={structured.status} />

      {structured.sections?.map((section) => (
        <ListSection
          key={section.title}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  );
}

const metaRow: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginTop: 4,
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