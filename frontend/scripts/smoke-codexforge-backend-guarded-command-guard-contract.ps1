param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1327 Backend Guarded Command Guard Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-command-guard-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-command-guard-contract" `
  -Route "src\app\backend-guarded-command-guard-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Command Guard Contract" `
  -RouteHref "/backend-guarded-command-guard-contract" `
  -Markers @("Backend guarded command guard contract", "Backend guarded command guard contract does not run commands", "Backend guarded command guard requires explicit operator approval", "Command guard contract defines allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture", "Denied backend guarded command guard paths remain blocked", "Backend guarded command guard checklist")
