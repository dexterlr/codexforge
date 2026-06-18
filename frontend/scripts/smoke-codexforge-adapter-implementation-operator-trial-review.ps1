param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 759 Adapter Implementation Operator Trial Review" `
  -ScriptFile "smoke-codexforge-adapter-implementation-operator-trial-review.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-operator-trial-review" `
  -Route "src\app\adapter-implementation-operator-trial-review" `
  -MainPanel "AdapterImplementationOperatorTrialReviewPanel" `
  -CommandLabel "Go to Adapter Implementation Operator Trial Review" `
  -Modules @("adapter-implementation-operator-trial-review-model.ts", "index.ts") `
  -Components @("AdapterImplementationOperatorTrialReviewPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationOperatorTrialReviewStableKey", "buildAdapterImplementationOperatorTrialReview", "buildAdapterImplementationOperatorTrialReviewItems", "buildAdapterImplementationOperatorTrialReviewBoundary", "buildAdapterImplementationOperatorTrialReviewModel", "summarizeAdapterImplementationOperatorTrialReview", "ADAPTER_IMPLEMENTATION_OPERATOR_TRIAL_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Operator Trial Review", "Adapter implementation operator trial review does not execute adapters", "Operator trial execution requires explicit operator approval", "Operator responsibilities", "Trial checklist", "Approval review", "Validation commands", "Rollback readiness", "Unresolved blockers") `
  -PlainEnglish @("Adapter Implementation Operator Trial Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no adapter execution", "no approval automation") `
  -RouteHref "/adapter-implementation-operator-trial-review"

Write-Host "[OK] CodexForge Phase 759 adapter implementation operator trial review smoke passed."
