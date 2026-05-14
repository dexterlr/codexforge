"use client";

import { CapabilityCommandCenter } from "@/lib/codexforge/capabilities/components/CapabilityCommandCenter";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { CodexForgeCapabilityContext } from "@/lib/codexforge/capabilities/capability-context";
import type { CSSProperties } from "react";

type CapabilitiesPageClientProps = {
  initialData: CodexForgeCapabilityContext;
};

export default function CapabilitiesPageClient({ initialData }: CapabilitiesPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
      </div>
      <CapabilityCommandCenter initialData={initialData} />
    </>
  );
}

const navBand: CSSProperties = {
  background: "#070A12",
  padding: "18px 24px 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};
