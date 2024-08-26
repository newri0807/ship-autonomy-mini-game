export interface GameObject {
    id: number;
    x: number;
    y: number;
    type: "obstacle" | "item";
}

export interface PlayerPosition {
    x: number;
    y: number;
}
