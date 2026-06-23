"use client";

import type { CSSProperties } from "react";
import {
  buildGameServerBuilderRouteModel,
  buildGameServerBuilderStableKey,
  type GameServerBuilderItem,
  type GameServerBuilderRouteSlug,
  type GameServerBuilderSection,
  type GameServerBuilderState,
} from "../game-server-builder-model";

export function GameServerBuilderCockpitSummaryPanel() {
  const model = buildGameServerBuilderRouteModel("codexforge-cockpit");
  const builder = model.gameServerBuilder;

  return (
    <section
      style={cockpitSection}
      data-codexforge-game-server-builder={model.cockpitMarkers.join(" | ")}
      aria-label="Game Server Builder"
    >
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>Game Server Builder</p>
          <h2 style={sectionTitle}>Game Server Builder</h2>
        </div>
        <span style={stateStyle("preview-only")}>Preview only</span>
      </div>

      <p style={bodyText}>
        Server Goal shapes a private Minecraft Game of Thrones themed roleplay server before any backend-owned game
        server workflow exists. Server Type infers Minecraft roleplay survival intent, while Theme and Minecraft
        Profile explain the planned Westeros-inspired lore, version, loader, plugin, mod, world, memory, and validation
        posture.
      </p>
      <p style={bodyText}>
        Plugins and Mods are intent only. World Rules, Roles, Permissions, Economy, Quests, Regions, and Factions
        describe what future backend-owned configs may generate later, including houses, kingdoms, region protection,
        roleplay rules, ranks, trade, events, quests, spawn/lobby, and progression hooks.
      </p>
      <p style={bodyText}>
        Files and Commands are plans only. Validation, Evidence, Recovery, and Audit remain backend-owned requirements.
        No server starts from the cockpit. No plugin installs from the cockpit. No mod installs from the cockpit. No
        port binding from the cockpit. No command execution from the cockpit. Backend-owned game server workflow
        remains required. Explicit operator approval remains required.
      </p>

      <div style={cockpitGrid} aria-label="Game Server Builder cockpit labels">
        {builder.cockpitSummary.map((item, index) => (
          <SummaryCard
            key={buildGameServerBuilderStableKey(["game-server-cockpit-summary", String(index), item.id])}
            item={item}
          />
        ))}
      </div>

      <section style={identityBand} aria-label="Game Server Builder model identity">
        <p style={panelEyebrow}>Game server builder model</p>
        <p style={bodyText}>
          gameServerBuilderId: {builder.gameServerBuilderId}. gameServerBuilderKind: {builder.gameServerBuilderKind}.
          Future game server execution remains backend-owned, approval-gated, and blocked from the cockpit.
        </p>
      </section>

      <div style={markerBand} aria-label="Game Server Builder cockpit markers">
        {model.cockpitMarkers.map((marker, index) => (
          <span key={buildGameServerBuilderStableKey(["game-server-cockpit-marker", String(index), marker])} style={markerPill}>
            {marker}
          </span>
        ))}
      </div>
    </section>
  );
}

export function GameServerBuilderRoutePanel({
  routeSlug,
  embedded = false,
}: {
  routeSlug: GameServerBuilderRouteSlug;
  embedded?: boolean;
}) {
  const model = buildGameServerBuilderRouteModel(routeSlug);
  const builder = model.gameServerBuilder;
  const titleText = embedded ? "Game Server Builder" : model.route.title;

  return (
    <section
      style={embedded ? embeddedPage : page}
      data-codexforge-game-server-builder-route={model.route.markerPhrases.join(" | ")}
    >
      <header style={hero}>
        <div style={eyebrowRow}>
          <span style={phaseBadge}>{embedded ? "Game Server Builder" : model.route.phase}</span>
          <span style={surfaceBadge}>{model.route.devOnly ? "Dev/test diagnostics only" : "Cockpit summary"}</span>
        </div>
        {embedded ? <h2 style={title}>{titleText}</h2> : <h1 style={title}>{titleText}</h1>}
        <p style={summary}>{model.route.summary}</p>
        <p style={bodyText}>
          Game Server Builder is preview-only from the frontend. It does not start game servers from the UI. It does
          not install mods or plugins from the UI. It does not download server jars from the UI. It does not bind
          ports from the UI.
        </p>
        <p style={bodyText}>
          It does not run Java, Docker, SteamCMD, or server commands from the UI. It does not write generated server
          files from the UI. It does not call models, providers, connectors, or local models from the UI. It prepares a
          future backend-owned game server domain workflow. Explicit operator approval remains required.
        </p>
      </header>

      <section style={markerBand} aria-label="Game Server Builder page markers">
        {model.route.markerPhrases.map((marker, index) => (
          <span
            key={buildGameServerBuilderStableKey(["game-server-route-marker", model.route.slug, String(index), marker])}
            style={markerPill}
          >
            {marker}
          </span>
        ))}
      </section>

      <section style={identityBand} aria-label="Game Server Builder model fields">
        <div>
          <p style={panelEyebrow}>Game server builder model</p>
          <h3 style={sectionTitle}>gameServerBuilderId: {builder.gameServerBuilderId}</h3>
        </div>
        <p style={bodyText}>gameServerBuilderKind: {builder.gameServerBuilderKind}</p>
        <div style={chipRow}>
          {[
            "gameServerBuilderId",
            "gameServerBuilderKind",
            "goalRef",
            "projectContextRef",
            "specialistWorkerRef",
            "modelRouterRef",
            "providerApprovalRef",
            "localModelBridgeRef",
            "gameServerGoalIntake",
            "serverTypeClassifier",
            "themeLorePack",
            "minecraftServerProfile",
            "pluginModIntent",
            "worldRulesConfig",
            "rolesPermissionsEconomy",
            "questRegionFaction",
            "serverFilePlan",
            "serverCommandPlan",
            "serverValidationEvidence",
            "serverRecoveryAudit",
            "deniedGameServerBoundaries",
            "cockpitSummary",
            "explicitSafetyLimits",
          ].map((field, index) => (
            <span key={buildGameServerBuilderStableKey(["game-server-field", String(index), field])} style={chip}>
              {field}
            </span>
          ))}
        </div>
      </section>

      <section style={cardGrid} aria-label="Game Server Builder sections">
        {model.sections.map((section, index) => (
          <SectionCard
            key={buildGameServerBuilderStableKey(["game-server-section", model.route.slug, String(index), section.sectionId])}
            section={section}
          />
        ))}
      </section>

      <section style={splitBand} aria-label="Game Server Builder cockpit and safety limits">
        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Cockpit</p>
              <h3 style={sectionTitle}>cockpitSummary</h3>
            </div>
            <span style={stateStyle("review-only")}>Review only</span>
          </div>
          <div style={checklistGrid}>
            {builder.cockpitSummary.map((item, index) => (
              <CheckRow key={buildGameServerBuilderStableKey(["game-server-cockpit-item", String(index), item.id])} item={item} />
            ))}
          </div>
        </article>

        <article style={panel}>
          <div style={panelHeader}>
            <div>
              <p style={panelEyebrow}>Safety</p>
              <h3 style={sectionTitle}>explicitSafetyLimits</h3>
            </div>
            <span style={stateStyle("blocked")}>Blocked</span>
          </div>
          <div style={chipRow}>
            {builder.explicitSafetyLimits.map((limit, index) => (
              <span key={buildGameServerBuilderStableKey(["game-server-safety-limit", String(index), limit])} style={chip}>
                {limit}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section style={panel} aria-label="Game Server Builder continuity">
        <div style={panelHeader}>
          <div>
            <p style={panelEyebrow}>Continuity</p>
            <h3 style={sectionTitle}>
              Server Goal Server Type Theme Minecraft Profile Plugins Mods World Rules Roles Permissions Economy
              Quests Regions Factions Files Commands Validation Evidence Recovery Audit
            </h3>
          </div>
          <span style={stateStyle("backend-owned")}>Backend-owned</span>
        </div>
        <p style={bodyText}>
          Game Server Builder prepares CodexForge for backend-owned game server domain workflows while keeping the
          cockpit review-only. It turns a real user dream into a safe work proposal without starting servers, installing
          plugins or mods, downloading jars, binding ports, running commands, calling models, writing files, or
          persisting queues, transactions, evidence, results, audit, approvals, or memory from the frontend.
        </p>
      </section>

      <details style={diagnosticsDrawer} open={!embedded}>
        <summary style={diagnosticsSummary}>Diagnostics</summary>
        <p style={bodyText}>
          Phase pages remain dev test diagnostics only. Normal users continue to work from /codexforge-cockpit.
          frontend game server execution still blocked. backend-owned game server workflow remains required.
        </p>
        <div style={routeGrid}>
          {model.diagnosticRoutes.map((route, index) => (
            <a key={buildGameServerBuilderStableKey(["game-server-diagnostic-route", String(index), route.slug])} style={routeLink} href={route.href}>
              <span style={routePhase}>{route.phase}</span>
              <span style={routeLabel}>{route.title}</span>
              <span style={routeCommand}>{route.commandLabel}</span>
            </a>
          ))}
        </div>
      </details>
    </section>
  );
}

function SummaryCard({ item }: { item: GameServerBuilderItem }) {
  return (
    <article style={summaryCard}>
      <div style={panelHeader}>
        <h3 style={summaryLabel}>{item.label}</h3>
        <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
      </div>
      <p style={bodyText}>{item.detail}</p>
    </article>
  );
}

function SectionCard({ section }: { section: GameServerBuilderSection }) {
  return (
    <article style={panel}>
      <div style={panelHeader}>
        <div>
          <p style={panelEyebrow}>{section.label}</p>
          <h3 style={sectionTitle}>{section.title}</h3>
        </div>
        <span style={stateStyle(section.state)}>{formatState(section.state)}</span>
      </div>
      <p style={bodyText}>sectionId: {section.sectionId}</p>
      <FieldRow label="humanReadableSummary" value={section.humanReadableSummary} />
      <FieldList label="plannedArtifacts" values={section.plannedArtifacts} />
      <FieldList label="likelyFileFamilies" values={section.likelyFileFamilies} />
      <FieldList label="likelyCommandFamilies" values={section.likelyCommandFamilies} />
      <FieldList label="approvalNeeds" values={section.approvalNeeds} />
      <FieldList label="evidenceNeeds" values={section.evidenceNeeds} />
      <FieldList label="resultNeeds" values={section.resultNeeds} />
      <FieldList label="auditNeeds" values={section.auditNeeds} />
      <FieldList label="recoveryNeeds" values={section.recoveryNeeds} />
      <FieldList label="deniedActions" values={section.deniedActions} danger />
      <FieldList label="safetyNotes" values={section.safetyNotes} />
      <div style={checklistGrid}>
        {section.checklist.map((item, index) => (
          <CheckRow key={buildGameServerBuilderStableKey(["game-server-section-check", section.sectionId, String(index), item.id])} item={item} />
        ))}
      </div>
    </article>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={fieldRow}>
      <span style={fieldLabel}>{label}</span>
      <span style={fieldValue}>{value}</span>
    </div>
  );
}

function FieldList({ label, values, danger = false }: { label: string; values: readonly string[]; danger?: boolean }) {
  return (
    <div style={fieldRow}>
      <span style={fieldLabel}>{label}</span>
      <div style={chipRow}>
        {values.map((value, index) => (
          <span key={buildGameServerBuilderStableKey(["game-server-field-list", label, String(index), value])} style={danger ? dangerChip : chip}>
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckRow({ item }: { item: GameServerBuilderItem }) {
  return (
    <div style={checkRow}>
      <span style={smallStateStyle(item.state)}>{formatState(item.state)}</span>
      <div>
        <p style={checkLabel}>{item.label}</p>
        <p style={checkDetail}>{item.detail}</p>
      </div>
    </div>
  );
}

function formatState(state: GameServerBuilderState): string {
  if (state === "backend-owned") return "Backend-owned";
  if (state === "needs-approval") return "Needs approval";
  if (state === "preview-only") return "Preview only";
  if (state === "review-only") return "Review only";
  if (state === "manual-review") return "Manual review";
  if (state === "candidate") return "Candidate";
  if (state === "release-candidate") return "Release candidate";
  if (state === "denied") return "Denied";
  return "Blocked";
}

function stateStyle(state: GameServerBuilderState): CSSProperties {
  return {
    ...stateBadge,
    ...(state === "backend-owned"
      ? backendBadge
      : state === "needs-approval"
        ? approvalBadge
        : state === "preview-only"
          ? previewBadge
          : state === "review-only"
            ? reviewBadge
            : state === "manual-review"
              ? manualBadge
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : blockedBadge),
  };
}

function smallStateStyle(state: GameServerBuilderState): CSSProperties {
  return {
    ...smallStateBadge,
    ...(state === "backend-owned"
      ? backendBadge
      : state === "needs-approval"
        ? approvalBadge
        : state === "preview-only"
          ? previewBadge
          : state === "review-only"
            ? reviewBadge
            : state === "manual-review"
              ? manualBadge
              : state === "candidate" || state === "release-candidate"
                ? candidateBadge
                : blockedBadge),
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
  padding: 0,
};

const cockpitSection: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
  borderTop: "1px solid #d8dee4",
  paddingTop: 18,
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

const surfaceBadge: CSSProperties = {
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
  maxWidth: 940,
  fontSize: 18,
  lineHeight: 1.5,
  color: "#344854",
};

const bodyText: CSSProperties = {
  margin: "8px 0 0",
  color: "#425563",
  fontSize: 14,
  lineHeight: 1.55,
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

const identityBand: CSSProperties = {
  border: "1px solid #cfd8df",
  borderRadius: 8,
  padding: 14,
  background: "#f7fafc",
};

const cockpitGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: 10,
};

const cardGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 14,
};

const splitBand: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 14,
};

const panel: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 16,
  background: "#ffffff",
};

const summaryCard: CSSProperties = {
  ...panel,
  padding: 14,
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

const sectionTitle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const summaryLabel: CSSProperties = {
  margin: 0,
  fontSize: 15,
  lineHeight: 1.25,
  letterSpacing: 0,
};

const fieldRow: CSSProperties = {
  display: "grid",
  gap: 3,
  borderTop: "1px solid #edf1f4",
  paddingTop: 8,
  marginTop: 8,
};

const fieldLabel: CSSProperties = {
  color: "#60717d",
  fontSize: 12,
  fontWeight: 800,
};

const fieldValue: CSSProperties = {
  color: "#344854",
  fontSize: 13,
  lineHeight: 1.45,
};

const checklistGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  marginTop: 12,
};

const checkRow: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 10,
  alignItems: "start",
  borderTop: "1px solid #edf1f4",
  paddingTop: 8,
};

const checkLabel: CSSProperties = {
  margin: 0,
  color: "#25313a",
  fontSize: 13,
  fontWeight: 700,
};

const checkDetail: CSSProperties = {
  margin: "3px 0 0",
  color: "#526572",
  fontSize: 13,
  lineHeight: 1.45,
};

const chipRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  marginTop: 10,
};

const chip: CSSProperties = {
  border: "1px solid #ccd6dd",
  borderRadius: 6,
  padding: "6px 8px",
  background: "#f7fafc",
  color: "#2b3b46",
  fontSize: 12,
  lineHeight: 1.3,
};

const dangerChip: CSSProperties = {
  ...chip,
  borderColor: "#d29a9a",
  background: "#fff3f1",
  color: "#7d2c26",
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

const reviewBadge: CSSProperties = {
  borderColor: "#91b9a8",
  background: "#f0faf5",
  color: "#235342",
};

const backendBadge: CSSProperties = {
  borderColor: "#a9a0cc",
  background: "#f5f3ff",
  color: "#43326f",
};

const manualBadge: CSSProperties = {
  borderColor: "#c7a553",
  background: "#fff7df",
  color: "#604912",
};

const candidateBadge: CSSProperties = {
  borderColor: "#8aa4b8",
  background: "#f2f7fa",
  color: "#233746",
};

const diagnosticsDrawer: CSSProperties = {
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 14,
  background: "#fbfcfd",
};

const diagnosticsSummary: CSSProperties = {
  cursor: "pointer",
  fontWeight: 800,
  color: "#263540",
};

const routeGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 10,
  marginTop: 12,
};

const routeLink: CSSProperties = {
  display: "grid",
  gap: 4,
  border: "1px solid #d8dee4",
  borderRadius: 8,
  padding: 12,
  color: "#25313a",
  textDecoration: "none",
  background: "#ffffff",
};

const routePhase: CSSProperties = {
  color: "#60717d",
  fontSize: 12,
  fontWeight: 700,
};

const routeLabel: CSSProperties = {
  fontSize: 14,
  fontWeight: 800,
};

const routeCommand: CSSProperties = {
  color: "#526572",
  fontSize: 12,
};
