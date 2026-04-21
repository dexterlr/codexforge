"use client";

import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";

export type WorkspaceCard = {
  label: string;
  value: string;
};

type WorkspaceHeroProps = {
  workspaceCards: WorkspaceCard[];
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
};

export function WorkspaceHero({
  workspaceCards,
  onPrimaryAction,
  primaryActionLabel = "Open workspace",
}: WorkspaceHeroProps) {
  return (
    <section style={styles.heroCard}>
      <div style={styles.heroGrid}>
        <div style={heroContent}>
          <header style={heroHeader}>
            <div style={styles.eyebrow}>Real product direction</div>

            <h1 style={styles.heroTitle}>
              CodexForge should feel like an AI developer assistant and research
              copilot
            </h1>
          </header>

          <div style={styles.heroText}>
            This page is the front door for that future. It should help plan
            work, reason through problems, design features, organize research,
            and stay useful even when no backend model is connected yet.
          </div>

          {onPrimaryAction ? (
            <div style={heroActions}>
              <button
                type="button"
                onClick={onPrimaryAction}
                style={styles.pillGhostButton}
              >
                {primaryActionLabel}
              </button>
            </div>
          ) : null}
        </div>

        <div style={styles.heroCardGrid}>
          {workspaceCards.map((card) => (
            <div key={card.label} style={styles.miniInfoCard}>
              <div style={styles.miniInfoLabel}>{card.label}</div>
              <div style={styles.miniInfoValue}>{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const heroContent: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

const heroHeader: React.CSSProperties = {
  display: "grid",
  gap: 6,
};

const heroActions: React.CSSProperties = {
  marginTop: 6,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};