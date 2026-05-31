import { buildProductTrialScenario } from "../index";
import { ItemPanel } from "./ItemPanel";
export function ProductTrialScenarioPanel() { return <ItemPanel item={buildProductTrialScenario()} />; }
