import { RoleEnum } from "@/enums/roles-enum";

export type StudentRoleType = RoleEnum.STUDENT;
export type TeacherRoleType = RoleEnum.TEACHER;
export type RoleType = StudentRoleType | TeacherRoleType;