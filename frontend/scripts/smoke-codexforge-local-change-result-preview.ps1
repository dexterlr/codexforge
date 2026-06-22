param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1235 Local Change Result Preview" `
  -ScriptFile "smoke-codexforge-local-change-result-preview.ps1" `
  -Domain "src\lib\codexforge\local-change-result-preview" `
  -Route "src\app\local-change-result-preview" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Result Preview" `
  -RouteHref "/local-change-result-preview" `
  -Markers @("Local change result preview", "Local change result preview does not persist results", "Local change result preview requires explicit operator approval before future persistence", "Result preview shows success denied blocked failed timeout and needs-review states", "Denied local change result paths remain blocked", "Local change result checklist")
