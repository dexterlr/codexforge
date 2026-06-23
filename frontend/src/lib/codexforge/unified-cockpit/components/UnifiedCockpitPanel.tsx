"use client";

import type { CSSProperties } from "react";
import { BackendExecutionQueueCockpitSummaryPanel } from "../../backend-execution-queue/components";
import { DailyTestableCockpitMvpPanel } from "../../daily-testable-cockpit-mvp/components";
import { EvidenceMemoryCockpitSummaryPanel } from "../../evidence-memory/components";
import { GoalCompilerCockpitSummaryPanel } from "../../goal-compiler/components";
import { PlanDiffCommandComposerCockpitSummaryPanel } from "../../plan-diff-command-composer/components";
import { ProjectContextBrainCockpitSummaryPanel } from "../../project-context-brain/components";
import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  type UnifiedCockpitPanelState,
  type UnifiedCockpitRouteSlug,
} from "../unified-cockpit-model";

export function UnifiedCodexForgeCockpitPanel() {
  return <UnifiedCockpitRoutePanel routeSlug="codexforge-cockpit" />;
}

export function UnifiedCockpitRoutePanel({ routeSlug }: { routeSlug: UnifiedCockpitRouteSlug }) {
  const model = buildUnifiedCockpitRouteModel(routeSlug);
  const isMainCockpit = model.route.slug === "codexforge-cockpit";

  return (
    <section
      style={page}
      data-codexforge-unified-cockpit={`${model.route.title} ${model.route.summary} review-only no command execution no file mutation no model calls no provider calls no connector calls no runtime execution no adapter execution no hidden approvals`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Preferred normal user cockpit"}</span>
        </div>
        <h1 style={title}>{model.route.title}</h1>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          Normal operation should happen in this cockpit. Phase pages are dev/test surfaces only. File writes remain
          blocked until explicit operator approval. Commands remain blocked until explicit operator approval.
        </p>
      </header>

      <section style={noticeBand} aria-label="Unified cockpit safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildUnifiedCockpitStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Page-level cockpit markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildUnifiedCockpitStableKey(["marker", model.route.slug, String(index)])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Approval and denied paths">
        <article style={plainPanel}>
          <h2 style={sectionTitle}>Operator Approval Boundary</h2>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h2 style={sectionTitle}>Denied Paths</h2>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      {isMainCockpit ? <DailyTestableCockpitMvpPanel embedded /> : null}
      {isMainCockpit ? <ProjectContextBrainCockpitSummaryPanel /> : null}
      {isMainCockpit ? <GoalCompilerCockpitSummaryPanel /> : null}
      {isMainCockpit ? <PlanDiffCommandComposerCockpitSummaryPanel /> : null}
      {isMainCockpit ? <EvidenceMemoryCockpitSummaryPanel /> : null}
      {isMainCockpit ? <BackendExecutionQueueCockpitSummaryPanel /> : null}

      {!isMainCockpit ? (
        <>
          <section style={panelStack} aria-label="Unified cockpit checklist">
            {model.panels.map((panel, panelIndex) => (
              <article key={buildUnifiedCockpitStableKey(["cockpit-panel", model.route.slug, String(panelIndex), panel.id])} style={panelBlock}>
                <div style={panelHeader}>
                  <div>
                    <p style={panelEyebrow}>{panel.eyebrow}</p>
                    <h2 style={panelTitle}>{panel.title}</h2>
                  </div>
                  <span style={stateStyle(panel.state)}>{formatState(panel.state)}</span>
                </div>
                <p style={bodyText}>{panel.body}</p>
                <div style={checklistGrid}>
                  {panel.checklist.map((item, itemIndex) => (
                    <div
                      key={buildUnifiedCockpitStableKey(["checklist-item", panel.id, String(itemIndex), item.id])}
                      style={checklistRow}
                    >
                      <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
                      <div>
                        <p style={checkLabel}>{item.label}</p>
                        <p style={checkDetail}>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={evidenceRail} aria-label={`${panel.title} evidence placeholders`}>
                  {panel.evidence.map((evidence, evidenceIndex) => (
                    <span key={buildUnifiedCockpitStableKey(["evidence", panel.id, String(evidenceIndex)])} style={evidenceChip}>
                      {evidence}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section style={integrationBand} aria-label="Guarded spine cockpit integration">
            <h2 style={sectionTitle}>Guarded Spine Integration</h2>
            <p style={bodyText}>
              File-write and command-runner slices feed this cockpit as review/dev surface language only. Future real file
              write or command execution must remain behind explicit operator approval, guards, evidence capture, result
              capture, and recovery contract.
            </p>
            <div style={linkRow}>
              <a style={safeLink} href="/controlled-real-guarded-file-write-mvp-release-candidate">
                Controlled real guarded file-write review
              </a>
              <a style={safeLink} href="/controlled-real-guarded-command-mvp-release-candidate">
                Controlled real guarded command review
              </a>
            </div>
          </section>

          <section style={devDrawer} aria-label="Cockpit dev surface drawer">
            <div style={panelHeader}>
              <div>
                <p style={panelEyebrow}>Dev/test surface drawer</p>
                <h2 style={sectionTitle}>Phase pages are dev/test surfaces only</h2>
              </div>
              <a style={mainCockpitLink} href="/codexforge-cockpit">
                Go to Unified CodexForge Cockpit
              </a>
            </div>
            <p style={bodyText}>
              Dev surface drawer requires explicit operator intent to browse dev/test routes. Normal users should use the
              cockpit instead of phase pages.
            </p>
            <div style={devRouteGrid}>
              {model.devRoutes.map((route, routeIndex) => (
                <a
                  key={buildUnifiedCockpitStableKey(["dev-route", String(routeIndex), route.slug])}
                  style={devRouteLink}
                  href={route.href}
                >
                  <span style={routePhase}>Phase {route.phase}</span>
                  <span style={routeLabel}>{route.label}</span>
                  <span style={routeCommand}>{route.commandLabel}</span>
                </a>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}

function formatState(state: UnifiedCockpitPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}

function stateStyle(state: UnifiedCockpitPanelState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "dev-test-only"
          ? devOnlyBadge
          : previewBadge),
  };
}

function smallStateStyle(state: UnifiedCockpitPanelState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "blocked"
      ? blockedBadge
      : state === "approval-required"
        ? approvalBadge
        : state === "dev-test-only"
          ? devOnlyBadge
          : previewBadge),
  };
}

const page: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: "28px",
  color: "#172026",
};

const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "4px 0 10px",
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const phaseBadge: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #8aa4b8",
  borderRadius: 6,
  padding: "5px 8px",
  fontSize: 12,
  fontWeight: 700,
  color: "#233746",
  background: "#f2f7fa",
};

const devBadge: CSSProperties = {
  ...phaseBadge,
  borderColor: "#c7a553",
  color: "#5c4512",
  background: "#fff7df",
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.08,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 920,
  fontSize: 18,
  lineHeight: 1.5,
  color: "#344854",
};

const safetyLead: CSSProperties = {
  margin: 0,
  maxWidth: 980,
  fontSize: 15,
  lineHeight: 1.55,
  color: "#4b5f6b",
};

const noticeBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  padding: 14,
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  background: "#f7fbf9",
};

const noticeText: CSSProperties = {
  margin: 0,
  color: "#27423d",
  fontSize: 13,
  lineHeight: 1.45,
};

const markerBand: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const markerPill: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#ffffff",
  color: "#2f3b43",
  fontSize: 12,
  lineHeight: 1.3,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const plainPanel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};

const targetBand: CSSProperties = {
  borderTop: "1px solid #e1e7ec",
  borderBottom: "1px solid #e1e7ec",
  padding: "16px 0",
};

const targetGrid: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 12,
};

const targetPill: CSSProperties = {
  border: "1px solid #c9d7e3",
  borderRadius: 6,
  padding: "7px 9px",
  background: "#f6f9fc",
  color: "#223645",
  fontSize: 13,
};

const panelStack: CSSProperties = {
  display: "grid",
  gap: 14,
};

const panelBlock: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const panelHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  flexWrap: "wrap",
};

const panelEyebrow: CSSProperties = {
  margin: "0 0 4px",
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 0,
};

const panelTitle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const stateBadge: CSSProperties = {
  border: "1px solid",
  borderRadius: 6,
  padding: "6px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const smallStateBadge: CSSProperties = {
  ...stateBadge,
  flex: "0 0 auto",
  padding: "4px 6px",
  fontSize: 11,
};

const blockedBadge: CSSProperties = {
  borderColor: "#d29a9a",
  background: "#fff3f1",
  color: "#7d2c26",
};

const approvalBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff8e6",
  color: "#5c4512",
};

const previewBadge: CSSProperties = {
  borderColor: "#9db8d0",
  background: "#eef6fc",
  color: "#244862",
};

const devOnlyBadge: CSSProperties = {
  borderColor: "#a8aeb8",
  background: "#f4f5f7",
  color: "#3f4852",
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 12,
  marginTop: 14,
};

const checklistRow: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  borderTop: "1px solid #edf1f4",
  paddingTop: 10,
};

const checkLabel: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 700,
  color: "#263640",
};

const checkDetail: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 13,
  lineHeight: 1.45,
  color: "#5a6a76",
};

const evidenceRail: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 14,
};

const evidenceChip: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #d8dee4",
  borderRadius: 6,
  padding: "6px 8px",
  background: "#fbfcfd",
  color: "#40505c",
  fontSize: 12,
};

const integrationBand: CSSProperties = {
  border: "1px solid #cddbd7",
  borderRadius: 8,
  padding: 16,
  background: "#f8fbfa",
};

const linkRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 12,
};

const safeLink: CSSProperties = {
  display: "inline-flex",
  border: "1px solid #b7c9d7",
  borderRadius: 6,
  padding: "8px 10px",
  color: "#164666",
  background: "#ffffff",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 700,
};

const devDrawer: CSSProperties = {
  borderTop: "2px solid #d8dee4",
  paddingTop: 16,
};

const mainCockpitLink: CSSProperties = {
  ...safeLink,
  borderColor: "#8fb6a7",
  color: "#1f5947",
};

const devRouteGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 14,
};

const devRouteLink: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minHeight: 92,
  justifyContent: "center",
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 12,
  background: "#ffffff",
  color: "#24333d",
  textDecoration: "none",
};

const routePhase: CSSProperties = {
  color: "#677783",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
};

const routeCommand: CSSProperties = {
  color: "#51626e",
  fontSize: 12,
  lineHeight: 1.35,
};
