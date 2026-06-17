param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 662 Universal Builder Evidence Review" `
  -ScriptFile "smoke-codexforge-universal-builder-evidence-review.ps1" `
  -Domain "src\lib\codexforge\universal-builder-evidence-review" `
  -Route "src\app\universal-builder-evidence-review" `
  -MainPanel "UniversalBuilderEvidenceReviewPanel" `
  -CommandLabel "Go to Universal Builder Evidence Review" `
  -Modules @("universal-builder-evidence-review-model.ts", "index.ts") `
  -Components @("UniversalBuilderEvidenceReviewPanel.tsx", "index.ts") `
  -Exports @("buildUniversalBuilderEvidenceReviewStableKey", "buildUniversalBuilderEvidenceReview", "buildUniversalBuilderEvidenceReviews", "buildUniversalBuilderEvidenceReviewBoundary", "buildUniversalBuilderEvidenceReviewModel", "summarizeUniversalBuilderEvidenceReview", "UNIVERSAL_BUILDER_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Universal builder evidence review", "Universal builder evidence review does not capture or ingest evidence automatically", "Builder evidence requires operator review before use", "Scaffold evidence", "File write evidence", "Command evidence", "Runtime evidence", "Provider evidence", "Connector evidence", "Automation evidence", "Package/export evidence", "Creative evidence", "Research evidence", "Chatbot evidence", "Monitoring evidence", "Video-call evidence", "Game/server evidence") `
  -PlainEnglish @("Universal builder evidence review identity", "Scaffold evidence", "File write evidence", "Command evidence", "Runtime evidence", "Provider evidence", "Connector evidence", "Automation evidence", "Package/export evidence", "Creative evidence", "Research evidence", "Chatbot evidence", "Monitoring evidence", "Video-call evidence", "Game/server evidence", "Next recommended action") `
  -RouteHref "/universal-builder-evidence-review"

Write-Host "[OK] CodexForge Phase 662 universal builder evidence review smoke passed."
