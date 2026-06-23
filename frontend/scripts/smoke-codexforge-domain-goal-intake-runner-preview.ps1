param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1612 Domain Goal Intake Runner Preview" `
  -ScriptFile "smoke-codexforge-domain-goal-intake-runner-preview.ps1" `
  -Domain "src\lib\codexforge\domain-goal-intake-runner-preview" `
  -Route "src\app\domain-goal-intake-runner-preview" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Domain Goal Intake Runner Preview" `
  -RouteHref "/domain-goal-intake-runner-preview" `
  -Markers @("Domain goal intake runner preview", "Domain goal intake runner preview does not send prompts or create jobs from the UI", "Domain goal intake runner preview requires explicit operator approval", "Domain goal intake runner preview captures user goal domain hints done criteria risk level artifacts commands evidence and recovery needs", "Denied domain goal intake paths remain blocked", "Domain goal intake runner checklist")
