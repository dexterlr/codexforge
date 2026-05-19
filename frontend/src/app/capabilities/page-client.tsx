"use client";

import { CapabilityCommandCenter } from "@/lib/codexforge/capabilities/components/CapabilityCommandCenter";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import type { CodexForgeCapabilityContext } from "@/lib/codexforge/capabilities/capability-context";

type CapabilitiesPageClientProps = {
  initialData: CodexForgeCapabilityContext;
};

export default function CapabilitiesPageClient({ initialData }: CapabilitiesPageClientProps) {
  return (
    <CodexForgeAppShell activePath="/capabilities" workspaceLabel="Capability Cockpit">
      <CapabilityCommandCenter initialData={initialData} />
    </CodexForgeAppShell>
  );
}
