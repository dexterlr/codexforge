param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\export-package-builder-mvp"
$route = "src\app\export-package-builder"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Export Package Builder MVP" `
  -ScriptFile "smoke-codexforge-export-package-builder-mvp.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ExportPackageBuilderPanel" `
  -CommandLabel "Go to Export Package Builder" `
  -Modules @("export-package-builder-mvp-types.ts","export-package-builder-mvp-summary.ts","index.ts") `
  -Components @("ExportPackageBuilderPanel.tsx","index.ts") `
  -Exports @("buildExportPackageStableKey","buildExportPackageIncludedAssets","buildExportPackageExcludedAssets","buildExportPackageChecklist","buildExportPackageReadiness","buildExportPackageManifestSummary","buildExportPackageBuilderModel","summarizeExportPackageBuilder") `
  -PlainEnglish @("Export package builder MVP","Export package remains local by default","No upload by default","Export manifest summary","Handoff copy","Final packaging remains behind approved local export boundary","local-only","review-gated","export-gated","nothing uploads automatically","no secrets","no arbitrary local file browsing","no auto-open arbitrary local files","no localStorage API key storage","no raw fetch in UI","no infinite polling loop") `
  -ExtraRoutes @("/draft-playback-review","/local-video-preview","/artifact-thumbnails","/render-history","/video-export","/video-review")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "https?://|api\.openai|replicate|runway|pika|cloudDestinationAllowed:\s*true"
  "no secrets" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]|process\.env\.[A-Za-z0-9_]+|secretsAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\("
  "no arbitrary local file browsing" = "showOpenFilePicker|showDirectoryPicker|webkitdirectory|browseLocalFiles|arbitraryFileBrowsingAllowed:\s*true"
  "no auto-open arbitrary local files" = "window\.open|openLocalFile|autoOpenLocalFile|input\s+type=[`"']file"
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|artifactDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no upload by default" = "uploadArtifact\s*\(|uploadPackage\s*\(|cloudUpload\s*\(|uploadByDefault:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}
foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  if ($haystack -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Export Package Builder MVP smoke passed."
