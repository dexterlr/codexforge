"use client";

import Link from "next/link";
import type { Route } from "next";
import styles from "./JarvisUnifiedProductShell.module.css";

type JarvisProductHeroProps = {
  eyebrow: string;
  badge: string;
  title: string;
  summary: string;
  phaseLabel: string;
  isPhaseRoute: boolean;
  metrics: readonly Readonly<{
    label: string;
    value: string;
    detail: string;
  }>[];
  navigationCards: readonly Readonly<{
    label: string;
    description: string;
    href: Route;
    badge: string;
  }>[];
};

export function JarvisProductHero({
  eyebrow,
  badge,
  title,
  summary,
  phaseLabel,
  isPhaseRoute,
  metrics,
  navigationCards,
}: JarvisProductHeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroContent}>
        <div className={styles.heroEyebrowRow}>
          <span className={styles.eyebrowChip}>{phaseLabel}</span>
          <span className={styles.safeChip}>{eyebrow}</span>
          <span className={styles.blockedChip}>
            {isPhaseRoute ? "phase pages remain diagnostics only" : badge}
          </span>
        </div>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSummary}>{summary}</p>
        <div className={styles.heroMetrics}>
          {metrics.map((metric) => (
            <article key={metric.label} className={styles.metricCard}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricDetail}>{metric.detail}</span>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.heroRail}>
        <section className={styles.heroPanel} aria-label="Product order">
          <div className={styles.heroEyebrowRow}>
            <span className={styles.safeChip}>normal user path is primary</span>
            <span className={styles.blockedChip}>developer diagnostics are secondary</span>
          </div>
          <h2 className={styles.heroPanelTitle}>World-class product order</h2>
          <p className={styles.heroPanelBody}>
            Home to CodexForge Cockpit to Jarvis command center to specialist
            workspaces. Phase pages remain diagnostics only.
          </p>
        </section>
        <nav className={styles.primaryNav} aria-label="Primary navigation order">
          {navigationCards.map((card) => (
            <Link key={card.href} className={styles.navCard} href={card.href}>
              <span className={styles.navBadge}>{card.badge}</span>
              <strong className={styles.navTitle}>{card.label}</strong>
              <span className={styles.navDescription}>{card.description}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
