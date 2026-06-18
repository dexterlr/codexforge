param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 760 First Adapter Implementation Evidence Review" `
  -ScriptFile "smoke-codexforge-first-adapter-implementation-evidence-review.ps1" `
  -Domain "src\lib\codexforge\first-adapter-implementation-evidence-review" `
  -Route "src\app\first-adapter-implementation-evidence-review" `
  -MainPanel "FirstAdapterImplementationEvidenceReviewPanel" `
  -CommandLabel "Go to First Adapter Implementation Evidence Review" `
  -Modules @("first-adapter-implementation-evidence-review-model.ts", "index.ts") `
  -Components @("FirstAdapterImplementationEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildFirstAdapterImplementationEvidenceReviewStableKey", "buildFirstAdapterImplementationEvidenceReview", "buildFirstAdapterImplementationEvidenceReviewItems", "buildFirstAdapterImplementationEvidenceReviewBoundary", "buildFirstAdapterImplementationEvidenceReviewModel", "summarizeFirstAdapterImplementationEvidenceReview", "FIRST_ADAPTER_IMPLEMENTATION_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("First Adapter Implementation Evidence Review", "First adapter implementation evidence review does not capture or ingest evidence automatically", "Adapter evidence usage requires explicit operator approval", "Evidence coverage", "File write", "Command runner", "Local runtime", "Stores", "Recovery", "Packaging", "Project scaffold", "Harness", "Sandbox", "Audit", "Operator trial") `
  -PlainEnglish @("First Adapter Implementation Evidence Review identity", "review-only", "not executable from UI", "approval required", "sandbox required", "evidence required", "no evidence capture/ingestion/storage", "manual proof") `
  -RouteHref "/first-adapter-implementation-evidence-review"

Write-Host "[OK] CodexForge Phase 760 first adapter implementation evidence review smoke passed."
