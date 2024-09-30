"use client";

import logout from "@/actions/auth/logout";
import { IMAGE } from "@/utils/image";
import { iconsLinks, menuLinks } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useTransition } from "react";

export default function Header() {
  const [isPending, startTransition] = useTransition();
  const path = usePathname();

  async function handleLogout() {
    startTransition(async () => {
      await logout();
      toast.success("Usuário deslogado com sucesso!");
    });
  }

  return (
    <header className="flex flex-col justify-between border-r border-r-secondary bg-card p-6 pb-8 text-sm">
      <div>
        <Link href="/dashboard" className="mb-8 flex items-center gap-3">
          <Image
            src={IMAGE.LogoSm}
            alt="Télu Personalizados"
            width={96}
            height={96}
            className="size-16 md:size-12"
          />
          <span className="text-xl font-semibold uppercase text-active">
            Télu Pedidos
          </span>
        </Link>
        <ul className="text-link flex flex-col gap-3 font-medium">
          {menuLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className={`inline-flex w-full items-center gap-4 rounded-md px-2 py-3 transition-colors hover:text-primary-foreground focus-visible:text-primary-foreground ${link.href === path && "bg-primary/40 text-primary-foreground"}`}
              >
                {iconsLinks[link.id]}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ul className="text-link flex flex-col gap-3 font-medium">
        <li>
          <Button
            className="flex w-full justify-start gap-4 px-2 py-4 transition-all hover:text-primary-foreground focus-visible:text-primary-foreground"
            variant="link"
            size="normal"
            onClick={handleLogout}
            disabled={isPending}
          >
            <LogOutIcon className="size-6" />
            <span className="text-base font-medium text-inherit">Sair</span>
          </Button>
        </li>
      </ul>
    </header>
  );
}
