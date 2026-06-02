param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Video Artifact Capture MVP" `
  -ScriptFile "smoke-codexforge-local-video-artifact-capture-mvp.ps1" `
  -Domain "src\lib\codexforge\local-video-artifact-capture-mvp" `
  -Route "src\app\video-capture" `
  -MainPanel "LocalVideoArtifactCaptureMvpPanel" `
  -CommandLabel "Go to Video Capture" `
  -Modules @("local-video-artifact-capture-types.ts","artifact-capture-input.ts","artifact-capture-record.ts","artifact-capture-review.ts","artifact-capture-safety.ts","artifact-capture-handoff.ts","artifact-capture-summary.ts","index.ts") `
  -Components @("LocalVideoArtifactCaptureMvpPanel.tsx","ArtifactCaptureInputPanel.tsx","ArtifactCaptureRecordPanel.tsx","ArtifactCaptureReviewPanel.tsx","ArtifactCaptureSafetyPanel.tsx","ArtifactCaptureHandoffPanel.tsx","ArtifactCaptureSummaryPanel.tsx","ArtifactCaptureSafetyStrip.tsx","ArtifactCaptureEmptyState.tsx","index.ts") `
  -Exports @("buildArtifactCaptureInput","buildDefaultArtifactCaptureInput","buildArtifactCaptureRecord","buildArtifactCaptureReview","buildArtifactCaptureSafety","buildArtifactCaptureHandoff","buildArtifactCaptureSummary","summarizeArtifactCapture") `
  -PlainEnglish @("Capture video artifact","Record a local image, keyframe, or video draft for review.","Capture artifact record","local-image","keyframe","video-draft","upscaled-video","interpolated-video","final-candidate","failed-output","review-note","source request id","source workflow package id","source provider","file label","safe relative artifact path optional","thumbnail supplied optional","duration supplied optional","resolution supplied optional","status","review notes","no-file-mutation guarantee","no arbitrary filesystem browsing","no deletion","no mutation","no fake artifact","supplied metadata clearly marked","safe artifact workspace only","No file delete button","No render button","No hidden persistence","Copy artifact handoff allowed","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button") `
  -ExtraRoutes @("/local-image","/local-keyframes","/local-video-draft","/video-artifacts","/video-review","/run-history")
