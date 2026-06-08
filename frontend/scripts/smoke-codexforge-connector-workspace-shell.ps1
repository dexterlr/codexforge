param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\connector-workspace-shell"
$route = "src\app\connector-workspace"

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
  "Connector workspace shell",
  "Connectors require explicit approval",
  "No connector data is read from this page",
  "Tokens and secrets are never displayed or stored here",
  "Data sensitivity classification",
  "Connector evidence review route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 334 Connector Workspace Shell" `
  -ScriptFile "smoke-codexforge-connector-workspace-shell.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ConnectorWorkspaceShellPanel" `
  -CommandLabel "Go to Connector Workspace Shell" `
  -Modules @("connector-workspace-shell-types.ts","connector-workspace-shell-summary.ts","index.ts") `
  -Components @("ConnectorWorkspaceShellPanel.tsx","index.ts") `
  -Exports @("buildConnectorWorkspaceShellStableKey","buildConnectorWorkspaceShell","buildConnectorWorkspaceShells","buildConnectorWorkspaceShellBoundary","buildConnectorWorkspaceShellModel","summarizeConnectorWorkspaceShell","CONNECTOR_WORKSPACE_SHELL_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Workspace identity","Connector goal summary","Connector types","Approval checklist","Gmail boundary route","Calendar boundary route","Contacts boundary route","Blocked reasons","advanced workspace details collapsed/secondary","Connector evidence is reviewed before use") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/gmail-connector-boundary","/calendar-connector-boundary","/contacts-connector-boundary","/research-evidence-inbox")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Connector Workspace Shell smoke passed."
