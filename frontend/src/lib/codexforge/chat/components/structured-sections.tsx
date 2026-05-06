import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import type { CodexForgeStructuredSection } from "@/lib/codexforge/types";

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Set(
      value
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function getSectionKey(section: CodexForgeStructuredSection, index: number): string {
  return `${section.title}-${index}`;
}

function BulletList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}) {
  const normalized = normalizeStringArray(items);
  if (normalized.length === 0) return null;

  return (
    <div style={styles.structuredList}>
      {normalized.map((item, idx) => (
        <div key={`${idx}-${item}`} style={styles.structuredListItem}>
          <span style={styles.structuredBullet}>
            {ordered ? `${idx + 1}.` : "-"}
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function ListSection({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items?: string[] | null;
  ordered?: boolean;
}) {
  const normalized = normalizeStringArray(items);
  if (normalized.length === 0) return null;

  return (
    <section style={styles.structuredCard}>
      <div style={styles.structuredTitle}>{title}</div>
      <BulletList items={normalized} ordered={ordered} />
    </section>
  );
}

export function StructuredSections({
  sections,
}: {
  sections?: CodexForgeStructuredSection[] | null;
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section, index) => (
        <ListSection
          key={getSectionKey(section, index)}
          title={section.title}
          items={section.items}
        />
      ))}
    </>
  );
}
