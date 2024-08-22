export interface Category {
    id: number;
    title: string;
    description: string | null;
}
export interface CategoryMutation {
    title: string;
    description: string | null;
}
