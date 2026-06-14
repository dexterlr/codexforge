param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\codexforge-foundation-500-milestone-review"
$route = "src\app\codexforge-foundation-500-milestone-review"
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
  "CodexForge Foundation 500 milestone review",
  "Foundation 500 milestone review does not claim live execution",
  "Milestone signoff requires explicit operator approval",
  "Unresolved milestone blockers stay blocked",
  "Foundation 500 milestone identity",
  "Checkpoint docs status"
)
$plainEnglish = @(
  "milestone groups",
  "foundation coverage checklist",
  "live-capable review lane checklist",
  "Beta 2 readiness checklist",
  "denied milestone actions",
  "unresolved milestone blockers",
  "first real daily workflow candidate route",
  "release readiness dashboard route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced milestone details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 500 CodexForge Foundation 500 Milestone Review" `
  -ScriptFile "smoke-codexforge-foundation-500-milestone-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CodexForgeFoundation500MilestoneReviewPanel" `
  -CommandLabel "Go to CodexForge Foundation 500 Milestone Review" `
  -Modules @("codexforge-foundation-500-milestone-review-types.ts","codexforge-foundation-500-milestone-review-summary.ts","index.ts") `
  -Components @("CodexForgeFoundation500MilestoneReviewPanel.tsx","index.ts") `
  -Exports @("buildCodexForgeFoundation500MilestoneReviewStableKey","buildCodexForgeFoundation500MilestoneReview","buildCodexForgeFoundation500MilestoneReviews","buildCodexForgeFoundation500MilestoneReviewBoundary","buildCodexForgeFoundation500MilestoneReviewModel","summarizeCodexForgeFoundation500MilestoneReview","CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/release-readiness-dashboard","/first-real-daily-workflow-candidate","/review-inbox-final-consolidation","/codexforge-beta-2-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Foundation 500 Milestone Review smoke passed."
