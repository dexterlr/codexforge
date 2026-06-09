param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-project-change-timeline-review"
$route = "src\app\local-project-change-timeline"

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 347 Local Project Change Timeline Review" `
  -ScriptFile "smoke-codexforge-local-project-change-timeline-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalProjectChangeTimelineReviewPanel" `
  -CommandLabel "Go to Local Project Change Timeline Review" `
  -Modules @("local-project-change-timeline-review-types.ts","local-project-change-timeline-review-summary.ts","index.ts") `
  -Components @("LocalProjectChangeTimelineReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalProjectChangeTimelineReviewStableKey","buildLocalProjectChangeTimelineReview","buildLocalProjectChangeTimelineReviews","buildLocalProjectChangeTimelineReviewBoundary","buildLocalProjectChangeTimelineReviewModel","summarizeLocalProjectChangeTimelineReview","LOCAL_PROJECT_CHANGE_TIMELINE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local project change timeline review","Change timelines are reviewed before use","No git history is read from this page","Timeline entries are not auto-promoted to memory","Reviewed change events","Decision log route") `
  -PlainEnglish @("Timeline review identity","Source project snapshot","Change window summary","Validation/failure markers","Regression risk flags","Runbook export route","Blocked reasons","timeline and decision logs are not auto-promoted to memory","advanced timeline details collapsed/secondary") `
  -ExtraRoutes @("/local-project-snapshot-review","/local-project-decision-log","/local-project-runbook-export-review","/git-review-live-context")

Write-Host "[OK] CodexForge Local Project Change Timeline Review smoke passed."
