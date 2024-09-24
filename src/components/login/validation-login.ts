import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Deve ser um e-mail válido.")
    .max(100, "E-mail não pode conter mais de 100 caracteres"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres.")
    .max(40, "Senha não pode conter mais de 40 caracteres")
});

export type LoginFormValues = z.infer<typeof loginSchema>;
