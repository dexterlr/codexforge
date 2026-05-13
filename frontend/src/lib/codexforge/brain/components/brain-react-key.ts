export function buildStableReactKey(
  prefix: string,
  parts: readonly unknown[],
  index: number
): string {
  const stableParts = parts
    .map((part) => {
      if (typeof part === "string" || typeof part === "number" || typeof part === "boolean") {
        return String(part);
      }

      return "";
    })
    .map((part) => part.trim())
    .filter(Boolean);

  return [prefix, ...stableParts, String(index)].join(":");
}
