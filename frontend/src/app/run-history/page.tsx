import type { Metadata } from "next";
import RunHistoryPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Run history",
  description: "Review recent work, capture handoffs, and decide what to do next.",
};

export default function RunHistoryPage() {
  return <RunHistoryPageClient />;
}
