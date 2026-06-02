"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ConsistencyIdentityCard } from "../consistency-kit-types";

export function ConsistencyIdentityCardPanel({ cards }: { cards: ConsistencyIdentityCard[] }) {
  return (
    <PreviewFoundationCard title="Identity cards">
      <PreviewFoundationCopy>
        Identity fields cover subject id, label, subject kind, description, must keep, must avoid, colors, materials, silhouette, camera/angle rules, style references as notes only, and approval status.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList items={cards.map((card) => `${card.label}: ${card.notes.join("; ")}`)} />
    </PreviewFoundationCard>
  );
}
