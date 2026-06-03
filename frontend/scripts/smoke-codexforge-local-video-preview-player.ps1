param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\local-video-preview-player"
$route = "src\app\local-video-preview"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Local Video Preview Player" `
  -ScriptFile "smoke-codexforge-local-video-preview-player.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "LocalVideoPreviewPlayerPanel" `
  -CommandLabel "Go to Local Video Preview" `
  -Modules @("local-video-preview-player-types.ts","local-video-preview-player-summary.ts","index.ts") `
  -Components @("LocalVideoPreviewPlayerPanel.tsx","index.ts") `
  -Exports @("buildLocalVideoPreviewStableKey","buildLocalVideoPreviewArtifactReference","buildLocalVideoPreviewReadiness","buildLocalVideoPreviewField","buildLocalVideoPreviewFields","buildLocalVideoPreviewPlayerModel","summarizeLocalVideoPreviewPlayer") `
  -PlainEnglish @("Local video preview player","Preview playback remains behind approved local artifact boundary","Local artifact reference summary","No upload behavior","No artifact deletion","Full local paths stay secondary","local-only","review-gated","export-gated","nothing uploads automatically","no upload by default","no arbitrary local file browsing","no auto-open arbitrary local files","no localStorage API key storage","no raw fetch in UI","no infinite polling loop") `
  -ExtraRoutes @("/local-video-draft-trial","/local-output-capture","/render-job-status","/video-review","/render-queue-recovery","/export-package-builder","/artifact-thumbnails")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "https?://|api\.openai|replicate|runway|pika|cloudDestinationAllowed:\s*true"
  "no secrets" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]|process\.env\.[A-Za-z0-9_]+"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|showDirectoryPicker|webkitdirectory|browseLocalFiles|arbitraryFileBrowsingAllowed:\s*true"
  "no auto-open arbitrary local files" = "window\.open|openLocalFile|autoOpenLocalFile|input\s+type=[`"']file"
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|artifactDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no upload by default" = "uploadArtifact\s*\(|uploadThumbnail\s*\(|cloudUpload\s*\(|uploadAllowed:\s*true|uploadByDefault:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}
foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  if ($haystack -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Local Video Preview Player smoke passed."
