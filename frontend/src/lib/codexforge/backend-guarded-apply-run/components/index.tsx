"use client";

import type { CSSProperties } from "react";
import {
  buildBackendGuardedApplyRunRouteModel,
  buildBackendGuardedApplyRunStableKey,
  type BackendGuardedApplyRunPanelState,
  type BackendGuardedApplyRunRouteSlug,
} from "../backend-guarded-apply-run-model";

export function BackendGuardedApplyRunPanel() {
  return <BackendGuardedApplyRunRoutePanel routeSlug="codexforge-cockpit" />;
}

export function BackendGuardedApplyRunRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: BackendGuardedApplyRunRouteSlug;
  embedded?: boolean;
}) {
  const model = buildBackendGuardedApplyRunRouteModel(routeSlug);

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-backend-guarded-apply-run={`${model.route.title} preview-only explicit operator approval required no real file mutation no real command execution no backend execution no apply or run execution no model calls no provider calls no connector calls no approval persistence no queue persistence no execution lock release no evidence persistence no result persistence no audit persistence no recovery execution`}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{model.route.phase}</span>
          <span style={devBadge}>{model.route.devOnly ? "Dev/test surface only" : "Cockpit guarded apply/run preview"}</span>
        </div>
        <h2 style={title}>{model.route.title}</h2>
        <p style={summary}>{model.route.summary}</p>
        <p style={safetyLead}>
          This is a backend-owned guarded apply/run contract preview. The cockpit shows approval handoff, guarded
          apply, guarded run, combined apply/run, path guard, command guard, approval enforcement, evidence, result,
          recovery, audit, queue state, denied path, and go/no-go contracts while all backend execution remains blocked.
        </p>
      </header>

      <section style={noticeBand} aria-label="Backend guarded apply run safety boundary">
        {model.globalSafetyCopy.map((copy, index) => (
          <p key={buildBackendGuardedApplyRunStableKey(["global-safety", model.route.slug, String(index)])} style={noticeText}>
            {copy}
          </p>
        ))}
      </section>

      <section style={markerBand} aria-label="Backend guarded apply run markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span key={buildBackendGuardedApplyRunStableKey(["marker", model.route.slug, String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </section>

      <section style={splitBand} aria-label="Backend guarded apply run approval and denied paths">
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Operator Approval Boundary</h3>
          <p style={bodyText}>{model.route.approvalCopy}</p>
        </article>
        <article style={plainPanel}>
          <h3 style={sectionTitle}>Denied Paths</h3>
          <p style={bodyText}>{model.route.deniedCopy}</p>
        </article>
      </section>

      <section style={compactMatrix} aria-label="Backend guarded apply run static model">
        <MatrixPanel title="Execution Flow" values={model.executionFlow} routeSlug={model.route.slug} namespace="execution-flow" />
        <MatrixPanel title="Apply Requirements" values={model.applyRequirements} routeSlug={model.route.slug} namespace="apply-requirement" />
        <MatrixPanel title="Run Requirements" values={model.runRequirements} routeSlug={model.route.slug} namespace="run-requirement" />
        <MatrixPanel title="Guard Requirements" values={model.guardRequirements} routeSlug={model.route.slug} namespace="guard-requirement" />
        <MatrixPanel title="Evidence Fields" values={model.evidenceFields} routeSlug={model.route.slug} namespace="evidence-field" />
        <MatrixPanel title="Result States" values={model.resultStates} routeSlug={model.route.slug} namespace="result-state" />
        <MatrixPanel title="Recovery Requirements" values={model.recoveryRequirements} routeSlug={model.route.slug} namespace="recovery-requirement" />
        <MatrixPanel title="Audit Records" values={model.auditRecords} routeSlug={model.route.slug} namespace="audit-record" />
        <MatrixPanel title="Queue States" values={model.queueStates} routeSlug={model.route.slug} namespace="queue-state" />
        <MatrixPanel title="Denied Path Matrix" values={model.deniedPathMatrix} routeSlug={model.route.slug} namespace="denied-path" />
        <MatrixPanel title="Build-Anything Scope" values={model.targetFamilies} routeSlug={model.route.slug} namespace="target-family" />
      </section>

      <section style={surfaceStack} aria-label="Backend guarded apply run checklist">
        {model.surfaces.map((surface, surfaceIndex) => (
          <article
            key={buildBackendGuardedApplyRunStableKey(["surface", model.route.slug, String(surfaceIndex), surface.id])}
            style={surfacePanel}
          >
            <div style={panelHeader}>
              <div>
                <p style={panelEyebrow}>{surface.eyebrow}</p>
                <h3 style={panelTitle}>{surface.title}</h3>
              </div>
              <span style={stateStyle(surface.state)}>{formatState(surface.state)}</span>
            </div>
            <p style={bodyText}>{surface.body}</p>
            <div style={checklistGrid}>
              {surface.checklist.map((checkItem, itemIndex) => (
                <div
                  key={buildBackendGuardedApplyRunStableKey(["checklist-item", surface.id, String(itemIndex), checkItem.id])}
                  style={checklistRow}
                >
                  <span style={smallStateStyle(checkItem.state)}>{formatState(checkItem.state)}</span>
                  <div>
                    <p style={checkLabel}>{checkItem.label}</p>
                    <p style={checkDetail}>{checkItem.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={chipRow} aria-label={`${surface.title} placeholders`}>
              {surface.placeholders.map((placeholder, placeholderIndex) => (
                <span
                  key={buildBackendGuardedApplyRunStableKey(["placeholder", surface.id, String(placeholderIndex), placeholder])}
                  style={placeholderChip}
                >
                  {placeholder}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      {model.route.devOnly ? (
        <footer style={footerBand}>
          <a style={safeLink} href="/codexforge-cockpit">
            Go to Unified CodexForge Cockpit
          </a>
        </footer>
      ) : null}
    </section>
  );
}

function MatrixPanel({
  title,
  values,
  routeSlug,
  namespace,
}: {
  title: string;
  values: readonly string[];
  routeSlug: string;
  namespace: string;
}) {
  return (
    <article style={plainPanel}>
      <h3 style={sectionTitle}>{title}</h3>
      <div style={chipRow}>
        {values.map((value, index) => (
          <span key={buildBackendGuardedApplyRunStableKey([namespace, routeSlug, String(index), value])} style={chip}>
            {value}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatState(state: BackendGuardedApplyRunPanelState): string {
  if (state === "approval-required") return "Approval required";
  if (state === "preview-only") return "Preview only";
  if (state === "dev-test-only") return "Dev/test only";
  return "Blocked";
}

function stateStyle(state: BackendGuardedApplyRunPanelState): CSSProperties {
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

function smallStateStyle(state: BackendGuardedApplyRunPanelState): CSSProperties {
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

const embeddedPage: CSSProperties = {
  ...page,
  padding: "18px 0 0",
};

const hero: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const eyebrowRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
};

const phaseBadge: CSSProperties = {
  border: "1px solid #426377",
  color: "#123243",
  background: "#eef8fc",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const devBadge: CSSProperties = {
  border: "1px solid #8e6f2f",
  color: "#463408",
  background: "#fff7db",
  borderRadius: 6,
  padding: "4px 8px",
  fontSize: 12,
  fontWeight: 700,
};

const title: CSSProperties = {
  margin: 0,
  fontSize: 28,
  lineHeight: 1.15,
  letterSpacing: 0,
};

const summary: CSSProperties = {
  margin: 0,
  maxWidth: 980,
  color: "#30404a",
  fontSize: 16,
  lineHeight: 1.55,
};

const safetyLead: CSSProperties = {
  ...summary,
  color: "#4a3420",
};

const noticeBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  border: "1px solid #d3e0dd",
  borderRadius: 8,
  padding: 14,
  background: "#f7fbf9",
};

const noticeText: CSSProperties = {
  margin: 0,
  color: "#294039",
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

const compactMatrix: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 12,
};

const plainPanel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#ffffff",
};

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 17,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};

const chip: CSSProperties = {
  border: "1px solid #c9d7e3",
  borderRadius: 6,
  padding: "6px 8px",
  background: "#f6f9fc",
  color: "#223645",
  fontSize: 12,
};

const placeholderChip: CSSProperties = {
  ...chip,
  background: "#fbfcfd",
};

const surfaceStack: CSSProperties = {
  display: "grid",
  gap: 14,
};

const surfacePanel: CSSProperties = {
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

const footerBand: CSSProperties = {
  borderTop: "1px solid #e1e7ec",
  paddingTop: 14,
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
