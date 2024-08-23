export interface Category {
    id: number;
    title: string;
    description: string | null;
}

export interface CategoryMutation {
    title: string;
    description: string | null;
}

export interface myLocation {
    id: number;
    title: string;
    description: string | null;
}

export interface LocationMutation {
    title: string;
    description: string | null;
}

export interface Item {
    id: number;
    category_id: number;
    location_id: number;
    title: string;
    description: string | null;
    image: string | null;
    datetime: string
}
export interface ItemMutation {
    category_id: number;
    location_id: number;
    title: string;
    description: string | null;
    image: string | null;
}