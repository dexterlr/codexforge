param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1616 Domain Artifact Plan Preview" `
  -ScriptFile "smoke-codexforge-domain-artifact-plan-preview.ps1" `
  -Domain "src\lib\codexforge\domain-artifact-plan-preview" `
  -Route "src\app\domain-artifact-plan-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Artifact Plan Preview" `
  -RouteHref "/domain-artifact-plan-preview" `
  -Markers @("Domain artifact plan preview", "Domain artifact plan preview does not write files from the UI", "Domain artifact plan preview requires explicit operator approval", "Domain artifact plan preview shows planned configs docs scripts specs assets reports journals and generated artifacts as review-only items", "Denied domain artifact paths remain blocked", "Domain artifact plan checklist")
