param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-daily-workflow-result-review"
$route = "src\app\real-daily-workflow-result-review"
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
  "Real daily workflow result review",
  "Real daily workflow result review does not store live outputs",
  "Real daily workflow results require operator review before use",
  "Unsafe workflow results remain blocked",
  "Result review groups",
  "Acceptance checklist"
)
$plainEnglish = @(
  "real daily workflow result identity",
  "rejection checklist",
  "reuse checklist",
  "safety review checklist",
  "denied result actions",
  "blocked result risks",
  "real daily workflow recovery review route",
  "real daily workflow hardening pass route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced result details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 503 Real Daily Workflow Result Review" `
  -ScriptFile "smoke-codexforge-real-daily-workflow-result-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealDailyWorkflowResultReviewPanel" `
  -CommandLabel "Go to Real Daily Workflow Result Review" `
  -Modules @("real-daily-workflow-result-review-types.ts","real-daily-workflow-result-review-summary.ts","index.ts") `
  -Components @("RealDailyWorkflowResultReviewPanel.tsx","index.ts") `
  -Exports @("buildRealDailyWorkflowResultReviewStableKey","buildRealDailyWorkflowResultReview","buildRealDailyWorkflowResultReviews","buildRealDailyWorkflowResultReviewBoundary","buildRealDailyWorkflowResultReviewModel","summarizeRealDailyWorkflowResultReview","REAL_DAILY_WORKFLOW_RESULT_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/real-daily-workflow-evidence-review","/real-daily-workflow-recovery-review","/real-daily-workflow-hardening-pass","/review-inbox-final-consolidation")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Real Daily Workflow Result Review smoke passed."
