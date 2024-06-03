import { Guest } from "./guest";

export interface Event {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    image: string;
    price: number;
    guests: Guest[];
}