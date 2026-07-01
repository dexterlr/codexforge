param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1985 Render Settings Planning Preview"
  ScriptFile = "smoke-codexforge-render-settings-planning-preview.ps1"
  Domain = "src\lib\codexforge\render-settings-planning-preview"
  Route = "src\app\render-settings-planning-preview"
  CommandLabel = "Go to Render Settings Planning Preview"
  RouteHref = "/render-settings-planning-preview"
  Markers = @("Render settings planning preview", "Render settings planning preview does not transcode video render files export media or persist render settings from the UI", "Render settings planning preview requires backend-owned render service", "Render settings planning preview shows simulated aspect ratio simulated resolution target simulated duration target simulated caption burn setting simulated export blocked state", "Denied render settings planning paths remain blocked", "Render settings planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

