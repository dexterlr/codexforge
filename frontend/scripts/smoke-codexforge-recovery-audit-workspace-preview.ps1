param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1635 Recovery Audit Workspace Preview" `
  -ScriptFile "smoke-codexforge-recovery-audit-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-audit-workspace-preview" `
  -Route "src\app\recovery-audit-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Recovery Audit Workspace Preview" `
  -RouteHref "/recovery-audit-workspace-preview" `
  -Markers @("Recovery audit workspace preview", "Recovery audit workspace preview does not execute rollback retry restore stop or recovery from the UI", "Recovery audit workspace preview requires explicit operator approval", "Recovery audit workspace preview shows recovery plan rollback artifacts restore snapshots retry validation explain failure safety stop audit continuity and operator timeline", "Denied recovery audit workspace paths remain blocked", "Recovery audit workspace checklist")
