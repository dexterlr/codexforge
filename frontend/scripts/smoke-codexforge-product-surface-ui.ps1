$ErrorActionPreference = "Stop"

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

$dataPath = ".\src\lib\codexforge\product-surface.ts"
$componentPath = ".\src\lib\codexforge\chat\components\codexforge-product-surface.tsx"
$pagePath = ".\src\app\ai\page.tsx"

Assert-True (Test-Path $dataPath) "product surface data file exists"
Assert-True (Test-Path $componentPath) "product surface component file exists"
Assert-True (Test-Path $pagePath) "AI page exists"

$data = Get-Content -Raw $dataPath
$component = Get-Content -Raw $componentPath
$page = Get-Content -Raw $pagePath

Assert-True ($data.Contains("codexForgeProductSurface")) "data exports codexForgeProductSurface"
Assert-True ($data.Contains("Local-first AI operating system for builders")) "data includes god-tier positioning eyebrow"
Assert-True ($data.Contains("AI developer workspace")) "data includes developer workspace capability"
Assert-True ($data.Contains("Operator-safe execution")) "data includes operator-safe execution capability"
Assert-True ($data.Contains("Creative production system")) "data includes creative production system capability"
Assert-True ($data.Contains("ComfyUI and Unreal")) "data includes ComfyUI and Unreal use case"

Assert-True ($component.Contains("export function CodexForgeProductSurface")) "component exports CodexForgeProductSurface"
Assert-True ($component.Contains("codexForgeProductSurface")) "component imports product data"
Assert-True ($component.Contains("mission stack")) "component includes mission stack"
Assert-True ($component.Contains("world-class Jarvis-level builder cockpit")) "component includes Jarvis-level posture"
Assert-True ($component.Contains("minmax(min(100%, 320px), 1fr)")) "component has responsive hero grid"
Assert-True ($component.Contains("minmax(min(100%, 240px), 1fr)")) "component has responsive capability grid"
Assert-True ($component.Contains("minmax(min(100%, 220px), 1fr)")) "component has responsive use-case grid"

Assert-True ($page.Contains("CodexForgeProductSurface")) "AI page imports product surface"
Assert-True ($page.Contains("<CodexForgeProductSurface />")) "AI page renders product surface"
Assert-True ($page.Contains('id="workspace"')) "AI page has workspace anchor"

Write-Host ""
Write-Host "[OK] CodexForge product surface UI smoke passed."
