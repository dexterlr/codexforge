param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1185 Command Preflight Review" `
  -ScriptFile "smoke-codexforge-command-preflight-review.ps1" `
  -Domain "src\lib\codexforge\command-preflight-review" `
  -Route "src\app\command-preflight-review" `
  -MainPanel "CommandPreflightReviewPanel" `
  -CommandLabel "Go to Command Preflight Review" `
  -Modules @("command-preflight-review-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandPreflightReviewStableKey", "buildCommandPreflightReview", "buildCommandPreflightReviewItems", "buildCommandPreflightReviewBoundary", "buildCommandPreflightReviewModel", "summarizeCommandPreflightReview", "COMMAND_PREFLIGHT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Command preflight review", "Command preflight review does not execute commands", "Command preflight review requires explicit operator approval", "Preflight reviews gate allowlist arguments working directory environment timeout evidence result and recovery readiness", "Denied command preflight paths remain blocked", "Command preflight checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command preflight review does not execute commands", "Command preflight review requires explicit operator approval", "Denied command preflight paths remain blocked") `
  -RouteHref "/command-preflight-review"

Write-Host "[OK] CodexForge Phase 1185 Command Preflight Review smoke passed."
