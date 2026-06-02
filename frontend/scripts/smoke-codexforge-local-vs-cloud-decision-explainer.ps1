param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local vs Cloud Decision Explainer" `
  -ScriptFile "smoke-codexforge-local-vs-cloud-decision-explainer.ps1" `
  -Domain "src\lib\codexforge\local-vs-cloud-decision-explainer" `
  -Route "src\app\local-vs-cloud" `
  -MainPanel "LocalVsCloudDecisionExplainerPanel" `
  -CommandLabel "Go to Local vs Cloud" `
  -Modules @("local-vs-cloud-types.ts","local-vs-cloud-task.ts","local-vs-cloud-factor.ts","local-vs-cloud-decision.ts","local-vs-cloud-tradeoff.ts","local-vs-cloud-next-action.ts","local-vs-cloud-handoff.ts","local-vs-cloud-summary.ts","index.ts") `
  -Components @("LocalVsCloudDecisionExplainerPanel.tsx","LocalVsCloudTaskPanel.tsx","LocalVsCloudFactorPanel.tsx","LocalVsCloudDecisionPanel.tsx","LocalVsCloudTradeoffPanel.tsx","LocalVsCloudNextActionPanel.tsx","LocalVsCloudHandoffPanel.tsx","LocalVsCloudSummaryPanel.tsx","LocalVsCloudSafetyStrip.tsx","LocalVsCloudEmptyState.tsx","index.ts") `
  -Exports @("buildLocalVsCloudTask","buildDefaultLocalVsCloudTasks","buildLocalVsCloudFactor","buildLocalVsCloudDecision","buildLocalVsCloudTradeoff","buildLocalVsCloudNextAction","buildLocalVsCloudHandoff","buildLocalVsCloudSummary","summarizeLocalVsCloudDecision") `
  -PlainEnglish @("Local vs cloud","Choose the safest, cheapest, highest-quality path for each video job.","Explain best route","privacy","cost","speed","quality","local hardware fit","workflow availability","artifact readiness","failure risk","provider availability","manual effort","cloud credit risk","local-first","local-draft-then-review","local-final-candidate","cloud-final-review","manual-cloud-handoff","blocked","unknown","Use local for drafts","Use cloud only","Local saves money","Cloud is optional fallback","No provider call","No generate button","Copy decision handoff allowed","Nothing is uploaded yet","Nothing is generated yet","no cloud provider API calls","no upload","no auto-generation","no fake generation success","no real export","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no silent persistence") `
  -ExtraRoutes @("/creative-cost-router","/cloud-final-render","/video-safety-audit","/video-final-render","/task-router","/video-projects")
