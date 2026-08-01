import type { Metadata } from "next";
import ProviderAdaptersPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Providers",
  description: "Review server-owned local model readiness, cloud transfer boundaries, approval, and paid-disabled posture.",
};

export default function ProviderAdaptersPage() {
  return <ProviderAdaptersPageClient />;
}
