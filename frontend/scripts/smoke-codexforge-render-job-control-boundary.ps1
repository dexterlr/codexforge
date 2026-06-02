param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\render-job-control-boundary"
$route = "src\app\render-job-control-boundary"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Render Job Control Boundary" `
  -ScriptFile "smoke-codexforge-render-job-control-boundary.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "RenderJobControlBoundaryPanel" `
  -CommandLabel "Go to Hold or Cancel" `
  -Modules @("render-job-control-boundary-types.ts","render-job-control-boundary-summary.ts","index.ts") `
  -Components @("RenderJobControlBoundaryPanel.tsx","index.ts") `
  -Exports @("buildRenderJobControlBoundaryStableKey","buildRenderJobControlBoundaryAction","buildRenderJobControlBoundaryActions","buildRenderJobControlBoundaryModel","summarizeRenderJobControlBoundary") `
  -PlainEnglish @("Render job cancel and hold boundary","Hold prevents the next step","Cancel requests stop through approved boundary","Neither action deletes artifacts","Required confirmation copy","No silent queue mutation","local-only","approval-gated","nothing mutates silently","no backend cancel direct from arbitrary UI") `
  -ExtraRoutes @("/render-job-status","/local-render-queue-persistence","/render-queue-recovery","/render-queue","/local-output-capture")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$blockedPatterns = @{
  "no raw fetch in UI" = "fetch\s*\(|XMLHttpRequest|axios"
  "no cloud calls" = "https?://|api\.openai|replicate|runway|pika"
  "no localStorage API key storage" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]"
  "no process.env printing" = "process\.env\.[A-Za-z0-9_]+"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\("
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no direct backend cancel" = "cancelJob\s*\(|cancelRenderJob\s*\(|stopRenderJob\s*\("
  "no silent queue mutation" = "dequeueJob\s*\(|pauseQueue\s*\(|resumeQueue\s*\(|holdJob\s*\(|retryJob\s*\("
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|deletesArtifacts:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\("
  "no infinite polling loop pattern" = "setInterval\s*\(|while\s*\(\s*true\s*\)|for\s*\(\s*;\s*;\s*\)"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
}
foreach ($name in $blockedPatterns.Keys) {
  if ($source -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Render Job Control Boundary smoke passed."
