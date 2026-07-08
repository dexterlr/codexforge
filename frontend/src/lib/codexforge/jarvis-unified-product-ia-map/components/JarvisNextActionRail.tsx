"use client";

import Link from "next/link";
import styles from "./JarvisUnifiedProductShell.module.css";
import type { JarvisUnifiedProductNextActionRecord } from "../jarvis-unified-product-ia-content";

type JarvisNextActionRailProps = {
  actions: readonly JarvisUnifiedProductNextActionRecord[];
};

export function JarvisNextActionRail({
  actions,
}: JarvisNextActionRailProps) {
  return (
    <ol className={styles.nextActionList}>
      {actions.map((action, index) => (
        <li key={action.id}>
          <Link
            className={
              index === 0 ? styles.primaryActionCard : styles.secondaryActionCard
            }
            href={action.routeHref}
          >
            <span className={styles.actionKicker}>
              {index === 0 ? "Primary action" : "Also useful"}
            </span>
            <span
              className={`${styles.timelineState} ${
                action.tone === "ready"
                  ? styles.metricStateReady
                  : action.tone === "approval-required"
                    ? styles.metricStateApproval
                    : action.tone === "secondary"
                      ? styles.metricStateSecondary
                      : styles.metricStateBlocked
              }`}
            >
              {action.tone === "ready"
                ? "Ready"
                : action.tone === "approval-required"
                  ? "Approval required"
                  : action.tone === "secondary"
                    ? "Secondary"
                    : "Blocked"}
            </span>
            <h3 className={styles.railTitle}>{action.label}</h3>
            <p className={styles.railBody}>{action.summary}</p>
            <span className={styles.railFooter}>{action.backendRequired}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
