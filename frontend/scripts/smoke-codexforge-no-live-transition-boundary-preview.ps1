param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1910 No Live Transition Boundary Preview"
  ScriptFile = "smoke-codexforge-no-live-transition-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-live-transition-boundary-preview"
  Route = "src\app\no-live-transition-boundary-preview"
  CommandLabel = "Go to No Live Transition Boundary Preview"
  RouteHref = "/no-live-transition-boundary-preview"
  Markers = @("No live transition boundary preview", "No live transition boundary preview blocks frontend live transition frontend broker calls frontend order placement frontend paper execution frontend live execution frontend approval persistence frontend credential storage and frontend evidence persistence", "No live transition boundary preview requires backend-owned broker adapter credential vault execution service risk governor kill switch and explicit operator approval", "No live transition boundary preview shows denied live transition denied broker setup denied order route denied credential storage denied frontend approval persistence and operator approval gate", "Denied no live transition paths remain blocked", "No live transition boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

