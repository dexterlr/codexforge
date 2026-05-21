"use client";

import type { CSSProperties } from "react";
import type { ProductSimplificationSafetyBadge } from "../product-simplification-types";
import { SimplifiedSafetyBadge } from "./SimplifiedSafetyBadge";

export function ProductSimplificationSafetyNotice({
  badges,
}: {
  badges: ProductSimplificationSafetyBadge[];
}) {
  return (
    <section
      style={notice}
      data-codexforge-product-simplification-safety-notice="ProductSimplificationSafetyNotice renders compact safety badges Review first Approval required No auto-run no command execution no file writes preserve latest-message authority no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no Blender execution call from UI no ComfyUI execution call from UI no Unreal execution call from UI no ffmpeg execution call from UI no render execution call from UI no package/build execution call from UI broker-execution appears only as blocked-policy text"
    >
      <div style={badgeRow}>
        {badges.map((badgeLabel) => (
          <SimplifiedSafetyBadge key={`simplified-safety-${badgeLabel}`} label={badgeLabel} />
        ))}
      </div>
      <p style={copy}>Start only navigates, focuses, and explains. It does not run tools, write files, or change memory.</p>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.56)",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  padding: 12,
};

const badgeRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
};
