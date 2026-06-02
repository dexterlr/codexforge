param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-video-phase-smoke-helper.ps1") `
  -PhaseName "Video Finishing Pipeline" `
  -ScriptFile "smoke-codexforge-video-finishing-pipeline.ps1" `
  -Domain "src\lib\codexforge\video-finishing-pipeline" `
  -Route "src\app\video-finishing" `
  -MainPanel "VideoFinishingPipelinePanel" `
  -CommandLabel "Go to Video Finishing" `
  -Modules @("video-finishing-types.ts","finishing-pipeline.ts","finishing-step.ts","finishing-quality-gate.ts","finishing-resource-plan.ts","finishing-export-plan.ts","finishing-handoff.ts","finishing-summary.ts","index.ts") `
  -Components @("VideoFinishingPipelinePanel.tsx","FinishingPipelinePanel.tsx","FinishingStepPanel.tsx","FinishingQualityGatePanel.tsx","FinishingResourcePlanPanel.tsx","FinishingExportPlanPanel.tsx","FinishingHandoffPanel.tsx","FinishingSummaryPanel.tsx","FinishingSafetyStrip.tsx","FinishingEmptyState.tsx","index.ts") `
  -Exports @("buildFinishingPipeline","buildDefaultFinishingPipeline","buildFinishingStep","buildDefaultFinishingSteps","buildFinishingQualityGate","buildFinishingResourcePlan","buildFinishingExportPlan","buildFinishingHandoff","buildFinishingSummary","summarizeVideoFinishing") `
  -PlainEnglish @("Video finishing","Plan the final polish steps after choosing a draft.","Plan finishing","Copy finishing checklist allowed","prompt matches goal","motion acceptable","no upscale execution","no frame interpolation execution","future approved execution") `
  -ExtraRoutes @("/video-compare","/video-upscale","/video-interpolation","/video-artifacts","/video-final-render")
