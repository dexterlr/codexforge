param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1236 Local Change Recovery Preview" `
  -ScriptFile "smoke-codexforge-local-change-recovery-preview.ps1" `
  -Domain "src\lib\codexforge\local-change-recovery-preview" `
  -Route "src\app\local-change-recovery-preview" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Recovery Preview" `
  -RouteHref "/local-change-recovery-preview" `
  -Markers @("Local change recovery preview", "Local change recovery preview does not execute recovery", "Local change recovery preview requires explicit operator approval before future recovery", "Recovery preview shows rollback retry stop restore and explain-failure options", "Denied local change recovery paths remain blocked", "Local change recovery checklist")
