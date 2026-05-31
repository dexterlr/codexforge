import { buildRunbookStep } from "../index";
import { ItemPanel } from "./ItemPanel";
export function RunbookStepPanel() { return <ItemPanel item={buildRunbookStep()} />; }
