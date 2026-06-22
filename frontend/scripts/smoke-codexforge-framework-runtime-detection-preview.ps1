param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1405 Framework Runtime Detection Preview" `
  -ScriptFile "smoke-codexforge-framework-runtime-detection-preview.ps1" `
  -Domain "src\lib\codexforge\framework-runtime-detection-preview" `
  -Route "src\app\framework-runtime-detection-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Framework Runtime Detection Preview" `
  -RouteHref "/framework-runtime-detection-preview" `
  -Markers @("Framework runtime detection preview", "Framework runtime detection preview does not execute runtime probes", "Framework runtime detection preview requires explicit operator approval", "Framework runtime detection previews Next React TypeScript Node package manager and local runtime hints without starting runtimes", "Denied framework runtime detection paths remain blocked", "Framework runtime detection checklist")
