param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Local Draft to Final Render Pipeline" `
  -ScriptFile "smoke-codexforge-local-draft-to-final-render-pipeline.ps1" `
  -Domain "src\lib\codexforge\local-draft-to-final-render-pipeline" `
  -Route "src\app\video-final-render" `
  -MainPanel "LocalDraftToFinalRenderPipelinePanel" `
  -CommandLabel "Go to Draft to Final" `
  -Modules @("draft-to-final-types.ts","draft-to-final-pipeline.ts","draft-to-final-readiness.ts","draft-to-final-decision.ts","draft-to-final-resource-plan.ts","draft-to-final-artifact-plan.ts","draft-to-final-handoff.ts","draft-to-final-summary.ts","index.ts") `
  -Components @("LocalDraftToFinalRenderPipelinePanel.tsx","DraftToFinalPipelinePanel.tsx","DraftToFinalReadinessPanel.tsx","DraftToFinalDecisionPanel.tsx","DraftToFinalResourcePlanPanel.tsx","DraftToFinalArtifactPlanPanel.tsx","DraftToFinalHandoffPanel.tsx","DraftToFinalSummaryPanel.tsx","DraftToFinalSafetyStrip.tsx","DraftToFinalEmptyState.tsx","index.ts") `
  -Exports @("buildDraftToFinalPipeline","buildDefaultDraftToFinalPipeline","buildDraftToFinalReadiness","buildDraftToFinalDecision","buildDraftToFinalResourcePlan","buildDraftToFinalArtifactPlan","buildDraftToFinalHandoff","buildDraftToFinalSummary","summarizeDraftToFinalPipeline") `
  -PlainEnglish @("Draft to final","Prepare a reviewed local draft for a future final render.","Review final render readiness","ready-for-future-approved-final-render","needs-upscale-plan","Copy final render handoff allowed","future approved execution","no upscale execution","no frame interpolation execution") `
  -ExtraRoutes @("/video-finishing","/video-upscale","/video-interpolation","/video-review","/video-artifacts","/video-recovery")
