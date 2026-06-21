param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1181 Command Argument Guard" `
  -ScriptFile "smoke-codexforge-command-argument-guard.ps1" `
  -Domain "src\lib\codexforge\command-argument-guard" `
  -Route "src\app\command-argument-guard" `
  -MainPanel "CommandArgumentGuardPanel" `
  -CommandLabel "Go to Command Argument Guard" `
  -Modules @("command-argument-guard-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandArgumentGuardStableKey", "buildCommandArgumentGuard", "buildCommandArgumentGuardItems", "buildCommandArgumentGuardBoundary", "buildCommandArgumentGuardModel", "summarizeCommandArgumentGuard", "COMMAND_ARGUMENT_GUARD_LANGUAGE") `
  -PhaseMarkers @("Command argument guard", "Command argument guard does not execute arguments", "Command argument guard requires explicit operator approval before future execution", "Argument guard denies secrets chaining redirection background launch and unsafe flags", "Denied command argument paths remain blocked", "Command argument guard checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command argument guard does not execute arguments", "Command argument guard requires explicit operator approval before future execution", "Denied command argument paths remain blocked") `
  -RouteHref "/command-argument-guard"

Write-Host "[OK] CodexForge Phase 1181 Command Argument Guard smoke passed."
