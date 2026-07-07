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
      {actions.map((action) => (
        <li key={action.id}>
          <Link className={styles.railCard} href={action.routeHref}>
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
