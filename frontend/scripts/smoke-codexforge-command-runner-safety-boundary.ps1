param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1498 Command Runner Safety Boundary" `
  -ScriptFile "smoke-codexforge-command-runner-safety-boundary.ps1" `
  -Domain "src\lib\codexforge\command-runner-safety-boundary" `
  -Route "src\app\command-runner-safety-boundary" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Runner Safety Boundary" `
  -RouteHref "/command-runner-safety-boundary" `
  -Markers @("Command runner safety boundary", "Command runner safety boundary does not run commands from the UI", "Command runner safety requires explicit operator approval before execution", "Command runner safety prepares backend-owned guarded command execution without broad execution", "Denied command runner safety paths remain blocked", "Command runner safety checklist")
