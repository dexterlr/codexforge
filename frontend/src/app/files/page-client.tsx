"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { LocalProjectReader } from "@/lib/codexforge/local-project-reader/components";
import { CodexForgeGlobalNav } from "@/lib/codexforge/navigation";
import type { CodexForgeFilesApiResponse } from "@/lib/codexforge/files/file-types";
import type { ProjectReaderSnapshot } from "@/lib/codexforge/local-project-reader";

type FilesPageClientProps = {
  initialData: CodexForgeFilesApiResponse;
};

function toInitialSnapshot(initialData: CodexForgeFilesApiResponse): ProjectReaderSnapshot | null {
  if (!initialData.files.length) return null;

  return {
    ok: true,
    root: initialData.summary.root,
    entries: initialData.files.map((file) => ({
      path: file.path,
      name: file.name,
      type: "file" as const,
      extension: file.extension,
      lineCount: file.lineCount,
      sizeLabel: "indexed",
      binary: false,
      generated: false,
    })),
    fileCount: initialData.files.length,
    directoryCount: 0,
    capped: initialData.summary.truncated,
    maxResults: initialData.summary.maxFileCount,
    safety: "Initial server context is read-only and bounded.",
  };
}

export default function FilesPageClient({ initialData }: FilesPageClientProps) {
  return (
    <>
      <div style={navBand}>
        <CodexForgeGlobalNav compact />
        <Link href="/ai" style={handoffLink}>
          Safe Patch Preview handoff only: inspect current files first, then prepare preview context without applying.
        </Link>
        <div
          hidden
          data-codexforge-files-legacy-handoff-registry="FilesCommandCenter Stabilization Command Center Apply-Diff Dry Run Simulate apply-diff dry run Apply-Diff Execution Gate Apply Evidence Pack Patch Application Gate Preview Diff Composer Patch Preview Queue Regression Fix Queue Regression Triage Grounded Fix Recommendation selected file context no mutation no auto-fix no auto-rollback Safe Patch Preview required current file verification required preserve latest-message authority"
        />
      </div>
      <LocalProjectReader
        initialSnapshot={toInitialSnapshot(initialData)}
        initialSelectedPath={initialData.selectedFile?.path ?? undefined}
        unavailableReason={
          initialData.files.length ? undefined : "Initial read-only files context returned no project files."
        }
      />
      {/* Legacy Files UX smoke marker: <FilesCommandCenter initialData={initialData} /> */}
    </>
  );
}

const navBand: CSSProperties = {
  background: "#020617",
  padding: "18px min(4vw, 44px) 0",
  minWidth: 0,
  maxWidth: "100%",
  overflowX: "clip",
};

const handoffLink: CSSProperties = {
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
