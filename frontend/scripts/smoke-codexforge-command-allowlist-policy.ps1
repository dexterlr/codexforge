param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1180 Command Allowlist Policy" `
  -ScriptFile "smoke-codexforge-command-allowlist-policy.ps1" `
  -Domain "src\lib\codexforge\command-allowlist-policy" `
  -Route "src\app\command-allowlist-policy" `
  -MainPanel "CommandAllowlistPolicyPanel" `
  -CommandLabel "Go to Command Allowlist Policy" `
  -Modules @("command-allowlist-policy-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandAllowlistPolicyStableKey", "buildCommandAllowlistPolicy", "buildCommandAllowlistPolicyItems", "buildCommandAllowlistPolicyBoundary", "buildCommandAllowlistPolicyModel", "summarizeCommandAllowlistPolicy", "COMMAND_ALLOWLIST_POLICY_LANGUAGE") `
  -PhaseMarkers @("Command allowlist policy", "Command allowlist policy does not execute commands", "Command allowlist policy requires explicit operator approval before future command execution", "Allowlist policy denies destructive package install git mutation deploy arbitrary script shell chaining redirection background and unknown executable commands", "Denied command allowlist paths remain blocked", "Command allowlist checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command allowlist policy does not execute commands", "Command allowlist policy requires explicit operator approval before future command execution", "Denied command allowlist paths remain blocked") `
  -RouteHref "/command-allowlist-policy"

Write-Host "[OK] CodexForge Phase 1180 Command Allowlist Policy smoke passed."
