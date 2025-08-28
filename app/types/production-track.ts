import { Operator } from "./operator";
import { Process } from "./process";
import { Section } from "./section";

export interface ProductionTrack {
    id?: string;
    date: string;
    section_id: string;
    operator_id: string;
    process_id: string;
    target: number | string;
    remarks: string;
    section?: Section;
    operator?: Operator;
    process?: Process;
}