param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Creative Cost Saver Router" `
  -ScriptFile "smoke-codexforge-creative-cost-saver-router.ps1" `
  -Domain "src\lib\codexforge\creative-cost-saver-router" `
  -Route "src\app\creative-cost-router" `
  -MainPanel "CreativeCostSaverRouterPanel" `
  -CommandLabel "Go to Creative Cost Saver" `
  -Modules @("creative-cost-saver-types.ts","creative-cost-task.ts","creative-cost-route.ts","creative-cost-estimate.ts","creative-local-first-policy.ts","creative-cloud-fallback-policy.ts","creative-cost-saver-handoff.ts","creative-cost-saver-summary.ts","index.ts") `
  -Components @("CreativeCostSaverRouterPanel.tsx","CreativeCostTaskPanel.tsx","CreativeCostRoutePanel.tsx","CreativeCostEstimatePanel.tsx","CreativeLocalFirstPolicyPanel.tsx","CreativeCloudFallbackPolicyPanel.tsx","CreativeCostSaverHandoffPanel.tsx","CreativeCostSaverSummaryPanel.tsx","CreativeCostSaverSafetyStrip.tsx","CreativeCostSaverEmptyState.tsx","index.ts") `
  -Exports @("buildCreativeCostTask","buildDefaultCreativeCostTasks","buildCreativeCostRoute","buildCreativeCostEstimate","buildCreativeLocalFirstPolicy","buildCreativeCloudFallbackPolicy","buildCreativeCostSaverHandoff","buildCreativeCostSaverSummary","summarizeCreativeCostSaver") `
  -PlainEnglish @("Creative cost saver","Use local drafts first and save cloud credits for when they matter.","Choose cost-saving route","No cloud credits are spent","Estimates are approximate","local drafts save money","cloud final renders are optional later","nothing renders until explicitly approved") `
  -ExtraRoutes @("/video-jobs","/video-final-render","/gpu-scheduler","/dual-gpu","/render-queue","/local-machine","/token-router")
