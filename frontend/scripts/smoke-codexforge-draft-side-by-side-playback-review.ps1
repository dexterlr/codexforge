param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\draft-side-by-side-playback-review"
$route = "src\app\draft-playback-review"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Draft Side-by-Side Playback Review" `
  -ScriptFile "smoke-codexforge-draft-side-by-side-playback-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "DraftSideBySidePlaybackReviewPanel" `
  -CommandLabel "Go to Draft Playback Review" `
  -Modules @("draft-side-by-side-playback-review-types.ts","draft-side-by-side-playback-review-summary.ts","index.ts") `
  -Components @("DraftSideBySidePlaybackReviewPanel.tsx","index.ts") `
  -Exports @("buildDraftSideBySidePlaybackStableKey","buildDraftPlaybackDraftSummary","buildDraftPlaybackCriteria","buildDraftPlaybackDecision","buildDraftSideBySidePlaybackReviewModel","summarizeDraftSideBySidePlaybackReview") `
  -PlainEnglish @("Draft side-by-side playback review","Compare local draft renders","No automatic promotion","Rejected drafts are retained","Review decision required","Clean comparison layout","local-only","review-gated","export-gated","nothing uploads automatically","no upload by default","no arbitrary local file browsing","no auto-open arbitrary local files","no Brain graph mutation","no localStorage API key storage","no raw fetch in UI","no infinite polling loop") `
  -ExtraRoutes @("/local-video-preview","/artifact-thumbnails","/video-review","/video-compare","/render-queue-recovery","/export-package-builder")

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
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|artifactDeletionAllowed:\s*true|rejectedDraftDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|automaticPromotionAllowed:\s*true"
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

Write-Host "[OK] CodexForge Draft Side-by-Side Playback Review smoke passed."
