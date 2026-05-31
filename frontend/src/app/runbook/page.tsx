import type { Metadata } from "next";
import PageClient from "./page-client";
export const metadata: Metadata = { title: "CodexForge Operator runbook", description: "A clear guide for running, validating, recovering, and demoing the coding MVP." };
export default function Page() { return <PageClient />; }
