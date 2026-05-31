import { buildProductTrialObservation } from "../index";
import { ItemPanel } from "./ItemPanel";
export function ProductTrialResultPanel() { return <ItemPanel item={buildProductTrialObservation()} />; }
