param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1383 Rollback Readiness Preview" `
  -ScriptFile "smoke-codexforge-rollback-readiness-preview.ps1" `
  -Domain "src\lib\codexforge\rollback-readiness-preview" `
  -Route "src\app\rollback-readiness-preview" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Rollback Readiness Preview" `
  -RouteHref "/rollback-readiness-preview" `
  -Markers @("Rollback readiness preview", "Rollback readiness preview does not execute rollback", "Rollback readiness preview requires explicit operator approval", "Rollback readiness preview checks snapshot availability diff reversibility touched files risk notes evidence references and audit references", "Rollback execution remains blocked", "Rollback readiness checklist")
