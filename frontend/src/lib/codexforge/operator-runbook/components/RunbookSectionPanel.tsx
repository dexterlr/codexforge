import { buildRunbookSection } from "../index";
import { ItemPanel } from "./ItemPanel";
export function RunbookSectionPanel() { return <ItemPanel item={buildRunbookSection()} />; }
