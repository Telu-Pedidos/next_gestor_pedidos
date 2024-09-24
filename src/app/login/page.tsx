import LogoSm from "/public/assets/logo-sm.png";
import Logo from "/public/assets/logo-md.png";
import Image from "next/image";

import { Metadata } from "next";
import LoginForm from "@/components/login/login-form";

export const metadata: Metadata = {
  title: "Login | Telú Personalizados",
  description: "Logue para acessar o gestor de pedidos Telú Personalizados."
};

export default function LoginPage() {
  return (
    <main className="container flex w-full max-w-5xl flex-1 flex-wrap items-center justify-center md:justify-between">
      <div className="hidden md:block">
        <Image src={Logo} alt="Telu Personalizados" width={320} height={320} />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <Image
            src={LogoSm}
            alt="Telu Personalizados"
            width={96}
            height={96}
            className="size-16 md:size-12"
          />
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-semibold text-[#1F1500]">
            Faça seu login
          </h1>
          <p className="text-base text-muted-foreground">
            Bem vindo de volta! Por favor, insira seus dados.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
