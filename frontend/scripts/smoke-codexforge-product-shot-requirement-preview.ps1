param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1950 Product Shot Requirement Preview"
  ScriptFile = "smoke-codexforge-product-shot-requirement-preview.ps1"
  Domain = "src\lib\codexforge\product-shot-requirement-preview"
  Route = "src\app\product-shot-requirement-preview"
  CommandLabel = "Go to Product Shot Requirement Preview"
  RouteHref = "/product-shot-requirement-preview"
  Markers = @("Product shot requirement preview", "Product shot requirement preview does not capture images upload product photos store files or generate product visuals from the UI", "Product shot requirement preview requires deterministic synthetic product shot planning only", "Product shot requirement preview shows simulated product shot simulated angle note simulated lighting note simulated usage note simulated asset persistence blocked state", "Denied product shot requirement paths remain blocked", "Product shot requirement checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

