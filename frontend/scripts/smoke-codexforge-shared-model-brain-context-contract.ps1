param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 842 Shared Model Brain Context Contract" `
  -ScriptFile "smoke-codexforge-shared-model-brain-context-contract.ps1" `
  -Domain "src\lib\codexforge\shared-model-brain-context-contract" `
  -Route "src\app\shared-model-brain-context-contract" `
  -MainPanel "SharedModelBrainContextContractPanel" `
  -CommandLabel "Go to Shared Model Brain Context Contract" `
  -Modules @("shared-model-brain-context-contract-model.ts", "index.ts") `
  -Components @("SharedModelBrainContextContractPanel.tsx", "index.ts") `
  -Exports @("buildSharedModelBrainContextContractStableKey", "buildSharedModelBrainContextContract", "buildSharedModelBrainContextContractItems", "buildSharedModelBrainContextContractBoundary", "buildSharedModelBrainContextContractModel", "summarizeSharedModelBrainContextContract", "SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_LANGUAGE") `
  -PhaseMarkers @("Shared model brain context contract", "Shared model brain context contract does not call models", "CodexForge owns the shared brain context", "Models are workers not isolated brains", "Shared context requires explicit operator approval", "Shared brain context checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Shared model brain context contract does not call models", "CodexForge owns the shared brain context", "Shared context requires explicit operator approval") `
  -RouteHref "/shared-model-brain-context-contract"

Write-Host "[OK] CodexForge Phase 842 Shared model brain context contract smoke passed."
