param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 663 Universal Builder Result Review" `
  -ScriptFile "smoke-codexforge-universal-builder-result-review.ps1" `
  -Domain "src\lib\codexforge\universal-builder-result-review" `
  -Route "src\app\universal-builder-result-review" `
  -MainPanel "UniversalBuilderResultReviewPanel" `
  -CommandLabel "Go to Universal Builder Result Review" `
  -Modules @("universal-builder-result-review-model.ts", "index.ts") `
  -Components @("UniversalBuilderResultReviewPanel.tsx", "index.ts") `
  -Exports @("buildUniversalBuilderResultReviewStableKey", "buildUniversalBuilderResultReview", "buildUniversalBuilderResultReviews", "buildUniversalBuilderResultReviewBoundary", "buildUniversalBuilderResultReviewModel", "summarizeUniversalBuilderResultReview", "UNIVERSAL_BUILDER_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Universal builder result review", "Universal builder result review does not store or reuse outputs automatically", "Builder results require operator approval before reuse", "Acceptance checklist", "Rejection checklist", "Reuse checklist", "Privacy checklist", "Safety checklist", "Coding/project builder", "Creative/video", "Research/live research", "Chatbot/agent", "Monitoring/automation", "Video-call/meeting", "Connector workflows", "Game/server builder") `
  -PlainEnglish @("Universal builder result review identity", "Acceptance checklist", "Rejection checklist", "Reuse checklist", "Privacy checklist", "Safety checklist", "Workflow profile checklist", "Next recommended action") `
  -RouteHref "/universal-builder-result-review"

Write-Host "[OK] CodexForge Phase 663 universal builder result review smoke passed."
