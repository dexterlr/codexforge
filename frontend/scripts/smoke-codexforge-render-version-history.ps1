param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Render Version History" `
  -ScriptFile "smoke-codexforge-render-version-history.ps1" `
  -Domain "src\lib\codexforge\render-version-history" `
  -Route "src\app\render-history" `
  -MainPanel "RenderVersionHistoryPanel" `
  -CommandLabel "Go to Render History" `
  -Modules @("render-version-history-types.ts","render-version.ts","render-version-change.ts","render-version-lineage.ts","render-version-review.ts","render-version-selection.ts","render-version-handoff.ts","render-version-history-summary.ts","index.ts") `
  -Components @("RenderVersionHistoryPanel.tsx","RenderVersionPanel.tsx","RenderVersionChangePanel.tsx","RenderVersionLineagePanel.tsx","RenderVersionReviewPanel.tsx","RenderVersionSelectionPanel.tsx","RenderVersionHandoffPanel.tsx","RenderVersionHistorySummaryPanel.tsx","RenderVersionHistorySafetyStrip.tsx","RenderVersionHistoryEmptyState.tsx","index.ts") `
  -Exports @("buildRenderVersion","buildDefaultRenderVersions","buildRenderVersionChange","buildRenderVersionLineage","buildRenderVersionReview","buildRenderVersionSelection","buildRenderVersionHandoff","buildRenderVersionHistorySummary","summarizeRenderVersionHistory") `
  -PlainEnglish @("Render history","Track drafts, retries, and final candidates without losing context.","Review render history","image","keyframe","video draft","upscaled video","interpolated video","final candidate","export handoff","prompt changed","style changed","keyframe changed","workflow changed","parameter changed","upscale added","interpolation added","artifact reviewed","recovery retry","Copy version handoff allowed","latest","No playback","No file deletion","No generation","No export","no fake playback","no file deletion","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no real export","no upload","no silent persistence") `
  -ExtraRoutes @("/video-projects","/video-compare","/video-review","/video-artifacts","/video-final-render","/video-export")
