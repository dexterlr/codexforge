import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildAdapterBackedExecutionPreviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildAdapterBackedExecutionPreviewStableKey };

export type AdapterBackedExecutionPreviewPacketInput = ExecutionAdapterContractReviewPacketInput;

export const ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS = [
  "no live adapter implementation",
  "no adapter execution",
  "no adapter preview execution",
  "no project scaffold creation",
  "no file write/delete/mutation",
  "no command execution",
  "no local runtime start/stop",
  "no provider/model calls",
  "no prompt sending",
  "no connector access/fetch/mutation",
  "no automation/schedule/reminder/task/watch creation",
  "no evidence capture/ingestion/storage",
  "no output/result storage or reuse",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no creative/video/image/3D generation",
  "no research browsing/searching/fetching",
  "no chatbot/agent creation/deployment",
  "no video-call joining/monitoring",
  "no monitoring job creation",
  "no Minecraft/project/server build or launch execution",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "no approval automation",
  "no approval decision persistence",
  "no policy/settings/preference persistence",
  "no web/search/GitHub API calls from UI",
  "no arbitrary project scanning/local file browsing/path crawling",
  "no memory/RAG ingestion or memory auto-promotion",
  "no Brain graph mutation",
  "no plugin/tool/agent/MCP execution",
  "no credential/key/token/endpoint/output storage",
  "no process.env printing",
  "no route coverage removal",
  "no duplicate route hrefs or shortLabels",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
] as const;

export function buildAdapterBackedExecutionPreview(
  slug: string,
  input: AdapterBackedExecutionPreviewPacketInput
): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview(slug, input);
}

export function buildAdapterBackedExecutionPreviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildExecutionAdapterContractReviewAdvancedDetails(title, language, [...details, ...ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS]);
}

export function buildAdapterBackedExecutionPreviewSections(...sections: Parameters<typeof buildExecutionAdapterContractReviewSections>): ReturnType<typeof buildExecutionAdapterContractReviewSections> {
  return buildExecutionAdapterContractReviewSections(...sections);
}

export function buildAdapterBackedExecutionPreviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeAdapterBackedExecutionPreview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeExecutionAdapterContractReview(title, packets, approvalCopy);
}

export function buildAdapterBackedExecutionPreviewModel(input: Parameters<typeof buildExecutionAdapterContractReviewModel>[0]) {
  return buildExecutionAdapterContractReviewModel(input);
}
