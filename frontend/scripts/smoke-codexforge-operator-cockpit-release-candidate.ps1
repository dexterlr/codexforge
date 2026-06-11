param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\operator-cockpit-release-candidate"
$route = "src\app\operator-cockpit-release-candidate"
$newRoutes = @(
  "/creative-workflow-readiness-audit",
  "/research-workflow-readiness-audit",
  "/coding-workflow-readiness-audit",
  "/operator-cockpit-release-candidate"
)

$phaseMarkers = @(
  "Operator cockpit release candidate",
  "Operator cockpit release candidate does not execute workflows",
  "Cockpit release requires explicit operator approval",
  "Unresolved blockers remain blocked",
  "Workflow readiness summary",
  "Safety and approval summary"
)

$workflowSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no workflow execution from UI",
  "no workflow runs automatically",
  "no creative workflow execution",
  "no creative asset generation",
  "no research execution",
  "no browsing/search/fetching from UI",
  "no evidence ingestion automation",
  "no coding workflow execution",
  "no patch apply behavior",
  "no code apply behavior",
  "no git command execution from UI",
  "no shell command execution from UI",
  "no shell command execution",
  "no command execution",
  "no test/build/smoke execution from UI",
  "no test execution from UI",
  "no build execution from UI",
  "no smoke execution from UI",
  "no release/publish behavior",
  "no release publishing",
  "no provider API calls",
  "no connector API calls",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no local bridge endpoint calls",
  "no local bridge endpoint calls from arbitrary UI",
  "no local tool launching",
  "no prompt/file/project/connector/provider/workflow data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no prompt/file/project data sending without approval",
  "no file export/write behavior",
  "no export/write behavior",
  "no approval automation",
  "no approval is granted",
  "no action approval from UI",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no sessionStorage API key storage",
  "no localStorage writes",
  "no sessionStorage writes",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "advanced cockpit readiness details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 409 Operator Cockpit Release Candidate" `
  -ScriptFile "smoke-codexforge-operator-cockpit-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "OperatorCockpitReleaseCandidatePanel" `
  -CommandLabel "Go to Operator Cockpit Release Candidate" `
  -Modules @("operator-cockpit-release-candidate-types.ts","operator-cockpit-release-candidate-summary.ts","index.ts") `
  -Components @("OperatorCockpitReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildOperatorCockpitReleaseCandidateStableKey","buildOperatorCockpitReleaseCandidate","buildOperatorCockpitReleaseCandidates","buildOperatorCockpitReleaseCandidateBoundary","buildOperatorCockpitReleaseCandidateModel","summarizeOperatorCockpitReleaseCandidate","OPERATOR_COCKPIT_RELEASE_CANDIDATE_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("operator cockpit release candidate identity","readiness groups","provider/local/connector/automation readiness summary","blocked release candidate risks","beta hardening route","beta release candidate route","next recommended action","operator cockpit readiness language") + $workflowSafetyMarkers) `
  -ExtraRoutes @("/creative-workflow-readiness-audit","/research-workflow-readiness-audit","/coding-workflow-readiness-audit","/mvp-hardening-regression-matrix","/foundation-beta-candidate")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "workflowExecutionAllowedFromUi:\s*true|creativeWorkflowExecutionAllowedFromUi:\s*true|researchExecutionAllowedFromUi:\s*true|codingWorkflowExecutionAllowedFromUi:\s*true|runWorkflow\s*\(|executeWorkflow\s*\(|runCreativeWorkflow\s*\(|runResearch\s*\(|runCodingWorkflow\s*\(" "no workflow creative research or coding execution"
Assert-NotMatches $source "releasePublishAllowedFromUi:\s*true|publishRelease\s*\(|releaseToBeta\s*\(|deployRelease\s*\(" "no release or publish behavior"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|connectorApiCallsAllowedFromUi:\s*true|webSearchProviderCallsAllowedFromUi:\s*true|githubApiCallsAllowedFromUi:\s*true|localBridgeEndpointCallsAllowedFromUi:\s*true|callProviderApi\s*\(|callConnectorApi\s*\(|callSearchProvider\s*\(|callGithubApi\s*\(|callLocalBridge\s*\(" "no provider connector web GitHub or local bridge calls"
Assert-NotMatches $source "fileMutationAllowedFromUi:\s*true|fileWriteAllowedFromUi:\s*true|fileExportAllowedFromUi:\s*true|fileDeletionAllowedFromUi:\s*true|writeFile\s*\(|exportFile\s*\(|deleteFile\s*\(" "no file mutation write export or deletion"
Assert-NotMatches $source "memoryIngestionAllowedFromUi:\s*true|memoryAutoPromotionAllowed:\s*true|brainGraphMutationAllowed:\s*true|appendEventAllowedFromUi:\s*true|saveBrainGraphAllowedFromUi:\s*true|ingestMemory\s*\(|autoPromoteMemory\s*\(|mutateBrainGraph\s*\(|appendEvent\s*\(|saveBrainGraph\s*\(" "no memory or Brain graph mutation"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Operator Cockpit Release Candidate smoke passed."
