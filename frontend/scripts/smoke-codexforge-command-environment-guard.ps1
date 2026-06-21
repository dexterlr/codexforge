param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1183 Command Environment Guard" `
  -ScriptFile "smoke-codexforge-command-environment-guard.ps1" `
  -Domain "src\lib\codexforge\command-environment-guard" `
  -Route "src\app\command-environment-guard" `
  -MainPanel "CommandEnvironmentGuardPanel" `
  -CommandLabel "Go to Command Environment Guard" `
  -Modules @("command-environment-guard-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandEnvironmentGuardStableKey", "buildCommandEnvironmentGuard", "buildCommandEnvironmentGuardItems", "buildCommandEnvironmentGuardBoundary", "buildCommandEnvironmentGuardModel", "summarizeCommandEnvironmentGuard", "COMMAND_ENVIRONMENT_GUARD_LANGUAGE") `
  -PhaseMarkers @("Command environment guard", "Command environment guard does not read env values", "Command environment guard requires explicit operator approval before future execution", "Environment guard shows variable names only and denies process.env printing", "Denied command environment paths remain blocked", "Command environment guard checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command environment guard does not read env values", "Command environment guard requires explicit operator approval before future execution", "Denied command environment paths remain blocked") `
  -RouteHref "/command-environment-guard"

Write-Host "[OK] CodexForge Phase 1183 Command Environment Guard smoke passed."
