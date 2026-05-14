import { NextResponse } from "next/server";
import { buildArtifactExecutorModel } from "@/lib/codexforge/artifact-executor";

export const dynamic = "force-static";

export function GET() {
  const model = buildArtifactExecutorModel();

  return NextResponse.json({
    ok: true,
    mode: "preview-only",
    previewOnly: true,
    sourceMutation: "blocked",
    commandExecution: "blocked",
    externalAppExecution: "blocked",
    futureApproval: "approval required before future writes/execution",
    previews: model.previewSet.previews.map((preview) => ({
      artifactId: preview.artifactId,
      type: preview.type,
      title: preview.title,
      targetPlaceholderPath: preview.targetPlaceholderPath,
      contentPreview: preview.contentPreview,
      validationNotes: preview.validationNotes,
    })),
  });
}
