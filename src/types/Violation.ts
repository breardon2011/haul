export type Violation = {
    id: number;
    code: string;
    description: string;
    oos: string;
    time_severity_weight: number;
    BASIC: string;
    unit: string;
    convicted_of_dif_charge: string;
    InspectionViolation: {
        InspectionId: number;
        ViolationId: number;
    };
}