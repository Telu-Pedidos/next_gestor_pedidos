import { emailRegex, phoneRegex } from "@/constants/regex";
import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres"),
  phone: z
    .string()
    .min(1, "O telefone é obrigatório")
    .regex(phoneRegex, "Forneça um número de telefone válido"),
  email: z
    .string()
    .optional()
    .refine(
      (value) => !value || emailRegex.test(value),
      "Forneça um e-mail válido"
    ),
  address: z
    .string()
    .max(255, "O endereço não pode passar de 255 caracteres")
    .optional()
});

export type ClientFormValues = z.infer<typeof clientSchema>;
