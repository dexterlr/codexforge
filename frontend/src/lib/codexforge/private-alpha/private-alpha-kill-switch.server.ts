import "server-only";

import { lstat, open } from "node:fs/promises";
import {
  CODEXFORGE_PROJECT_ROOT,
  joinCodexForgeSafeRelativePath,
} from "@/lib/codexforge/server-safe-paths";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  isPrivateAlphaKillSwitchValueEngaged,
} from "./private-alpha-validation";
import type { PrivateAlphaKillSwitchSource } from "./private-alpha-types";
import {
  PrivateAlphaNativeFilesystemError,
  readPrivateAlphaNativeFileIfPresent,
} from "./private-alpha-native-filesystem.server";

type PrivateAlphaKillSwitchOptions = Readonly<{
  dataRootLabel?: string;
}>;

type PrivateAlphaKillSwitchFileState =
  | Readonly<{ kind: "absent" }>
  | Readonly<{ kind: "value"; value: string }>
  | Readonly<{ kind: "unsafe" }>;

const PRIVATE_ALPHA_KILL_SWITCH_MAX_BYTES = 64;
const PRIVATE_ALPHA_DISENGAGED_KILL_SWITCH_VALUES = new Set([
  "0",
  "false",
  "off",
  "disabled",
  "disengaged",
]);

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

async function readKillSwitchFileValue(
  dataRootLabel: string,
  fileAbsolutePath: string
): Promise<PrivateAlphaKillSwitchFileState> {
  if (process.platform === "win32") {
    try {
      const bytes = readPrivateAlphaNativeFileIfPresent(
        dataRootLabel,
        ["KILL_SWITCH"],
        PRIVATE_ALPHA_KILL_SWITCH_MAX_BYTES
      );
      if (bytes === null) return { kind: "absent" };
      if (bytes.length <= 0) return { kind: "unsafe" };
      return { kind: "value", value: bytes.toString("utf8").trim() };
    } catch (error) {
      if (error instanceof PrivateAlphaNativeFilesystemError) {
        return { kind: "unsafe" };
      }
      return { kind: "unsafe" };
    }
  }
  try {
    const pathStat = await lstat(fileAbsolutePath);
    if (
      pathStat.isSymbolicLink() ||
      !pathStat.isFile() ||
      pathStat.nlink !== 1 ||
      pathStat.size <= 0 ||
      pathStat.size > PRIVATE_ALPHA_KILL_SWITCH_MAX_BYTES
    ) {
      return { kind: "unsafe" };
    }
    const handle = await open(fileAbsolutePath, "r");
    try {
      const before = await handle.stat();
      if (
        !before.isFile() ||
        before.nlink !== 1 ||
        before.dev !== pathStat.dev ||
        before.ino !== pathStat.ino ||
        before.size !== pathStat.size
      ) {
        return { kind: "unsafe" };
      }
      const buffer = Buffer.alloc(PRIVATE_ALPHA_KILL_SWITCH_MAX_BYTES + 1);
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
      const after = await handle.stat();
      if (
        after.dev !== before.dev ||
        after.ino !== before.ino ||
        after.size !== before.size ||
        bytesRead !== before.size ||
        bytesRead > PRIVATE_ALPHA_KILL_SWITCH_MAX_BYTES
      ) {
        return { kind: "unsafe" };
      }
      return { kind: "value", value: buffer.subarray(0, bytesRead).toString("utf8").trim() };
    } finally {
      await handle.close().catch(() => undefined);
    }
  } catch (error) {
    return isMissingError(error) ? { kind: "absent" } : { kind: "unsafe" };
  }
}

function isExplicitlyDisengaged(value: string): boolean {
  return PRIVATE_ALPHA_DISENGAGED_KILL_SWITCH_VALUES.has(value.trim().toLowerCase());
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
  const environmentValue = process.env.CODEXFORGE_PRIVATE_ALPHA_KILL_SWITCH;
  const fileState = await readKillSwitchFileValue(
    dataRootLabel,
    killSwitchFileAbsolutePath
  );

  if (
    environmentValue !== undefined &&
    (isPrivateAlphaKillSwitchValueEngaged(environmentValue.trim()) ||
      !isExplicitlyDisengaged(environmentValue))
  ) {
    killSwitchSources.push("environment");
  }

  if (
    fileState.kind === "unsafe" ||
    (fileState.kind === "value" &&
      (isPrivateAlphaKillSwitchValueEngaged(fileState.value) ||
        !isExplicitlyDisengaged(fileState.value)))
  ) {
    killSwitchSources.push("file");
  }

  return {
    killSwitchEngaged: killSwitchSources.length > 0,
    killSwitchSources,
  };
}
