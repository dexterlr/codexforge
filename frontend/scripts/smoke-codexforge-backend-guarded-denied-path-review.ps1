param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1334 Backend Guarded Denied Path Review" `
  -ScriptFile "smoke-codexforge-backend-guarded-denied-path-review.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-denied-path-review" `
  -Route "src\app\backend-guarded-denied-path-review" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Denied Path Review" `
  -RouteHref "/backend-guarded-denied-path-review" `
  -Markers @("Backend guarded denied path review", "Backend guarded denied path review does not mutate workflow state", "Backend guarded denied path review requires explicit operator approval", "Denied path review lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution", "Denied backend guarded paths remain blocked", "Backend guarded denied path checklist")
