param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-daily-workflow-recovery-review"
$route = "src\app\real-daily-workflow-recovery-review"
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
  "Real daily workflow recovery review",
  "Real daily workflow recovery review does not trigger recovery",
  "Recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts remain blocked",
  "Recovery groups",
  "Rollback checklist"
)
$plainEnglish = @(
  "real daily workflow recovery identity",
  "failure categories",
  "escalation checklist",
  "denied recovery shortcuts",
  "blocked recovery risks",
  "real daily workflow hardening route",
  "release readiness dashboard route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced recovery details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 504 Real Daily Workflow Recovery Review" `
  -ScriptFile "smoke-codexforge-real-daily-workflow-recovery-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealDailyWorkflowRecoveryReviewPanel" `
  -CommandLabel "Go to Real Daily Workflow Recovery Review" `
  -Modules @("real-daily-workflow-recovery-review-types.ts","real-daily-workflow-recovery-review-summary.ts","index.ts") `
  -Components @("RealDailyWorkflowRecoveryReviewPanel.tsx","index.ts") `
  -Exports @("buildRealDailyWorkflowRecoveryReviewStableKey","buildRealDailyWorkflowRecoveryReview","buildRealDailyWorkflowRecoveryReviews","buildRealDailyWorkflowRecoveryReviewBoundary","buildRealDailyWorkflowRecoveryReviewModel","summarizeRealDailyWorkflowRecoveryReview","REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/real-daily-workflow-result-review","/real-daily-workflow-hardening-pass","/release-readiness-dashboard","/review-inbox-final-consolidation")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Real Daily Workflow Recovery Review smoke passed."
