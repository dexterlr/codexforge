param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1959 Cockpit Asset And Shot Planning Summary"
  ScriptFile = "smoke-codexforge-cockpit-asset-and-shot-planning-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-asset-and-shot-planning-summary"
  Route = "src\app\cockpit-asset-and-shot-planning-summary"
  CommandLabel = "Go to Cockpit Asset And Shot Planning Summary"
  RouteHref = "/cockpit-asset-and-shot-planning-summary"
  Markers = @("Cockpit asset and shot planning summary", "Cockpit asset and shot planning summary keeps the cockpit as the normal user surface", "Cockpit asset and shot planning summary does not upload assets download assets store media render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards persist assets persist rights or write files from the cockpit", "Cockpit asset and shot planning summary shows shot list scene asset map b-roll requirements product shot requirements visual reference board music and audio notes brand asset checklist rights and source status missing asset blockers asset handoff packet upload blocked download blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit asset and shot planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

