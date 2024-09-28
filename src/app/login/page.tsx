import Image from "next/image";

import { Metadata } from "next";
import { IMAGE } from "@/utils/image";
import LoginForm from "./components/login-form";

export const metadata: Metadata = {
  title: "Login | Télu Personalizados",
  description: "Logue para acessar o gestor de pedidos Télu Personalizados."
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-card">
      <div className="container flex w-full max-w-5xl flex-wrap items-center justify-center md:justify-between">
        <div className="hidden md:block">
          <Image
            src={IMAGE.Logo}
            alt="Télu Personalizados"
            width={320}
            height={320}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <Image
              src={IMAGE.LogoSm}
              alt="Télu Personalizados"
              width={96}
              height={96}
              className="size-16 md:size-12"
            />
          </div>

          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-semibold text-foreground">
              Faça seu login
            </h1>
            <p className="text-base text-muted-foreground">
              Bem vindo de volta! Por favor, insira seus dados.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
