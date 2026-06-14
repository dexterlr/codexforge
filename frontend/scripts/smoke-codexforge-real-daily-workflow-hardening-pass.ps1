param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\real-daily-workflow-hardening-pass"
$route = "src\app\real-daily-workflow-hardening-pass"
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
  "Real daily workflow hardening pass",
  "Real daily workflow hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "Unresolved hardening blockers stay blocked",
  "Hardening groups",
  "Approval safety readiness checklist"
)
$plainEnglish = @(
  "real daily workflow hardening identity",
  "evidence result recovery readiness status",
  "denied hardening actions",
  "unresolved hardening blockers",
  "multi-workflow trial plan route",
  "release readiness dashboard route",
  "next recommended action",
  "no live workflow launch",
  "no real daily workflow launch",
  "no release approval automation",
  "no milestone auto-signoff",
  "advanced hardening details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 505 Real Daily Workflow Hardening Pass" `
  -ScriptFile "smoke-codexforge-real-daily-workflow-hardening-pass.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RealDailyWorkflowHardeningPassPanel" `
  -CommandLabel "Go to Real Daily Workflow Hardening Pass" `
  -Modules @("real-daily-workflow-hardening-pass-types.ts","real-daily-workflow-hardening-pass-summary.ts","index.ts") `
  -Components @("RealDailyWorkflowHardeningPassPanel.tsx","index.ts") `
  -Exports @("buildRealDailyWorkflowHardeningPassStableKey","buildRealDailyWorkflowHardeningPass","buildRealDailyWorkflowHardeningPasses","buildRealDailyWorkflowHardeningPassBoundary","buildRealDailyWorkflowHardeningPassModel","summarizeRealDailyWorkflowHardeningPass","REAL_DAILY_WORKFLOW_HARDENING_PASS_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExtraRoutes @("/real-daily-workflow-evidence-review","/real-daily-workflow-result-review","/real-daily-workflow-recovery-review","/release-readiness-dashboard")

& (Join-Path $PSScriptRoot "codexforge-unified-final-review-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers `
  -AdditionalMarkers $plainEnglish `
  -SourceMarkerFallback $deterministicMarkerFallback `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Real Daily Workflow Hardening Pass smoke passed."
