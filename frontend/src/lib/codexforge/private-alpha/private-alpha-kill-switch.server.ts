import "server-only";

import { lstat, readFile } from "node:fs/promises";
import {
  CODEXFORGE_PROJECT_ROOT,
  joinCodexForgeSafeRelativePath,
} from "@/lib/codexforge/server-safe-paths";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  isPrivateAlphaKillSwitchValueEngaged,
} from "./private-alpha-validation";
import type { PrivateAlphaKillSwitchSource } from "./private-alpha-types";

type PrivateAlphaKillSwitchOptions = Readonly<{
  dataRootLabel?: string;
}>;

export type PrivateAlphaKillSwitchState = Readonly<{
  killSwitchEngaged: boolean;
  killSwitchSources: readonly PrivateAlphaKillSwitchSource[];
}>;

function isMissingError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}

async function readKillSwitchFileValue(fileAbsolutePath: string): Promise<string | null> {
  const stat = await lstat(fileAbsolutePath).catch((error: unknown) => {
    if (isMissingError(error)) {
      return null;
    }

    throw error;
  });

  if (!stat || stat.isSymbolicLink() || !stat.isFile()) {
    return null;
  }

  const rawValue = await readFile(fileAbsolutePath, "utf8");
  return rawValue.trim();
}

export async function readPrivateAlphaKillSwitchState(
  options: PrivateAlphaKillSwitchOptions = {}
): Promise<PrivateAlphaKillSwitchState> {
  const dataRootLabel = options.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL;
  const killSwitchFileAbsolutePath = joinCodexForgeSafeRelativePath(
    joinCodexForgeSafeRelativePath(CODEXFORGE_PROJECT_ROOT, dataRootLabel),
    "KILL_SWITCH"
  );

  const killSwitchSources: PrivateAlphaKillSwitchSource[] = [];
  const environmentValue =
    process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH?.trim() ?? "";
  const fileValue = await readKillSwitchFileValue(killSwitchFileAbsolutePath);

  if (environmentValue && isPrivateAlphaKillSwitchValueEngaged(environmentValue)) {
    killSwitchSources.push("environment");
  }

  if (fileValue && isPrivateAlphaKillSwitchValueEngaged(fileValue)) {
    killSwitchSources.push("file");
  }

  return {
    killSwitchEngaged: killSwitchSources.length > 0,
    killSwitchSources,
  };
}
