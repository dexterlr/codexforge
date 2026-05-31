import { buildProductTrialValidation } from "../index";
import { ItemPanel } from "./ItemPanel";
export function ProductTrialHandoffPanel() { return <ItemPanel item={buildProductTrialValidation()} />; }
