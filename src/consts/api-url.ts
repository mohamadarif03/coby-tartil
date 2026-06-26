import { ObjectType } from "@/types/object-type";

type UrlGroupType = ObjectType<string>;

export const AUTH = {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
    ME: "/auth/me",
} as const satisfies UrlGroupType

export const STUDENT = {
    GET: "/teacher/students",
    CREATE: "/teacher/students",
    DELETE: "/teacher/students/{student_id}",
    UPDATE: "/teacher/students/{student_id}",
    GET_SINGLE: "/teacher/students/{student_id}"
}

export const DASHBOARD_STATS = {
    GET_TOP_STUDENTS: "/statistics/get-top-students",
    GET_COUNT_STUDENTS: "/statistics/get-count-students",
}
