param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1234 Local Change Evidence Preview" `
  -ScriptFile "smoke-codexforge-local-change-evidence-preview.ps1" `
  -Domain "src\lib\codexforge\local-change-evidence-preview" `
  -Route "src\app\local-change-evidence-preview" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Evidence Preview" `
  -RouteHref "/local-change-evidence-preview" `
  -Markers @("Local change evidence preview", "Local change evidence preview does not persist evidence", "Local change evidence preview requires explicit operator approval before future persistence", "Evidence preview shows file diff command stdout stderr exit code approval and operator placeholders", "Denied local change evidence paths remain blocked", "Local change evidence checklist")
