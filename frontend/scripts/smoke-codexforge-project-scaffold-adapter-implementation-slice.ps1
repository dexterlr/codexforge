param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 738 Project Scaffold Adapter Implementation Slice" `
  -ScriptFile "smoke-codexforge-project-scaffold-adapter-implementation-slice.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-adapter-implementation-slice" `
  -Route "src\app\project-scaffold-adapter-implementation-slice" `
  -MainPanel "ProjectScaffoldAdapterImplementationSlicePanel" `
  -CommandLabel "Go to Project Scaffold Adapter Implementation Slice" `
  -Modules @("project-scaffold-adapter-implementation-slice-model.ts", "index.ts") `
  -Components @("ProjectScaffoldAdapterImplementationSlicePanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldAdapterImplementationSliceStableKey", "buildProjectScaffoldAdapterImplementationSlice", "buildProjectScaffoldAdapterImplementationSliceItems", "buildProjectScaffoldAdapterImplementationSliceBoundary", "buildProjectScaffoldAdapterImplementationSliceModel", "summarizeProjectScaffoldAdapterImplementationSlice", "PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_SLICE_LANGUAGE") `
  -PhaseMarkers @("Project Scaffold Adapter Implementation Slice", "Project scaffold adapter implementation slice does not create projects", "Project scaffold adapter implementation requires explicit operator approval", "Slice inputs", "Slice outputs", "Target project types", "Template policy", "File write dependency", "Command/runtime dependency", "Evidence/result/recovery policy", "Sandbox boundary", "Validation matrix", "Unresolved blockers", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Project Scaffold Adapter Implementation Slice identity", "implementation slice only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "copyright/trademark review") `
  -RouteHref "/project-scaffold-adapter-implementation-slice"

Write-Host "[OK] CodexForge Phase 738 project scaffold adapter implementation slice smoke passed."
