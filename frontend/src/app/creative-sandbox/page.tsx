import type { Metadata } from "next";
import { buildCreativeExecutionSandboxModel } from "@/lib/codexforge/creative-execution-sandbox";
import CreativeSandboxPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Creative Execution Sandbox",
  description:
    "CodexForge Creative Execution Sandbox Phase 69 for simulation-only creative executor lifecycle, fake artifact capture, cancellation, verification, and review handoff.",
};

export default function CreativeSandboxPage() {
  return <CreativeSandboxPageClient initialData={buildCreativeExecutionSandboxModel()} />;
}
