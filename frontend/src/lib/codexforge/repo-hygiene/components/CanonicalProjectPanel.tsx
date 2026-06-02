"use client";

import type { CSSProperties } from "react";
import type { CanonicalProject } from "../repo-hygiene-types";

export function CanonicalProjectPanel({ project }: { project: CanonicalProject }) {
  return (
    <article style={card}>
      <span style={tag}>Canonical source of truth</span>
      <h2 style={title}>{project.activeProduct}</h2>
      <p style={copy}>{project.sourceOfTruth}</p>
      <code style={path}>{project.activePath}</code>
      <div style={list}>
        {project.candidates.map((candidate) => (
          <div key={candidate.path} style={item}>
            <span style={status}>{candidate.status}</span>
            <code style={candidatePath}>{candidate.path}</code>
            <p style={copy}>{candidate.note}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

const card: CSSProperties = {
  background: "rgba(2,6,23,0.68)",
  border: "1px solid rgba(148,163,184,0.16)",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  padding: 14,
};

const tag: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  fontSize: 18,
  letterSpacing: 0,
  margin: 0,
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
};

const path: CSSProperties = {
  background: "rgba(15,23,42,0.86)",
  border: "1px solid rgba(148,163,184,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.5,
  overflowWrap: "anywhere",
  padding: 10,
};

const list: CSSProperties = {
  display: "grid",
  gap: 8,
};

const item: CSSProperties = {
  background: "rgba(15,23,42,0.58)",
  border: "1px solid rgba(148,163,184,0.12)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  padding: 10,
};

const status: CSSProperties = {
  color: "#5eead4",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
};

const candidatePath: CSSProperties = {
  color: "#dbeafe",
  fontSize: 12,
  overflowWrap: "anywhere",
};
