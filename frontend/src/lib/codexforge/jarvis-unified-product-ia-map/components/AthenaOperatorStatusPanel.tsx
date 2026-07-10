"use client";

import styles from "./JarvisUnifiedProductShell.module.css";
import type {
  AthenaLauncherStatus,
  AthenaOperatorStatusRecord,
} from "../athena-control-plane-model";

type AthenaOperatorStatusPanelProps = Readonly<{
  title: string;
  eyebrow: string;
  badge: string;
  summary: string;
  detail: string;
  items: readonly AthenaOperatorStatusRecord[];
  nextActions?: readonly string[];
}>;

export function AthenaOperatorStatusPanel({
  title,
  eyebrow,
  badge,
  summary,
  detail,
  items,
  nextActions,
}: AthenaOperatorStatusPanelProps) {
  return (
    <section className={styles.panel} aria-label={title}>
      <div className={styles.panelHeader}>
        <div>
          <p className={styles.panelEyebrow}>{eyebrow}</p>
          <h2 className={styles.panelTitle}>{title}</h2>
        </div>
        <span className={`${styles.panelBadge} ${styles.metricStateApproval}`}>
          {badge}
        </span>
      </div>
      <p className={styles.panelBody}>{summary}</p>
      <p className={styles.panelBody}>{detail}</p>
      <div className={styles.summaryGrid}>
        {items.map((item) => (
          <article key={item.id} className={styles.summaryCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>{item.label}</p>
                <h3 className={styles.statusValue}>{item.value}</h3>
              </div>
              <span
                className={`${styles.panelBadge} ${resolveToneClass(item.tone)}`}
              >
                {formatToneLabel(item.tone)}
              </span>
            </div>
            <p className={styles.placeholderSummary}>{item.summary}</p>
          </article>
        ))}
      </div>
      {nextActions && nextActions.length > 0 ? (
        <article className={styles.summaryCard}>
          <p className={styles.panelEyebrow}>Next operator actions</p>
          <div className={styles.nextActionList}>
            {nextActions.map((item) => (
              <article key={item} className={styles.railCard}>
                <p className={styles.railBody}>{item}</p>
              </article>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
}

function resolveToneClass(tone: AthenaLauncherStatus): string {
  switch (tone) {
    case "ready":
      return styles.metricStateReady;
    case "approval-required":
      return styles.metricStateApproval;
    case "secondary":
      return styles.metricStateSecondary;
    default:
      return styles.metricStateBlocked;
  }
}

function formatToneLabel(tone: AthenaLauncherStatus): string {
  switch (tone) {
    case "ready":
      return "Ready";
    case "approval-required":
      return "Approval required";
    case "secondary":
      return "Secondary";
    default:
      return "Blocked";
  }
}
