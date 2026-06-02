param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\render-job-status-polling"
$route = "src\app\render-job-status"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Render Job Status Polling" `
  -ScriptFile "smoke-codexforge-render-job-status-polling.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RenderJobStatusPollingPanel" `
  -CommandLabel "Go to Render Job Status" `
  -Modules @("render-job-status-polling-types.ts","render-job-status-polling-summary.ts","index.ts") `
  -Components @("RenderJobStatusPollingPanel.tsx","index.ts") `
  -Exports @("buildRenderJobStatusPollingStableKey","buildRenderJobStatusPollingPolicy","buildRenderJobStatusPollingPolicies","buildRenderJobStatusPollingReadiness","buildRenderJobStatusPollingModel","summarizeRenderJobStatusPolling") `
  -PlainEnglish @("Render job status polling","Local job status only","Polling cadence policy","Timeout policy","No cloud polling","Live polling remains behind the approved local bridge","local-only","approval-gated","no raw fetch in UI","no infinite polling loop","no localStorage API key storage","nothing mutates silently") `
  -ExtraRoutes @("/local-render-queue-persistence","/render-job-control-boundary","/render-queue-recovery","/local-bridge-health","/comfyui-real-health","/local-output-capture")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$blockedPatterns = @{
  "no raw fetch in UI" = "fetch\s*\(|XMLHttpRequest|axios"
  "no cloud calls" = "https?://|api\.openai|replicate|runway|pika"
  "no localStorage API key storage" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\("
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no silent queue mutation" = "dequeueJob\s*\(|pauseQueue\s*\(|resumeQueue\s*\(|cancelJob\s*\(|holdJob\s*\(|retryJob\s*\("
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|artifactDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\("
  "no infinite polling loop pattern" = "setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
}
foreach ($name in $blockedPatterns.Keys) {
  if ($source -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Render Job Status Polling smoke passed."
