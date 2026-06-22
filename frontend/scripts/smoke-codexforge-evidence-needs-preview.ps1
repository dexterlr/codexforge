param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1411 Evidence Needs Preview" `
  -ScriptFile "smoke-codexforge-evidence-needs-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-needs-preview" `
  -Route "src\app\evidence-needs-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Evidence Needs Preview" `
  -RouteHref "/evidence-needs-preview" `
  -Markers @("Evidence needs preview", "Evidence needs preview does not persist evidence from the UI", "Evidence needs preview requires explicit operator approval", "Evidence needs preview lists project map evidence command evidence diff evidence approval evidence result evidence audit evidence and recovery evidence", "Denied evidence needs paths remain blocked", "Evidence needs checklist")
