param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1188 Command Result Capture Contract" `
  -ScriptFile "smoke-codexforge-command-result-capture-contract.ps1" `
  -Domain "src\lib\codexforge\command-result-capture-contract" `
  -Route "src\app\command-result-capture-contract" `
  -MainPanel "CommandResultCaptureContractPanel" `
  -CommandLabel "Go to Command Result Capture Contract" `
  -Modules @("command-result-capture-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandResultCaptureContractStableKey", "buildCommandResultCaptureContract", "buildCommandResultCaptureContractItems", "buildCommandResultCaptureContractBoundary", "buildCommandResultCaptureContractModel", "summarizeCommandResultCaptureContract", "COMMAND_RESULT_CAPTURE_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Command result capture contract", "Command result capture contract does not persist results", "Command result capture requires explicit operator approval", "Result contract supports success denied blocked failed timeout and needs-review states", "Denied command result paths remain blocked", "Command result capture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command result capture contract does not persist results", "Command result capture requires explicit operator approval", "Denied command result paths remain blocked") `
  -RouteHref "/command-result-capture-contract"

Write-Host "[OK] CodexForge Phase 1188 Command Result Capture Contract smoke passed."
