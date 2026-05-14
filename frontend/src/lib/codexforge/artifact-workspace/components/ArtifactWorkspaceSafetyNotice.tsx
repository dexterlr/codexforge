"use client";

import type { CSSProperties } from "react";
import type { ArtifactWorkspaceContext } from "@/lib/codexforge/artifact-workspace";

export function ArtifactWorkspaceSafetyNotice({ context }: { context: ArtifactWorkspaceContext }) {
  return (
    <section
      style={panel}
      data-codexforge-artifact-workspace-safety-notice="ArtifactWorkspaceSafetyNotice renders"
      data-codexforge-artifact-workspace-artifact-only="artifact export only"
      data-codexforge-artifact-workspace-source-mutation="source mutation blocked"
      data-codexforge-artifact-workspace-approval="explicit approval required"
      data-codexforge-artifact-workspace-root="safe workspace"
    >
      <span style={eyebrow}>Artifact workspace safety</span>
      <h2 style={title}>Export is artifact export only</h2>
      <p style={body}>
        Preview artifacts can be exported only after explicit approval into the safe workspace
        {` ${context.workspaceRoot}`}. Source mutation blocked, command execution blocked, external app execution blocked.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.24)", background: "rgba(39,8,16,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 22, letterSpacing: 0 };
const body: CSSProperties = { margin: 0, color: "#fee2e2", fontSize: 13, lineHeight: 1.5 };
