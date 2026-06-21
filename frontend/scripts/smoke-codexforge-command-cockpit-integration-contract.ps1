param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1191 Command Cockpit Integration Contract" `
  -ScriptFile "smoke-codexforge-command-cockpit-integration-contract.ps1" `
  -Domain "src\lib\codexforge\command-cockpit-integration-contract" `
  -Route "src\app\command-cockpit-integration-contract" `
  -MainPanel "CommandCockpitIntegrationContractPanel" `
  -CommandLabel "Go to Command Cockpit Integration Contract" `
  -Modules @("command-cockpit-integration-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandCockpitIntegrationContractStableKey", "buildCommandCockpitIntegrationContract", "buildCommandCockpitIntegrationContractItems", "buildCommandCockpitIntegrationContractBoundary", "buildCommandCockpitIntegrationContractModel", "summarizeCommandCockpitIntegrationContract", "COMMAND_COCKPIT_INTEGRATION_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Command cockpit integration contract", "Command cockpit integration contract does not execute commands", "Command cockpit integration requires explicit operator approval", "Future cockpit shows goal plan command approval execution evidence result and recovery in one place", "Phase pages are dev/test surfaces only", "Command cockpit integration checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command cockpit integration contract does not execute commands", "Command cockpit integration requires explicit operator approval", "Phase pages are dev/test surfaces only") `
  -RouteHref "/command-cockpit-integration-contract"

Write-Host "[OK] CodexForge Phase 1191 Command Cockpit Integration Contract smoke passed."
