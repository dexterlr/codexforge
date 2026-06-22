param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1408 Command Candidate Preview" `
  -ScriptFile "smoke-codexforge-command-candidate-preview.ps1" `
  -Domain "src\lib\codexforge\command-candidate-preview" `
  -Route "src\app\command-candidate-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Command Candidate Preview" `
  -RouteHref "/command-candidate-preview" `
  -Markers @("Command candidate preview", "Command candidate preview does not run commands", "Command candidate preview requires explicit operator approval", "Command candidate preview lists likely build smoke validation and hygiene commands as review-only candidates", "Denied command candidate paths remain blocked", "Command candidate checklist")
