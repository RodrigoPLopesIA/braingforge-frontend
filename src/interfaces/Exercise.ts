export interface Exercise {
    id: string;
    title: string;
    options: string[] | null;
    type: "MULTIPLE_CHOICE" | "DISCURSIVE";
    score: number;
    createdAt: string;
    updatedAt: string;
}

export interface ContentItem {
    id: string;
    theme: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    questions: Exercise[];
    createdAt: string;
    updatedAt: string;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ApiResponse {
    content: ContentItem[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
