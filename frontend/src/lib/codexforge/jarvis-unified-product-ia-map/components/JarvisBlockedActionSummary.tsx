"use client";

import styles from "./JarvisUnifiedProductShell.module.css";
import type { JarvisUnifiedProductBlockedActionRecord } from "../jarvis-unified-product-ia-content";

type JarvisBlockedActionSummaryProps = {
  blockedActions: readonly JarvisUnifiedProductBlockedActionRecord[];
};

export function JarvisBlockedActionSummary({
  blockedActions,
}: JarvisBlockedActionSummaryProps) {
  return (
    <div className={styles.blockedGrid}>
      {blockedActions.map((record) => (
        <article key={record.id} className={styles.blockedCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Blocked now</p>
              <h3 className={styles.blockedTitle}>{record.label}</h3>
            </div>
            <span className={`${styles.panelBadge} ${styles.metricStateBlocked}`}>
              Blocked
            </span>
          </div>
          <p className={styles.blockedSummary}>{record.summary}</p>
          <div className={styles.workspaceMeta}>
            {record.items.map((item) => (
              <span key={item} className={styles.blockedPill}>
                {item}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

