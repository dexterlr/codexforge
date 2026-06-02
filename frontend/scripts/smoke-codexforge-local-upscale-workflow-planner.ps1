param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Local Upscale Workflow Planner" `
  -ScriptFile "smoke-codexforge-local-upscale-workflow-planner.ps1" `
  -Domain "src\lib\codexforge\local-upscale-workflow-planner" `
  -Route "src\app\video-upscale" `
  -MainPanel "LocalUpscaleWorkflowPlannerPanel" `
  -CommandLabel "Go to Video Upscale" `
  -Modules @("local-upscale-workflow-types.ts","upscale-workflow-plan.ts","upscale-source-review.ts","upscale-target-profile.ts","upscale-resource-estimate.ts","upscale-safety-review.ts","upscale-workflow-handoff.ts","upscale-workflow-summary.ts","index.ts") `
  -Components @("LocalUpscaleWorkflowPlannerPanel.tsx","UpscaleWorkflowPlanPanel.tsx","UpscaleSourceReviewPanel.tsx","UpscaleTargetProfilePanel.tsx","UpscaleResourceEstimatePanel.tsx","UpscaleSafetyReviewPanel.tsx","UpscaleWorkflowHandoffPanel.tsx","UpscaleWorkflowSummaryPanel.tsx","UpscaleWorkflowSafetyStrip.tsx","UpscaleWorkflowEmptyState.tsx","index.ts") `
  -Exports @("buildUpscaleWorkflowPlan","buildDefaultUpscaleWorkflowPlan","buildUpscaleSourceReview","buildUpscaleTargetProfile","buildUpscaleResourceEstimate","buildUpscaleSafetyReview","buildUpscaleWorkflowHandoff","buildUpscaleWorkflowSummary","summarizeUpscaleWorkflow") `
  -PlainEnglish @("Video upscale plan","Plan how a draft becomes higher quality before anything runs.","Plan upscale","Upscaling means","No video is changed yet","Copy upscale plan allowed","Copy finishing handoff allowed","no upscale execution","no frame interpolation execution","future approved execution") `
  -ExtraRoutes @("/video-review","/video-artifacts","/video-compare","/local-draft-review","/video-interpolation")
