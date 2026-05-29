import type { CSSProperties } from "react";

const BADGES = ["Approval required", "No auto-apply", "No auto-run", "Review first"] as const;

export function QualityAuditSafetyStrip() {
  return (
    <div style={strip} data-codexforge-quality-audit-safety-strip="QualityAuditSafetyStrip renders approval required no auto-apply no auto-run review first preserve latest-message authority">
      {BADGES.map((badge) => (
        <span key={badge} style={badgeStyle}>{badge}</span>
      ))}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const badgeStyle: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.28)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "6px 8px",
};
