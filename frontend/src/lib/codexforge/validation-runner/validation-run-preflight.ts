import { isSmokeCodexForgeScriptCommand } from "./validation-command-catalog";
import {
  buildValidationRunnerStableId,
  type ValidationPreflightCheck,
  type ValidationPreflightStatus,
  type ValidationRunPolicy,
  type ValidationRunPreflight,
  type ValidationRunRequest,
  type ValidationRunApproval,
} from "./validation-runner-types";

function worstStatus(checks: readonly ValidationPreflightCheck[]): ValidationPreflightStatus {
  if (checks.some((check) => check.status === "blocker")) return "blocker";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.every((check) => check.status === "pass")) return "pass";
  return "unknown";
}

export function buildValidationRunPreflightCheck(args: {
  label: string;
  status: ValidationPreflightStatus;
  detail: string;
  blocksRun?: boolean | null;
}): ValidationPreflightCheck {
  return {
    id: buildValidationRunnerStableId("validation-preflight-check", args.label),
    label: args.label,
    status: args.status,
    detail: args.detail,
    blocksRun: args.blocksRun ?? args.status === "blocker",
  };
}

export function buildValidationRunPreflight(args: {
  request: ValidationRunRequest;
  approval: ValidationRunApproval;
  policy: ValidationRunPolicy;
  sourceRouteKnown?: boolean | null;
  outputRoutingSelected?: boolean | null;
}): ValidationRunPreflight {
  const commands = args.request.selectedCommands;
  const commandText = commands.map((command) => command.command).join("\n");
  const hasBuild = commands.some((command) => command.command === "npm run build");
  const hasServerSmoke = commands.some((command) => command.command === "npm run smoke:codexforge:server");
  const hasGitCheck = commands.some((command) => command.command === "git diff --check" || command.command === "git status --short");
  const hasTargetedSmoke = commands.some((command) => command.category === "targeted-smoke");
  const arbitraryScript = commands.some((command) => command.command.toLowerCase().includes("powershell") && !isSmokeCodexForgeScriptCommand(command.command));
  const checks = [
    buildValidationRunPreflightCheck({ label: "command selected", status: commands.length > 0 ? "pass" : "blocker", detail: `${commands.length} command(s) selected.` }),
    buildValidationRunPreflightCheck({ label: "command allowlisted", status: commands.every((command) => command.allowlisted) ? "pass" : "blocker", detail: "preflight checks allowlisted commands" }),
    buildValidationRunPreflightCheck({ label: "approval present", status: args.approval.readyForPolicy ? "pass" : "blocker", detail: "Explicit approval and acknowledgements required." }),
    buildValidationRunPreflightCheck({ label: "policy passed", status: args.policy.allowed ? "pass" : "blocker", detail: "Policy must pass before execution bridge." }),
    buildValidationRunPreflightCheck({ label: "source route known", status: args.sourceRouteKnown === false ? "warning" : "pass", detail: `Source surface: ${args.request.sourceSurface}` }),
    buildValidationRunPreflightCheck({ label: "working tree check command included or recommended", status: hasGitCheck ? "pass" : "warning", detail: "git diff --check or git status --short recommended." }),
    buildValidationRunPreflightCheck({ label: "build command included or recommended", status: hasBuild ? "pass" : "warning", detail: "npm run build recommended." }),
    buildValidationRunPreflightCheck({ label: "targeted smoke included or recommended", status: hasTargetedSmoke ? "pass" : "warning", detail: "Targeted smoke recommended for the changed surface." }),
    buildValidationRunPreflightCheck({ label: "server smoke included or recommended", status: hasServerSmoke ? "pass" : "warning", detail: "npm run smoke:codexforge:server recommended." }),
    buildValidationRunPreflightCheck({ label: "output routing selected", status: args.outputRoutingSelected === false ? "warning" : "pass", detail: args.request.expectedOutputRouting }),
    buildValidationRunPreflightCheck({ label: "no destructive command tokens", status: /\b(rm|del|remove-item|git reset|git clean|write-file|apply-diff)\b/i.test(commandText) ? "blocker" : "pass", detail: "preflight checks destructive command tokens" }),
    buildValidationRunPreflightCheck({ label: "no external network token", status: /\b(curl|wget|invoke-webrequest|https?:\/\/|ssh|scp)\b/i.test(commandText) ? "blocker" : "pass", detail: "External network tokens are blocked." }),
    buildValidationRunPreflightCheck({ label: "no arbitrary script path outside scripts/smoke-codexforge-*.ps1", status: arbitraryScript ? "blocker" : "pass", detail: "Only smoke-codexforge PowerShell scripts are accepted." }),
  ];
  const overallStatus = worstStatus(checks);
  const preflight: ValidationRunPreflight = {
    id: buildValidationRunnerStableId("validation-preflight", args.request.requestId, overallStatus),
    requestId: args.request.requestId,
    checks,
    overallStatus,
    blockerCount: checks.filter((check) => check.status === "blocker").length,
    warningCount: checks.filter((check) => check.status === "warning").length,
    riskCount: checks.filter((check) => check.status === "risk").length,
    summary: [],
  };
  return { ...preflight, summary: summarizeValidationRunPreflight(preflight) };
}

export function summarizeValidationRunPreflight(preflight: Pick<ValidationRunPreflight, "overallStatus" | "blockerCount" | "warningCount" | "riskCount">): string[] {
  return [
    `Preflight status ${preflight.overallStatus}.`,
    `${preflight.blockerCount} blocker(s), ${preflight.warningCount} warning(s), ${preflight.riskCount} risk item(s).`,
    "Preflight does not execute commands.",
  ];
}
