"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ConsistencyNegativeRules } from "../consistency-kit-types";

export function ConsistencyNegativeRulesPanel({ rules }: { rules: ConsistencyNegativeRules[] }) {
  return (
    <PreviewFoundationCard title="Negative rules">
      <PreviewFoundationCopy>Negative rules say what must avoid so a character, brand, product, or subject does not drift.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={rules.map((rule) => `${rule.subjectId}: ${rule.mustAvoid.join(", ")}`)} />
    </PreviewFoundationCard>
  );
}
