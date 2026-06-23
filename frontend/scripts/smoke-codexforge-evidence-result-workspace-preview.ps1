param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1634 Evidence Result Workspace Preview" `
  -ScriptFile "smoke-codexforge-evidence-result-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-result-workspace-preview" `
  -Route "src\app\evidence-result-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Evidence Result Workspace Preview" `
  -RouteHref "/evidence-result-workspace-preview" `
  -Markers @("Evidence result workspace preview", "Evidence result workspace preview does not persist evidence or results from the UI", "Evidence result workspace preview requires backend-owned capture", "Evidence result workspace preview shows planned evidence validation outputs worker outputs result states redaction operator acceptance and audit linkage", "Denied evidence result workspace paths remain blocked", "Evidence result workspace checklist")
