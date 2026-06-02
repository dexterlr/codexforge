param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\render-queue-recovery-retry"
$route = "src\app\render-queue-recovery"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Render Queue Recovery and Retry" `
  -ScriptFile "smoke-codexforge-render-queue-recovery-retry.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RenderQueueRecoveryRetryPanel" `
  -CommandLabel "Go to Recovery and Retry" `
  -Modules @("render-queue-recovery-retry-types.ts","render-queue-recovery-retry-summary.ts","index.ts") `
  -Components @("RenderQueueRecoveryRetryPanel.tsx","index.ts") `
  -Exports @("buildRenderQueueRecoveryRetryStableKey","buildRenderQueueRecoveryRetryItem","buildRenderQueueRecoveryRetryItems","buildRenderQueueRecoveryRetryModel","summarizeRenderQueueRecoveryRetry") `
  -PlainEnglish @("Render queue recovery and retry","Retry is never automatic","Explicit approval required before retry","No cloud fallback","Failed artifacts are retained","Review inbox handoff","local-only","approval-gated","nothing mutates silently","no prompt/file upload") `
  -ExtraRoutes @("/render-job-status","/render-job-control-boundary","/local-render-queue-persistence","/video-recovery","/video-review","/local-output-capture")

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
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|failedArtifactDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\("
  "no prompt/file upload" = "uploadPrompt\s*\(|uploadFile\s*\(|FormData\s*\("
  "no infinite polling loop pattern" = "setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
}
foreach ($name in $blockedPatterns.Keys) {
  if ($source -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Render Queue Recovery and Retry smoke passed."
