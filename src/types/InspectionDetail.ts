import { Vehicle } from "./Vehicle";
import { Violation } from "./Violation";

export type InspectionDetail = {
    id: number;
    inspection_date: string;
    report_state: string;
    report_number: string;
    level: number;
    time_weight: number;
    Placarable_HM_Veh_Insp: string;
    HM_inspection: string;
    status: string;
    Vehicles: Vehicle[];
    Violations: Violation[];
}

