import { SteamItem } from "./steamItem.model";

export class User {
    id: string;
    nome: string;
    senha: string;
    email: string;
    // steamItems: SteamItem[];
    access_token: string;
}