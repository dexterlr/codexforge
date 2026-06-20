param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 925 Local Model Bridge Readiness Review" `
  -ScriptFile "smoke-codexforge-local-model-bridge-readiness-review.ps1" `
  -Domain "src\lib\codexforge\local-model-bridge-readiness-review" `
  -Route "src\app\local-model-bridge-readiness-review" `
  -MainPanel "LocalModelBridgeReadinessReviewPanel" `
  -CommandLabel "Go to Local Model Bridge Readiness Review" `
  -Modules @("local-model-bridge-readiness-review-model.ts", "index.ts") `
  -Components @("LocalModelBridgeReadinessReviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelBridgeReadinessReviewStableKey", "buildLocalModelBridgeReadinessReview", "buildLocalModelBridgeReadinessReviewItems", "buildLocalModelBridgeReadinessReviewBoundary", "buildLocalModelBridgeReadinessReviewModel", "summarizeLocalModelBridgeReadinessReview", "LOCAL_MODEL_BRIDGE_READINESS_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local model bridge readiness review", "Local model bridge readiness review does not probe runtimes", "Local model bridge readiness requires explicit operator approval", "Local bridge uses shared CodexForge memory and knowledge", "Denied local bridge readiness paths remain blocked", "Local bridge readiness checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model bridge readiness review does not probe runtimes", "Local model bridge readiness requires explicit operator approval", "Denied local bridge readiness paths remain blocked") `
  -RouteHref "/local-model-bridge-readiness-review"

Write-Host "[OK] CodexForge Phase 925 Local model bridge readiness review smoke passed."
