param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Local Video Artifact Gallery" `
  -ScriptFile "smoke-codexforge-local-video-artifact-gallery.ps1" `
  -Domain "src\lib\codexforge\local-video-artifact-gallery" `
  -Route "src\app\video-artifacts" `
  -MainPanel "LocalVideoArtifactGalleryPanel" `
  -CommandLabel "Go to Video Artifacts" `
  -Modules @("local-video-artifact-types.ts","video-artifact-record.ts","video-artifact-preview.ts","video-artifact-metadata.ts","video-artifact-review-state.ts","video-artifact-handoff.ts","video-artifact-gallery-summary.ts","index.ts") `
  -Components @("LocalVideoArtifactGalleryPanel.tsx","VideoArtifactRecordPanel.tsx","VideoArtifactPreviewPanel.tsx","VideoArtifactMetadataPanel.tsx","VideoArtifactReviewStatePanel.tsx","VideoArtifactHandoffPanel.tsx","VideoArtifactGallerySummaryPanel.tsx","VideoArtifactGallerySafetyStrip.tsx","VideoArtifactGalleryEmptyState.tsx","index.ts") `
  -Exports @("buildVideoArtifactRecord","buildDefaultVideoArtifactRecords","buildVideoArtifactPreview","buildVideoArtifactMetadata","buildVideoArtifactReviewState","buildVideoArtifactHandoff","buildVideoArtifactGallerySummary","summarizeVideoArtifactGallery") `
  -PlainEnglish @("Video artifacts","Review local creative outputs and handoffs in one place.","Review artifacts","No renders exist yet","No file browsing","No deletion","Copy artifact handoff allowed","future artifact kinds") `
  -ExtraRoutes @("/video-review","/video-recovery","/video-compare","/comfyui-jobs/package")
