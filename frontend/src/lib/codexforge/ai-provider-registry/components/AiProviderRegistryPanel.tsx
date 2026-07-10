"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildAthenaProviderSelectionPreviewFromExactStaticExamples,
  buildBlockedProviderExecutionSummary,
  buildCapabilityMatrixPreview,
  buildNextServerOnlyAdapterChecklist,
  buildProviderReadinessSummary,
  groupCapabilitiesByWorkspaceTarget,
  listModelProviderSlots,
} from "@/lib/codexforge/ai-provider-registry";

export function AiProviderRegistryPanel() {
  const providerSlots = listModelProviderSlots();
  const readinessSummary = buildProviderReadinessSummary();
  const blockedExecutionSummary = buildBlockedProviderExecutionSummary();
  const capabilityMatrixPreview = buildCapabilityMatrixPreview();
  const selectionPreview =
    buildAthenaProviderSelectionPreviewFromExactStaticExamples();
  const workspaceCapabilityGroups = groupCapabilitiesByWorkspaceTarget();
  const nextServerOnlyAdapterChecklist = buildNextServerOnlyAdapterChecklist();
  const providerLabelsById = new Map(
    providerSlots.map((slot) => [slot.id, slot.label] as const)
  );

  return (
    <div
      style={shell}
      data-codexforge-ai-provider-registry="4682-4713 - AI Model Provider Registry and Capability Matrix AI model provider registry Capability matrix Provider selection preview Provider slots are registry-only No model calls yet No prompt sending No provider SDKs imported Server-only adapters required Credential isolation required Operator approval required Kill switch required Audit required 4714-4745 - Server-Only Model Adapter Contracts"
    >
      <section style={hero}>
        <div>
          <span style={eyebrow}>Phase 4713</span>
          <h1 style={headline}>AI model provider registry</h1>
          <p style={lede}>
            Athena can see model provider slots, capability families, workspace
            targets, blocked routing posture, and the next server-only adapter
            requirements. Provider slots are registry-only. Capability matrix is
            preview-only. No model calls yet. No prompt sending. No provider SDKs
            imported. No frontend provider call. Server-only adapters required.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/jarvis" style={primaryLink}>Open Athena Command Center</Link>
          <Link href="/jarvis-video" style={link}>Open Jarvis Video Studio</Link>
          <Link href="/jarvis-safety" style={link}>Safety / Settings</Link>
          <Link href="/jarvis-audit" style={link}>Audit / Runs</Link>
        </div>
      </section>

      <section style={metricGrid}>
        <div style={metric}>
          <span>Provider slots</span>
          <strong>{readinessSummary.providerSlotCount}</strong>
        </div>
        <div style={metric}>
          <span>Capability rows</span>
          <strong>{capabilityMatrixPreview.capabilityCount}</strong>
        </div>
        <div style={metric}>
          <span>Workspace targets</span>
          <strong>{readinessSummary.workspaceTargetCount}</strong>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Registry posture</span>
            <h2 style={sectionTitle}>AI model provider registry</h2>
          </div>
          <span style={sectionBadge}>Registry-only</span>
        </div>
        <p style={copy}>
          Provider slots are registry-only. No model calls yet. No prompt
          sending. No provider SDKs imported. Server-only adapters required.
          Credential isolation required. Operator approval required. Kill switch
          required. Audit required.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Registry summary</span>
            <h3 style={cardTitle}>Athena / Jarvis Model Gateway</h3>
            <p style={copy}>Source: Athena / Jarvis Model Gateway.</p>
            <p style={copy}>Registry mode: preview-only.</p>
            <p style={copy}>Provider status: registry-only / not connected.</p>
            <div style={list}>
              {readinessSummary.summaryLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Blocked posture</span>
            <h3 style={cardTitle}>Execution remains blocked</h3>
            <p style={copy}>{blockedExecutionSummary.summary}</p>
            <div style={list}>
              {blockedExecutionSummary.blockedLines.map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Next batch</span>
            <h3 style={cardTitle}>Server-only model adapter contracts</h3>
            <p style={copy}>
              4714-4745 - Server-Only Model Adapter Contracts comes next.
            </p>
            <div style={list}>
              {nextServerOnlyAdapterChecklist.slice(0, 6).map((item) => (
                <span key={item} style={pill}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {providerSlots.map((slot) => (
            <article key={slot.key} style={card}>
              <span style={tag}>Provider slot</span>
              <h3 style={cardTitle}>{slot.label}</h3>
              <p style={copy}>{slot.description}</p>
              <p style={copy}>
                {`Status: ${slot.providerStatus}. Current state: ${slot.currentState}.`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${slot.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                {slot.capabilityFamilies.map((item) => (
                  <span key={item} style={pill}>
                    {item}
                  </span>
                ))}
              </div>
              <p style={copy}>{`Blocked by: ${slot.blockedBy.join(" | ")}`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${slot.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Capability families</span>
            <h2 style={sectionTitle}>Capability matrix</h2>
          </div>
          <span style={sectionBadge}>Preview-only</span>
        </div>
        <p style={copy}>
          text/chat, code, image, video, audio/voice, transcription,
          embeddings/search, safety/moderation, and local inference stay blocked
          / registry-only. Each capability is not connected yet. Each capability
          requires a server-only adapter before execution.
        </p>
        <div style={grid}>
          <article style={card}>
            <span style={tag}>Matrix summary</span>
            <h3 style={cardTitle}>Capability matrix is preview-only</h3>
            <p style={copy}>
              {`${capabilityMatrixPreview.blockedCapabilityCount} of ${capabilityMatrixPreview.capabilityCount} capability rows are blocked / registry-only.`}
            </p>
            <div style={list}>
              <span style={pill}>No model calls yet</span>
              <span style={pill}>No prompt sending</span>
              <span style={pill}>No provider SDKs imported</span>
              <span style={pill}>Server-only adapters required</span>
              <span style={pill}>Credential isolation required</span>
            </div>
          </article>
          <article style={card}>
            <span style={tag}>Workspace coverage</span>
            <h3 style={cardTitle}>Which plugin/workspace each capability can serve</h3>
            <div style={list}>
              {workspaceCapabilityGroups.map((group) => (
                <span key={group.workspaceTarget} style={pill}>
                  {`${group.workspaceTarget}: ${group.capabilityRows.length}`}
                </span>
              ))}
            </div>
          </article>
        </div>
        <div style={grid}>
          {capabilityMatrixPreview.matrixRows.map((row) => (
            <article key={row.key} style={card}>
              <span style={tag}>Capability row</span>
              <h3 style={cardTitle}>{row.label}</h3>
              <p style={copy}>{row.description}</p>
              <p style={copy}>
                {`Provider slots: ${row.providerSlotIds
                  .map((slotId) => providerLabelsById.get(slotId) ?? slotId)
                  .join(" | ")}`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${row.workspaceTargets.join(" | ")}`}
              </p>
              <div style={list}>
                <span style={pill}>{row.approvalRequirement}</span>
                <span style={pill}>{row.safetyRequirement}</span>
                <span style={pill}>{row.auditRequirement}</span>
                <span style={pill}>{row.credentialIsolationRequirement}</span>
                <span style={pill}>{row.backendOnlyAdapterRequirement}</span>
                <span style={pill}>{row.executionPosture}</span>
              </div>
              <p style={copy}>{`Current state: ${row.currentState}.`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${row.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <span style={eyebrow}>Routing-readiness preview</span>
            <h2 style={sectionTitle}>Provider selection preview</h2>
          </div>
          <span style={sectionBadge}>Blocked by default</span>
        </div>
        <p style={copy}>
          command planning -&gt; text/planning capability. product video -&gt;
          video capability. storyboard -&gt; image capability. narration -&gt;
          audio/voice capability. captions -&gt; transcription capability.
          private/local task -&gt; local inference capability.
        </p>
        <div style={grid}>
          {selectionPreview.map((item) => (
            <article key={item.id} style={card}>
              <span style={tag}>Static example</span>
              <h3 style={cardTitle}>{item.requestLabel}</h3>
              <p style={copy}>
                {`${item.providerFamilyLabel} -> ${item.capabilityLabel}`}
              </p>
              <p style={copy}>
                {`Workspace targets: ${item.workspaceTargets.join(" | ")}`}
              </p>
              <p style={copy}>{`Execution posture: ${item.executionPosture}.`}</p>
              <p style={copy}>{`Current state: ${item.currentState}.`}</p>
              <p style={copy}>{`Blocked by: ${item.blockedBy.join(" | ")}`}</p>
              <p style={copy}>
                {`Next adapter requirement: ${item.nextAdapterRequirement}`}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section style={notice}>
        {nextServerOnlyAdapterChecklist.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </section>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, color: "#f8fafc", minWidth: 0 };
const hero: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.22)",
  background: "rgba(15,23,42,0.72)",
  borderRadius: 8,
  padding: 18,
};
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1, margin: "8px 0", letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { maxWidth: 780, color: "rgba(226,232,240,0.76)", lineHeight: 1.55, margin: 0, fontSize: 14 };
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" };
const link: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  padding: "9px 11px",
  fontSize: 12,
  fontWeight: 900,
  textDecoration: "none",
};
const primaryLink: CSSProperties = { ...link, background: "#5eead4", color: "#042f2e" };
const metricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 10 };
const metric: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148,163,184,0.16)",
  borderRadius: 8,
  padding: 12,
  background: "rgba(15,23,42,0.62)",
  display: "grid",
  gap: 4,
};
const section: CSSProperties = { display: "grid", gap: 12 };
const sectionHeader: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const sectionTitle: CSSProperties = { margin: "8px 0 0", fontSize: 24, letterSpacing: 0 };
const sectionBadge: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(125,211,252,0.22)",
  borderRadius: 999,
  padding: "6px 10px",
  fontSize: 11,
  fontWeight: 900,
  color: "#dbeafe",
};
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 12 };
const card: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(148,163,184,0.16)",
  borderRadius: 8,
  background: "rgba(2,6,23,0.68)",
  padding: 14,
  display: "grid",
  gap: 8,
};
const tag: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const cardTitle: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.76)", fontSize: 13, lineHeight: 1.45 };
const list: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const pill: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.18)",
  borderRadius: 999,
  padding: "4px 8px",
  fontSize: 11,
  color: "#ccfbf1",
};
const notice: CSSProperties = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(45,212,191,0.16)",
  borderRadius: 8,
  padding: 12,
  background: "rgba(20,83,45,0.16)",
  color: "#dcfce7",
  fontSize: 13,
};
