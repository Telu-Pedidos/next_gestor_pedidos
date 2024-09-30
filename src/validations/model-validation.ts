import { z } from "zod";

const MAX_UPLOAD_SIZE_MB = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

export const modelSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome não pode ter mais de 100 caracteres"),
  imageUrl: z.string().max(2000).optional(),
  file: z
    .union([z.instanceof(File), z.undefined()])
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_UPLOAD_SIZE_MB,
      "O tamanho do arquivo deve ser menor que 3 MB"
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      "O arquivo deve ser JPEG, JPG, PNG ou WEBP"
    )
});

export type ModelFormValues = z.infer<typeof modelSchema>;
