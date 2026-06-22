param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1384 Retry Readiness Preview" `
  -ScriptFile "smoke-codexforge-retry-readiness-preview.ps1" `
  -Domain "src\lib\codexforge\retry-readiness-preview" `
  -Route "src\app\retry-readiness-preview" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Retry Readiness Preview" `
  -RouteHref "/retry-readiness-preview" `
  -Markers @("Retry readiness preview", "Retry readiness preview does not execute retry", "Retry readiness preview requires explicit operator approval", "Retry readiness preview checks retry reason changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity", "Retry execution remains blocked", "Retry readiness checklist")
