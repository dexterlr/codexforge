param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-project-runbook-export-review"
$route = "src\app\local-project-runbook-export-review"

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 349 Local Project Runbook Export Review" `
  -ScriptFile "smoke-codexforge-local-project-runbook-export-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalProjectRunbookExportReviewPanel" `
  -CommandLabel "Go to Local Project Runbook Export Review" `
  -Modules @("local-project-runbook-export-review-types.ts","local-project-runbook-export-review-summary.ts","index.ts") `
  -Components @("LocalProjectRunbookExportReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalProjectRunbookExportReviewStableKey","buildLocalProjectRunbookExportReview","buildLocalProjectRunbookExportReviews","buildLocalProjectRunbookExportReviewBoundary","buildLocalProjectRunbookExportReviewModel","summarizeLocalProjectRunbookExportReview","LOCAL_PROJECT_RUNBOOK_EXPORT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local project runbook export review","Project runbook export requires review","No runbook file is written from this page","Sensitive data and secrets are excluded","Export format options","Approval requirement") `
  -PlainEnglish @("Runbook export identity","Source snapshot/timeline/decision log","Included project sections","Excluded sensitive data","Operator checklist","Validation handoff","Next recommended route","Blocked reasons","runbook export requires review","advanced runbook details collapsed/secondary") `
  -ExtraRoutes @("/local-project-snapshot-review","/local-project-change-timeline","/local-project-decision-log","/handoff")

Write-Host "[OK] CodexForge Local Project Runbook Export Review smoke passed."
