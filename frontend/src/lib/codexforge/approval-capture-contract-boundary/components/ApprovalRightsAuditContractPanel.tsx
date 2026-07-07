"use client";

import type { CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { APPROVAL_CAPTURE_CONTRACT_MARKERS, APPROVAL_RIGHTS_AUDIT_CONTRACT_MODEL_FIELDS, FOUNDATION_CONTRACT_COMPLETION_MARKERS, RIGHTS_CONSENT_AUDIT_CONTRACT_MARKERS, buildApprovalRightsAuditContractRouteModel, buildApprovalRightsAuditContractStableKey, type ApprovalRightsAuditContractItem, type ApprovalRightsAuditContractRouteSlug, type ApprovalRightsAuditContractSection, type ApprovalRightsAuditContractState } from "../approval-rights-audit-contract-model";

export function ApprovalRightsAuditContractPageClientShell({ routeSlug }: { routeSlug: ApprovalRightsAuditContractRouteSlug }) {
  const model = buildApprovalRightsAuditContractRouteModel(routeSlug);
  return <CodexForgeAppShell activePath={model.route.href} workspaceLabel={model.route.title} nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}><ApprovalRightsAuditContractRoutePanel routeSlug={routeSlug} /></CodexForgeAppShell>;
}

export function ApprovalCaptureContractBoundaryCockpitSummaryPanel() {
  const model = buildApprovalRightsAuditContractRouteModel("cockpit-approval-capture-contract-summary");
  const workspace = model.contract;
  const cards: readonly { section: ApprovalRightsAuditContractSection; stateLabel: string }[] = [
    { section: workspace.approvalRequestSchema, stateLabel: "Request schema" },
    { section: workspace.operatorAttestation, stateLabel: "Attestation" },
    { section: workspace.multiStepApprovalChain, stateLabel: "Approval chain" },
    { section: workspace.approvalExpirationPolicy, stateLabel: "Expiration" },
    { section: workspace.approvalRevocationPolicy, stateLabel: "Revocation" },
    { section: workspace.approvalEvidencePacket, stateLabel: "Evidence packet" },
    { section: workspace.approvalDenialLedger, stateLabel: "Denial ledger" },
    { section: workspace.approvalEscalationPolicy, stateLabel: "Escalation" },
    { section: workspace.approvalAuditEvent, stateLabel: "Approval audit" },
    { section: workspace.frontendApprovalPersistenceBlocked, stateLabel: "Frontend blocked" },
  ];
  return (
    <section style={cockpitPanel} aria-label="Approval Capture Contract" data-codexforge-approval-capture-contract={APPROVAL_CAPTURE_CONTRACT_MARKERS.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>Approval Capture Contract</span><span style={surfaceBadge}>Backend Contracts</span><span style={approvalBadge}>Release candidate</span></div><h2 style={titleStyle}>Approval Capture Contract</h2><p style={summary}>Review-only approval capture contract. Synthetic data only. This summary extends the backend contract lane below Publish Gateway Contract and shows approval request schema, operator attestation, multi-step approval chain, expiration and revocation policy, evidence packet, denial ledger, escalation policy, approval audit event, frontend approval persistence blocked, and denied paths.</p><p style={bodyText}>No approval buttons, signature buttons, identity verification buttons, account authorization buttons, export approval buttons, publish approval buttons, render approval buttons, API buttons, service buttons, command buttons, provider buttons, model buttons, connector buttons, persistence controls, or hidden execution affordances are present.</p><p style={bodyText}>Backend-owned approval capture remains required. Backend-owned identity binding remains required. Backend-owned evidence storage remains required. Backend-owned audit trail remains required. Backend-owned approval revocation remains required. Operator review remains required. Explicit operator approval remains required.</p></header>
      <section style={statusBand} aria-label="Approval Capture Contract status"><span style={stateStyle("review-only")}>Review-only contract</span><span style={stateStyle("synthetic-only")}>Synthetic data only</span><span style={stateStyle("blocked")}>Frontend approval blocked</span><span style={stateStyle("backend-owned")}>Backend-owned approval required</span><span style={stateStyle("needs-approval")}>Explicit operator approval required</span></section>
      <section style={summaryGrid} aria-label="Approval Capture Contract cockpit summary">{workspace.cockpitSummary.slice(0, 6).map((item, index) => <CheckRow key={buildApprovalRightsAuditContractStableKey(["approval-summary", String(index), item.id])} item={item} />)}</section>
      <section style={sectionGrid} aria-label="Approval Capture Contract cockpit cards">{cards.map((card, index) => <SummaryCard key={buildApprovalRightsAuditContractStableKey(["approval-card", String(index), card.section.sectionId])} section={card.section} stateLabel={card.stateLabel} />)}</section>
      <details style={diagnosticsDrawer}><summary style={diagnosticsSummary}>Developer Diagnostics</summary><p style={bodyText}>Phase pages remain dev test diagnostics only. Diagnostic links stay secondary to the normal cockpit surface and do not expose approval persistence, signature capture, identity verification, account authorization, evidence storage, audit persistence, protected action approval, export, publish, render, API, service, command, provider, model, connector, browser storage, or file mutation controls.</p><div style={routeGrid}>{model.diagnosticRoutes.filter((route) => route.contractFamily === "approval-capture").map((route, index) => <a key={buildApprovalRightsAuditContractStableKey(["approval-diagnostic", String(index), route.slug])} style={routeLink} href={route.href}><span style={routePhase}>{route.phase}</span><span style={routeLabel}>{route.title}</span><span style={routeCommand}>{route.commandLabel}</span></a>)}</div></details>
      <a style={safeLink} href="/controlled-approval-capture-contract-release-candidate">Review Controlled Approval Capture Contract Release Candidate</a>
    </section>
  );
}

export function RightsConsentAuditContractBoundaryCockpitSummaryPanel() {
  const model = buildApprovalRightsAuditContractRouteModel("cockpit-rights-consent-audit-contract-summary");
  const workspace = model.contract;
  const cards: readonly { section: ApprovalRightsAuditContractSection; stateLabel: string }[] = [
    { section: workspace.rightsEvidenceSchema, stateLabel: "Rights evidence" },
    { section: workspace.consentEvidenceSchema, stateLabel: "Consent evidence" },
    { section: workspace.likenessConsentContract, stateLabel: "Likeness" },
    { section: workspace.musicRightsContract, stateLabel: "Music rights" },
    { section: workspace.brandLegalReviewContract, stateLabel: "Brand legal" },
    { section: workspace.usageLicensePolicy, stateLabel: "License policy" },
    { section: workspace.consentExpirationPolicy, stateLabel: "Consent expiry" },
    { section: workspace.consentRevocationPolicy, stateLabel: "Consent revocation" },
    { section: workspace.immutableAuditLedger, stateLabel: "Audit ledger" },
    { section: workspace.auditRedactionPolicy, stateLabel: "Audit redaction" },
    { section: workspace.auditRetentionPolicy, stateLabel: "Audit retention" },
    { section: workspace.frontendRightsConsentPersistenceBlocked, stateLabel: "Frontend blocked" },
  ];
  return (
    <section style={cockpitPanel} aria-label="Rights Consent Audit Contract" data-codexforge-rights-consent-audit-contract={RIGHTS_CONSENT_AUDIT_CONTRACT_MARKERS.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>Rights Consent Audit Contract</span><span style={surfaceBadge}>Backend Contracts</span><span style={approvalBadge}>Release candidate</span></div><h2 style={titleStyle}>Rights Consent Audit Contract</h2><p style={summary}>Review-only rights consent audit contract. Synthetic data only. This summary extends the backend contract lane below Approval Capture Contract and shows rights evidence, consent evidence, likeness consent, music rights, brand/legal review, license policy, consent expiration and revocation, immutable audit ledger, audit redaction and retention, frontend rights consent persistence blocked, and denied paths.</p><p style={bodyText}>No rights clearance buttons, consent approval buttons, likeness approval buttons, music clearance buttons, license grant buttons, legal approval buttons, audit persistence buttons, evidence storage buttons, export buttons, publish buttons, API buttons, service buttons, command buttons, provider buttons, model buttons, connector buttons, persistence controls, or hidden execution affordances are present.</p><p style={bodyText}>Backend-owned rights workflow remains required. Backend-owned consent workflow remains required. Backend-owned legal review remains required. Backend-owned audit ledger remains required. Backend-owned redaction policy remains required. Backend-owned retention policy remains required. Operator review remains required. Explicit operator approval remains required.</p></header>
      <section style={statusBand} aria-label="Rights Consent Audit Contract status"><span style={stateStyle("review-only")}>Review-only contract</span><span style={stateStyle("synthetic-only")}>Synthetic data only</span><span style={stateStyle("blocked")}>Frontend rights consent blocked</span><span style={stateStyle("backend-owned")}>Backend-owned workflow required</span><span style={stateStyle("needs-approval")}>Explicit operator approval required</span></section>
      <section style={summaryGrid} aria-label="Rights Consent Audit Contract cockpit summary">{workspace.cockpitSummary.slice(6, 10).map((item, index) => <CheckRow key={buildApprovalRightsAuditContractStableKey(["rights-summary", String(index), item.id])} item={item} />)}</section>
      <section style={sectionGrid} aria-label="Rights Consent Audit Contract cockpit cards">{cards.map((card, index) => <SummaryCard key={buildApprovalRightsAuditContractStableKey(["rights-card", String(index), card.section.sectionId])} section={card.section} stateLabel={card.stateLabel} />)}</section>
      <details style={diagnosticsDrawer}><summary style={diagnosticsSummary}>Developer Diagnostics</summary><p style={bodyText}>Phase pages remain dev test diagnostics only. Diagnostic links stay secondary to the normal cockpit surface and do not expose rights clearance, consent approval, license grant, legal approval, audit persistence, evidence storage, identity verification, account authorization, export, publish, API, service, command, provider, model, connector, browser storage, or file mutation controls.</p><div style={routeGrid}>{model.diagnosticRoutes.filter((route) => route.contractFamily === "rights-consent-audit").map((route, index) => <a key={buildApprovalRightsAuditContractStableKey(["rights-diagnostic", String(index), route.slug])} style={routeLink} href={route.href}><span style={routePhase}>{route.phase}</span><span style={routeLabel}>{route.title}</span><span style={routeCommand}>{route.commandLabel}</span></a>)}</div></details>
      <a style={safeLink} href="/controlled-rights-consent-audit-contract-release-candidate">Review Controlled Rights Consent Audit Contract Release Candidate</a>
    </section>
  );
}

export function FoundationContractsCompletionCandidateCockpitSummaryPanel() {
  const model = buildApprovalRightsAuditContractRouteModel("controlled-foundation-contracts-completion-candidate");
  const workspace = model.contract;
  const cards: readonly { section: ApprovalRightsAuditContractSection; stateLabel: string }[] = [
    { section: workspace.unifiedApprovalRightsAuditReleaseGate, stateLabel: "Unified gate" },
    { section: workspace.controlledFoundationContractsCompletion, stateLabel: "Completion" },
    { section: workspace.approvalCaptureContract, stateLabel: "Approval" },
    { section: workspace.rightsConsentAuditContract, stateLabel: "Rights consent audit" },
  ];
  return (
    <section style={cockpitPanel} aria-label="Foundation Contracts Completion Candidate" data-codexforge-foundation-contracts-completion={FOUNDATION_CONTRACT_COMPLETION_MARKERS.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>Foundation Contracts Completion</span><span style={surfaceBadge}>Backend Contracts</span><span style={approvalBadge}>Completion candidate</span></div><h2 style={titleStyle}>Controlled Foundation Contracts Completion Candidate</h2><p style={summary}>Review-only foundation contracts completion candidate. Synthetic data only. This card closes the current backend contract foundation and shows the unified approval rights audit release gate, foundation completion candidate, approval capture, rights consent audit, immutable audit ledger, denied paths, and readiness for the next Interactive Video Workspace UX Mega Batch without backend execution implementation.</p><p style={bodyText}>No approval buttons, signature buttons, rights clearance buttons, consent approval buttons, license grant buttons, legal approval buttons, audit persistence buttons, export buttons, publish buttons, render buttons, service buttons, API buttons, command buttons, token buttons, account authorization buttons, provider buttons, model buttons, connector buttons, browser storage controls, or hidden execution affordances are present.</p><p style={bodyText}>Backend-owned approval capture, rights workflow, consent workflow, legal review, immutable audit ledger, redaction policy, retention policy, operator review, and explicit operator approval remain required.</p></header>
      <section style={summaryGrid} aria-label="Foundation Contracts Completion cockpit summary">{workspace.cockpitSummary.slice(10).map((item, index) => <CheckRow key={buildApprovalRightsAuditContractStableKey(["foundation-summary", String(index), item.id])} item={item} />)}</section>
      <section style={sectionGrid} aria-label="Foundation Contracts Completion cockpit cards">{cards.map((card, index) => <SummaryCard key={buildApprovalRightsAuditContractStableKey(["foundation-card", String(index), card.section.sectionId])} section={card.section} stateLabel={card.stateLabel} />)}</section>
      <details style={diagnosticsDrawer}><summary style={diagnosticsSummary}>Developer Diagnostics</summary><p style={bodyText}>Diagnostic phase links stay secondary and do not expose release approval, approval persistence, rights clearance, consent approval, export, publish, render, service, API, command, provider, model, connector, browser storage, credential, token, or file mutation controls.</p><div style={routeGrid}>{model.diagnosticRoutes.filter((route) => route.contractFamily === "unified-foundation").map((route, index) => <a key={buildApprovalRightsAuditContractStableKey(["foundation-diagnostic", String(index), route.slug])} style={routeLink} href={route.href}><span style={routePhase}>{route.phase}</span><span style={routeLabel}>{route.title}</span><span style={routeCommand}>{route.commandLabel}</span></a>)}</div></details>
      <a style={safeLink} href="/controlled-foundation-contracts-completion-candidate">Review Controlled Foundation Contracts Completion Candidate</a>
    </section>
  );
}

export function ApprovalRightsAuditContractRoutePanel({ routeSlug, embedded = false }: { routeSlug: ApprovalRightsAuditContractRouteSlug; embedded?: boolean }) {
  const model = buildApprovalRightsAuditContractRouteModel(routeSlug);
  const workspace = model.contract;
  const title = model.route.contractFamily === "approval-capture" ? "Approval Capture Contract" : model.route.contractFamily === "rights-consent-audit" ? "Rights Consent Audit Contract" : "Foundation Contracts Completion";
  return (
    <section style={embedded ? embeddedPage : page} data-codexforge-approval-rights-audit-contract-route={model.route.markerPhrases.join(" | ")}>
      <header style={hero}><div style={eyebrowRow}><span style={phaseBadge}>{embedded ? title : model.route.phase}</span><span style={surfaceBadge}>{model.route.devOnly ? "Dev test diagnostics only" : "Cockpit surface"}</span><span style={approvalBadge}>Review only</span></div>{embedded ? <h2 style={titleStyle}>{title}</h2> : <h1 style={titleStyle}>{model.route.title}</h1>}<p style={summary}>{model.route.summary}</p><p style={bodyText}>This contract surface is review-only and synthetic-only from the frontend. It is not approval implementation, consent implementation, legal rights clearance, audit-log implementation, signature capture, identity verification, account authorization, backend service creation, API creation, command execution, frontend persistence, export, publish, render, provider execution, model execution, connector execution, browser storage, evidence storage, rights storage, consent storage, approval storage, audit storage, or file mutation.</p><p style={bodyText}>Backend-owned approval capture remains required. Backend-owned rights workflow remains required. Backend-owned consent workflow remains required. Backend-owned legal review remains required. Backend-owned immutable audit ledger remains required. Backend-owned redaction and retention policy remains required. Operator review remains required. Explicit operator approval remains required.</p></header>
      <section style={markerBand} aria-label="Approval rights audit contract page markers">{model.route.markerPhrases.map((marker, index) => <span key={buildApprovalRightsAuditContractStableKey(["marker", model.route.slug, String(index), marker])} style={markerPill}>{marker}</span>)}</section>
      <section style={identityBand} aria-label="Approval rights audit contract model fields"><div><p style={panelEyebrow}>Approval rights audit contract model</p><h2 style={sectionTitle}>approvalCaptureContractId: {workspace.approvalCaptureContractId}</h2></div><p style={bodyText}>approvalCaptureContractKind: {workspace.approvalCaptureContractKind}</p><p style={bodyText}>rightsConsentAuditContractId: {workspace.rightsConsentAuditContractId}</p><p style={bodyText}>rightsConsentAuditContractKind: {workspace.rightsConsentAuditContractKind}</p><div style={chipRow}>{APPROVAL_RIGHTS_AUDIT_CONTRACT_MODEL_FIELDS.map((field, index) => <span key={buildApprovalRightsAuditContractStableKey(["field", String(index), field])} style={chip}>{field}</span>)}</div></section>
      <section style={sectionGrid} aria-label="Approval rights audit contract route sections">{model.sections.map((section, index) => <SectionCard key={buildApprovalRightsAuditContractStableKey(["section", model.route.slug, String(index), section.sectionId])} section={section} />)}</section>
      <section style={splitBand} aria-label="Approval rights audit contract summary and safety limits"><article style={panel}><div style={panelHeader}><div><p style={panelEyebrow}>Cockpit</p><h3 style={sectionTitle}>cockpitSummary</h3></div><span style={stateStyle("review-only")}>Review only</span></div><div style={checklistGrid}>{workspace.cockpitSummary.map((item, index) => <CheckRow key={buildApprovalRightsAuditContractStableKey(["route-summary", String(index), item.id])} item={item} />)}</div></article><article style={panel}><div style={panelHeader}><div><p style={panelEyebrow}>Safety</p><h3 style={sectionTitle}>explicitSafetyLimits</h3></div><span style={stateStyle("blocked")}>Blocked</span></div><div style={chipRow}>{workspace.explicitSafetyLimits.map((limit, index) => <span key={buildApprovalRightsAuditContractStableKey(["limit", String(index), limit])} style={dangerChip}>{limit}</span>)}</div></article></section>
      <section style={continuityBand} aria-label="Approval rights audit contract continuity"><div style={panelHeader}><div><p style={panelEyebrow}>Controlled foundation contracts</p><h2 style={sectionTitle}>Review-only approval, rights, consent, and audit lane</h2></div><span style={stateStyle("blocked")}>No frontend approval, rights, consent, audit, evidence, export, publish, render, command, service, API, token, credential, browser storage, or file mutation</span></div><p style={bodyText}>{model.summary}</p></section>
      <a style={safeLink} href="/codexforge-cockpit">Back to CodexForge Cockpit</a>
    </section>
  );
}

function SummaryCard({ section, stateLabel }: { section: ApprovalRightsAuditContractSection; stateLabel: string }) { return <article style={summaryCard}><div style={panelHeader}><div><p style={panelEyebrow}>{stateLabel}</p><h3 style={sectionTitle}>{section.label}</h3></div><span style={stateStyle(section.state)}>{formatState(section.state)}</span></div><p style={bodyText}>{section.humanReadableSummary}</p></article>; }
function SectionCard({ section }: { section: ApprovalRightsAuditContractSection }) { return <article style={panel}><div style={panelHeader}><div><p style={panelEyebrow}>{section.label}</p><h2 style={sectionTitle}>{section.title}</h2></div><span style={stateStyle(section.state)}>{formatState(section.state)}</span></div><p style={bodyText}>{section.humanReadableSummary}</p><TextList title="Planned inputs" values={section.plannedInputs} /><TextList title="Planned outputs" values={section.plannedOutputs} /><div style={checklistGrid}>{section.checklist.map((item, index) => <CheckRow key={buildApprovalRightsAuditContractStableKey(["check", section.sectionId, String(index), item.id])} item={item} />)}</div><div style={chipRow}>{section.safetyNotes.map((note, index) => <span key={buildApprovalRightsAuditContractStableKey(["safety", section.sectionId, String(index), note])} style={chip}>{note}</span>)}</div></article>; }
function TextList({ title, values }: { title: string; values: readonly string[] }) { return <div style={listBlock}><p style={panelEyebrow}>{title}</p><div style={chipRow}>{values.map((value, index) => <span key={buildApprovalRightsAuditContractStableKey(["list", title, String(index), value])} style={chip}>{value}</span>)}</div></div>; }
function CheckRow({ item }: { item: ApprovalRightsAuditContractItem }) { return <article style={checkRow}><span style={stateStyle(item.state)}>{formatState(item.state)}</span><div><p style={checkLabel}>{item.label}</p><p style={checkDetail}>{item.detail}</p></div></article>; }
function formatState(state: ApprovalRightsAuditContractState): string { if (state === "review-only") return "Review only"; if (state === "synthetic-only") return "Synthetic"; if (state === "backend-owned") return "Backend-owned"; if (state === "needs-approval") return "Needs approval"; if (state === "candidate") return "Candidate"; if (state === "release-candidate") return "Release candidate"; return "Blocked"; }
function stateStyle(state: ApprovalRightsAuditContractState): CSSProperties { return { ...stateBadge, ...(state === "blocked" ? blockedBadge : state === "needs-approval" ? approvalStateBadge : state === "backend-owned" ? backendBadge : state === "release-candidate" || state === "candidate" ? candidateBadge : reviewBadge) }; }
const page: CSSProperties = { display: "flex", flexDirection: "column", gap: 18, padding: "28px", color: "#1e2428" };
const embeddedPage: CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };
const cockpitPanel: CSSProperties = { ...page, border: "1px solid #d0d7de", borderRadius: 8, background: "#fbfcfd" };
const hero: CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const eyebrowRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const titleStyle: CSSProperties = { margin: 0, fontSize: 32, lineHeight: 1.08, letterSpacing: 0, color: "#14202b" };
const summary: CSSProperties = { margin: 0, maxWidth: 1120, color: "#38434c", fontSize: 15, lineHeight: 1.65 };
const bodyText: CSSProperties = { margin: 0, color: "#45515b", fontSize: 14, lineHeight: 1.6 };
const phaseBadge: CSSProperties = { padding: "6px 10px", borderRadius: 999, background: "#1f3446", color: "#f7fbff", fontSize: 12, fontWeight: 700 };
const surfaceBadge: CSSProperties = { ...phaseBadge, background: "#e8eef3", color: "#1f3446" };
const approvalBadge: CSSProperties = { ...phaseBadge, background: "#fff0cc", color: "#664a0d" };
const markerBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const markerPill: CSSProperties = { padding: "7px 9px", borderRadius: 6, background: "#f1f5f8", border: "1px solid #d0d7de", color: "#2e3942", fontSize: 12, lineHeight: 1.35 };
const identityBand: CSSProperties = { display: "flex", flexDirection: "column", gap: 12, padding: 16, border: "1px solid #d0d7de", borderRadius: 8, background: "#ffffff" };
const statusBand: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, padding: 12, border: "1px solid #d0d7de", borderRadius: 8, background: "#ffffff" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 };
const sectionGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 };
const splitBand: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 };
const panel: CSSProperties = { display: "flex", flexDirection: "column", gap: 12, padding: 16, border: "1px solid #d0d7de", borderRadius: 8, background: "#ffffff" };
const summaryCard: CSSProperties = { ...panel, minHeight: 168 };
const panelHeader: CSSProperties = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 };
const panelEyebrow: CSSProperties = { margin: "0 0 4px", color: "#62707c", fontSize: 11, fontWeight: 800, letterSpacing: 0, textTransform: "uppercase" };
const sectionTitle: CSSProperties = { margin: 0, color: "#14202b", fontSize: 18, lineHeight: 1.25, letterSpacing: 0 };
const listBlock: CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
const checklistGrid: CSSProperties = { display: "grid", gap: 10 };
const checkRow: CSSProperties = { display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start", padding: 10, border: "1px solid #dde4ea", borderRadius: 8, background: "#f9fbfc" };
const checkLabel: CSSProperties = { margin: 0, color: "#14202b", fontWeight: 800, fontSize: 13 };
const checkDetail: CSSProperties = { margin: "3px 0 0", color: "#45515b", fontSize: 12, lineHeight: 1.45 };
const chipRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const chip: CSSProperties = { padding: "6px 8px", borderRadius: 6, background: "#f1f5f8", borderWidth: "1px", borderStyle: "solid", borderColor: "#d0d7de", color: "#2e3942", fontSize: 12, lineHeight: 1.35 };
const stateBadge: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content", maxWidth: 260, padding: "5px 8px", borderRadius: 999, fontSize: 11, fontWeight: 800, lineHeight: 1.2, whiteSpace: "normal" };
const reviewBadge: CSSProperties = { background: "#e9f3ef", color: "#174838", border: "1px solid #b9d9cc" };
const backendBadge: CSSProperties = { background: "#edf0fb", color: "#263b73", border: "1px solid #c3cbea" };
const approvalStateBadge: CSSProperties = { background: "#fff3d4", color: "#6a4b0f", border: "1px solid #efd28f" };
const blockedBadge: CSSProperties = { background: "#fae8e8", color: "#702121", border: "1px solid #e5b8b8" };
const candidateBadge: CSSProperties = { background: "#eef1f7", color: "#2f3a51", border: "1px solid #cbd3df" };
const dangerChip: CSSProperties = { ...chip, background: "#fff7ed", borderColor: "#efd3b3", color: "#663f14" };
const continuityBand: CSSProperties = { ...panel, background: "#f8fbfc" };
const diagnosticsDrawer: CSSProperties = { ...panel, background: "#fbfcfd" };
const diagnosticsSummary: CSSProperties = { cursor: "pointer", color: "#14202b", fontWeight: 800 };
const routeGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 };
const routeLink: CSSProperties = { display: "flex", flexDirection: "column", gap: 4, padding: 12, borderRadius: 8, border: "1px solid #d0d7de", background: "#ffffff", color: "#14202b", textDecoration: "none" };
const routePhase: CSSProperties = { color: "#62707c", fontSize: 11, fontWeight: 800 };
const routeLabel: CSSProperties = { color: "#14202b", fontSize: 13, fontWeight: 800 };
const routeCommand: CSSProperties = { color: "#45515b", fontSize: 12 };
const safeLink: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "fit-content", padding: "9px 12px", borderRadius: 8, background: "#1f3446", color: "#ffffff", textDecoration: "none", fontSize: 13, fontWeight: 800 };
