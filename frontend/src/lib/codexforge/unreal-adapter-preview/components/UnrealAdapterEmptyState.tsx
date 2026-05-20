import type { CSSProperties } from "react";

export function UnrealAdapterEmptyState() {
  return (
    <section style={empty} data-unreal-adapter-empty-state="UnrealAdapterEmptyState renders">
      <strong>UnrealAdapterEmptyState renders</strong>
      <p>
        No external Unreal session is connected. The adapter remains preview-only until an approved future executor
        boundary exists.
      </p>
    </section>
  );
}

const empty: CSSProperties = {
  border: "1px dashed rgba(148,163,184,0.32)",
  background: "rgba(15,23,42,0.42)",
  borderRadius: 8,
  padding: 14,
  color: "#cbd5e1",
};
