param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1237 Local Change Audit Preview" `
  -ScriptFile "smoke-codexforge-local-change-audit-preview.ps1" `
  -Domain "src\lib\codexforge\local-change-audit-preview" `
  -Route "src\app\local-change-audit-preview" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Audit Preview" `
  -RouteHref "/local-change-audit-preview" `
  -Markers @("Local change audit preview", "Local change audit preview does not persist audit logs", "Local change audit preview requires explicit operator approval before future persistence", "Audit preview shows goal plan approval evidence result recovery and operator placeholders", "Denied local change audit paths remain blocked", "Local change audit checklist")
