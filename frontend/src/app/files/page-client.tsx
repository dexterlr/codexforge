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
        <Link href="/tasks" style={chatRecallLink}>
          Task Autopilot: selected file intelligence can contribute task suggestions, review required and no file mutation.
        </Link>
        <Link href="/ai" style={chatRecallLink}>
          Grounded Fix Recommendation: selected file context can prepare Safe Patch Preview handoff only; verify current files and no mutation.
        </Link>
        <Link href="/ai" style={chatRecallLink}>
          Patch Preview Queue: Queue for Safe Patch Preview from reviewed recommendations; preview diff only, evidence is context, not proof, verify current files, no file writes without approval, and no command execution without approval.
        </Link>
        <Link
          href="/ai"
          style={chatRecallLink}
          data-codexforge-files-preview-diff-composer="Preview Diff Composer Compose preview diff non-applyable preview-only current file content is authority"
        >
          Preview Diff Composer: Compose preview diff for selected file context when safe; show pseudo diff as
          non-applyable, current file content is authority, and no files are mutated.
        </Link>
        <Link
          href="/ai"
          style={chatRecallLink}
          data-codexforge-files-patch-application-gate="Patch Application Gate Prepare human-approved apply gate explicit human approval required actual mutation remains blocked"
        >
          Patch Application Gate: Prepare human-approved apply gate for selected file context when safe; explicit
          human approval required, actual mutation remains blocked, pseudo diff alone is not applyable, apply-diff
          requires tool-policy approval, current files must be verified, rollback plan required, and no mutation.
        </Link>
        <Link
          href="/ai"
          style={chatRecallLink}
          data-codexforge-files-apply-diff-dry-run="Apply-Diff Dry Run Simulate apply-diff dry run simulation only no mutation actual apply-diff remains blocked"
        >
          Apply-Diff Dry Run: Simulate apply-diff dry run for selected file context when safe; show dry-run impact,
          conflict checks, and result ledger only. Simulation only, no mutation, actual apply-diff remains blocked,
          pseudo diff alone is not applyable, current file verification required, rollback plan required, and preserve
          latest-message authority.
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
