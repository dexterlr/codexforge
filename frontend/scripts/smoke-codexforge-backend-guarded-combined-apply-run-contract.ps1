param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1325 Backend Guarded Combined Apply Run Contract" `
  -ScriptFile "smoke-codexforge-backend-guarded-combined-apply-run-contract.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-combined-apply-run-contract" `
  -Route "src\app\backend-guarded-combined-apply-run-contract" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Combined Apply Run Contract" `
  -RouteHref "/backend-guarded-combined-apply-run-contract" `
  -Markers @("Backend guarded combined apply run contract", "Backend guarded combined apply run contract does not write files or run commands", "Backend guarded combined apply run requires explicit operator approval", "Combined contract defines apply then run ordering evidence chaining result capture queue state and recovery requirements", "Denied backend guarded combined apply run paths remain blocked", "Backend guarded combined apply run checklist")
