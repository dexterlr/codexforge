param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 775 Adapter Execution Validation Packet" `
  -ScriptFile "smoke-codexforge-adapter-execution-validation-packet.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-validation-packet" `
  -Route "src\app\adapter-execution-validation-packet" `
  -MainPanel "AdapterExecutionValidationPacketPanel" `
  -CommandLabel "Go to Adapter Execution Validation Packet" `
  -Modules @("adapter-execution-validation-packet-model.ts", "index.ts") `
  -Components @("AdapterExecutionValidationPacketPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionValidationPacketStableKey", "buildAdapterExecutionValidationPacket", "buildAdapterExecutionValidationPacketItems", "buildAdapterExecutionValidationPacketBoundary", "buildAdapterExecutionValidationPacketModel", "summarizeAdapterExecutionValidationPacket", "ADAPTER_EXECUTION_VALIDATION_PACKET_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Validation Packet", "Adapter execution validation packet does not run validation from UI", "Validation execution requires explicit operator approval", "validation packet fields", "smokes", "build", "repo hygiene", "route coverage", "command UI simplification", "checkpoint docs", "server smoke", "evidence/result links") `
  -PlainEnglish @("Adapter Execution Validation Packet identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not run validation from UI") `
  -RouteHref "/adapter-execution-validation-packet"

Write-Host "[OK] CodexForge Phase 775 adapter execution validation packet smoke passed."
