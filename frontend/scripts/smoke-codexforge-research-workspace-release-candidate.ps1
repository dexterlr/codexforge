param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\research-workspace-release-candidate"
$route = "src\app\research-workspace-release-candidate"

$sharedResearchSafetyMarkers = @(
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no automatic provider send",
  "no prompt/file/source sending without approval",
  "no auto-spend tokens",
  "no provider retries automatically",
  "no source auto-fetching",
  "no source auto-ingestion",
  "no evidence auto-ingestion",
  "no auto-cite",
  "no auto-citation finalization",
  "no automatic report export",
  "no file export/write behavior",
  "no source auto-refreshing",
  "no freshness auto-recheck",
  "no evidence auto-update",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no provider API calls",
  "no web or provider request sent",
  "no API keys or secrets displayed",
  "no localStorage API key storage",
  "no process.env printing",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension install behavior",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no browser-stored signing secrets",
  "no session token localStorage storage",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no artifact deletion",
  "no process kill/restart/shutdown from UI",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring",
  "no Ruflo/Odysseus runtime integration",
  "no Ruflo/Odysseus dependency references",
  "future adoption requires license/security review"
)

$phaseMarkers = @(
  "Research workspace release candidate",
  "Research release candidate remains review-only",
  "No web or provider request is sent from this page",
  "Memory is not auto-promoted",
  "Release decision",
  "Known gaps"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 330 Research Workspace Release Candidate" `
  -ScriptFile "smoke-codexforge-research-workspace-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ResearchWorkspaceReleaseCandidatePanel" `
  -CommandLabel "Go to Research Workspace Release Candidate" `
  -Modules @("research-workspace-release-candidate-types.ts","research-workspace-release-candidate-summary.ts","index.ts") `
  -Components @("ResearchWorkspaceReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildResearchWorkspaceReleaseCandidateStableKey","buildResearchWorkspaceReleaseCandidate","buildResearchWorkspaceReleaseCandidates","buildResearchWorkspaceReleaseCandidateBoundary","buildResearchWorkspaceReleaseCandidateModel","summarizeResearchWorkspaceReleaseCandidate","RESEARCH_WORKSPACE_RELEASE_CANDIDATE_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Release candidate identity","Covered research surfaces","Evidence inbox readiness","Claim readiness","Citation readiness","Summary/report readiness","Privacy/redaction readiness","Next recommended route","Blocked reasons","advanced release details collapsed/secondary") + $sharedResearchSafetyMarkers) `
  -ExtraRoutes @("/research-report-export-review","/research-summary-draft-builder","/research-runbook-finalization","/evidence-conflict-resolver-review")

& (Join-Path $PSScriptRoot "codexforge-research-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Research Workspace Release Candidate smoke passed."
