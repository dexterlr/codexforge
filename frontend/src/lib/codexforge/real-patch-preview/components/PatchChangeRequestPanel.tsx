import type { CSSProperties } from "react";
import type { PatchChangeRequest } from "../real-patch-preview-types";

export function PatchChangeRequestPanel({
  selectedPath,
  requestedChangeText,
  onRequestedChangeTextChange,
  operatorIntent,
  onOperatorIntentChange,
  onPreparePreview,
  request,
}: {
  selectedPath: string;
  requestedChangeText: string;
  onRequestedChangeTextChange: (value: string) => void;
  operatorIntent: string;
  onOperatorIntentChange: (value: string) => void;
  onPreparePreview: () => void;
  request: PatchChangeRequest | null;
}) {
  const blocked = request?.validation.blockedReasons ?? [];

  return (
    <section
      style={panel}
      data-codexforge-patch-change-request-panel="PatchChangeRequestPanel renders Prepare preview preview-only no file writes no command execution latest-message authority"
    >
      <div style={eyebrow}>Patch Change Request</div>
      <strong style={path}>{selectedPath || "No file selected"}</strong>
      <label style={field}>
        <span style={label}>Requested change</span>
        <textarea
          value={requestedChangeText}
          onChange={(event) => onRequestedChangeTextChange(event.target.value)}
          placeholder="Describe the desired change. Exact replacement works with BEFORE: ... AFTER: ... markers."
          rows={5}
          style={textarea}
        />
      </label>
      <label style={field}>
        <span style={label}>Operator intent</span>
        <input
          value={operatorIntent}
          onChange={(event) => onOperatorIntentChange(event.target.value)}
          placeholder="Preview-only patch plan for the selected file"
          style={input}
        />
      </label>
      <button
        type="button"
        onClick={onPreparePreview}
        disabled={!selectedPath || !requestedChangeText.trim()}
        aria-describedby="codexforge-files-prepare-preview-explanation"
        style={button}
      >
        Prepare preview
      </button>
      <p id="codexforge-files-prepare-preview-explanation" style={copy}>
        {!selectedPath
          ? "Choose a project file before preparing a preview. Preparing remains preview-only and does not write files or execute commands."
          : !requestedChangeText.trim()
            ? "Enter requested change text before preparing a preview. Preparing creates deterministic preview state only and does not write files or execute commands."
            : "Preview prerequisites are ready. Preparing creates deterministic preview state only and does not write files or execute commands."}
      </p>
      {request ? (
        <div style={statusBox}>
          <strong>{request.validation.valid ? "Request ready" : "Request blocked"}</strong>
          <span>{request.noWriteGuarantee}</span>
          <span>{request.noCommandGuarantee}</span>
          <span>{request.latestMessageAuthorityReminder}</span>
          {blocked.length ? <span>{blocked.join(" ")}</span> : null}
        </div>
      ) : null}
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.62)",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 12,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const path: CSSProperties = {
  fontSize: 13,
  overflowWrap: "anywhere",
};

const field: CSSProperties = {
  display: "grid",
  gap: 5,
};

const label: CSSProperties = {
  color: "#bfdbfe",
  fontSize: 11,
  fontWeight: 850,
  textTransform: "uppercase",
};

const inputBase: CSSProperties = {
  background: "rgba(0,0,0,0.24)",
  border: "1px solid rgba(148,163,184,0.18)",
  borderRadius: 8,
  boxSizing: "border-box",
  color: "#f8fafc",
  font: "inherit",
  fontSize: 12,
  lineHeight: 1.45,
  minWidth: 0,
  outline: "none",
  padding: 10,
  width: "100%",
};

const input: CSSProperties = {
  ...inputBase,
};

const textarea: CSSProperties = {
  ...inputBase,
  resize: "vertical",
};

const button: CSSProperties = {
  background: "rgba(20,184,166,0.16)",
  border: "1px solid rgba(45,212,191,0.30)",
  borderRadius: 8,
  color: "#ccfbf1",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  padding: "9px 10px",
};

const statusBox: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "grid",
  fontSize: 11,
  gap: 4,
  lineHeight: 1.4,
  overflowWrap: "anywhere",
  padding: 10,
};

const copy: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
};
