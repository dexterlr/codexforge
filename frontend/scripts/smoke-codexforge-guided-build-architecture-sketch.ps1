param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1022 Guided Build Architecture Sketch" `
  -ScriptFile "smoke-codexforge-guided-build-architecture-sketch.ps1" `
  -Domain "src\lib\codexforge\guided-build-architecture-sketch" `
  -Route "src\app\guided-build-architecture-sketch" `
  -MainPanel "GuidedBuildArchitectureSketchPanel" `
  -CommandLabel "Go to Guided Build Architecture Sketch" `
  -Modules @("guided-build-architecture-sketch-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildArchitectureSketchStableKey", "buildGuidedBuildArchitectureSketch", "buildGuidedBuildArchitectureSketchItems", "buildGuidedBuildArchitectureSketchBoundary", "buildGuidedBuildArchitectureSketchModel", "summarizeGuidedBuildArchitectureSketch", "GUIDED_BUILD_ARCHITECTURE_SKETCH_LANGUAGE") `
  -PhaseMarkers @("Guided build architecture sketch", "Guided build architecture sketch does not scaffold architecture", "Architecture sketch review requires explicit operator approval", "Architecture sketches include model routing and adapter boundaries", "Denied guided build architecture paths remain blocked", "Guided build architecture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build architecture sketch does not scaffold architecture", "Architecture sketch review requires explicit operator approval", "Denied guided build architecture paths remain blocked") `
  -RouteHref "/guided-build-architecture-sketch"

Write-Host "[OK] CodexForge Phase 1022 Guided Build Architecture Sketch smoke passed."
