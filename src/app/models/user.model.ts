import { SteamItem } from "./steamItem.model";

export class User {
    id: string;
    nome: string;
    senha: string;
    email: string;
    time: any;
    // steamItems: SteamItem[];
    token: string;
}