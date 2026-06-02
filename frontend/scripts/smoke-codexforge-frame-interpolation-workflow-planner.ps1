param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Frame Interpolation Workflow Planner" `
  -ScriptFile "smoke-codexforge-frame-interpolation-workflow-planner.ps1" `
  -Domain "src\lib\codexforge\frame-interpolation-workflow-planner" `
  -Route "src\app\video-interpolation" `
  -MainPanel "FrameInterpolationWorkflowPlannerPanel" `
  -CommandLabel "Go to Video Interpolation" `
  -Modules @("frame-interpolation-types.ts","interpolation-workflow-plan.ts","interpolation-source-review.ts","interpolation-target-profile.ts","interpolation-risk-review.ts","interpolation-resource-estimate.ts","interpolation-handoff.ts","interpolation-summary.ts","index.ts") `
  -Components @("FrameInterpolationWorkflowPlannerPanel.tsx","InterpolationWorkflowPlanPanel.tsx","InterpolationSourceReviewPanel.tsx","InterpolationTargetProfilePanel.tsx","InterpolationRiskReviewPanel.tsx","InterpolationResourceEstimatePanel.tsx","InterpolationHandoffPanel.tsx","InterpolationSummaryPanel.tsx","InterpolationSafetyStrip.tsx","InterpolationEmptyState.tsx","index.ts") `
  -Exports @("buildInterpolationWorkflowPlan","buildDefaultInterpolationWorkflowPlan","buildInterpolationSourceReview","buildInterpolationTargetProfile","buildInterpolationRiskReview","buildInterpolationResourceEstimate","buildInterpolationHandoff","buildInterpolationSummary","summarizeInterpolationWorkflow") `
  -PlainEnglish @("Frame interpolation plan","Plan smoother motion before running any frame interpolation.","Plan interpolation","Frame interpolation means","Copy interpolation plan allowed","no frame interpolation execution","no upscale execution","future approved execution") `
  -ExtraRoutes @("/video-review","/video-artifacts","/video-compare","/video-upscale","/video-finishing")
