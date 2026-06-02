import type { CreativeLocalFirstPolicy } from "./creative-cost-saver-types";

export function buildCreativeLocalFirstPolicy(input: Partial<CreativeLocalFirstPolicy> = {}): CreativeLocalFirstPolicy {
  return {
    id: input.id ?? "creative-local-first-policy",
    steps:
      input.steps ??
      [
        "plan locally",
        "draft locally when a reviewed workflow exists",
        "review locally before spending cloud credits",
        "upscale or interpolate locally only after the draft is worth keeping",
        "save cloud final renders for cases local cannot meet",
      ],
    plainEnglish:
      input.plainEnglish ??
      "Local-first means you spend time reviewing cheap drafts before deciding whether cloud quality is worth paying for.",
    approvalBoundary: input.approvalBoundary ?? "No render starts and no provider is called from this router.",
  };
}
