import type { Metadata } from "next";
import { buildCapabilityContext } from "@/lib/codexforge/capabilities/capability-context";
import CapabilitiesPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Capability Cockpit",
  description:
    "CodexForge capability cockpit for readiness, policy, creative production previews, consent, and blocked execution boundaries.",
};

export default function CapabilitiesPage() {
  const initialData = buildCapabilityContext();
  return <CapabilitiesPageClient initialData={initialData} />;
}
