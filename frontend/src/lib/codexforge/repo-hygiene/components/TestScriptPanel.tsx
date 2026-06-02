"use client";

import type { CSSProperties } from "react";
import type { RepoHygieneTestScript } from "../repo-hygiene-types";

export function TestScriptPanel({ script }: { script: RepoHygieneTestScript }) {
  return (
    <article style={card}>
      <span style={tag}>Tests</span>
      <h2 style={title}>Package validation</h2>
      <p style={copy}>The placeholder test was replaced with a real local validation chain.</p>
      <dl style={facts}>
        <div>
          <dt style={term}>Previous</dt>
          <dd style={value}>{script.previousPlaceholder}</dd>
        </div>
        <div>
          <dt style={term}>Current</dt>
          <dd style={value}>{script.currentTestScript}</dd>
        </div>
      </dl>
      <ul style={list}>
        {script.validationScripts.map((item) => (
          <li key={item} style={listItem}>
            {item}
          </li>
        ))}
      </ul>
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

const facts: CSSProperties = {
  display: "grid",
  gap: 8,
  margin: 0,
};

const term: CSSProperties = {
  color: "#a7f3d0",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const value: CSSProperties = {
  color: "#dbeafe",
  fontSize: 13,
  margin: "3px 0 0",
  overflowWrap: "anywhere",
};

const list: CSSProperties = {
  color: "#cbd5e1",
  display: "grid",
  fontSize: 12,
  gap: 4,
  lineHeight: 1.45,
  margin: 0,
  paddingLeft: 16,
};

const listItem: CSSProperties = {
  overflowWrap: "anywhere",
};
