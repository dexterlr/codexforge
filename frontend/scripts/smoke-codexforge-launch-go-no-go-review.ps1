param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 604 Launch Go/No-Go Review" `
  -ScriptFile "smoke-codexforge-launch-go-no-go-review.ps1" `
  -Domain "src\lib\codexforge\launch-go-no-go-review" `
  -Route "src\app\launch-go-no-go-review" `
  -MainPanel "LaunchGoNoGoReviewPanel" `
  -CommandLabel "Go to Launch Go/No-Go Review" `
  -Modules @("launch-go-no-go-review-types.ts", "launch-go-no-go-review-summary.ts", "index.ts") `
  -Components @("LaunchGoNoGoReviewPanel.tsx", "index.ts") `
  -Exports @("buildLaunchGoNoGoReviewStableKey", "buildLaunchGoNoGoReview", "buildLaunchGoNoGoReviews", "buildLaunchGoNoGoReviewBoundary", "buildLaunchGoNoGoReviewModel", "summarizeLaunchGoNoGoReview", "LAUNCH_GO_NO_GO_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Launch go/no-go review", "Launch go/no-go review does not launch or approve automatically", "Go/no-go decisions require explicit operator approval", "Unresolved go/no-go blockers stay blocked", "Decision groups", "No-go criteria checklist") `
  -PlainEnglish @("Launch go/no-go identity", "Go criteria checklist", "Operator approval checklist", "Escalation checklist", "Denied go/no-go actions", "Unresolved decision blockers", "Rollback plan route", "Monitoring plan route", "Next recommended action") `
  -RouteHref "/launch-go-no-go-review"

Write-Host "[OK] CodexForge Phase 604 launch go/no-go review smoke passed."
