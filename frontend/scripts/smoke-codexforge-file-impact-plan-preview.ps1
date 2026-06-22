param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1436 File Impact Plan Preview" `
  -ScriptFile "smoke-codexforge-file-impact-plan-preview.ps1" `
  -Domain "src\lib\codexforge\file-impact-plan-preview" `
  -Route "src\app\file-impact-plan-preview" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to File Impact Plan Preview" `
  -RouteHref "/file-impact-plan-preview" `
  -Markers @("File impact plan preview", "File impact plan preview does not write files", "File impact plan preview requires explicit operator approval", "File impact plan preview describes new modified reviewed blocked rollback-relevant and evidence-relevant files", "Denied file impact plan paths remain blocked", "File impact plan checklist")
