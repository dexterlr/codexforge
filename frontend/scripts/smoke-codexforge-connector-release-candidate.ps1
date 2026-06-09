param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-release-candidate"
$route = "src\app\connector-release-candidate"

$sharedConnectorSafetyMarkers = @(
  "no OAuth request flow",
  "no connector authorization behavior",
  "no connector API calls",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no connector data reads",
  "no automatic email reads",
  "no automatic calendar reads",
  "no automatic contact reads",
  "no email draft/send behavior",
  "no calendar event create/update/delete behavior",
  "no contact create/update/delete behavior",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no private connector values displayed",
  "no notifications sent",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no automatic provider calls",
  "no provider API calls",
  "no prompt/file/source/connector data sending without approval",
  "no localStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no source auto-fetching",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no browser-stored signing secrets",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring"
)

$phaseMarkers = @(
  "Connector release candidate",
  "Connector release candidate remains review-only",
  "Connectors remain approval-gated",
  "No connector API request is sent from this page",
  "Privacy redaction readiness",
  "Release decision"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 340 Connector Release Candidate" `
  -ScriptFile "smoke-codexforge-connector-release-candidate.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorReleaseCandidatePanel" `
  -CommandLabel "Go to Connector Release Candidate" `
  -Modules @("connector-release-candidate-types.ts","connector-release-candidate-summary.ts","index.ts") `
  -Components @("ConnectorReleaseCandidatePanel.tsx","index.ts") `
  -Exports @("buildConnectorReleaseCandidateStableKey","buildConnectorReleaseCandidate","buildConnectorReleaseCandidates","buildConnectorReleaseCandidateBoundary","buildConnectorReleaseCandidateModel","summarizeConnectorReleaseCandidate","CONNECTOR_RELEASE_CANDIDATE_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Release candidate identity","Covered connector surfaces","Gmail boundary readiness","Calendar boundary readiness","Contacts boundary readiness","Evidence capture readiness","Known gaps","Next recommended route","Blocked reasons","advanced release details collapsed/secondary") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/connector-workspace","/connector-evidence-capture-review","/connector-privacy-redaction-review","/operator-notification-center")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

& (Join-Path $PSScriptRoot "codexforge-connector-loop-notification-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Connector Release Candidate smoke passed."
