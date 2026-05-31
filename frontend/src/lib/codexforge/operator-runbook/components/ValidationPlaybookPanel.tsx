import { buildValidationPlaybook } from "../index";
import { ItemPanel } from "./ItemPanel";
export function ValidationPlaybookPanel() { return <ItemPanel item={buildValidationPlaybook()} />; }
