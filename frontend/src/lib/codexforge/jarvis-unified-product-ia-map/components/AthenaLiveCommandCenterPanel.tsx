"use client";

import type { Route } from "next";
import Link from "next/link";
import { PrivateAlphaRunPanel } from "./PrivateAlphaRunPanel";
import styles from "./JarvisUnifiedProductShell.module.css";

type AthenaLiveQuickLink = Readonly<{
  href: Route;
  routeLabel: string;
  summary: string;
  title: string;
}>;

const ATHENA_LIVE_QUICK_LINKS = [
  {
    href: "/jarvis-video",
    routeLabel: "/jarvis-video",
    summary: "Open the focused studio for recorded video task planning and review.",
    title: "Video Studio",
  },
  {
    href: "/ai-providers",
    routeLabel: "/ai-providers",
    summary: "Inspect provider setup, availability, and local execution constraints.",
    title: "Providers",
  },
  {
    href: "/jarvis-audit",
    routeLabel: "/jarvis-audit",
    summary: "Review persisted runs, approvals, results, and audit history.",
    title: "Audit and Runs",
  },
] as const satisfies readonly AthenaLiveQuickLink[];

export function AthenaLiveCommandCenterPanel() {
  return (
    <div className={styles.liveAthenaCommandCenter}>
      <section
        className={styles.liveAthenaHeader}
        data-codexforge-athena-display-mode="live-product"
      >
        <p className={styles.panelEyebrow}>Private Alpha</p>
        <h1 className={styles.liveAthenaTitle}>Athena Command Center</h1>
        <p className={styles.liveAthenaSummary}>
          Plan, approve, and run local AI tasks through Jarvis safety controls.
        </p>
        <p className={styles.liveAthenaSupport}>
          Local execution stays on this machine through Ollama.
        </p>
      </section>

      <PrivateAlphaRunPanel />

      <section
        className={styles.liveAthenaQuickLinks}
        aria-label="Athena quick links"
        data-codexforge-athena-quick-links="true"
      >
        {ATHENA_LIVE_QUICK_LINKS.map((link) => (
          <Link key={link.href} className={styles.liveAthenaQuickLink} href={link.href}>
            <div className={styles.liveAthenaQuickLinkHeader}>
              <h2 className={styles.liveAthenaQuickLinkTitle}>{link.title}</h2>
              <span className={styles.liveAthenaQuickLinkRoute}>{link.routeLabel}</span>
            </div>
            <p className={styles.liveAthenaQuickLinkSummary}>{link.summary}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
