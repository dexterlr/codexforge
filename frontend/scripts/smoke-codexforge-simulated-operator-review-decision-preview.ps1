param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1812 Simulated Operator Review Decision Preview" `
  -ScriptFile "smoke-codexforge-simulated-operator-review-decision-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-operator-review-decision-preview" `
  -Route "src\app\simulated-operator-review-decision-preview" `
  -CommandLabel "Go to Simulated Operator Review Decision Preview" `
  -RouteHref "/simulated-operator-review-decision-preview" `
  -Markers @("Simulated operator review decision preview", "Simulated operator review decision preview does not persist approvals release locks dispatch workers or approve live execution from the UI", "Simulated operator review decision preview requires backend-owned operator review workflow", "Simulated operator review decision preview shows simulated keep decision simulated revise decision simulated pause decision simulated retire decision simulated evidence requirement and explicit approval requirement", "Denied simulated operator review decision paths remain blocked", "Simulated operator review decision checklist")
