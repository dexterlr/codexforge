import { buildApplyValidationStableId, buildApplyValidationStableKey, uniqueApplyValidationStrings, type HardenedValidationCommand, type HardenedValidationPlan } from "./apply-validation-hardening-types";

const TARGETED_SMOKE_MAP: readonly [string, string][] = [
  ["real-coding-flow", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-coding-flow.ps1"],
  ["/code-flow", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-coding-flow.ps1"],
  ["approved-patch-apply", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-approved-patch-apply.ps1"],
  ["real-patch-preview", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-patch-preview.ps1"],
  ["validation-runner", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-validation-runner.ps1"],
  ["local-project-reader", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-local-project-reader.ps1"],
  ["files", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-local-project-reader.ps1"],
  ["closed-loop", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-closed-loop-fix-workflow.ps1"],
  ["workflow-wizard", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-workflow-wizard.ps1"],
  ["start", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-workflow-wizard.ps1"],
  ["product-simplification", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-product-simplification.ps1"],
  ["navigation shell", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-navigation-shell.ps1"],
  ["command palette", "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-command-palette.ps1"],
];

export function buildHardenedValidationCommand(input: HardenedValidationCommand): HardenedValidationCommand {
  return { ...input, copyOnly: true };
}

export function selectHardenedValidationCommands(surfaces: readonly string[] = []): HardenedValidationCommand[] {
  const surfaceText = surfaces.join(" ").toLowerCase();
  const targeted = TARGETED_SMOKE_MAP.filter(([key]) => surfaceText.includes(key)).map(([, command]) => command);
  const commands = uniqueApplyValidationStrings([
    "npm run build",
    ...targeted,
    "npm run smoke:codexforge:server",
    "git diff --check",
    "git status --short",
    "git diff --stat",
  ]);
  return commands.map((command, index) =>
    buildHardenedValidationCommand({
      id: buildApplyValidationStableKey("hardened-validation-command", String(index), command),
      label: command.startsWith("powershell") ? "Targeted smoke" : command,
      command,
      reason: command.includes("smoke-codexforge") ? "Targeted smoke based on changed surface." : "Baseline validation for build, smoke, diff, and working tree review.",
      required: command === "npm run build" || command === "npm run smoke:codexforge:server" || command === "git diff --check",
      copyOnly: true,
    })
  );
}

export function buildHardenedValidationPlan(args: { surfaces?: readonly string[] | null } = {}): HardenedValidationPlan {
  const selectedSurfaces = uniqueApplyValidationStrings(args.surfaces ?? ["/code-flow", "real-coding-flow", "approved-patch-apply", "validation-runner"]);
  const commands = selectHardenedValidationCommands(selectedSurfaces);
  const plan: HardenedValidationPlan = {
    id: buildApplyValidationStableId("hardened-validation-plan", ...selectedSurfaces, String(commands.length)),
    commands,
    selectedSurfaces,
    canCopyCommands: true,
    uiCannotRunCommandsDirectly: true,
    noAutoRunGuarantee: true,
    summary: [],
  };
  return { ...plan, summary: summarizeHardenedValidationPlan(plan) };
}

export function summarizeHardenedValidationPlan(plan: HardenedValidationPlan): string[] {
  return [
    `${plan.commands.length} validation command(s) selected.`,
    "UI can copy commands; UI cannot run commands directly unless an existing approved Validation Runner policy path is used.",
    "No auto-run guarantee is active.",
  ];
}
