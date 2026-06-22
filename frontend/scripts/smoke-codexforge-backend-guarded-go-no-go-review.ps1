param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-guarded-apply-run-smoke-helper.ps1") `
  -SmokeName "Phase 1335 Backend Guarded Go No-Go Review" `
  -ScriptFile "smoke-codexforge-backend-guarded-go-no-go-review.ps1" `
  -Domain "src\lib\codexforge\backend-guarded-go-no-go-review" `
  -Route "src\app\backend-guarded-go-no-go-review" `
  -MainPanel "BackendGuardedApplyRunRoutePanel" `
  -CommandLabel "Go to Backend Guarded Go No Go Review" `
  -RouteHref "/backend-guarded-go-no-go-review" `
  -Markers @("Backend guarded go no-go review", "Backend guarded go no-go review does not release execution", "Backend guarded go no-go review requires explicit operator approval", "Go no-go review reports preview-only status blocked apply run and required future backend guards", "Denied backend guarded go no-go paths remain blocked", "Backend guarded go no-go checklist")
