import { User } from "./types";

declare global {
    namespace NodeJS {
        interface Global {
            CustomJwtSessionClaims: User;
        }
    }
}