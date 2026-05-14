"use client";

import { FilesCommandCenter } from "@/lib/codexforge/files/components/files-command-center";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { CodexForgeFilesApiResponse } from "@/lib/codexforge/files/file-types";
import type { CSSProperties } from "react";

type FilesPageClientProps = {
  initialData: CodexForgeFilesApiResponse;
};

export default function FilesPageClient({ initialData }: FilesPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
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
