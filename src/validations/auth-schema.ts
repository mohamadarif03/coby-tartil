import { ROLE } from "@/enums/roles-enum";
import z from "zod";

export const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().regex(/^[0-9]+$/, { message: "kata sandi hanya dapat berisi angka" }).nonempty(),
})

export type LoginType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(8).regex(/^[0-9]+$/, { message: "kata sandi hanya dapat berisi angka" }).nonempty(),
    password_confirmation: z.string().min(8).regex(/^[0-9]+$/, { message: "kata sandi hanya dapat berisi angka" }).nonempty(),
    role: z.enum(ROLE).nonoptional()
}).refine((data) => data.password === data.password_confirmation, {
    message: "konfirmasi password tidak sesuai",
    path: ["confirm_password"],
})

export type RegisterType = z.infer<typeof registerSchema>