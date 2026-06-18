param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 743 Adapter Implementation Validation Matrix" `
  -ScriptFile "smoke-codexforge-adapter-implementation-validation-matrix.ps1" `
  -Domain "src\lib\codexforge\adapter-implementation-validation-matrix" `
  -Route "src\app\adapter-implementation-validation-matrix" `
  -MainPanel "AdapterImplementationValidationMatrixPanel" `
  -CommandLabel "Go to Adapter Implementation Validation Matrix" `
  -Modules @("adapter-implementation-validation-matrix-model.ts", "index.ts") `
  -Components @("AdapterImplementationValidationMatrixPanel.tsx", "index.ts") `
  -Exports @("buildAdapterImplementationValidationMatrixStableKey", "buildAdapterImplementationValidationMatrix", "buildAdapterImplementationValidationMatrixItems", "buildAdapterImplementationValidationMatrixBoundary", "buildAdapterImplementationValidationMatrixModel", "summarizeAdapterImplementationValidationMatrix", "ADAPTER_IMPLEMENTATION_VALIDATION_MATRIX_LANGUAGE") `
  -PhaseMarkers @("Adapter Implementation Validation Matrix", "Adapter implementation validation matrix does not run validation from UI", "Validation execution requires explicit operator approval", "Smokes", "Build", "Repo hygiene", "Route coverage", "Command UI simplification", "Checkpoint docs", "Server smoke") `
  -PlainEnglish @("Adapter Implementation Validation Matrix identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "validation execution is not implemented yet") `
  -RouteHref "/adapter-implementation-validation-matrix"

Write-Host "[OK] CodexForge Phase 743 adapter implementation validation matrix smoke passed."
