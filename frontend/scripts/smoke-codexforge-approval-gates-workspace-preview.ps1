param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1632 Approval Gates Workspace Preview" `
  -ScriptFile "smoke-codexforge-approval-gates-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\approval-gates-workspace-preview" `
  -Route "src\app\approval-gates-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Approval Gates Workspace Preview" `
  -RouteHref "/approval-gates-workspace-preview" `
  -Markers @("Approval gates workspace preview", "Approval gates workspace preview does not persist approvals from the UI", "Approval gates workspace preview requires explicit human approval", "Approval gates workspace preview shows domain scope worker scope model scope provider scope command scope artifact scope risk level expiry replay protection and operator confirmation", "Denied approval gates workspace paths remain blocked", "Approval gates workspace checklist")
