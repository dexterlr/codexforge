param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 672 Automation Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-automation-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\automation-adapter-contract-review" `
  -Route "src\app\automation-adapter-contract-review" `
  -MainPanel "AutomationAdapterContractReviewPanel" `
  -CommandLabel "Go to Automation Adapter Contract Review" `
  -Modules @("automation-adapter-contract-review-model.ts", "index.ts") `
  -Components @("AutomationAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildAutomationAdapterContractReviewStableKey", "buildAutomationAdapterContractReview", "buildAutomationAdapterContractReviews", "buildAutomationAdapterContractReviewBoundary", "buildAutomationAdapterContractReviewModel", "summarizeAutomationAdapterContractReview", "AUTOMATION_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Automation adapter contract review", "Automation adapter contract review does not create automations or schedules", "Automation adapters require explicit operator approval", "Adapter not executable from UI", "Schedule", "Condition/watch", "Notification", "Pause/stop", "Audit", "Recovery", "Denied automation adapter actions") `
  -PlainEnglish @("Automation adapter contract review identity", "Schedule", "Condition/watch", "Notification", "Pause/stop", "Audit", "Recovery", "Denied automation adapter actions", "Unresolved automation adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/automation-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 672 automation adapter contract review smoke passed."
