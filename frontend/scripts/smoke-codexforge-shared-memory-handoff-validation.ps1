param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 902 Shared Memory Handoff Validation" `
  -ScriptFile "smoke-codexforge-shared-memory-handoff-validation.ps1" `
  -Domain "src\lib\codexforge\shared-memory-handoff-validation" `
  -Route "src\app\shared-memory-handoff-validation" `
  -MainPanel "SharedMemoryHandoffValidationPanel" `
  -CommandLabel "Go to Shared Memory Handoff Validation" `
  -Modules @("shared-memory-handoff-validation-model.ts", "index.ts") `
  -Components @("SharedMemoryHandoffValidationPanel.tsx", "index.ts") `
  -Exports @("buildSharedMemoryHandoffValidationStableKey", "buildSharedMemoryHandoffValidation", "buildSharedMemoryHandoffValidationItems", "buildSharedMemoryHandoffValidationBoundary", "buildSharedMemoryHandoffValidationModel", "summarizeSharedMemoryHandoffValidation", "SHARED_MEMORY_HANDOFF_VALIDATION_LANGUAGE") `
  -PhaseMarkers @("Shared memory handoff validation", "Shared memory handoff validation does not promote memory", "Memory handoff validation requires explicit operator approval", "Model handoffs use shared CodexForge memory", "Denied memory handoff paths remain blocked", "Shared memory handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Shared memory handoff validation does not promote memory", "Memory handoff validation requires explicit operator approval", "Denied memory handoff paths remain blocked") `
  -RouteHref "/shared-memory-handoff-validation"

Write-Host "[OK] CodexForge Phase 902 Shared memory handoff validation smoke passed."

