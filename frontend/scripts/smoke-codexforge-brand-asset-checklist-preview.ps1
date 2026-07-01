param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1953 Brand Asset Checklist Preview"
  ScriptFile = "smoke-codexforge-brand-asset-checklist-preview.ps1"
  Domain = "src\lib\codexforge\brand-asset-checklist-preview"
  Route = "src\app\brand-asset-checklist-preview"
  CommandLabel = "Go to Brand Asset Checklist Preview"
  RouteHref = "/brand-asset-checklist-preview"
  Markers = @("Brand asset checklist preview", "Brand asset checklist preview does not upload logos store brand files approve brand use or publish content from the UI", "Brand asset checklist preview requires backend-owned brand review and operator approval", "Brand asset checklist preview shows simulated logo requirement simulated font note simulated color note simulated brand safety note simulated approval requirement", "Denied brand asset checklist paths remain blocked", "Brand asset checklist checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

