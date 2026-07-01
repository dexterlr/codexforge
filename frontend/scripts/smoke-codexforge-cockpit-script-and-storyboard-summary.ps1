param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1943 Cockpit Script And Storyboard Summary"
  ScriptFile = "smoke-codexforge-cockpit-script-and-storyboard-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-script-and-storyboard-summary"
  Route = "src\app\cockpit-script-and-storyboard-summary"
  CommandLabel = "Go to Cockpit Script And Storyboard Summary"
  RouteHref = "/cockpit-script-and-storyboard-summary"
  Markers = @("Cockpit script and storyboard summary", "Cockpit script and storyboard summary keeps the cockpit as the normal user surface", "Cockpit script and storyboard summary does not generate final scripts render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards or write files from the cockpit", "Cockpit script and storyboard summary shows script brief hook and opening beat scene outline storyboard card grid shot intent visual references b-roll and asset notes captions and supers review comments brand and rights notes model generation blocked storyboard export blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit script and storyboard checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

