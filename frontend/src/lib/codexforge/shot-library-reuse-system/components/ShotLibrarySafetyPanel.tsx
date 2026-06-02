"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ShotLibrarySafety } from "../shot-library-types";

export function ShotLibrarySafetyPanel({ safety }: { safety: ShotLibrarySafety }) {
  return (
    <PreviewFoundationCard title="Safety">
      <PreviewFoundationCopy>No generation button. No provider calls. Shot templates do not start creative jobs.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.rules} />
    </PreviewFoundationCard>
  );
}
