"use client";

import type { Route } from "next";
import Link from "next/link";
import { PrivateAlphaRunPanel } from "./PrivateAlphaRunPanel";
import styles from "./JarvisUnifiedProductShell.module.css";

type JarvisReviewDestination = Readonly<{
  href: Route;
  routeLabel: string;
  summary: string;
  title: string;
  tone: "workflow" | "technical";
}>;

const JARVIS_FLOW_LANDMARKS = [
  { href: "#jarvis-task-workspace", label: "Start / Task" },
  { href: "#jarvis-model-data-boundary", label: "Model & Data" },
  { href: "#jarvis-current-run", label: "Current Run" },
  { href: "#jarvis-plan-approval", label: "Next Action / Approval" },
  { href: "#jarvis-result-output", label: "Result / Output" },
  { href: "#jarvis-activity-audit", label: "Activity / Audit" },
] as const;

const JARVIS_WORKSPACE_FACTS = [
  {
    label: "Current project",
    value: "Current CodexForge project",
  },
  {
    label: "Default local model",
    value: "ollama-local::gpt-oss:20b",
  },
  {
    label: "Data boundary",
    value: "Local machine by default",
  },
  {
    label: "Approval",
    value: "Manual approval, then separate execute",
  },
] as const;

const JARVIS_REVIEW_DESTINATIONS = [
  {
    href: "/files",
    routeLabel: "/files",
    summary:
      "Inspect the active server-owned project workspace through the bounded file reader.",
    title: "Project Files",
    tone: "workflow",
  },
  {
    href: "/patch-preview-workbench",
    routeLabel: "/patch-preview-workbench",
    summary:
      "Understand the explicit patch lifecycle; prepare and review a real proposal in Project Files.",
    title: "Patch lifecycle",
    tone: "workflow",
  },
  {
    href: "/validation",
    routeLabel: "/validation",
    summary:
      "Open the allowlisted Validation Runner with its own explicit approval step.",
    title: "Validation",
    tone: "workflow",
  },
  {
    href: "/jarvis-audit",
    routeLabel: "/jarvis-audit",
    summary: "Review persisted runs, approvals, results, and audit history.",
    title: "Activity & Audit",
    tone: "workflow",
  },
  {
    href: "/jarvis-safety",
    routeLabel: "/jarvis-safety",
    summary:
      "Review kill-switch, approval, credential, and storage boundaries.",
    title: "Safety & Settings",
    tone: "workflow",
  },
  {
    href: "/video-workflows",
    routeLabel: "/video-workflows",
    summary: "Review video planning boundaries without implying generation or rendering is available.",
    title: "Video planning",
    tone: "technical",
  },
  {
    href: "/provider-adapters",
    routeLabel: "/provider-adapters",
    summary: "Inspect provider setup, availability, and local execution constraints.",
    title: "Provider Details",
    tone: "technical",
  },
] as const satisfies readonly JarvisReviewDestination[];

export function AthenaLiveCommandCenterPanel() {
  return (
    <div
      className={styles.liveAthenaCommandCenter}
      data-codexforge-jarvis-product-experience="canonical"
    >
      <section
        className={styles.liveAthenaHeader}
        aria-labelledby="jarvis-workspace-title"
        data-codexforge-athena-display-mode="live-product"
      >
        <div className={styles.jarvisWorkspaceHeroLayout}>
          <div className={styles.jarvisWorkspaceHeroCopy}>
            <p className={styles.panelEyebrow}>Build with Jarvis</p>
            <h1 id="jarvis-workspace-title" className={styles.liveAthenaTitle}>
              Jarvis Workspace
            </h1>
            <p className={styles.liveAthenaSummary}>
              Confirm the active project, describe the task, review the exact plan
              and data boundary, then approve and execute one attempt when you are
              ready.
            </p>
            <p className={styles.liveAthenaSupport}>
              Default local execution stays on this machine through Ollama with a
              4096-token ceiling. Optional Groq is Free-tier only, capped at 512
              tokens, and requires separate cloud-transfer and execution
              acknowledgements. Nothing approves or runs automatically.
            </p>
          </div>

          <dl className={styles.jarvisWorkspaceFactGrid} aria-label="Jarvis workspace at a glance">
            {JARVIS_WORKSPACE_FACTS.map((fact) => (
              <div key={fact.label} className={styles.jarvisWorkspaceFact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav className={styles.jarvisFlowNavigation} aria-label="Jarvis workspace sections">
          <ol className={styles.jarvisFlowList}>
            {JARVIS_FLOW_LANDMARKS.map((landmark, index) => (
              <li key={landmark.href} className={styles.jarvisFlowItem}>
                <a className={styles.jarvisFlowLink} href={landmark.href}>
                  <span aria-hidden="true" className={styles.jarvisFlowNumber}>
                    {index + 1}
                  </span>
                  <span>{landmark.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <nav className={styles.jarvisReviewShortcuts} aria-label="Jarvis review destinations">
          <span className={styles.jarvisReviewShortcutsLabel}>Review</span>
          {JARVIS_REVIEW_DESTINATIONS.filter(
            (destination) => destination.tone === "workflow"
          ).map((destination) => (
            <Link
              key={`shortcut-${destination.href}`}
              className={styles.jarvisReviewShortcut}
              href={destination.href}
            >
              {destination.title}
            </Link>
          ))}
        </nav>
      </section>

      <PrivateAlphaRunPanel />

      <section
        id="jarvis-review-tools"
        className={styles.jarvisReviewTools}
        aria-labelledby="jarvis-review-tools-title"
      >
        <div className={styles.jarvisReviewToolsHeader}>
          <div>
            <p className={styles.panelEyebrow}>Review and continue</p>
            <h2 id="jarvis-review-tools-title" className={styles.panelTitle}>
              Open the output, changes, validation, or history you need
            </h2>
          </div>
          <Link className={styles.jarvisBackToTaskLink} href="/jarvis#jarvis-task-workspace">
            Back to task flow
          </Link>
        </div>

        <nav
          className={styles.liveAthenaQuickLinks}
          aria-label="Jarvis project and review tools"
          data-codexforge-athena-quick-links="true"
        >
          {JARVIS_REVIEW_DESTINATIONS.map((destination) => (
            <Link
              key={destination.href}
              className={`${styles.liveAthenaQuickLink} ${
                destination.tone === "technical" ? styles.jarvisTechnicalQuickLink : ""
              }`}
              href={destination.href}
            >
              <div className={styles.liveAthenaQuickLinkHeader}>
                <h3 className={styles.liveAthenaQuickLinkTitle}>{destination.title}</h3>
                <span className={styles.liveAthenaQuickLinkRoute}>
                  {destination.tone === "technical"
                    ? "Technical detail"
                    : destination.routeLabel}
                </span>
              </div>
              <p className={styles.liveAthenaQuickLinkSummary}>{destination.summary}</p>
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}
