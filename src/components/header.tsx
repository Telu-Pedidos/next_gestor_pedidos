"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger
} from "@/components/ui/sheet";

import logout from "@/actions/auth/logout";
import { IMAGE } from "@/utils/image";
import { iconsLinks, menuLinks } from "@/utils/links";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOutIcon, MenuIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { DialogClose } from "./ui/dialog";

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
    <>
      <header className="sticky top-0 hidden h-screen flex-col justify-between border-r border-r-secondary bg-card p-6 pb-8 text-sm md:flex md:w-64 md:min-w-64 lg:w-72 lg:min-w-72">
        <div>
          <Link
            href="/dashboard"
            className="mb-8 flex flex-col items-center gap-3 md:flex-row"
          >
            <Image
              src={IMAGE.LogoSm}
              alt="Télu Pedidos"
              width={96}
              height={96}
              className="size-16 md:size-12"
            />
            <span className="text-xl font-semibold uppercase text-active">
              Télu Pedidos
            </span>
          </Link>

          <ul className="text-link flex-col gap-3 font-medium md:flex">
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

        <ul className="text-link sticky top-0 flex-col gap-3 font-medium md:flex">
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
      <HeaderMobile />
    </>
  );
}

export function HeaderMobile() {
  const [isPending, startTransition] = useTransition();
  const path = usePathname();

  async function handleLogout() {
    startTransition(async () => {
      await logout();
      toast.success("Usuário deslogado com sucesso!");
    });
  }

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b bg-card px-4 py-2 md:hidden md:w-72">
      <Link href="/dashboard" className="flex flex-wrap items-center gap-3">
        <Image
          src={IMAGE.LogoSm}
          alt="Télu Pedidos"
          width={48}
          height={48}
          className="size-12 md:size-12"
        />
        <span className="hidden text-sm font-semibold uppercase text-active clock:block">
          Télu Pedidos
        </span>
      </Link>
      <Sheet>
        <SheetTrigger>
          <Button variant="secondary" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader />
          <SheetDescription />

          <div className="flex h-full flex-col justify-between">
            <ul className="text-link mt-10 flex flex-col gap-3 font-medium">
              {menuLinks.map((link) => (
                <li key={link.id}>
                  <DialogClose asChild>
                    <Link
                      href={link.href}
                      className={`inline-flex w-full items-center gap-4 rounded-md px-2 py-3 transition-colors hover:text-primary-foreground focus-visible:text-primary-foreground ${link.href === path && "bg-primary/40 text-primary-foreground"}`}
                    >
                      {iconsLinks[link.id]}
                      <span>{link.name}</span>
                    </Link>
                  </DialogClose>
                </li>
              ))}
            </ul>

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
                  <span className="text-base font-medium text-inherit">
                    Sair
                  </span>
                </Button>
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
