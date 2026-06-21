param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1187 Command Evidence Capture Contract" `
  -ScriptFile "smoke-codexforge-command-evidence-capture-contract.ps1" `
  -Domain "src\lib\codexforge\command-evidence-capture-contract" `
  -Route "src\app\command-evidence-capture-contract" `
  -MainPanel "CommandEvidenceCaptureContractPanel" `
  -CommandLabel "Go to Command Evidence Capture Contract" `
  -Modules @("command-evidence-capture-contract-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCommandEvidenceCaptureContractStableKey", "buildCommandEvidenceCaptureContract", "buildCommandEvidenceCaptureContractItems", "buildCommandEvidenceCaptureContractBoundary", "buildCommandEvidenceCaptureContractModel", "summarizeCommandEvidenceCaptureContract", "COMMAND_EVIDENCE_CAPTURE_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Command evidence capture contract", "Command evidence capture contract does not persist evidence", "Command evidence capture requires explicit operator approval", "Evidence contract captures stdout stderr exit code command preview working directory approval and operator placeholders", "Denied command evidence paths remain blocked", "Command evidence capture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Command evidence capture contract does not persist evidence", "Command evidence capture requires explicit operator approval", "Denied command evidence paths remain blocked") `
  -RouteHref "/command-evidence-capture-contract"

Write-Host "[OK] CodexForge Phase 1187 Command Evidence Capture Contract smoke passed."
