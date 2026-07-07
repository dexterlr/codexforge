"use client";

import Link from "next/link";
import styles from "./JarvisUnifiedProductShell.module.css";
import type {
  JarvisUnifiedProductWorkspaceId,
  JarvisUnifiedProductWorkspaceRecord,
} from "../jarvis-unified-product-ia-workspaces";

type JarvisWorkspaceGridProps = {
  workspaces: readonly JarvisUnifiedProductWorkspaceRecord[];
  activeWorkspaceId?: JarvisUnifiedProductWorkspaceId;
};

export function JarvisWorkspaceGrid({
  workspaces,
  activeWorkspaceId,
}: JarvisWorkspaceGridProps) {
  return (
    <div className={styles.workspaceGrid}>
      {workspaces.map((workspace) => {
        const statusClass =
          workspace.status === "ready"
            ? styles.metricStateReady
            : workspace.status === "approval-required"
              ? styles.metricStateApproval
              : workspace.status === "secondary"
                ? styles.metricStateSecondary
                : styles.metricStateBlocked;

        return (
          <Link
            key={workspace.id}
            className={styles.workspaceCard}
            href={workspace.routeHref}
          >
            <div className={styles.workspaceHeader}>
              <div>
                <h3 className={styles.workspaceTitle}>
                  {workspace.label}
                  {workspace.id === activeWorkspaceId ? " / current" : ""}
                </h3>
              </div>
              <span className={`${styles.metricState} ${statusClass}`}>
                {workspace.status === "ready"
                  ? "Ready"
                  : workspace.status === "approval-required"
                    ? "Approval required"
                    : workspace.status === "secondary"
                      ? "Secondary"
                      : "Blocked"}
              </span>
            </div>
            <p className={styles.workspaceDescription}>{workspace.description}</p>
            <div className={styles.workspaceMeta}>
              <span className={styles.metaPill}>{workspace.shortLabel}</span>
              <span className={styles.metaPill}>{workspace.riskTier}</span>
              <span className={styles.metaPill}>{workspace.executionPosture}</span>
            </div>
            <div className={styles.workspaceFooter}>
              <span>{workspace.primaryNextAction}</span>
              <span>{workspace.backendRequirementSummary}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
