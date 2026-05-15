"use client";

import { FilesCommandCenter } from "@/lib/codexforge/files/components/files-command-center";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { CodexForgeFilesApiResponse } from "@/lib/codexforge/files/file-types";
import Link from "next/link";
import type { CSSProperties } from "react";

type FilesPageClientProps = {
  initialData: CodexForgeFilesApiResponse;
};

export default function FilesPageClient({ initialData }: FilesPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
        <Link href="/brain" style={chatRecallLink}>
          Use file-related Brain recall as chat context: review visible cards first, then use in chat.
        </Link>
      </div>
      <FilesCommandCenter initialData={initialData} />
    </>
  );
}

const navBand: CSSProperties = {
  background: "#050814",
  padding: "18px min(4vw, 44px) 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};

const chatRecallLink: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "block",
  fontSize: 12,
  fontWeight: 800,
  lineHeight: 1.4,
  marginTop: 12,
  padding: "9px 11px",
  textDecoration: "none",
  overflowWrap: "anywhere",
};
