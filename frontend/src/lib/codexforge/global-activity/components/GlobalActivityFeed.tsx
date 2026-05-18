"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import {
  buildGlobalActivityFeed,
  buildGlobalActivityFeedFilter,
  buildGlobalActivityFeedSummary,
  buildGlobalActivityNextActionPlan,
  buildGlobalActivityStableKey,
  buildGlobalActivityTimeline,
  filterGlobalActivityFeed,
  summarizeGlobalActivityFeedSession,
  type GlobalActivityFeed as GlobalActivityFeedModel,
  type GlobalActivityFilterId,
} from "../index";
import { GlobalActivityEmptyState } from "./GlobalActivityEmptyState";
import { GlobalActivityEventCard } from "./GlobalActivityEventCard";
import { GlobalActivityFilterBar } from "./GlobalActivityFilterBar";
import { GlobalActivityNextActionPanel } from "./GlobalActivityNextActionPanel";
import { GlobalActivityPanel } from "./GlobalActivityPanel";
import { GlobalActivityPriorityBoard } from "./GlobalActivityPriorityBoard";
import { GlobalActivitySafetyNotice } from "./GlobalActivitySafetyNotice";
import { GlobalActivitySourcePanel } from "./GlobalActivitySourcePanel";
import { GlobalActivityTimeline } from "./GlobalActivityTimeline";

export function GlobalActivityFeed({ feed: providedFeed }: { feed?: GlobalActivityFeedModel }) {
  const feed = useMemo(() => providedFeed ?? buildGlobalActivityFeed(), [providedFeed]);
  const [filterId, setFilterId] = useState<GlobalActivityFilterId>("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const filter = useMemo(() => buildGlobalActivityFeedFilter(filterId, search), [filterId, search]);
  const visibleFeed = useMemo(() => filterGlobalActivityFeed(feed, filter), [feed, filter]);
  const timeline = useMemo(() => buildGlobalActivityTimeline(visibleFeed.events), [visibleFeed.events]);
  const nextActionPlan = useMemo(() => buildGlobalActivityNextActionPlan(visibleFeed.events), [visibleFeed.events]);
  const summary = useMemo(() => buildGlobalActivityFeedSummary(feed, visibleFeed.events), [feed, visibleFeed.events]);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  const handoffPrompt = summarizeGlobalActivityFeedSession(feed, visibleFeed.events).join("\n");

  return (
    <CodexForgeAppShell activePath="/activity" workspaceLabel="Global Activity Feed" nextActionContext={{ hasStabilizationBlockers: feed.blockerCount > 0 }}>
      <main style={shell} data-codexforge-global-activity-feed="GlobalActivityFeed renders read-only no command execution without approval no file writes without approval no graph mutation evidence is context, not proof preserve latest-message authority stable key helper buildGlobalActivityStableKey">
        <section style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>CodexForge Phase 43</span>
            <h1 style={headline}>Global Activity Feed</h1>
            <p style={lede}>
              Read-only workflow feed from verification, regression triage, fix queue, patch preview, apply gates,
              memory review, creative planning, stabilization, and next safe action.
            </p>
            <div style={heroActions}>
              <button type="button" style={copyButton} onClick={() => copyText("summary", summary.summary.join("\n"))}>Copy summary</button>
              <button type="button" style={copyButton} onClick={() => copyText("handoff prompt", handoffPrompt)}>Copy handoff prompt</button>
              <Link href="/memory-inbox" style={heroLink}>Review memory candidates</Link>
              <Link href="/stabilization" style={heroLink}>Stabilization</Link>
              <span style={copiedPill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
            </div>
          </div>
          <div style={stats}>
            <HeroStat label="Events" value={String(summary.eventCount)} />
            <HeroStat label="Visible" value={String(summary.visibleEventCount)} />
            <HeroStat label="Blockers" value={String(summary.blockerCount)} />
            <HeroStat label="Next" value={summary.nextSafeAction} />
          </div>
        </section>

        <GlobalActivitySafetyNotice />
        <GlobalActivityFilterBar active={filterId} search={search} onFilterChange={setFilterId} onSearchChange={setSearch} />

        <div style={layout}>
          <div style={mainColumn}>
            <GlobalActivityPanel title="Activity Events" subtitle="No raw JSON is shown; cards are stable-keyed and long paths wrap.">
              <div style={eventList}>
                {visibleFeed.events.length === 0 ? (
                  <GlobalActivityEmptyState />
                ) : (
                  visibleFeed.events.map((event) => <GlobalActivityEventCard key={buildGlobalActivityStableKey("event-card", event.id)} event={event} />)
                )}
              </div>
            </GlobalActivityPanel>
            <GlobalActivityTimeline timeline={timeline} />
          </div>
          <aside style={sideColumn}>
            <GlobalActivityNextActionPanel plan={nextActionPlan} />
            <GlobalActivityPriorityBoard events={visibleFeed.events} />
            <GlobalActivitySourcePanel events={feed.events} />
            <GlobalActivityPanel title="Session Summary" subtitle="Visible evidence remains context, not proof.">
              <div style={summaryGrid}>
                <HeroStat label="Sources" value={String(summary.sourceCount)} />
                <HeroStat label="Review" value={String(summary.reviewRequiredCount)} />
                <HeroStat label="Top source" value={summary.topSource} />
                <HeroStat label="Top risk" value={summary.topRisk} />
              </div>
            </GlobalActivityPanel>
          </aside>
        </div>
      </main>
    </CodexForgeAppShell>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

const shell: CSSProperties = { width: "100%", display: "grid", gap: 16, minWidth: 0 };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.8))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(min(100%, 440px), 0.75fr)", gap: 18, alignItems: "center", minWidth: 0 };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.06, letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 980, overflowWrap: "anywhere" };
const heroActions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const copyButton: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", color: "#ccfbf1", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const heroLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.1)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 11px", textDecoration: "none", overflowWrap: "anywhere" };
const copiedPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", color: "#cbd5e1", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 850 };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 5, minWidth: 0 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 850, overflowWrap: "anywhere" };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 20, lineHeight: 1.15, overflowWrap: "anywhere" };
const layout: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1.28fr) minmax(min(100%, 500px), 0.72fr)", gap: 16, alignItems: "start", minWidth: 0 };
const mainColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const sideColumn: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
const eventList: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10, minWidth: 0 };
