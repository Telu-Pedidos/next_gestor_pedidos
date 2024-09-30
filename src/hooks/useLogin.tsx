"use client";

import login from "@/actions/auth/login";
import { LoginFormValues } from "@/validations/login-validation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function useLogin() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    startTransition(async () => {
      try {
        const result = await login(data);
        if (!result.ok) {
          toast.error("Senha ou usuário inválidos.");
          return;
        }
        toast.success("Usuário logado com sucesso!");
        router.push("/dashboard");
      } catch (error) {
        console.error("Erro no servidor", error);
        toast.error("Erro no servidor.");
      }
    });
  };

  return {
    onSubmit,
    isPending
  };
}
