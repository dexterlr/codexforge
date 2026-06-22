param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1413 Recovery Implication Preview" `
  -ScriptFile "smoke-codexforge-recovery-implication-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-implication-preview" `
  -Route "src\app\recovery-implication-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Recovery Implication Preview" `
  -RouteHref "/recovery-implication-preview" `
  -Markers @("Recovery implication preview", "Recovery implication preview does not execute recovery", "Recovery implication preview requires explicit operator approval", "Recovery implication preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery implications", "Denied recovery implication paths remain blocked", "Recovery implication checklist")
