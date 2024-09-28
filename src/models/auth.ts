import { z } from "zod";
import { loginSchema } from "@/validations/login-validation";

export type AuthenticationDTO = z.infer<typeof loginSchema>;

export type AuthenticationResponse = AuthenticationDTO & {
  id: string;
  role: string;
};
