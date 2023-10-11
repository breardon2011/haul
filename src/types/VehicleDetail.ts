import { Inspection } from "./Inspection";

export type VehicleDetail = {
    id: number;
    unit: number;
    vehicle_id_number: string;
    unit_type: string;
    license_state: string;
    license_number: string;
    Inspections: Inspection[];
}