import type { Metadata } from "next";
import AnimationStudioPageClient from "./page-client";

export const metadata: Metadata = { title: "Animation Studio", description: "Local production planning, editable saved compositions, and a fixed qualified local trailer export preset." };

export default function AnimationStudioPage() {
  return <AnimationStudioPageClient />;
}
