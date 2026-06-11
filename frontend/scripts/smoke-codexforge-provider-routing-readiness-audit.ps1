param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\provider-routing-readiness-audit"
$route = "src\app\provider-routing-readiness-audit"
$newRoutes = @(
  "/local-bridge-readiness-audit",
  "/provider-routing-readiness-audit",
  "/connector-permission-readiness-audit",
  "/automation-permission-readiness-audit"
)

$phaseMarkers = @(
  "Provider routing readiness audit",
  "Provider routing audit does not send provider traffic",
  "Provider routing requires explicit approval",
  "Keys and tokens are never displayed or stored here",
  "Provider groups",
  "Model routing preview"
)

$readinessSafetyMarkers = @(
  "review-only",
  "approval required",
  "no action execution from UI",
  "no workflow execution",
  "no approval automation",
  "no approval is granted",
  "no permission grant persistence",
  "no local bridge endpoint calls",
  "no local service calls",
  "no local tool launching",
  "no local probes",
  "no provider API calls",
  "no provider live connection tests",
  "no provider traffic",
  "no connector API calls",
  "no connector account connection",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no watch creation",
  "no background job creation",
  "no notification sending",
  "no provider key storage",
  "no connector token storage",
  "no token storage",
  "no localStorage writes",
  "no sessionStorage writes",
  "no localStorage/sessionStorage token storage",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no prompt/file/project/connector/provider/automation data sending without approval",
  "no prompt/file/project/connector data sending without approval",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no duplicate menus",
  "advanced provider details collapsed/secondary"
)

& (Join-Path $PSScriptRoot "codexforge-local-project-knowledge-smoke-helper.ps1") `
  -PhaseName "Phase 403 Provider Routing Readiness Audit" `
  -ScriptFile "smoke-codexforge-provider-routing-readiness-audit.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "ProviderRoutingReadinessAuditPanel" `
  -CommandLabel "Go to Provider Routing Readiness Audit" `
  -Modules @("provider-routing-readiness-audit-types.ts","provider-routing-readiness-audit-summary.ts","index.ts") `
  -Components @("ProviderRoutingReadinessAuditPanel.tsx","index.ts") `
  -Exports @("buildProviderRoutingReadinessAuditStableKey","buildProviderRoutingReadinessAudit","buildProviderRoutingReadinessAudits","buildProviderRoutingReadinessAuditBoundary","buildProviderRoutingReadinessAuditModel","summarizeProviderRoutingReadinessAudit","PROVIDER_ROUTING_READINESS_AUDIT_LANGUAGE") `
  -PhaseMarkers $phaseMarkers `
  -PlainEnglish @(@("provider routing readiness identity","denied routing paths","key/token safety rules","manual validation checklist","blocked provider risks","connector permission route","automation permission route","next recommended action") + $readinessSafetyMarkers) `
  -ExtraRoutes @("/connector-permission-readiness-audit","/automation-permission-readiness-audit","/provider-governance-release-candidate","/provider-tests")

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

$source = ((Get-ChildItem -Recurse -File $domain, $route) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
Assert-NotMatches $source "providerApiCallsAllowedFromUi:\s*true|liveProviderTrafficAllowedFromUi:\s*true|providerConnectionTestsAllowedFromUi:\s*true|providerKeyStorageAllowedFromUi:\s*true|providerTokenStorageAllowedFromUi:\s*true|testProviderConnection\s*\(|callProviderApi\s*\(|sendProviderTraffic\s*\(|routeLiveProviderTraffic\s*\(|storeProviderKey\s*\(|storeProviderToken\s*\(" "no provider API calls traffic live tests or key token storage"
Assert-NotMatches $source "localBridgeEndpointCallsAllowedFromUi:\s*true|localServiceCallsAllowedFromUi:\s*true|localToolLaunchingAllowedFromUi:\s*true|callLocalBridge\s*\(|callLocalService\s*\(|launchLocalTool\s*\(|runHealthProbe\s*\(" "no local bridge endpoint calls local service calls local tool launching or probes"
Assert-NotMatches $source "connectorApiCallsAllowedFromUi:\s*true|connectorAccountConnectionAllowedFromUi:\s*true|connectorTokenStorageAllowedFromUi:\s*true|connectAccount\s*\(|connectGmail\s*\(|callConnectorApi\s*\(|storeConnectorToken\s*\(" "no connector API calls account connection or connector token storage"
Assert-NotMatches $source "automationCreationAllowedFromUi:\s*true|reminderCreationAllowedFromUi:\s*true|taskSchedulingAllowedFromUi:\s*true|watchCreationAllowedFromUi:\s*true|backgroundJobCreationAllowedFromUi:\s*true|notificationSendingAllowedFromUi:\s*true|createAutomation\s*\(|createReminder\s*\(|scheduleTask\s*\(|createWatch\s*\(|createBackgroundJob\s*\(|sendNotification\s*\(" "no automation reminder task watch background job or notification creation"
Assert-NotMatches $source "permissionGrantPersistenceAllowedFromUi:\s*true|persistPermissionGrant\s*\(|localStorage\.setItem|sessionStorage\.setItem|storeToken\s*\(|storeApiKey\s*\(" "no permission grant persistence or browser credential storage"
Assert-NotMatches $source "sendPrompt\s*\(|sendFiles\s*\(|sendProjectData\s*\(|sendConnectorData\s*\(|sendProviderData\s*\(|sendAutomationData\s*\(" "no prompt file project connector provider or automation data sending"
Assert-NotMatches $source "runWorkflow\s*\(|executeWorkflow\s*\(|runTests\s*\(|runBuild\s*\(|runSmoke\s*\(|writeFile\s*\(|exportFile\s*\(|deleteFile\s*\(|applyPatch\s*\(|applyDiff\s*\(" "no workflow test build smoke file mutation export deletion or patch apply behavior"

& (Join-Path $PSScriptRoot "codexforge-route-registry-health-smoke-helper.ps1") `
  -ExpectedRoutes $newRoutes

Write-Host "[OK] CodexForge Provider Routing Readiness Audit smoke passed."
