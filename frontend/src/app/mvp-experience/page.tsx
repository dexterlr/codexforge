import type { Metadata } from "next";
import PageClient from "./page-client";
export const metadata: Metadata = { title: "CodexForge MVP experience lock", description: "Confirm the coding MVP is clear, safe, demo-ready, and consistent." };
export default function Page() { return <PageClient />; }
