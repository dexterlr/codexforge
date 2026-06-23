param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1507 Dangerous Command Denial" `
  -ScriptFile "smoke-codexforge-dangerous-command-denial.ps1" `
  -Domain "src\lib\codexforge\dangerous-command-denial" `
  -Route "src\app\dangerous-command-denial" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Dangerous Command Denial" `
  -RouteHref "/dangerous-command-denial" `
  -Markers @("Dangerous command denial", "Dangerous command denial does not run denied commands", "Dangerous command denial requires explicit operator approval", "Dangerous command denial blocks destructive filesystem commands credential access network exfiltration process killing service control registry mutation and unsafe git operations", "Denied dangerous command paths remain blocked", "Dangerous command denial checklist")
