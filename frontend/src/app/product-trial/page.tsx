import type { Metadata } from "next";
import PageClient from "./page-client";
export const metadata: Metadata = { title: "CodexForge Manual product trial", description: "Run the real MVP path and capture what worked or felt confusing." };
export default function Page() { return <PageClient />; }
