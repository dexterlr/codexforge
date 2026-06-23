param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1510 Command Result Packet" `
  -ScriptFile "smoke-codexforge-command-result-packet.ps1" `
  -Domain "src\lib\codexforge\command-result-packet" `
  -Route "src\app\command-result-packet" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Result Packet" `
  -RouteHref "/command-result-packet" `
  -Markers @("Command result packet", "Command result packet does not persist results from the UI", "Command result packet requires backend-owned result capture", "Command result packet previews success blocked denied failed timeout canceled manual-review retryable recovered and operator-accepted command outcomes", "Denied command result paths remain blocked", "Command result checklist")
