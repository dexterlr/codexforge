param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 792 First Adapter Execution Beta Review" `
  -ScriptFile "smoke-codexforge-first-adapter-execution-beta-review.ps1" `
  -Domain "src\lib\codexforge\first-adapter-execution-beta-review" `
  -Route "src\app\first-adapter-execution-beta-review" `
  -MainPanel "FirstAdapterExecutionBetaReviewPanel" `
  -CommandLabel "Go to First Adapter Execution Beta Review" `
  -Modules @("first-adapter-execution-beta-review-model.ts", "index.ts") `
  -Components @("FirstAdapterExecutionBetaReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstAdapterExecutionBetaReviewStableKey", "buildFirstAdapterExecutionBetaReview", "buildFirstAdapterExecutionBetaReviewItems", "buildFirstAdapterExecutionBetaReviewBoundary", "buildFirstAdapterExecutionBetaReviewModel", "summarizeFirstAdapterExecutionBetaReview", "FIRST_ADAPTER_EXECUTION_BETA_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Adapter Execution Beta Review", "First adapter execution beta review does not execute adapters", "Adapter execution beta requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "beta review checklist", "blocked execution items", "ready items", "deferred items", "validation plan", "rollback plan", "operator runbook", "evidence/result/recovery readiness", "unresolved blockers") `
  -PlainEnglish @("First Adapter Execution Beta Review identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "First adapter execution beta review does not execute adapters") `
  -RouteHref "/first-adapter-execution-beta-review"

Write-Host "[OK] CodexForge Phase 792 first adapter execution beta review smoke passed."
