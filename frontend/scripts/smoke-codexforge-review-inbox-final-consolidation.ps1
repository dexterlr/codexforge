param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\review-inbox-final-consolidation"
$route = "src\app\review-inbox-final-consolidation"
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
  "Review inbox final consolidation",
  "Review inbox final consolidation does not execute actions",
  "Inbox actions require explicit operator approval",
  "Unresolved inbox blockers stay blocked",
  "Consolidated review groups",
  "Evidence review lane"
)
$plainEnglish = @(
  "final review inbox identity",
  "result review lane",
  "approval review lane",
  "feedback review lane",
  "recovery review lane",
  "hardening review lane",
  "denied inbox actions",
  "unresolved inbox blockers",
  "release readiness dashboard route",
  "Foundation 500 milestone route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "no feedback auto-ingestion",
  "advanced inbox details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 498 Review Inbox Final Consolidation" `
  -ScriptFile "smoke-codexforge-review-inbox-final-consolidation.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ReviewInboxFinalConsolidationPanel" `
  -CommandLabel "Go to Review Inbox Final Consolidation" `
  -Modules @("review-inbox-final-consolidation-types.ts","review-inbox-final-consolidation-summary.ts","index.ts") `
  -Components @("ReviewInboxFinalConsolidationPanel.tsx","index.ts") `
  -Exports @("buildReviewInboxFinalConsolidationStableKey","buildReviewInboxFinalConsolidation","buildReviewInboxFinalConsolidations","buildReviewInboxFinalConsolidationBoundary","buildReviewInboxFinalConsolidationModel","summarizeReviewInboxFinalConsolidation","REVIEW_INBOX_FINAL_CONSOLIDATION_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/release-readiness-dashboard","/codexforge-foundation-500-milestone-review","/unified-evidence-policy-final-review","/unified-result-policy-final-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Review Inbox Final Consolidation smoke passed."
