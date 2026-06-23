param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1503 Command Timeout Cancellation Guard" `
  -ScriptFile "smoke-codexforge-command-timeout-cancellation-guard.ps1" `
  -Domain "src\lib\codexforge\command-timeout-cancellation-guard" `
  -Route "src\app\command-timeout-cancellation-guard" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Timeout Cancellation Guard" `
  -RouteHref "/command-timeout-cancellation-guard" `
  -Markers @("Command timeout cancellation guard", "Command timeout cancellation guard does not start or cancel processes from the UI", "Command timeout cancellation guard requires explicit operator approval", "Command timeout cancellation guard previews timeout limits cancellation boundaries manual stop and backend-owned process control", "Denied command timeout cancellation paths remain blocked", "Command timeout cancellation checklist")
