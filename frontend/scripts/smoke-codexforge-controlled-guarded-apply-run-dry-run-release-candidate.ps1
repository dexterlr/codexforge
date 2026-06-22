param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1353 Controlled Guarded Apply Run Dry-Run Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-guarded-apply-run-dry-run-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-guarded-apply-run-dry-run-release-candidate" `
  -Route "src\app\controlled-guarded-apply-run-dry-run-release-candidate" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Controlled Guarded Apply Run Dry-Run Release Candidate" `
  -RouteHref "/controlled-guarded-apply-run-dry-run-release-candidate" `
  -Markers @("Controlled guarded apply run dry-run release candidate", "Controlled guarded apply run dry-run release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery", "Controlled guarded apply run dry-run release requires explicit operator approval", "Release candidate prepares CodexForge for future backend-owned guarded apply and run without executing it", "Denied controlled guarded apply run dry-run paths remain blocked", "Controlled guarded apply run dry-run release checklist")
