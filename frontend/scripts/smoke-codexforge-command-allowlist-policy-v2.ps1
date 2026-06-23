param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1499 Command Allowlist Policy v2" `
  -ScriptFile "smoke-codexforge-command-allowlist-policy-v2.ps1" `
  -Domain "src\lib\codexforge\command-allowlist-policy-v2" `
  -Route "src\app\command-allowlist-policy-v2" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Command Allowlist Policy v2" `
  -RouteHref "/command-allowlist-policy-v2" `
  -Markers @("Command allowlist policy v2", "Command allowlist policy v2 does not execute allowlisted commands from the UI", "Command allowlist policy v2 requires explicit operator approval", "Command allowlist policy v2 defines review-only allowed command families denied command families and backend-owned enforcement", "Denied command allowlist paths remain blocked", "Command allowlist policy checklist")
