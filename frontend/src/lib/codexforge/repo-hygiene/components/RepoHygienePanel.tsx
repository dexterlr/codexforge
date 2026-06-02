"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildRepoHygieneSummary } from "@/lib/codexforge/repo-hygiene";
import { CanonicalProjectPanel } from "./CanonicalProjectPanel";
import { GeneratedFilePolicyPanel } from "./GeneratedFilePolicyPanel";
import { RepoHygieneCheckPanel } from "./RepoHygieneCheckPanel";
import { RepoHygieneEmptyState } from "./RepoHygieneEmptyState";
import { RepoHygieneSafetyStrip } from "./RepoHygieneSafetyStrip";
import { RepoHygieneSummaryPanel } from "./RepoHygieneSummaryPanel";
import { SecretPolicyPanel } from "./SecretPolicyPanel";
import { TestScriptPanel } from "./TestScriptPanel";

export function RepoHygienePanel() {
  const summary = buildRepoHygieneSummary();

  return (
    <div
      style={shell}
      data-codexforge-repo-hygiene="RepoHygienePanel renders home-grade shell read-only cleanup checklist no deletion controls no command execution controls no provider calls no generated workspace mutation"
    >
      <section style={hero}>
        <div>
          <span style={eyebrow}>Repository readiness</span>
          <h1 style={headline}>Repo hygiene</h1>
          <p style={lede}>Keep generated files, secrets, tests, and workspace folders clean.</p>
        </div>
        <div style={linkRow}>
          <a href="#cleanup" style={primaryLink}>
            Review cleanup checklist
          </a>
          <Link href="/readiness" style={link}>
            Readiness
          </Link>
          <Link href="/quality-audit" style={link}>
            Quality audit
          </Link>
        </div>
      </section>

      <RepoHygieneSafetyStrip notes={summary.safetyNotes} />
      <RepoHygieneSummaryPanel summary={summary} />
      <section id="cleanup" style={grid}>
        <RepoHygieneCheckPanel checks={summary.checks} />
        <GeneratedFilePolicyPanel policy={summary.generatedFilePolicy} />
      </section>
      <section style={grid}>
        <CanonicalProjectPanel project={summary.canonicalProject} />
        <TestScriptPanel script={summary.testScript} />
        <SecretPolicyPanel policy={summary.secretPolicy} />
      </section>
      <RepoHygieneEmptyState actions={summary.manualActions} />
    </div>
  );
}

const shell: CSSProperties = {
  color: "#f8fafc",
  display: "grid",
  gap: 16,
  minWidth: 0,
  width: "100%",
};

const hero: CSSProperties = {
  background: "rgba(15,23,42,0.72)",
  border: "1px solid rgba(45,212,191,0.22)",
  borderRadius: 8,
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  justifyContent: "space-between",
  padding: 18,
};

const eyebrow: CSSProperties = {
  color: "#5eead4",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const headline: CSSProperties = {
  fontSize: "clamp(28px, 5vw, 48px)",
  letterSpacing: 0,
  lineHeight: 1,
  margin: "8px 0",
  overflowWrap: "anywhere",
};

const lede: CSSProperties = {
  color: "rgba(226,232,240,0.76)",
  fontSize: 14,
  lineHeight: 1.55,
  margin: 0,
  maxWidth: 760,
};

const linkRow: CSSProperties = {
  alignContent: "flex-start",
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const link: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 12,
  fontWeight: 900,
  padding: "9px 11px",
  textDecoration: "none",
};

const primaryLink: CSSProperties = {
  ...link,
  background: "#5eead4",
  color: "#042f2e",
};

const grid: CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
};
