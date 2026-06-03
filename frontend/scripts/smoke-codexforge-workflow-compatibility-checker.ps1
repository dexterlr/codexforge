param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\workflow-compatibility-checker"
$route = "src\app\workflow-compatibility-checker"

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Workflow Compatibility Checker" `
  -ScriptFile "smoke-codexforge-workflow-compatibility-checker.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "WorkflowCompatibilityCheckerPanel" `
  -CommandLabel "Go to Compatibility Checker" `
  -Modules @("workflow-compatibility-checker-types.ts","workflow-compatibility-checker-summary.ts","index.ts") `
  -Components @("WorkflowCompatibilityCheckerPanel.tsx","index.ts") `
  -Exports @("buildWorkflowCompatibilityCheckerStableKey","buildWorkflowCompatibilityReport","buildWorkflowCompatibilityReports","buildWorkflowCompatibilityCheckerBoundary","buildWorkflowCompatibilityCheckerModel","summarizeWorkflowCompatibilityChecker") `
  -PlainEnglish @("Workflow compatibility checker","Compatibility check does not submit to queue","Local metadata source","Blocking reasons","Recommended next route","Advanced diagnostics stay secondary","local-only","review-gated","compatibility-gated","no localStorage API key storage","no arbitrary queue submit from UI","no arbitrary local file browsing","no artifact deletion","no model download/install behavior","no upload by default") `
  -ExtraRoutes @("/workflow-template-import-shelf","/missing-model-node-resolver","/comfyui-metadata-reader","/comfyui-workflows/dry-run","/workflow-package-validator")

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$deterministicSource = $source.Replace("no Math.random", "").Replace("no Date.now", "")
$blockedPatterns = @{
  "no cloud calls" = "fetch\s*\(|XMLHttpRequest|axios|api\.openai|replicate|runway|pika|https?://|cloudCallsAllowed:\s*true|cloudProviderDestinationAllowed:\s*true|cloudFallbackAllowed:\s*true"
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

Write-Host "[OK] CodexForge Workflow Compatibility Checker smoke passed."
