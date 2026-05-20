import type { Metadata } from "next";
import { buildGuardedCreativeExecutorModel } from "@/lib/codexforge/guarded-creative-executor";
import CreativeExecutorPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Guarded Creative Executor",
  description:
    "CodexForge Guarded Creative Executor Phase 67 dry-run-first/request-ready control plane for creative execution packets, adapter allowlists, approval, preflight, kill-switch planning, artifact capture, and future guarded executor handoff.",
};

export default function CreativeExecutorPage() {
  return <CreativeExecutorPageClient initialData={buildGuardedCreativeExecutorModel()} />;
}
