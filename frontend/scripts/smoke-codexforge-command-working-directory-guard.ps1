param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1182 Command Working Directory Guard" `
  -ScriptFile "smoke-codexforge-command-working-directory-guard.ps1" `
  -Domain "src\lib\codexforge\command-working-directory-guard" `
  -Route "src\app\command-working-directory-guard" `
  -MainPanel "CommandWorkingDirectoryGuardPanel" `
  -CommandLabel "Go to Command Working Directory Guard" `
  -Modules @("command-working-directory-guard-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandWorkingDirectoryGuardStableKey", "buildCommandWorkingDirectoryGuard", "buildCommandWorkingDirectoryGuardItems", "buildCommandWorkingDirectoryGuardBoundary", "buildCommandWorkingDirectoryGuardModel", "summarizeCommandWorkingDirectoryGuard", "COMMAND_WORKING_DIRECTORY_GUARD_LANGUAGE") `
  -PhaseMarkers @("Command working directory guard", "Command working directory guard does not browse local files", "Command working directory guard requires explicit operator approval before future execution", "Working directory guard denies paths outside workspace and traversal", "Denied command working directory paths remain blocked", "Command working directory guard checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command working directory guard does not browse local files", "Command working directory guard requires explicit operator approval before future execution", "Denied command working directory paths remain blocked") `
  -RouteHref "/command-working-directory-guard"

Write-Host "[OK] CodexForge Phase 1182 Command Working Directory Guard smoke passed."
