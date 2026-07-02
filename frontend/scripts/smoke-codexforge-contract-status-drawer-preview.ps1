param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2229 Contract Status Drawer Preview"
  ScriptFile = "smoke-codexforge-contract-status-drawer-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Contract Status Drawer Preview"
  RouteHref = "/contract-status-drawer-preview"
  Markers = @("Contract status drawer preview", "Contract status drawer preview visually moves foundation contracts into a lower-priority but accessible premium drawer or status section", "Contract status drawer preview does not remove prior contract coverage diagnostics smoke routes or checkpoint content", "Contract status drawer preview keeps normal cockpit UX primary and diagnostic links secondary", "Denied contract drawer regression paths remain blocked", "Contract status drawer checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
