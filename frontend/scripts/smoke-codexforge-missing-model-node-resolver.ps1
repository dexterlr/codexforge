param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\missing-model-node-resolver"
$route = "src\app\missing-model-node-resolver"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Missing Model / Node Resolver" `
  -ScriptFile "smoke-codexforge-missing-model-node-resolver.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "MissingModelNodeResolverPanel" `
  -CommandLabel "Go to Missing Model and Node Resolver" `
  -Modules @("missing-model-node-resolver-types.ts","missing-model-node-resolver-summary.ts","index.ts") `
  -Components @("MissingModelNodeResolverPanel.tsx","index.ts") `
  -Exports @("buildMissingModelNodeResolverStableKey","buildMissingModelNodeResolutionItem","buildMissingModelNodeResolutionItems","buildMissingModelNodeResolverBoundary","buildMissingModelNodeResolverModel","summarizeMissingModelNodeResolver") `
  -PlainEnglish @("Missing model and node resolver","Manual resolution only","Do not download models","Do not install nodes","Missing item summary","Full local paths stay secondary","local-only","review-gated","compatibility-gated","manual-only","no localStorage API key storage","no arbitrary queue submit from UI","no arbitrary local file browsing","no artifact deletion","no model download/install behavior","no upload by default") `
  -ExtraRoutes @("/workflow-compatibility-checker","/workflow-template-import-shelf","/render-queue-recovery","/comfyui-metadata-reader","/comfyui-workflow-library")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|replicate|runway|pika|https?://|cloudCallsAllowed:\s*true|cloudProviderDestinationAllowed:\s*true|externalUrlCallsAllowed:\s*true"
  "no secrets" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]|process\.env\.[A-Za-z0-9_]+|secretsAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\(|queueSubmissionAllowed:\s*true|silentQueueMutationAllowed:\s*true"
  "no live workflow execution" = "runWorkflow\s*\(|executeWorkflow\s*\(|workflowExecutionAllowed:\s*true|liveWorkflowExecutionAllowed:\s*true"
  "no arbitrary local file browsing" = "showOpenFilePicker|showDirectoryPicker|webkitdirectory|browseLocalFiles|arbitraryFileBrowsingAllowed:\s*true"
  "no model download/install behavior" = "downloadModel\s*\(|installModel\s*\(|installNode\s*\(|installCustomNode\s*\(|modelDownloadAllowed:\s*true|nodeInstallAllowed:\s*true|downloadAllowed:\s*true|installAllowed:\s*true"
  "no upload by default" = "uploadTemplate\s*\(|uploadArtifact\s*\(|cloudUpload\s*\(|uploadByDefault:\s*true|templateUploadAllowed:\s*true"
  "no artifact deletion" = "deleteArtifact\s*\(|deleteFile\s*\(|Remove-Item|unlink\s*\(|artifactDeletionAllowed:\s*true"
  "no memory auto-promotion" = "autoPromote|promoteMemory\s*\(|memoryAutoPromotionAllowed:\s*true"
  "no Math.random" = "Math\.random\s*\("
  "no Date.now" = "Date\.now\s*\("
  "no mojibake" = "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)"
}
foreach ($name in $blockedPatterns.Keys) {
  $haystack = if ($name -eq "no Math.random" -or $name -eq "no Date.now") { $deterministicSource } else { $source }
  if ($haystack -match $blockedPatterns[$name]) { throw "[FAIL] $name" }
  Write-Host "[PASS] $name"
}

Write-Host "[OK] CodexForge Missing Model / Node Resolver smoke passed."
