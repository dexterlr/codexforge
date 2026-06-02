"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { AssetDependencyNextAction } from "../asset-dependency-types";

export function AssetDependencyNextActionPanel({ nextAction }: { nextAction: AssetDependencyNextAction }) {
  return (
    <PreviewFoundationCard title="Next manual action">
      <PreviewFoundationCopy>{nextAction.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{nextAction.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["manual only", `route: ${nextAction.route}`, "no file access"]} />
    </PreviewFoundationCard>
  );
}
