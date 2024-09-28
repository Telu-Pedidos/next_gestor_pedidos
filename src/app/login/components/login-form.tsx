"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICON } from "@/icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../../components/ui/form";

import { useRouter } from "next/navigation";
import login from "@/actions/auth/login";
import toast from "react-hot-toast";
import { LoginFormValues, loginSchema } from "@/validations/login-validation";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: ""
    }
  });

  const {
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
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
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#595548]">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Entre com seu e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#595548]">Senha</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 w-full space-y-4">
            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full gap-3"
              disabled
            >
              <ICON.Google className="size-6" />
              Entre com o Google
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
