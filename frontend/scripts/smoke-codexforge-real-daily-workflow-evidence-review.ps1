param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-daily-workflow-evidence-review"
$route = "src\app\real-daily-workflow-evidence-review"
$newRoutes = @(
  "/review-inbox-final-consolidation",
  "/release-readiness-dashboard",
  "/codexforge-foundation-500-milestone-review",
  "/first-real-daily-workflow-candidate",
  "/real-daily-workflow-evidence-review",
  "/real-daily-workflow-result-review",
  "/real-daily-workflow-recovery-review",
  "/real-daily-workflow-hardening-pass"
)
$deterministicMarkerFallback = @(
  "no Math.random",
  "no Date.now",
  "no Date.now for deterministic layout/ids",
  "no appendEvent/saveBrainGraph calls from UI",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text"
)
$phaseMarkers = @(
  "Real daily workflow evidence review",
  "Real daily workflow evidence review does not ingest evidence automatically",
  "Real daily workflow evidence requires operator review before use",
  "Private workflow evidence stays redacted",
  "Evidence groups",
  "Source citation checklist"
)
$plainEnglish = @(
  "real daily workflow evidence identity",
  "redaction privacy checklist",
  "approval gate checklist",
  "denied evidence actions",
  "blocked evidence risks",
  "real daily workflow result review route",
  "real daily workflow recovery review route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced evidence details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 502 Real Daily Workflow Evidence Review" `
  -ScriptFile "smoke-codexforge-real-daily-workflow-evidence-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealDailyWorkflowEvidenceReviewPanel" `
  -CommandLabel "Go to Real Daily Workflow Evidence Review" `
  -Modules @("real-daily-workflow-evidence-review-types.ts","real-daily-workflow-evidence-review-summary.ts","index.ts") `
  -Components @("RealDailyWorkflowEvidenceReviewPanel.tsx","index.ts") `
  -Exports @("buildRealDailyWorkflowEvidenceReviewStableKey","buildRealDailyWorkflowEvidenceReview","buildRealDailyWorkflowEvidenceReviews","buildRealDailyWorkflowEvidenceReviewBoundary","buildRealDailyWorkflowEvidenceReviewModel","summarizeRealDailyWorkflowEvidenceReview","REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/first-real-daily-workflow-candidate","/real-daily-workflow-result-review","/real-daily-workflow-recovery-review","/review-inbox-final-consolidation")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Real Daily Workflow Evidence Review smoke passed."
