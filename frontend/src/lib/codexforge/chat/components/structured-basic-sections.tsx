import React from "react";
import * as styles from "@/lib/codexforge/chat/client-styles";
import { StructuredCard } from "@/lib/codexforge/chat/components/structured-ui-primitives";

export function normalizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeStringArray(value: unknown): string[] {
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

export function hasItems(items?: string[] | null): items is string[] {
  return Array.isArray(items) && items.length > 0;
}

export function ParagraphBlock({
  title,
  text,
}: {
  title: string;
  text?: string | null;
}) {
  if (!text) return null;

  return (
    <StructuredCard title={title}>
      <div style={styles.structuredParagraph}>{text}</div>
    </StructuredCard>
  );
}

export function BulletList({
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

export function ListSection({
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
    <StructuredCard title={title}>
      <BulletList items={normalized} ordered={ordered} />
    </StructuredCard>
  );
}
