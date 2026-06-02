param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Render Queue Controls" `
  -ScriptFile "smoke-codexforge-local-render-queue-controls.ps1" `
  -Domain "src\lib\codexforge\local-render-queue-controls" `
  -Route "src\app\render-queue" `
  -MainPanel "LocalRenderQueueControlsPanel" `
  -CommandLabel "Go to Render Queue" `
  -Modules @("local-render-queue-types.ts","render-queue-item.ts","render-queue-state.ts","render-queue-control.ts","render-queue-policy.ts","render-queue-safety.ts","render-queue-handoff.ts","render-queue-summary.ts","index.ts") `
  -Components @("LocalRenderQueueControlsPanel.tsx","RenderQueueItemPanel.tsx","RenderQueueStatePanel.tsx","RenderQueueControlPanel.tsx","RenderQueuePolicyPanel.tsx","RenderQueueSafetyPanel.tsx","RenderQueueHandoffPanel.tsx","RenderQueueSummaryPanel.tsx","RenderQueueSafetyStrip.tsx","RenderQueueEmptyState.tsx","index.ts") `
  -Exports @("buildRenderQueueItem","buildDefaultRenderQueueItems","buildRenderQueueState","buildRenderQueueControl","buildRenderQueuePolicy","buildRenderQueueSafety","buildRenderQueueHandoff","buildRenderQueueSummary","summarizeRenderQueueControls") `
  -PlainEnglish @("Render queue","Preview and review local render jobs before anything runs.","Review queue","Preview-only controls","pause","resume","cancel","retry","hold","prioritize","Copy queue handoff allowed") `
  -ExtraRoutes @("/gpu-scheduler","/dual-gpu","/video-jobs","/video-final-render","/video-artifacts")
