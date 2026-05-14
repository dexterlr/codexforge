"use client";

import type { CSSProperties } from "react";
import { isPatchApplyBlocked, summarizePatchApprovalBoundary } from "../patch-approval";
import type { CodexForgePatchApprovalBoundary } from "../patch-preview-types";

export function PatchApprovalBoundary({
  boundary,
}: {
  boundary: CodexForgePatchApprovalBoundary;
}) {
  return (
    <section data-codexforge-patch-approval-boundary style={panel}>
      <div style={top}>
        <div style={textGuard}>
          <div style={eyebrow}>Approval Boundary</div>
          <strong>{isPatchApplyBlocked(boundary) ? "Apply blocked in Phase 6" : "Approval available"}</strong>
        </div>
        <span style={blockedPill}>blocked</span>
      </div>
      <p style={body}>{summarizePatchApprovalBoundary(boundary)}</p>
      <div style={grid}>
        <BoundaryItem label="Preview" value={boundary.previewAllowed ? "Allowed" : "Blocked"} />
        <BoundaryItem label="Apply" value={boundary.applyBlocked ? "Blocked" : "Allowed"} />
        <BoundaryItem label="No file mutation" value={boundary.fileMutationBlocked ? "Enforced" : "Open"} />
        <BoundaryItem label="Command execution" value={boundary.commandExecutionBlocked ? "Blocked" : "Open"} />
      </div>
      <div style={blockedBox}>
        <strong>Irrelevant capabilities stay blocked</strong>
        <span>{boundary.blockedCapabilities.join(", ")}</span>
      </div>
    </section>
  );
}

function BoundaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={item}>
      <strong>{label}</strong>
      <span>{value}</span>
    </div>
  );
}

const textGuard: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const panel: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.28)",
  background: "rgba(127,29,29,0.16)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
  ...textGuard,
};

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
  ...textGuard,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.72,
};

const blockedPill: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.38)",
  background: "rgba(248,113,113,0.15)",
  borderRadius: 8,
  padding: "7px 9px",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.5,
  opacity: 0.84,
  ...textGuard,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  gap: 8,
  ...textGuard,
};

const item: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
  ...textGuard,
};

const blockedBox: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.28)",
  background: "rgba(251,191,36,0.10)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.4,
  ...textGuard,
};
