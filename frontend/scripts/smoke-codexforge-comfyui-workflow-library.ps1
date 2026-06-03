param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\comfyui-workflow-library"
$route = "src\app\comfyui-workflow-library"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "ComfyUI Workflow Library" `
  -ScriptFile "smoke-codexforge-comfyui-workflow-library.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ComfyUiWorkflowLibraryPanel" `
  -CommandLabel "Go to Workflow Library" `
  -Modules @("comfyui-workflow-library-types.ts","comfyui-workflow-library-summary.ts","index.ts") `
  -Components @("ComfyUiWorkflowLibraryPanel.tsx","index.ts") `
  -Exports @("buildComfyUiWorkflowLibraryStableKey","buildComfyUiWorkflowLibraryEntry","buildComfyUiWorkflowLibraryEntries","buildComfyUiWorkflowLibraryBoundary","buildComfyUiWorkflowLibraryModel","summarizeComfyUiWorkflowLibrary") `
  -PlainEnglish @("ComfyUI workflow library","Library does not execute workflows","Local-only workflow readiness","Required models and nodes summary","Package validator route","Raw workflow details stay secondary","local-only","review-gated","compatibility-gated","approved submit route","no localStorage API key storage","no workflow execution from import/library UI","no arbitrary local file browsing","no artifact deletion","no model download/install behavior","no upload by default") `
  -ExtraRoutes @("/workflow-template-import-shelf","/workflow-compatibility-checker","/missing-model-node-resolver","/workflow-package-validator","/comfyui-submit-trial")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|replicate|runway|pika|https?://|cloudCallsAllowed:\s*true|cloudProviderDestinationAllowed:\s*true"
  "no secrets" = "localStorage\.setItem|apiKey|API_KEY|password\s*[:=]|token\s*[:=]|process\.env\.[A-Za-z0-9_]+|secretsAllowed:\s*true"
  "no direct appendEvent/saveBrainGraph calls from UI" = "appendEvent\s*\(|saveBrainGraph\s*\("
  "no direct graph mutation from UI" = "mutateBrainGraph\s*\(|brainGraphMutationAllowed:\s*true"
  "no arbitrary queue submit from UI" = "queue_prompt|submitPrompt\s*\(|submitWorkflow\s*\(|enqueueJob\s*\(|queueSubmissionAllowed:\s*true|silentQueueMutationAllowed:\s*true"
  "no workflow execution from import/library UI" = "runWorkflow\s*\(|executeWorkflow\s*\(|libraryExecutesWorkflows:\s*true|workflowExecutionAllowed:\s*true|liveWorkflowExecutionAllowed:\s*true"
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

Write-Host "[OK] CodexForge ComfyUI Workflow Library smoke passed."
