param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1633 Artifact Command Workspace Preview" `
  -ScriptFile "smoke-codexforge-artifact-command-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\artifact-command-workspace-preview" `
  -Route "src\app\artifact-command-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Artifact Command Workspace Preview" `
  -RouteHref "/artifact-command-workspace-preview" `
  -Markers @("Artifact command workspace preview", "Artifact command workspace preview does not write files or run commands from the UI", "Artifact command workspace preview requires explicit operator approval", "Artifact command workspace preview shows planned artifacts configs docs scripts reports command families validation commands and denied execution paths", "Denied artifact command workspace paths remain blocked", "Artifact command workspace checklist")
