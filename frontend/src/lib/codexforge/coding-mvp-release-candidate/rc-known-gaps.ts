import { buildCodingMvpReleaseCandidateItem } from "./coding-mvp-rc-types";
import type { CodingMvpReleaseCandidateItem } from "./coding-mvp-rc-types";

export function buildRcKnownGaps(): CodingMvpReleaseCandidateItem {
  return buildCodingMvpReleaseCandidateItem("rc-known-gaps", "Gate the coding MVP release candidate", "rc-ready; rc-ready-with-fixes; no-go; blocked; build passes; all coding path smoke scripts pass; no unsafe UI tool calls; manual trial path clear; demo path clear; validation capture clear; guarded apply still safe; no auto-apply; no auto-run; approval required; preserve latest-message authority");
}
