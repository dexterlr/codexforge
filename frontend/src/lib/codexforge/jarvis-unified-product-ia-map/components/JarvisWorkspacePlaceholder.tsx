"use client";

import styles from "./JarvisUnifiedProductShell.module.css";
import type { JarvisUnifiedProductWorkspaceRecord } from "../jarvis-unified-product-ia-workspaces";

type JarvisWorkspacePlaceholderProps = {
  workspace: JarvisUnifiedProductWorkspaceRecord;
};

export function JarvisWorkspacePlaceholder({
  workspace,
}: JarvisWorkspacePlaceholderProps) {
  return (
    <div className={styles.placeholderGrid}>
      <article className={styles.focusCard}>
        <div className={styles.placeholderHeader}>
          <div>
            <p className={styles.panelEyebrow}>Workspace overview</p>
            <h3 className={styles.focusTitle}>{workspace.label}</h3>
          </div>
          <span className={styles.panelBadge}>{workspace.emphasisLabel}</span>
        </div>
        <p className={styles.focusBody}>{workspace.description}</p>
        <p className={styles.surfaceMarker}>{workspace.backendRequirementSummary}</p>
      </article>
      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <p className={styles.panelEyebrow}>What you can review now</p>
            <h3 className={styles.panelTitle}>{workspace.placeholderState.label}</h3>
          </div>
          <span className={styles.panelBadge}>{workspace.executionPosture}</span>
        </div>
        <p className={styles.panelBody}>{workspace.placeholderState.summary}</p>
        <div className={styles.flowList}>
          {workspace.placeholderState.steps.map((step, index) => (
            <article key={step} className={styles.flowCard}>
              <span className={styles.flowIndex}>
                Step {index + 1}
              </span>
              <span className={styles.flowLabel}>{step}</span>
            </article>
          ))}
        </div>
      </article>
      <div className={styles.summaryGrid}>
        {workspace.reviewPanels.map((panel) => (
          <article key={panel.id} className={styles.placeholderCard}>
            <div className={styles.placeholderHeader}>
              <div>
                <p className={styles.panelEyebrow}>Review card</p>
                <h3 className={styles.placeholderTitle}>{panel.label}</h3>
              </div>
              <span
                className={`${styles.panelBadge} ${
                  panel.state === "ready"
                    ? styles.metricStateReady
                    : panel.state === "approval-required"
                      ? styles.metricStateApproval
                      : panel.state === "secondary"
                        ? styles.metricStateSecondary
                        : styles.metricStateBlocked
                }`}
              >
                {panel.state === "ready"
                  ? "Ready"
                  : panel.state === "approval-required"
                    ? "Approval required"
                    : panel.state === "secondary"
                      ? "Secondary"
                      : "Blocked"}
              </span>
            </div>
            <p className={styles.placeholderSummary}>{panel.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
