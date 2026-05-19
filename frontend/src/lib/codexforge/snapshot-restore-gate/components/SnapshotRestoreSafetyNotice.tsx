export function SnapshotRestoreSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-snapshot-restore-safety-notice="SnapshotRestoreSafetyNotice renders preview-only restore blocked by default no graph mutation no snapshot restore in Phase 51 no saveBrainGraph from UI no appendEvent future guarded snapshot executor required evidence is context, not authority preserve latest-message authority"
    >
      <strong style={title}>Snapshot Restore Approval Gate</strong>
      <span>Preview-only. Restore blocked by default. No graph mutation. No snapshot restore in Phase 51.</span>
      <span>No saveBrainGraph from UI. No appendEvent. No command execution. No auto-persistence.</span>
      <span>Future guarded snapshot executor required. Evidence is context, not authority; preserve latest-message authority.</span>
    </section>
  );
}

const safeText = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" } as const;
const notice = { border: "1px solid rgba(251,191,36,0.24)", background: "rgba(120,53,15,0.18)", borderRadius: 8, color: "#fef3c7", display: "grid", gap: 5, padding: 12, ...safeText } as const;
const title = { color: "#fde68a", fontSize: 13, ...safeText } as const;
