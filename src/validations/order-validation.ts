import { z } from "zod";

export const statuses = [
  "PENDING",
  "ACCEPTED",
  "PREPARATION",
  "COMPLETED"
] as const;

export const deliveryuses = ["WITHDRAWALS", "SHOPEE"] as const;

export type Status = (typeof statuses)[number];
export type Delivery = (typeof deliveryuses)[number];

const StatusEnum = z.enum(statuses);
const DeliveryEnum = z.enum(deliveryuses);

export const orderSchema = z.object({
  status: StatusEnum,
  total: z.number().min(0, "O total deve ser maior ou igual a 0").nullable(),
  startAt: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Data de início é obrigatória e deve ser uma data válida"
    })
    .transform((date) => date.toISOString().slice(0, 19)),
  endAt: z
    .string()
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Data de término é obrigatória e deve ser uma data válida"
    })
    .transform((date) => date.toISOString().slice(0, 19)),
  delivery: DeliveryEnum,
  observation: z
    .string()
    .max(2000, "Observação não pode exceder 2000 caracteres")
    .optional(),
  clientId: z.string({
    required_error: "O cliente é obrigatório"
  }),
  productIds: z.array(z.number()).optional()
});

export type OrderFormValues = z.infer<typeof orderSchema>;
