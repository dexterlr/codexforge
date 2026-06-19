param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 843 Shared Model Memory Access Preview" `
  -ScriptFile "smoke-codexforge-shared-model-memory-access-preview.ps1" `
  -Domain "src\lib\codexforge\shared-model-memory-access-preview" `
  -Route "src\app\shared-model-memory-access-preview" `
  -MainPanel "SharedModelMemoryAccessPreviewPanel" `
  -CommandLabel "Go to Shared Model Memory Access Preview" `
  -Modules @("shared-model-memory-access-preview-model.ts", "index.ts") `
  -Components @("SharedModelMemoryAccessPreviewPanel.tsx", "index.ts") `
  -Exports @("buildSharedModelMemoryAccessPreviewStableKey", "buildSharedModelMemoryAccessPreview", "buildSharedModelMemoryAccessPreviewItems", "buildSharedModelMemoryAccessPreviewBoundary", "buildSharedModelMemoryAccessPreviewModel", "summarizeSharedModelMemoryAccessPreview", "SHARED_MODEL_MEMORY_ACCESS_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Shared model memory access preview", "Shared model memory access preview does not read live memory", "Memory access requires explicit operator approval", "Models share one CodexForge memory layer", "Denied memory access paths remain blocked", "Shared memory checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Shared model memory access preview does not read live memory", "Memory access requires explicit operator approval", "Denied memory access paths remain blocked") `
  -RouteHref "/shared-model-memory-access-preview"

Write-Host "[OK] CodexForge Phase 843 Shared model memory access preview smoke passed."
