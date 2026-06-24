import { ObjectType } from "@/types/object-type";

type UrlGroupType = ObjectType<string>;

export const AUTH = {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    LOGOUT: "/v1/auth/logout",
    DISABILITY: "/v1/user/accessibility",
    EMAIL_VERIFICATION: "/v1/auth/verify-email",
    ME: "/v1/auth/me",
} as const satisfies UrlGroupType