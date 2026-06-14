param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\first-real-daily-workflow-candidate"
$route = "src\app\first-real-daily-workflow-candidate"
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
  "First real daily workflow candidate",
  "First real daily workflow candidate does not execute workflows",
  "Real daily workflow actions require explicit operator approval",
  "Unapproved workflow paths remain blocked",
  "Workflow stage groups",
  "Provider local connector automation handoff checklist"
)
$plainEnglish = @(
  "first real daily workflow identity",
  "operator task checklist",
  "approval gate checklist",
  "evidence capture checklist",
  "denied workflow actions",
  "blocked workflow risks",
  "real daily workflow evidence review route",
  "real daily workflow result review route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced workflow details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 501 First Real Daily Workflow Candidate" `
  -ScriptFile "smoke-codexforge-first-real-daily-workflow-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "FirstRealDailyWorkflowCandidatePanel" `
  -CommandLabel "Go to First Real Daily Workflow Candidate" `
  -Modules @("first-real-daily-workflow-candidate-types.ts","first-real-daily-workflow-candidate-summary.ts","index.ts") `
  -Components @("FirstRealDailyWorkflowCandidatePanel.tsx","index.ts") `
  -Exports @("buildFirstRealDailyWorkflowCandidateStableKey","buildFirstRealDailyWorkflowCandidate","buildFirstRealDailyWorkflowCandidates","buildFirstRealDailyWorkflowCandidateBoundary","buildFirstRealDailyWorkflowCandidateModel","summarizeFirstRealDailyWorkflowCandidate","FIRST_REAL_DAILY_WORKFLOW_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/real-daily-workflow-evidence-review","/real-daily-workflow-result-review","/release-readiness-dashboard","/codexforge-foundation-500-milestone-review")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge First Real Daily Workflow Candidate smoke passed."
