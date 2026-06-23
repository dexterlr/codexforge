param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1630 Generated Plan Workspace Preview" `
  -ScriptFile "smoke-codexforge-generated-plan-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\generated-plan-workspace-preview" `
  -Route "src\app\generated-plan-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Generated Plan Workspace Preview" `
  -RouteHref "/generated-plan-workspace-preview" `
  -Markers @("Generated plan workspace preview", "Generated plan workspace preview does not execute plans", "Generated plan workspace preview requires explicit operator approval", "Generated plan workspace preview shows domain steps assumptions risks files command families approval gates evidence result audit recovery and hold-before-execution", "Denied generated plan workspace paths remain blocked", "Generated plan workspace checklist")
