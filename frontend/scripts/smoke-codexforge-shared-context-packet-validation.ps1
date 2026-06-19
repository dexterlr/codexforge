param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 901 Shared Context Packet Validation" `
  -ScriptFile "smoke-codexforge-shared-context-packet-validation.ps1" `
  -Domain "src\lib\codexforge\shared-context-packet-validation" `
  -Route "src\app\shared-context-packet-validation" `
  -MainPanel "SharedContextPacketValidationPanel" `
  -CommandLabel "Go to Shared Context Packet Validation" `
  -Modules @("shared-context-packet-validation-model.ts", "index.ts") `
  -Components @("SharedContextPacketValidationPanel.tsx", "index.ts") `
  -Exports @("buildSharedContextPacketValidationStableKey", "buildSharedContextPacketValidation", "buildSharedContextPacketValidationItems", "buildSharedContextPacketValidationBoundary", "buildSharedContextPacketValidationModel", "summarizeSharedContextPacketValidation", "SHARED_CONTEXT_PACKET_VALIDATION_LANGUAGE") `
  -PhaseMarkers @("Shared context packet validation", "Shared context packet validation does not send prompts", "Context packet validation requires explicit operator approval", "Context packets preserve shared CodexForge brain state", "Denied context validation paths remain blocked", "Shared context validation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Shared context packet validation does not send prompts", "Context packet validation requires explicit operator approval", "Denied context validation paths remain blocked") `
  -RouteHref "/shared-context-packet-validation"

Write-Host "[OK] CodexForge Phase 901 Shared context packet validation smoke passed."

