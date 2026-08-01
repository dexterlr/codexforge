import Link from "next/link";
import type { CSSProperties } from "react";

export function ProjectReaderEmptyState({
  reason = "No project files are available yet.",
  onRetry,
  loading = false,
  variant = "empty",
}: {
  reason?: string;
  onRetry?: () => void;
  loading?: boolean;
  variant?: "empty" | "error";
}) {
  const isError = variant === "error";
  return (
    <section
      role={isError ? "alert" : "status"}
      data-codexforge-project-reader-empty-state="ProjectReaderEmptyState renders API unavailable clear unavailable state"
      style={{ ...panel, ...(isError ? errorPanel : null) }}
    >
      <div style={{ ...title, ...(isError ? errorTitle : null) }}>{isError ? "Project reader unavailable" : "No project files found"}</div>
      <p style={{ ...body, ...(isError ? errorBody : null) }}>{reason}</p>
      <p style={{ ...body, ...(isError ? errorBody : null) }}>
        {isError
          ? "Retry the bounded read-only snapshot, or return to Projects to confirm the configured workspace."
          : "Refresh the bounded snapshot after configuring a project, or return to Projects for setup guidance."}
      </p>
      {onRetry ? (
        <button type="button" onClick={onRetry} disabled={loading} style={retryButton}>
          {loading ? "Refreshing..." : "Refresh read-only files"}
        </button>
      ) : null}
      <Link href="/video-projects" style={projectsLink}>Open Projects</Link>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(14,165,233,0.08)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const title: CSSProperties = {
  color: "#dbeafe",
  fontSize: 15,
  fontWeight: 900,
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const errorPanel: CSSProperties = {
  borderColor: "rgba(248,113,113,0.24)",
  background: "rgba(127,29,29,0.16)",
};

const errorTitle: CSSProperties = { color: "#fecaca" };
const errorBody: CSSProperties = { color: "#fee2e2" };

const retryButton: CSSProperties = {
  background: "rgba(248,113,113,.12)",
  border: "1px solid rgba(254,202,202,.28)",
  borderRadius: 8,
  color: "#fee2e2",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  justifySelf: "start",
  minHeight: 38,
  padding: "8px 11px",
};

const projectsLink: CSSProperties = {
  color: "#bae6fd",
  fontSize: 12,
  fontWeight: 900,
  justifySelf: "start",
};
