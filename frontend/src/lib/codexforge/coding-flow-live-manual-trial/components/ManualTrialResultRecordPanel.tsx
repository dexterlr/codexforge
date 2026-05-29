"use client";
import type { ManualTrialResultRecord } from "../live-manual-trial-types";
import { copy, eyebrow, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialResultRecordPanel({ record, issues }: { record: ManualTrialResultRecord; issues: string[] }) {
  return <section style={panel} data-codexforge-manual-trial-result="ManualTrialResultRecordPanel renders pass/fail record evidence supplied validation output approval reviewed"><span style={eyebrow}>Result record</span><h2 style={title}>{record.status}</h2><p style={copy}>Evidence supplied: {record.evidenceSupplied ? "yes" : "no"}. Approval reviewed: {record.approvalReviewed ? "yes" : "no"}.</p><p style={copy}>{issues.length ? issues.join(" ") : "Ready for operator decision."}</p></section>;
}
