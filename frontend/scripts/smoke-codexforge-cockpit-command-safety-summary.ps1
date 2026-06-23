param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1511 Cockpit Command Safety Summary" `
  -ScriptFile "smoke-codexforge-cockpit-command-safety-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-command-safety-summary" `
  -Route "src\app\cockpit-command-safety-summary" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Cockpit Command Safety Summary" `
  -RouteHref "/cockpit-command-safety-summary" `
  -Markers @("Cockpit command safety summary", "Cockpit command safety summary keeps the cockpit as the normal user surface", "Cockpit command safety summary does not run commands from the cockpit", "Cockpit command safety summary shows command allowlist arguments working directory environment timeout cancel stdout stderr exit code denied commands evidence and result", "Phase pages remain dev test diagnostics only", "Cockpit command safety checklist")
