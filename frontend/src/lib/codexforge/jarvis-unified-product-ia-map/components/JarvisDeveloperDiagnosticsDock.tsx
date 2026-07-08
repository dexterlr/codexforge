"use client";

import Link from "next/link";
import styles from "./JarvisUnifiedProductShell.module.css";
import type { JarvisUnifiedProductDiagnosticsGroup } from "../jarvis-unified-product-ia-content";

type JarvisDeveloperDiagnosticsDockProps = {
  groups: readonly JarvisUnifiedProductDiagnosticsGroup[];
};

export function JarvisDeveloperDiagnosticsDock({
  groups,
}: JarvisDeveloperDiagnosticsDockProps) {
  return (
    <details className={`${styles.panel} ${styles.diagnosticDock}`}>
      <summary className={styles.diagnosticSummary}>
        <div className={styles.diagnosticSummaryRow}>
          <div>
            <p className={styles.panelEyebrow}>Developer diagnostics</p>
            <h3 className={styles.panelTitle}>Secondary diagnostics</h3>
          </div>
          <span className={`${styles.dockBadge} ${styles.metricStateSecondary}`}>
            Secondary only
          </span>
        </div>
        <p className={styles.panelBody}>
          Wiring, smoke, and traceability pages stay grouped here and out of the
          main product flow.
        </p>
      </summary>
      <div className={styles.diagnosticBody}>
        {groups.map((group) => (
          <section key={group.id} className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <p className={styles.panelEyebrow}>Diagnostic group</p>
                <h4 className={styles.panelTitle}>{group.label}</h4>
              </div>
              <span className={`${styles.panelBadge} ${styles.metricStateSecondary}`}>
                Secondary
              </span>
            </div>
            <p className={styles.panelBody}>{group.summary}</p>
            <div className={styles.diagnosticGrid}>
              {group.links.map((link) => (
                <Link key={link.href} className={styles.diagnosticLink} href={link.href}>
                  <strong className={styles.diagnosticLinkLabel}>{link.label}</strong>
                  <span className={styles.diagnosticLinkBody}>{link.href}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </details>
  );
}
