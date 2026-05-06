import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import {
  plural,
  StatChip,
  StructuredCard,
  wrapRow,
} from "@/lib/codexforge/chat/components/structured-ui-primitives";
import { getDiffMeta } from "@/lib/codexforge/chat/client-renderers";
import type {
  CodexForgeApprovalGate,
  CodexForgeDiffPreview,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

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

export function getDiffPreviewCount(structured: CodexForgeStructuredReply): number {
  return (
    getStructuredDiffPreviews(structured).length ||
    structured.diffPreviewBatch?.previews?.length ||
    0
  );
}

export function getApprovalCount(structured: CodexForgeStructuredReply): number {
  return getStructuredApprovals(structured).length;
}

export function getPendingApprovalCount(
  structured: CodexForgeStructuredReply
): number {
  return getStructuredApprovals(structured).filter(
    (approval) => approval.state === "pending"
  ).length;
}

function getPreviewStatusLabel(status?: string): string {
  if (status === "ready") return "Ready";
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
  if (state === "applied") return "Applied";
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
  lines: number;
} {
  const lines = patch.split(/\r?\n/);
  let additions = 0;
  let deletions = 0;

  for (const line of lines) {
    if (line.startsWith("+") && !line.startsWith("+++")) additions++;
    if (line.startsWith("-") && !line.startsWith("---")) deletions++;
  }

  return { additions, deletions, lines: lines.length };
}

function clampPatchForPreview(patch: string, maxLines = 180): string {
  const lines = patch.split(/\r?\n/);
  if (lines.length <= maxLines) return patch;

  return [
    ...lines.slice(0, maxLines),
    `... truncated ${lines.length - maxLines} additional lines ...`,
  ].join("\n");
}

function getPreviewCheckpointId(preview: CodexForgeDiffPreview): string | null {
  const value = (preview as { checkpointId?: unknown }).checkpointId;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function DiffSection({
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

export function DiffPreviewSection({
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

        <div style={wrapRow}>
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
            const checkpointId = getPreviewCheckpointId(preview);

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

                  <div style={wrapRow}>
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

                <div style={styles.structuredParagraph}>
                  {preview.approvalRequired
                    ? "Approval required before apply."
                    : "No approval gate is required."}
                </div>

                <div style={wrapRow}>
                  <StatChip>{plural(patchStats.lines, "patch line")}</StatChip>
                  <StatChip>{plural(patchStats.additions, "addition")}</StatChip>
                  <StatChip>{plural(patchStats.deletions, "deletion")}</StatChip>
                  {checkpointId ? (
                    <StatChip>Checkpoint: {checkpointId}</StatChip>
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

const approvalHero: React.CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(59,130,246,0.16)",
  background: "rgba(59,130,246,0.07)",
  marginBottom: 12,
};

const approvalHeroText: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.88,
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

const diffPatch: React.CSSProperties = {
  margin: 0,
  padding: 12,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(0,0,0,0.22)",
  color: "rgba(226,232,240,0.92)",
  fontSize: 11,
  lineHeight: 1.5,
  overflowX: "auto",
  maxHeight: 420,
  whiteSpace: "pre",
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
  border: "1px solid rgba(234,179,8,0.22)",
  background: "rgba(234,179,8,0.10)",
  fontSize: 11,
  fontWeight: 900,
};

const approvedStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(34,197,94,0.24)",
  background: "rgba(34,197,94,0.10)",
  fontSize: 11,
  fontWeight: 900,
};

const rejectedStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(248,113,113,0.24)",
  background: "rgba(248,113,113,0.10)",
  fontSize: 11,
  fontWeight: 900,
};

const staleStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(148,163,184,0.22)",
  background: "rgba(148,163,184,0.09)",
  fontSize: 11,
  fontWeight: 900,
};

const applyingStateChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(59,130,246,0.24)",
  background: "rgba(59,130,246,0.10)",
  fontSize: 11,
  fontWeight: 900,
};

const dryRunChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(34,197,94,0.22)",
  background: "rgba(34,197,94,0.10)",
  fontSize: 11,
  fontWeight: 900,
};

const mutationChip: React.CSSProperties = {
  padding: "5px 8px",
  borderRadius: 999,
  border: "1px solid rgba(248,113,113,0.22)",
  background: "rgba(248,113,113,0.10)",
  fontSize: 11,
  fontWeight: 900,
};
