param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 607 Launch Support Runbook Review" `
  -ScriptFile "smoke-codexforge-launch-support-runbook-review.ps1" `
  -Domain "src\lib\codexforge\launch-support-runbook-review" `
  -Route "src\app\launch-support-runbook-review" `
  -MainPanel "LaunchSupportRunbookReviewPanel" `
  -CommandLabel "Go to Launch Support Runbook Review" `
  -Modules @("launch-support-runbook-review-types.ts", "launch-support-runbook-review-summary.ts", "index.ts") `
  -Components @("LaunchSupportRunbookReviewPanel.tsx", "index.ts") `
  -Exports @("buildLaunchSupportRunbookReviewStableKey", "buildLaunchSupportRunbookReview", "buildLaunchSupportRunbookReviews", "buildLaunchSupportRunbookReviewBoundary", "buildLaunchSupportRunbookReviewModel", "summarizeLaunchSupportRunbookReview", "LAUNCH_SUPPORT_RUNBOOK_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Launch support runbook review", "Launch support runbook review does not publish or send support guidance", "Support runbook changes require explicit operator approval", "Unresolved support blockers stay blocked", "Support runbook groups", "Known limitation checklist") `
  -PlainEnglish @("Launch support runbook identity", "Operator support checklist", "Recovery rollback checklist", "Escalation checklist", "Denied support runbook actions", "Unresolved support blockers", "Go/no-go candidate route", "First controlled launch plan route", "Next recommended action") `
  -RouteHref "/launch-support-runbook-review"

Write-Host "[OK] CodexForge Phase 607 launch support runbook review smoke passed."
