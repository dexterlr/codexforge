param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1627 Front Goal Composer Preview" `
  -ScriptFile "smoke-codexforge-front-goal-composer-preview.ps1" `
  -Domain "src\lib\codexforge\front-goal-composer-preview" `
  -Route "src\app\front-goal-composer-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Front Goal Composer Preview" `
  -RouteHref "/front-goal-composer-preview" `
  -Markers @("Front goal composer preview", "Front goal composer preview does not send prompts or create jobs from the UI", "Front goal composer preview requires explicit operator approval", "Front goal composer preview helps users start with a goal choose domain hints define done criteria risk level artifacts commands evidence and recovery needs", "Denied front goal composer paths remain blocked", "Front goal composer checklist")
