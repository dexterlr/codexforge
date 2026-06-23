param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1506 Shell Escalation Denial" `
  -ScriptFile "smoke-codexforge-shell-escalation-denial.ps1" `
  -Domain "src\lib\codexforge\shell-escalation-denial" `
  -Route "src\app\shell-escalation-denial" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Shell Escalation Denial" `
  -RouteHref "/shell-escalation-denial" `
  -Markers @("Shell escalation denial", "Shell escalation denial does not execute shell commands from the UI", "Shell escalation denial requires explicit operator approval", "Shell escalation denial blocks chained shell operators subshells pipes redirection encoded execution privilege escalation and arbitrary shell entry", "Denied shell escalation paths remain blocked", "Shell escalation denial checklist")
