"use client";

import type { CSSProperties } from "react";
import {
  MemoryEventApprovalPanel,
} from "./MemoryEventApprovalPanel";
import { MemoryEventLedgerPanel } from "./MemoryEventLedgerPanel";
import { MemoryEventValidationPanel } from "./MemoryEventValidationPanel";
import { MemoryGraphReductionPreview } from "./MemoryGraphReductionPreview";
import { MemoryPersistenceSafetyNotice } from "./MemoryPersistenceSafetyNotice";
import type {
  MemoryEventLedger,
  MemoryEventPersistencePolicy,
  MemoryEventPersistenceRequest,
  MemoryEventValidation,
  MemoryGraphReductionPreview as Preview,
} from "../memory-persistence-types";

type Props = {
  policy: MemoryEventPersistencePolicy;
  request: MemoryEventPersistenceRequest;
  validation: MemoryEventValidation;
  ledger: MemoryEventLedger;
  preview: Preview;
  approvalNote: string;
  onApprovalNoteChange: (value: string) => void;
  contradictionAcknowledged: boolean;
  onContradictionAcknowledgedChange: (value: boolean) => void;
  appendState: "idle" | "pending" | "persisted" | "blocked" | "failed";
  appendMessage: string;
  onAppend: () => void;
};

export function MemoryPersistencePanel(props: Props) {
  const canAppend = props.validation.state === "valid" && props.request.approved === true && props.appendState !== "pending";

  return (
    <section
      style={panel}
      data-codexforge-memory-persistence-panel="MemoryPersistencePanel renders explicit approval required no auto-promotion no direct graph mutation .codexforge/memory-events memory.promoted"
    >
      <div style={header}>
        <div style={headerCopy}>
          <span style={eyebrow}>Phase 17</span>
          <h2 style={title}>Approved Memory Persistence</h2>
          <p style={copy}>
            Reviewed memory candidate to explicit approval to local runtime event ledger. The append button
            calls only the guarded memory event API and never directly mutates graph memory.
          </p>
        </div>
        <button type="button" disabled={!canAppend} onClick={props.onAppend} style={canAppend ? primaryButton : disabledButton}>
          {props.appendState === "pending" ? "Appending..." : "Append approved event"}
        </button>
      </div>
      {props.appendMessage ? <p style={status}>{props.appendMessage}</p> : null}
      <MemoryPersistenceSafetyNotice />
      <MemoryEventApprovalPanel
        policy={props.policy}
        request={props.request}
        approvalNote={props.approvalNote}
        onApprovalNoteChange={props.onApprovalNoteChange}
        contradictionAcknowledged={props.contradictionAcknowledged}
        onContradictionAcknowledgedChange={props.onContradictionAcknowledgedChange}
      />
      <MemoryEventValidationPanel validation={props.validation} />
      <MemoryGraphReductionPreview preview={props.preview} />
      <MemoryEventLedgerPanel ledger={props.ledger} />
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.72))", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 12, alignItems: "start", minWidth: 0 };
const headerCopy: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 22, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safeText };
const buttonBase: CSSProperties = { borderRadius: 8, padding: "10px 12px", color: "inherit", fontSize: 13, fontWeight: 850, minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const primaryButton: CSSProperties = { ...buttonBase, cursor: "pointer", border: "1px solid rgba(45,212,191,0.35)", background: "rgba(20,184,166,0.2)" };
const disabledButton: CSSProperties = { ...buttonBase, cursor: "not-allowed", border: "1px solid rgba(148,163,184,0.14)", background: "rgba(148,163,184,0.08)", color: "#64748b" };
const status: CSSProperties = { margin: 0, color: "#e0f2fe", fontSize: 12, lineHeight: 1.45, ...safeText };
