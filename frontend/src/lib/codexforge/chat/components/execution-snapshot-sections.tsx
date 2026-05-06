import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import {
  plural,
  StatChip,
  StructuredCard,
  wrapRow,
} from "@/lib/codexforge/chat/components/structured-ui-primitives";
import {
  getExecutionMeta,
  getSnapshotMeta,
} from "@/lib/codexforge/chat/client-renderers";
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

export function ExecutionSection({
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
      <div style={wrapRow}>
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

export function SnapshotSection({
  structured,
}: {
  structured?: CodexForgeStructuredReply | null;
}) {
  const snapshotMeta = getSnapshotMeta(structured);

  if (!snapshotMeta.hasSnapshot) return null;

  return (
    <StructuredCard title="Snapshot">
      <div style={wrapRow}>
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

const executionResultCard: React.CSSProperties = {
  marginTop: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.18)",
  background: "rgba(99,102,241,0.08)",
  fontSize: 13,
  lineHeight: 1.55,
};
