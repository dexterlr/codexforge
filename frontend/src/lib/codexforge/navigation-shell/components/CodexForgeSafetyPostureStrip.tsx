import type { CSSProperties } from "react";
import type { CodexForgeSafetyPostureItem } from "../navigation-shell-types";

export function CodexForgeSafetyPostureStrip({
  posture,
}: {
  posture: readonly CodexForgeSafetyPostureItem[];
}) {
  return (
    <section
      aria-label="CodexForge safety posture"
      data-codexforge-safety-posture-strip="CodexForgeSafetyPostureStrip renders local-first operator-safe no auto-fix no command execution without approval no file writes without approval preserve latest-message authority"
      style={wrap}
    >
      {posture.map((item) => (
        <span key={item.id} title={item.summary} style={chip}>
          {item.label}
        </span>
      ))}
    </section>
  );
}

const wrap: CSSProperties = {
  alignItems: "center",
  border: "1px solid rgba(45,212,191,0.16)",
  background: "rgba(20,184,166,0.055)",
  borderRadius: 8,
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  minWidth: 0,
  padding: 8,
};

const chip: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(2,6,23,0.32)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 850,
  lineHeight: 1.25,
  maxWidth: "100%",
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: "5px 7px",
};

