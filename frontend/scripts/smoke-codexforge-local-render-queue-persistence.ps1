param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-render-queue-persistence"
$route = "src\app\local-render-queue-persistence"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Render Queue Persistence" `
  -ScriptFile "smoke-codexforge-local-render-queue-persistence.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalRenderQueuePersistencePanel" `
  -CommandLabel "Go to Queue Memory" `
  -Modules @("local-render-queue-persistence-types.ts","local-render-queue-persistence-summary.ts","index.ts") `
  -Components @("LocalRenderQueuePersistencePanel.tsx","index.ts") `
  -Exports @("buildLocalRenderQueuePersistenceStableKey","buildLocalRenderQueuePersistenceField","buildLocalRenderQueuePersistenceFields","buildLocalRenderQueuePersistenceReadiness","buildLocalRenderQueuePersistenceModel","summarizeLocalRenderQueuePersistence") `
  -PlainEnglish @("Local render queue persistence","Queue items are remembered safely","No secrets are persisted","No automatic queue mutation","Persistence remains behind approved local boundary","Artifact capture handoff","local-only","approval-gated","nothing mutates silently","retention note","no localStorage API key storage","no raw fetch in UI","no infinite polling loop") `
  -ExtraRoutes @("/render-queue","/render-job-status","/render-job-control-boundary","/render-queue-recovery","/local-output-capture","/video-review")

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

Write-Host "[OK] CodexForge Local Render Queue Persistence smoke passed."
