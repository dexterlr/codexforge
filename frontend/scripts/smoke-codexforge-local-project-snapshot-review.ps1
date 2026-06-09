param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-project-snapshot-review"
$route = "src\app\local-project-snapshot-review"

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 346 Local Project Snapshot Review" `
  -ScriptFile "smoke-codexforge-local-project-snapshot-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalProjectSnapshotReviewPanel" `
  -CommandLabel "Go to Local Project Snapshot Review" `
  -Modules @("local-project-snapshot-review-types.ts","local-project-snapshot-review-summary.ts","index.ts") `
  -Components @("LocalProjectSnapshotReviewPanel.tsx","index.ts") `
  -Exports @("buildLocalProjectSnapshotReviewStableKey","buildLocalProjectSnapshotReview","buildLocalProjectSnapshotReviews","buildLocalProjectSnapshotReviewBoundary","buildLocalProjectSnapshotReviewModel","summarizeLocalProjectSnapshotReview","LOCAL_PROJECT_SNAPSHOT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Local project snapshot review","Project snapshots are reviewed before use","No local project scan runs from this page","Secrets and local paths stay redacted","Reviewed files modules summary","Change timeline route") `
  -PlainEnglish @("Snapshot review identity","Project scope summary","Source dependency on project intelligence","Reviewed files/modules summary","Risk/secrets summary","Validation status","Decision log route","Blocked reasons","project data is reviewed before use","advanced snapshot details collapsed/secondary") `
  -ExtraRoutes @("/project-intelligence-result","/project-intelligence-recovery","/local-project-change-timeline","/local-project-decision-log")

Write-Host "[OK] CodexForge Local Project Snapshot Review smoke passed."
