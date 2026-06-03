param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\artifact-thumbnail-generator"
$route = "src\app\artifact-thumbnails"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Artifact Thumbnail Generator" `
  -ScriptFile "smoke-codexforge-artifact-thumbnail-generator.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ArtifactThumbnailGeneratorPanel" `
  -CommandLabel "Go to Artifact Thumbnails" `
  -Modules @("artifact-thumbnail-generator-types.ts","artifact-thumbnail-generator-summary.ts","index.ts") `
  -Components @("ArtifactThumbnailGeneratorPanel.tsx","index.ts") `
  -Exports @("buildArtifactThumbnailStableKey","buildArtifactThumbnailSource","buildArtifactThumbnailReadiness","buildArtifactThumbnailField","buildArtifactThumbnailFields","buildArtifactThumbnailGeneratorModel","summarizeArtifactThumbnailGenerator") `
  -PlainEnglish @("Artifact thumbnail generator","Thumbnail generation remains behind approved local artifact boundary","Source artifacts are never overwritten","Review inbox handoff","No thumbnail upload","No artifact deletion","local-only","review-gated","export-gated","nothing uploads automatically","no upload by default","no arbitrary local file browsing","no auto-open arbitrary local files","no memory auto-promotion","no localStorage API key storage","no raw fetch in UI","no infinite polling loop") `
  -ExtraRoutes @("/video-artifacts","/local-video-preview","/video-review","/local-output-capture","/render-queue-recovery","/export-package-builder")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "https?://|api\.openai|replicate|runway|pika|cloudDestinationAllowed:\s*true"
  "no secrets" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]|process\.env\.[A-Za-z0-9_]+"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|showDirectoryPicker|webkitdirectory|browseLocalFiles|arbitraryFolderBrowsingAllowed:\s*true"
  "no auto-open arbitrary local files" = "window\.open|openLocalFile|autoOpenLocalFile|input\s+type=[`"']file"
  "source artifacts are never overwritten" = "sourceArtifactsOverwritten:\s*true|overwriteSource\s*\("
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|artifactDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no upload by default" = "uploadArtifact\s*\(|uploadThumbnail\s*\(|cloudUpload\s*\(|thumbnailUploadAllowed:\s*true|uploadByDefault:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}
foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  if ($haystack -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Artifact Thumbnail Generator smoke passed."
