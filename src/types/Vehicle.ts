export type Vehicle = {
    id: number;
    unit: number;
    vehicle_id_number: string;
    unit_type: string;
    license_state: string;
    license_number: string;
    InspectionVehicles: {
        InspectionId: number;
        VehicleId: number;
    };
}
