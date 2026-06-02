"use client";

import type { CSSProperties } from "react";

export function RepoHygieneSafetyStrip({ notes }: { notes: readonly string[] }) {
  return (
    <section style={strip} aria-label="Repo hygiene safety">
      {notes.map((note) => (
        <span key={note} style={pill}>
          {note}
        </span>
      ))}
    </section>
  );
}

const strip: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const pill: CSSProperties = {
  background: "rgba(20,184,166,0.12)",
  border: "1px solid rgba(45,212,191,0.22)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 12,
  fontWeight: 800,
  padding: "8px 10px",
};
