import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres")
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
