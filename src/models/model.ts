import { modelSchema } from "@/validations/model-validation";
import { z } from "zod";

export type ModelDTO = z.infer<typeof modelSchema>;

export type ModelResponse = ModelDTO & {
  id: number;
};
