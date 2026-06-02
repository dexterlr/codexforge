"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { StylePresetToken } from "../style-preset-types";

export function StylePresetTokenPanel({ tokens }: { tokens: StylePresetToken[] }) {
  return (
    <PreviewFoundationCard title="Style tokens">
      <PreviewFoundationCopy>Tokens are copyable style wording, not hidden prompts sent to a provider.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={tokens.map((token) => `${token.label}: ${token.promptToken}`)} />
    </PreviewFoundationCard>
  );
}
