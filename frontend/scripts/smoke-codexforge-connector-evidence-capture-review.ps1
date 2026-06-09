param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-evidence-capture-review"
$route = "src\app\connector-evidence-capture-review"

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
  "Connector evidence capture review",
  "Connector evidence is reviewed before use",
  "No connector data is captured from this page",
  "Connector data is not auto-promoted to memory",
  "Evidence packet summary",
  "Redaction route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 338 Connector Evidence Capture Review" `
  -ScriptFile "smoke-codexforge-connector-evidence-capture-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorEvidenceCaptureReviewPanel" `
  -CommandLabel "Go to Connector Evidence Capture Review" `
  -Modules @("connector-evidence-capture-review-types.ts","connector-evidence-capture-review-summary.ts","index.ts") `
  -Components @("ConnectorEvidenceCaptureReviewPanel.tsx","index.ts") `
  -Exports @("buildConnectorEvidenceCaptureReviewStableKey","buildConnectorEvidenceCaptureReview","buildConnectorEvidenceCaptureReviews","buildConnectorEvidenceCaptureReviewBoundary","buildConnectorEvidenceCaptureReviewModel","summarizeConnectorEvidenceCaptureReview","CONNECTOR_EVIDENCE_CAPTURE_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Evidence capture identity","Source connector workspace","Approved connector boundary dependency","Capture source summary","Allowed evidence types","Denied evidence types","Release candidate route","Blocked reasons","advanced evidence details collapsed/secondary") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/connector-workspace","/gmail-connector-boundary","/connector-privacy-redaction-review","/connector-release-candidate")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

& (Join-Path $PSScriptRoot "codexforge-connector-loop-notification-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Connector Evidence Capture Review smoke passed."
