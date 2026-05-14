"use client";

import type { CSSProperties } from "react";
import { ArtifactExecutorCenter } from "@/lib/codexforge/artifact-executor/components/ArtifactExecutorCenter";
import {
  ExportSafetyBoundary,
  ExportWorkspaceRefreshPanel,
} from "@/lib/codexforge/artifact-export-flow/components";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { ArtifactExecutorModel } from "@/lib/codexforge/artifact-executor";
import { buildArtifactWorkspaceContext } from "@/lib/codexforge/artifact-workspace";
import {
  ArtifactExportApprovalPanel,
  ArtifactExportLedgerPanel,
  ArtifactExportValidationPanel,
  ArtifactPathGuardPanel,
  ArtifactWorkspacePanel,
  ArtifactWorkspaceSafetyNotice,
} from "@/lib/codexforge/artifact-workspace/components";

type ArtifactsPageClientProps = {
  initialData: ArtifactExecutorModel;
};

export default function ArtifactsPageClient({ initialData }: ArtifactsPageClientProps) {
  const workspaceContext = buildArtifactWorkspaceContext();

  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <ArtifactExecutorCenter model={initialData} />
      <main
        style={workspacePage}
        data-codexforge-artifact-workspace-ui="artifact export only source mutation blocked explicit approval required safe workspace"
      >
        <section style={workspaceHero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 11</span>
            <h1 style={headline}>Guarded Artifact Workspace</h1>
            <p style={lede}>
              Preview artifacts can become local review files only through explicit export approval.
              The export API writes only under .codexforge/artifacts, blocks source mutation paths,
              and never executes commands or external apps. Production packs are the recommended way
              to bundle multiple artifacts for review before export.
            </p>
            <a href="/production" style={productionLink}>Open Production Pack Builder</a>
          </div>
          <ArtifactWorkspaceSafetyNotice context={workspaceContext} />
        </section>

        <div style={workspaceLayout}>
          <div style={workspaceMain}>
            <ArtifactWorkspacePanel context={workspaceContext} />
            <ExportWorkspaceRefreshPanel />
            <ArtifactExportApprovalPanel request={workspaceContext.sampleRequest} />
            <ArtifactExportLedgerPanel ledger={workspaceContext.ledger} />
          </div>
          <aside style={workspaceRail}>
            <ExportSafetyBoundary />
            <ArtifactPathGuardPanel request={workspaceContext.sampleRequest} />
            <ArtifactExportValidationPanel report={workspaceContext.validation} />
          </aside>
        </div>
      </main>
    </>
  );
}

const navBand: CSSProperties = {
  background: "#050814",
  padding: "18px min(4vw, 44px) 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};

const workspacePage: CSSProperties = {
  color: "#f8fafc",
  background: "#02040A",
  padding: "0 min(4vw, 44px) 28px",
  display: "grid",
  gap: 16,
  fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
};
const workspaceHero: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", border: "1px solid rgba(45,212,191,0.18)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.82))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 430px), 0.75fr)", gap: 18, alignItems: "stretch" };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0, alignContent: "center" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.06, letterSpacing: 0 };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980 };
const productionLink: CSSProperties = { width: "fit-content", border: "1px solid rgba(45,212,191,0.26)", background: "rgba(20,184,166,0.14)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
const workspaceLayout: CSSProperties = { maxWidth: 1640, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.35fr) minmax(min(100%, 430px), 0.72fr)", gap: 16, alignItems: "start" };
const workspaceMain: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const workspaceRail: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
