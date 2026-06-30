param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1821 Linked Evidence Packet Preview"
  ScriptFile = "smoke-codexforge-linked-evidence-packet-preview.ps1"
  Domain = "src\lib\codexforge\linked-evidence-packet-preview"
  Route = "src\app\linked-evidence-packet-preview"
  CommandLabel = "Go to Linked Evidence Packet Preview"
  RouteHref = "/linked-evidence-packet-preview"
  Markers = @("Linked evidence packet preview", "Linked evidence packet preview does not persist evidence promote memory write files or mutate audit trails from the UI", "Linked evidence packet preview requires backend-owned evidence capture", "Linked evidence packet preview shows simulated source link simulated result ledger reference simulated review dashboard reference simulated redaction note simulated continuity note and denied frontend persistence", "Denied linked evidence packet paths remain blocked", "Linked evidence packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params