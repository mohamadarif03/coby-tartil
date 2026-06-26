import z from "zod";

export const inviteStudentSchema = z.object({
    email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
});

export type InviteStudentType = z.infer<typeof inviteStudentSchema>;

export const createStudentSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    disability_type: z.preprocess(
      (v) => (v === "" || v === null || v === undefined ? null : v),
      z.union([z.literal("tuna_netra"), z.literal("tuna_rungu_wicara"), z.null()])
    ).optional().default(null),
});

export type CreateStudentType = z.infer<typeof createStudentSchema>;
