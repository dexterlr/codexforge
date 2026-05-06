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
$commandCenterPath = ".\src\lib\codexforge\chat\components\workspace-command-center.tsx"
$toolbarStatusPath = ".\src\lib\codexforge\chat\components\toolbar-status.tsx"
$workspaceStatePath = ".\src\lib\codexforge\chat\components\workspace-state-card.tsx"
$pagePath = ".\src\app\ai\page.tsx"

Assert-True (Test-Path $dataPath) "product surface data file exists"
Assert-True (Test-Path $componentPath) "product surface component file exists"
Assert-True (Test-Path $commandCenterPath) "workspace command center component file exists"
Assert-True (Test-Path $toolbarStatusPath) "toolbar status component file exists"
Assert-True (Test-Path $workspaceStatePath) "workspace state component file exists"
Assert-True (Test-Path $pagePath) "AI page exists"

$data = Get-Content -Raw $dataPath
$component = Get-Content -Raw $componentPath
$commandCenter = Get-Content -Raw $commandCenterPath
$toolbarStatus = Get-Content -Raw $toolbarStatusPath
$workspaceState = Get-Content -Raw $workspaceStatePath
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
Assert-True ($commandCenter.Contains("export function WorkspaceCommandCenter")) "workspace command center exports component"
Assert-True ($commandCenter.Contains("Workspace command center")) "workspace command center includes heading"
Assert-True ($commandCenter.Contains("latest-message authority")) "workspace command center preserves latest-message authority copy"
Assert-True ($page.Contains("workspace-command-center")) "AI page imports workspace command center"
Assert-True ($page.Contains("<WorkspaceCommandCenter")) "AI page renders workspace command center"
Assert-True ($toolbarStatus.Contains("export function ToolbarStatus")) "toolbar status exports component"
Assert-True ($toolbarStatus.Contains("controlled execution guidance")) "toolbar status preserves execution guidance copy"
Assert-True ($page.Contains("toolbar-status")) "AI page imports toolbar status"
Assert-True ($page.Contains("<ToolbarStatus")) "AI page renders toolbar status"
Assert-True (-not $page.Contains("function StatusBar")) "AI page does not define local status bar"
Assert-True (-not $page.Contains("type StatusBarProps")) "AI page does not keep status bar props inline"
Assert-True ($workspaceState.Contains("export function WorkspaceStateCard")) "workspace state exports component"
Assert-True ($workspaceState.Contains("Current workspace")) "workspace state includes heading"
Assert-True ($workspaceState.Contains("Snapshot files")) "workspace state preserves snapshot file metric"
Assert-True ($page.Contains("workspace-state-card")) "AI page imports workspace state card"
Assert-True ($page.Contains("<WorkspaceStateCard")) "AI page renders workspace state card"
Assert-True (-not $page.Contains("function WorkspaceStateCard")) "AI page does not define local workspace state card"
Assert-True (-not $page.Contains("type WorkspaceStateCardProps")) "AI page does not keep workspace state props inline"
Assert-True (-not $page.Contains("const workspaceStateGridStyle")) "AI page does not keep workspace state styles inline"
Assert-True (-not $page.Contains("function WorkspaceCommandCenter")) "AI page does not define local workspace command center"
Assert-True (-not $page.Contains("const commandCenterShellStyle")) "AI page does not keep command center styles inline"
Assert-True (-not $page.Contains("<WorkspaceHero workspaceCards={workspaceCards} />")) "AI page does not render duplicate old workspace hero"
Assert-True (-not $page.Contains("<WorkspaceHeroIntro")) "AI page does not render duplicate old workspace intro"

Write-Host ""
Write-Host "[OK] CodexForge product surface UI smoke passed."
