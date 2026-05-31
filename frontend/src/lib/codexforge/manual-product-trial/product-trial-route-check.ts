import { buildManualProductTrialItem, type ManualProductTrialItem } from "./manual-product-trial-types";
export function buildProductTrialRouteCheck(): ManualProductTrialItem {
  return buildManualProductTrialItem("route-check", "Route checks", "Home looks premium; Start has clear Fix code path; live run explains next step; files nav is not cramped; guarded apply states one file, one diff, one approval.");
}
