param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 664 Universal Builder Recovery Review" `
  -ScriptFile "smoke-codexforge-universal-builder-recovery-review.ps1" `
  -Domain "src\lib\codexforge\universal-builder-recovery-review" `
  -Route "src\app\universal-builder-recovery-review" `
  -MainPanel "UniversalBuilderRecoveryReviewPanel" `
  -CommandLabel "Go to Universal Builder Recovery Review" `
  -Modules @("universal-builder-recovery-review-model.ts", "index.ts") `
  -Components @("UniversalBuilderRecoveryReviewPanel.tsx", "index.ts") `
  -Exports @("buildUniversalBuilderRecoveryReviewStableKey", "buildUniversalBuilderRecoveryReview", "buildUniversalBuilderRecoveryReviews", "buildUniversalBuilderRecoveryReviewBoundary", "buildUniversalBuilderRecoveryReviewModel", "summarizeUniversalBuilderRecoveryReview", "UNIVERSAL_BUILDER_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Universal builder recovery review", "Universal builder recovery review does not trigger recovery or retry", "Builder recovery actions require explicit operator approval", "Recovery checklist", "Rollback checklist", "Retry checklist", "Escalation checklist", "Coding/project builder recovery", "Creative/video recovery", "Research/live research recovery", "Chatbot/agent recovery", "Monitoring/automation recovery", "Video-call/meeting recovery", "Connector workflow recovery", "Game/server builder recovery") `
  -PlainEnglish @("Universal builder recovery review identity", "Recovery checklist", "Rollback checklist", "Retry checklist", "Escalation checklist", "Workflow profile recovery checklist", "Next recommended action") `
  -RouteHref "/universal-builder-recovery-review"

Write-Host "[OK] CodexForge Phase 664 universal builder recovery review smoke passed."
