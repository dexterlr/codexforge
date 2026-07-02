"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ARTIFACT_EXPORT_CONTRACT_MARKERS, ARTIFACT_EXPORT_PUBLISH_GATEWAY_CONTRACT_MODEL_FIELDS, PUBLISH_GATEWAY_CONTRACT_MARKERS, buildArtifactExportPublishGatewayContractRouteModel, buildArtifactExportPublishGatewayContractStableKey, type ArtifactExportPublishGatewayContractItem, type ArtifactExportPublishGatewayContractRouteSlug, type ArtifactExportPublishGatewayContractSection, type ArtifactExportPublishGatewayContractState } from "../artifact-export-publish-gateway-contract-model";

export function ArtifactExportPublishGatewayContractPageClientShell({ routeSlug }: { routeSlug: ArtifactExportPublishGatewayContractRouteSlug }) {
  const model = buildArtifactExportPublishGatewayContractRouteModel(routeSlug);
  return <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><ArtifactExportPublishGatewayContractRoutePanel routeSlug={routeSlug} /></CodexForgeAppShell>;
}

export function ArtifactExportContractBoundaryCockpitSummaryPanel() {
  const model = buildArtifactExportPublishGatewayContractRouteModel("cockpit-artifact-export-contract-summary");
  const workspace = model.contract;
  const cards: readonly { section: ArtifactExportPublishGatewayContractSection; stateLabel: string }[] = [
    { section: workspace.artifactSchema, stateLabel: "Artifact schema" },
    { section: workspace.artifactChecksumContract, stateLabel: "Checksum" },
    { section: workspace.artifactRetentionPolicy, stateLabel: "Retention" },
    { section: workspace.artifactAccessPolicy, stateLabel: "Access" },
    { section: workspace.exportRequestSchema, stateLabel: "Request" },
    { section: workspace.exportReadinessGate, stateLabel: "Readiness" },
    { section: workspace.exportFormatPolicy, stateLabel: "Format" },
    { section: workspace.exportAuditEvent, stateLabel: "Audit" },
    { section: workspace.downloadBlockedBoundary, stateLabel: "Download blocked" },
    { section: workspace.exportFailureLedger, stateLabel: "Failure ledger" },
    { section: workspace.artifactHandoffContract, stateLabel: "Handoff" },
    { section: workspace.frontendExportBlocked, stateLabel: "Frontend blocked" },
  ];
  return (
    <section style={cockpitPanel} aria-label="Artifact Export Contract" data-codexforge-artifact-export-contract={ARTIFACT_EXPORT_CONTRACT_MARKERS.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>Artifact Export Contract</span><span style={surfaceBadge}>Backend Contracts</span><span style={approvalBadge}>Release candidate</span></div><h2 style={titleStyle}>Artifact Export Contract</h2><p style={summary}>Review-only artifact export contract. Synthetic data only. This summary extends the backend contract lane below Worker Orchestration Contract and shows artifact schema, checksum, retention/access, export request, export readiness, export format, export audit, download blocked, export failure ledger, artifact handoff, frontend export blocked, and denied paths.</p><p style={bodyText}>No artifact buttons, export buttons, download buttons, upload buttons, file buttons, worker buttons, API buttons, service buttons, command buttons, provider buttons, model buttons, connector buttons, persistence controls, or hidden execution affordances are present.</p><p style={bodyText}>Backend-owned artifact storage remains required. Backend-owned export service remains required. Backend-owned checksum capture remains required. Backend-owned access policy remains required. Backend-owned retention policy remains required. Backend-owned audit trail remains required. Backend-owned approval capture remains required. Operator review remains required. Explicit operator approval remains required.</p></header>
      <section style={statusBand} aria-label="Artifact Export Contract status"><span style={stateStyle("review-only")}>Review-only contract</span><span style={stateStyle("synthetic-only")}>Synthetic data only</span><span style={stateStyle("blocked")}>Frontend export blocked</span><span style={stateStyle("backend-owned")}>Backend-owned export required</span><span style={stateStyle("needs-approval")}>Explicit operator approval required</span></section>
      <section style={summaryGrid} aria-label="Artifact Export Contract cockpit summary">{workspace.cockpitSummary.slice(0, 7).map((item, index) => <CheckRow key={buildArtifactExportPublishGatewayContractStableKey(["artifact-summary", String(index), item.id])} item={item} />)}</section>
      <section style={sectionGrid} aria-label="Artifact Export Contract cockpit cards">{cards.map((card, index) => <SummaryCard key={buildArtifactExportPublishGatewayContractStableKey(["artifact-card", String(index), card.section.sectionId])} section={card.section} stateLabel={card.stateLabel} />)}</section>
      <details style={diagnosticsDrawer}><summary style={diagnosticsSummary}>Developer Diagnostics</summary><p style={bodyText}>Phase pages remain dev test diagnostics only. Diagnostic links stay secondary to the normal cockpit surface and do not expose artifact, export, download, upload, file, worker, API, service, command, provider, model, connector, persistence, browser storage, or file mutation controls.</p><div style={routeGrid}>{model.diagnosticRoutes.filter((route) => route.contractFamily === "artifact-export").map((route, index) => <a key={buildArtifactExportPublishGatewayContractStableKey(["artifact-diagnostic", String(index), route.slug])} style={routeLink} href={route.href}><span style={routePhase}>{route.phase}</span><span style={routeLabel}>{route.title}</span><span style={routeCommand}>{route.commandLabel}</span></a>)}</div></details>
      <a style={safeLink} href="/controlled-artifact-export-contract-release-candidate">Review Controlled Artifact Export Contract Release Candidate</a>
    </section>
  );
}

export function PublishGatewayContractBoundaryCockpitSummaryPanel() {
  const model = buildArtifactExportPublishGatewayContractRouteModel("cockpit-publish-gateway-contract-summary");
  const workspace = model.contract;
  const cards: readonly { section: ArtifactExportPublishGatewayContractSection; stateLabel: string }[] = [
    { section: workspace.socialAccountAuthorization, stateLabel: "Account authorization" },
    { section: workspace.publishRequestSchema, stateLabel: "Publish request" },
    { section: workspace.schedulePolicy, stateLabel: "Schedule" },
    { section: workspace.platformPolicy, stateLabel: "Platform" },
    { section: workspace.mediaUploadBlocked, stateLabel: "Media upload blocked" },
    { section: workspace.publishApprovalGate, stateLabel: "Approval gate" },
    { section: workspace.publishAuditEvent, stateLabel: "Audit" },
    { section: workspace.publishFailureLedger, stateLabel: "Failure ledger" },
    { section: workspace.scheduleHold, stateLabel: "Schedule hold" },
    { section: workspace.takedownRevocationPolicy, stateLabel: "Takedown" },
    { section: workspace.publishTelemetry, stateLabel: "Telemetry" },
    { section: workspace.frontendPublishBlocked, stateLabel: "Frontend blocked" },
  ];
  return (
    <section style={cockpitPanel} aria-label="Publish Gateway Contract" data-codexforge-publish-gateway-contract={PUBLISH_GATEWAY_CONTRACT_MARKERS.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>Publish Gateway Contract</span><span style={surfaceBadge}>Backend Contracts</span><span style={approvalBadge}>Release candidate</span></div><h2 style={titleStyle}>Publish Gateway Contract</h2><p style={summary}>Review-only publish gateway contract. Synthetic data only. This summary extends the backend contract lane below Artifact Export Contract and shows social account authorization, publish request, schedule policy, platform policy, media upload blocked, publish approval gate, publish audit/failure, schedule hold, takedown/revocation, publish telemetry, frontend publish blocked, and denied paths.</p><p style={bodyText}>No publish buttons, schedule buttons, social API buttons, media upload buttons, account authorization buttons, token buttons, API buttons, service buttons, command buttons, provider buttons, model buttons, connector buttons, persistence controls, or hidden execution affordances are present.</p><p style={bodyText}>Backend-owned publish gateway remains required. Backend-owned account authorization remains required. Backend-owned scheduling gateway remains required. Backend-owned approval capture remains required. Backend-owned rights review remains required. Backend-owned audit trail remains required. Operator review remains required. Explicit operator approval remains required.</p></header>
      <section style={statusBand} aria-label="Publish Gateway Contract status"><span style={stateStyle("review-only")}>Review-only contract</span><span style={stateStyle("synthetic-only")}>Synthetic data only</span><span style={stateStyle("blocked")}>Frontend publish blocked</span><span style={stateStyle("backend-owned")}>Backend-owned gateway required</span><span style={stateStyle("needs-approval")}>Explicit operator approval required</span></section>
      <section style={summaryGrid} aria-label="Publish Gateway Contract cockpit summary">{workspace.cockpitSummary.slice(7).map((item, index) => <CheckRow key={buildArtifactExportPublishGatewayContractStableKey(["publish-summary", String(index), item.id])} item={item} />)}</section>
      <section style={sectionGrid} aria-label="Publish Gateway Contract cockpit cards">{cards.map((card, index) => <SummaryCard key={buildArtifactExportPublishGatewayContractStableKey(["publish-card", String(index), card.section.sectionId])} section={card.section} stateLabel={card.stateLabel} />)}</section>
      <details style={diagnosticsDrawer}><summary style={diagnosticsSummary}>Developer Diagnostics</summary><p style={bodyText}>Phase pages remain dev test diagnostics only. Diagnostic links stay secondary to the normal cockpit surface and do not expose publishing, scheduling, social API, media upload, account authorization, token storage, API, service, command, provider, model, connector, persistence, browser storage, or file mutation controls.</p><div style={routeGrid}>{model.diagnosticRoutes.filter((route) => route.contractFamily === "publish-gateway").map((route, index) => <a key={buildArtifactExportPublishGatewayContractStableKey(["publish-diagnostic", String(index), route.slug])} style={routeLink} href={route.href}><span style={routePhase}>{route.phase}</span><span style={routeLabel}>{route.title}</span><span style={routeCommand}>{route.commandLabel}</span></a>)}</div></details>
      <a style={safeLink} href="/controlled-publish-gateway-contract-release-candidate">Review Controlled Publish Gateway Contract Release Candidate</a>
    </section>
  );
}

export function ArtifactExportPublishGatewayContractRoutePanel({ routeSlug, embedded = false }: { routeSlug: ArtifactExportPublishGatewayContractRouteSlug; embedded?: boolean }) {
  const model = buildArtifactExportPublishGatewayContractRouteModel(routeSlug);
  const workspace = model.contract;
  const title = model.route.contractFamily === "artifact-export" ? "Artifact Export Contract" : "Publish Gateway Contract";
  return (
    <section style={embedded ? embeddedPage : page} data-codexforge-artifact-export-publish-gateway-contract-route={model.route.markerPhrases.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>{embedded ? title : model.route.phase}</span><span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span><span style={approvalBadge}>Review only</span></div>{embedded ? <h2 style={titleStyle}>{title}</h2> : <h1 style={titleStyle}>{model.route.title}</h1>}<p style={summary}>{model.route.summary}</p><p style={bodyText}>This contract surface is review-only and synthetic-only from the frontend. It is not artifact creation, artifact persistence, export, download, upload, file generation, file write, signed URL creation, access mutation, publishing, scheduling, social API calls, media upload, account authorization, token storage, provider execution, model execution, connector execution, prompt sending, approval persistence, audit persistence, telemetry persistence, browser storage, file mutation, or frontend persistence.</p><p style={bodyText}>Backend-owned artifact storage remains required. Backend-owned export service remains required. Backend-owned publish gateway remains required. Backend-owned account authorization remains required. Backend-owned scheduling gateway remains required. Backend-owned approval capture remains required. Backend-owned rights review remains required. Backend-owned audit trail remains required. Operator review remains required. Explicit operator approval remains required.</p></header>
      <section style={markerBand} aria-label="Artifact export publish gateway contract page markers">{model.route.markerPhrases.map((marker, index) => <span key={buildArtifactExportPublishGatewayContractStableKey(["marker", model.route.slug, String(index), marker])} style={markerPill}>{marker}</span>)}</section>
      <section style={identityBand} aria-label="Artifact export publish gateway contract model fields"><div><p style={panelEyebrow}>Artifact export and publish gateway contract model</p><h2 style={sectionTitle}>artifactExportContractId: {workspace.artifactExportContractId}</h2></div><p style={bodyText}>artifactExportContractKind: {workspace.artifactExportContractKind}</p><p style={bodyText}>publishGatewayContractId: {workspace.publishGatewayContractId}</p><p style={bodyText}>publishGatewayContractKind: {workspace.publishGatewayContractKind}</p><div style={chipRow}>{ARTIFACT_EXPORT_PUBLISH_GATEWAY_CONTRACT_MODEL_FIELDS.map((field, index) => <span key={buildArtifactExportPublishGatewayContractStableKey(["field", String(index), field])} style={chip}>{field}</span>)}</div></section>
      <section style={sectionGrid} aria-label="Artifact export publish gateway contract route sections">{model.sections.map((section, index) => <SectionCard key={buildArtifactExportPublishGatewayContractStableKey(["section", model.route.slug, String(index), section.sectionId])} section={section} />)}</section>
      <section style={splitBand} aria-label="Artifact export publish gateway contract summary and safety limits"><article style={panel}><div style={panelHeader}><div><p style={panelEyebrow}>Cockpit</p><h3 style={sectionTitle}>cockpitSummary</h3></div><span style={stateStyle("review-only")}>Review only</span></div><div style={checklistGrid}>{workspace.cockpitSummary.map((item, index) => <CheckRow key={buildArtifactExportPublishGatewayContractStableKey(["route-summary", String(index), item.id])} item={item} />)}</div></article><article style={panel}><div style={panelHeader}><div><p style={panelEyebrow}>Safety</p><h3 style={sectionTitle}>explicitSafetyLimits</h3></div><span style={stateStyle("blocked")}>Blocked</span></div><div style={chipRow}>{workspace.explicitSafetyLimits.map((limit, index) => <span key={buildArtifactExportPublishGatewayContractStableKey(["limit", String(index), limit])} style={dangerChip}>{limit}</span>)}</div></article></section>
      <section style={continuityBand} aria-label="Artifact export publish gateway contract continuity"><div style={panelHeader}><div><p style={panelEyebrow}>Controlled release candidate</p><h2 style={sectionTitle}>Review-only artifact export and publish gateway lane</h2></div><span style={stateStyle("blocked")}>No frontend artifact, export, download, upload, publish, schedule, token, authorization, audit, or persistence</span></div><p style={bodyText}>{model.summary}</p></section>
      <a style={safeLink} href="/codexforge-cockpit">Back to CodexForge Cockpit</a>
    </section>
  );
}

function SummaryCard({ section, stateLabel }: { section: ArtifactExportPublishGatewayContractSection; stateLabel: string }) { return <article style={summaryCard}><div style={panelHeader}><div><p style={panelEyebrow}>{stateLabel}</p><h3 style={sectionTitle}>{section.label}</h3></div><span style={stateStyle(section.state)}>{formatState(section.state)}</span></div><p style={bodyText}>{section.humanReadableSummary}</p></article>; }
function SectionCard({ section }: { section: ArtifactExportPublishGatewayContractSection }) { return <article style={panel}><div style={panelHeader}><div><p style={panelEyebrow}>{section.label}</p><h2 style={sectionTitle}>{section.title}</h2></div><span style={stateStyle(section.state)}>{formatState(section.state)}</span></div><p style={bodyText}>{section.humanReadableSummary}</p><TextList title="Planned inputs" values={section.plannedInputs} /><TextList title="Planned outputs" values={section.plannedOutputs} /><div style={checklistGrid}>{section.checklist.map((item, index) => <CheckRow key={buildArtifactExportPublishGatewayContractStableKey(["check", section.sectionId, String(index), item.id])} item={item} />)}</div><div style={chipRow}>{section.safetyNotes.map((note, index) => <span key={buildArtifactExportPublishGatewayContractStableKey(["safety", section.sectionId, String(index), note])} style={chip}>{note}</span>)}</div></article>; }
function TextList({ title, values }: { title: string; values: readonly string[] }) { return <div style={listBlock}><p style={panelEyebrow}>{title}</p><div style={chipRow}>{values.map((value, index) => <span key={buildArtifactExportPublishGatewayContractStableKey(["list", title, String(index), value])} style={chip}>{value}</span>)}</div></div>; }
function CheckRow({ item }: { item: ArtifactExportPublishGatewayContractItem }) { return <article style={checkRow}><span style={stateStyle(item.state)}>{formatState(item.state)}</span><div><p style={checkLabel}>{item.label}</p><p style={checkDetail}>{item.detail}</p></div></article>; }
function formatState(state: ArtifactExportPublishGatewayContractState): string { if (state === "review-only") return "Review only"; if (state === "synthetic-only") return "Synthetic"; if (state === "backend-owned") return "Backend-owned"; if (state === "needs-approval") return "Needs approval"; if (state === "candidate") return "Candidate"; if (state === "release-candidate") return "Release candidate"; return "Blocked"; }
function stateStyle(state: ArtifactExportPublishGatewayContractState): CSSProperties { return { ...stateBadge, ...(state === "blocked" ? blockedBadge : state === "needs-approval" ? approvalStateBadge : state === "backend-owned" ? backendBadge : state === "release-candidate" || state === "candidate" ? candidateBadge : reviewBadge) }; }
const page: CSSProperties = { display: "flex", flexDirection: "column", gap: 18, padding: "28px", color: "#172026" };
const embeddedPage: CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };
const cockpitPanel: CSSProperties = { ...page, border: "1px solid #c8d4d1", borderRadius: 8, background: "#f8faf9" };
const hero: CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const eyebrowRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const titleStyle: CSSProperties = { margin: 0, fontSize: 32, lineHeight: 1.08, letterSpacing: 0, color: "#10211d" };
const summary: CSSProperties = { margin: 0, maxWidth: 1100, color: "#354842", fontSize: 15, lineHeight: 1.65 };
const bodyText: CSSProperties = { margin: 0, color: "#43544e", fontSize: 14, lineHeight: 1.6 };
const phaseBadge: CSSProperties = { padding: "6px 10px", borderRadius: 999, background: "#16352f", color: "#f7fbfa", fontSize: 12, fontWeight: 700 };
const surfaceBadge: CSSProperties = { ...phaseBadge, background: "#e0ebe7", color: "#16352f" };
const approvalBadge: CSSProperties = { ...phaseBadge, background: "#fff0cc", color: "#654710" };
const markerBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const markerPill: CSSProperties = { padding: "7px 9px", borderRadius: 6, background: "#eef5f2", border: "1px solid #c9d9d4", color: "#283a35", fontSize: 12, lineHeight: 1.35 };
const identityBand: CSSProperties = { display: "flex", flexDirection: "column", gap: 12, padding: 16, border: "1px solid #c9d9d4", borderRadius: 8, background: "#ffffff" };
const statusBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, padding: 12, border: "1px solid #c9d9d4", borderRadius: 8, background: "#ffffff" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 };
const sectionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 };
const splitBand: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 };
const panel: CSSProperties = { display: "flex", flexDirection: "column", gap: 12, padding: 16, border: "1px solid #c9d9d4", borderRadius: 8, background: "#ffffff" };
const summaryCard: CSSProperties = { ...panel, minHeight: 168 };
const panelHeader: CSSProperties = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 };
const panelEyebrow: CSSProperties = { margin: "0 0 4px", color: "#60736d", fontSize: 11, fontWeight: 800, letterSpacing: 0, textTransform: "uppercase" };
const sectionTitle: CSSProperties = { margin: 0, color: "#10211d", fontSize: 18, lineHeight: 1.25, letterSpacing: 0 };
const listBlock: CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
const checklistGrid: CSSProperties = { display: "grid", gap: 10 };
const checkRow: CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start", padding: 10, border: "1px solid #d8e5e0", borderRadius: 8, background: "#f9fbfa" };
const checkLabel: CSSProperties = { margin: 0, color: "#10211d", fontWeight: 800, fontSize: 13 };
const checkDetail: CSSProperties = { margin: "3px 0 0", color: "#43544e", fontSize: 12, lineHeight: 1.45 };
const chipRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const chip: CSSProperties = { padding: "6px 8px", borderRadius: 6, background: "#eef5f2", border: "1px solid #c9d9d4", color: "#283a35", fontSize: 12, lineHeight: 1.35 };
const stateBadge: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content", maxWidth: 250, padding: "5px 8px", borderRadius: 999, fontSize: 11, fontWeight: 800, lineHeight: 1.2, whiteSpace: "normal" };
const reviewBadge: CSSProperties = { background: "#e8f4f0", color: "#174c3d", border: "1px solid #b8dacf" };
const backendBadge: CSSProperties = { background: "#edf0fb", color: "#263b73", border: "1px solid #c3cbea" };
const approvalStateBadge: CSSProperties = { background: "#fff3d4", color: "#6a4b0f", border: "1px solid #efd28f" };
const blockedBadge: CSSProperties = { background: "#fae8e8", color: "#702121", border: "1px solid #e5b8b8" };
const candidateBadge: CSSProperties = { background: "#eef1f7", color: "#2f3a51", border: "1px solid #cbd3df" };
const dangerChip: CSSProperties = { ...chip, background: "#fff7ed", borderColor: "#efd3b3", color: "#663f14" };
const continuityBand: CSSProperties = { ...panel, background: "#f8fbfa" };
const diagnosticsDrawer: CSSProperties = { ...panel, background: "#fbfcfc" };
const diagnosticsSummary: CSSProperties = { cursor: "pointer", color: "#10211d", fontWeight: 800 };
const routeGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 };
const routeLink: CSSProperties = { display: "flex", flexDirection: "column", gap: 4, padding: 12, borderRadius: 8, border: "1px solid #d5e1dd", background: "#ffffff", color: "#10211d", textDecoration: "none" };
const routePhase: CSSProperties = { color: "#60736d", fontSize: 11, fontWeight: 800 };
const routeLabel: CSSProperties = { color: "#10211d", fontSize: 13, fontWeight: 800 };
const routeCommand: CSSProperties = { color: "#43544e", fontSize: 12 };
const safeLink: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content", padding: "9px 12px", borderRadius: 8, background: "#16352f", color: "#ffffff", textDecoration: "none", fontSize: 13, fontWeight: 800 };
