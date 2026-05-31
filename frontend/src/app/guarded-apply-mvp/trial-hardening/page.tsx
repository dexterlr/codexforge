import type { Metadata } from "next";
import PageClient from "./page-client";
export const metadata: Metadata = { title: "CodexForge Harden first apply trial", description: "Review the first guarded apply path before any real apply request is considered ready." };
export default function Page() { return <PageClient />; }
