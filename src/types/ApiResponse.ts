import { ResultItem } from "./ResultItem";

export type ApiResponse = {
    Count?: number;
    Message?: string;
    SearchCriteria?: string;
    Results?: ResultItem[];
}