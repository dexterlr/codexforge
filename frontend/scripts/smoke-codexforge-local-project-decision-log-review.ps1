param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-project-decision-log-review"
$route = "src\app\local-project-decision-log"

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 348 Local Project Decision Log Review" `
  -ScriptFile "smoke-codexforge-local-project-decision-log-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalProjectDecisionLogReviewPanel" `
  -CommandLabel "Go to Local Project Decision Log Review" `
  -Modules @("local-project-decision-log-review-types.ts","local-project-decision-log-review-summary.ts","index.ts") `
  -Components @("LocalProjectDecisionLogReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalProjectDecisionLogReviewStableKey","buildLocalProjectDecisionLogReview","buildLocalProjectDecisionLogReviews","buildLocalProjectDecisionLogReviewBoundary","buildLocalProjectDecisionLogReviewModel","summarizeLocalProjectDecisionLogReview","LOCAL_PROJECT_DECISION_LOG_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local project decision log review","Decisions are reviewed before becoming project memory","Unresolved questions stay visible","Memory promotion requires explicit review","Rationale summary","Runbook export route") `
  -PlainEnglish @("Decision log identity","Source project snapshot/timeline","Decision summary","Affected project areas","Unresolved questions","Memory promotion policy","Blocked reasons","timeline and decision logs are not auto-promoted to memory","advanced decision details collapsed/secondary") `
  -ExtraRoutes @("/local-project-snapshot-review","/local-project-change-timeline","/local-project-runbook-export-review","/memory")

Write-Host "[OK] CodexForge Local Project Decision Log Review smoke passed."
