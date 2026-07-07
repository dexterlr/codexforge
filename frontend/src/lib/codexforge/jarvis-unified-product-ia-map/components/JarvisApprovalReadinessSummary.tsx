"use client";

import styles from "./JarvisUnifiedProductShell.module.css";
import type { JarvisUnifiedProductSummaryRecord } from "../jarvis-unified-product-ia-content";

type JarvisApprovalReadinessSummaryProps = {
  approvalSummary: readonly JarvisUnifiedProductSummaryRecord[];
  readinessSummary: readonly JarvisUnifiedProductSummaryRecord[];
};

export function JarvisApprovalReadinessSummary({
  approvalSummary,
  readinessSummary,
}: JarvisApprovalReadinessSummaryProps) {
  return (
    <div className={styles.summaryGrid}>
      {approvalSummary.map((record) => (
        <article key={record.id} className={styles.summaryCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Approval summary</p>
              <h3 className={styles.placeholderTitle}>{record.label}</h3>
            </div>
            <span
              className={`${styles.panelBadge} ${
                record.tone === "ready"
                  ? styles.metricStateReady
                  : record.tone === "approval-required"
                    ? styles.metricStateApproval
                    : record.tone === "secondary"
                      ? styles.metricStateSecondary
                      : styles.metricStateBlocked
              }`}
            >
              {record.tone === "ready"
                ? "Ready"
                : record.tone === "approval-required"
                  ? "Approval required"
                  : record.tone === "secondary"
                    ? "Secondary"
                    : "Blocked"}
            </span>
          </div>
          <p className={styles.placeholderSummary}>{record.summary}</p>
        </article>
      ))}
      {readinessSummary.map((record) => (
        <article key={record.id} className={styles.summaryCard}>
          <div className={styles.placeholderHeader}>
            <div>
              <p className={styles.panelEyebrow}>Readiness summary</p>
              <h3 className={styles.placeholderTitle}>{record.label}</h3>
            </div>
            <span
              className={`${styles.panelBadge} ${
                record.tone === "ready"
                  ? styles.metricStateReady
                  : record.tone === "approval-required"
                    ? styles.metricStateApproval
                    : record.tone === "secondary"
                      ? styles.metricStateSecondary
                      : styles.metricStateBlocked
              }`}
            >
              {record.tone === "ready"
                ? "Ready"
                : record.tone === "approval-required"
                  ? "Approval required"
                  : record.tone === "secondary"
                    ? "Secondary"
                    : "Blocked"}
            </span>
          </div>
          <p className={styles.placeholderSummary}>{record.summary}</p>
        </article>
      ))}
    </div>
  );
}

