"use client";

import { CapabilityCommandCenter } from "@/lib/codexforge/capabilities/components/CapabilityCommandCenter";
import type { CodexForgeCapabilityContext } from "@/lib/codexforge/capabilities/capability-context";

type CapabilitiesPageClientProps = {
  initialData: CodexForgeCapabilityContext;
};

export default function CapabilitiesPageClient({ initialData }: CapabilitiesPageClientProps) {
  return <CapabilityCommandCenter initialData={initialData} />;
}
