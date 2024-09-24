"use client";

import ImageProduct from "/public/assets/image-product.jpg";

import {
  BanknoteIcon,
  CalendarIcon,
  ChevronDownIcon,
  LockIcon,
  UserIcon
} from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import {
  OrderStatusProps,
  renderStatusText,
  statusStylesCard
} from "./order-utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ICON } from "@/icons";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

export default function OrderCard({
  status,
  activeStatus,
  setActiveStatus
}: OrderStatusProps) {
  const styles = statusStylesCard[status];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full cursor-pointer rounded-md p-4 lg:flex-1">
          <CardHeader className="flex-wrapb mb-4 flex flex-row items-baseline justify-between gap-2 p-0 text-order">
            <CardTitle className="text-sm font-semibold">#0001</CardTitle>
            <Badge
              className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-active ${styles.border} ${styles.background} ${styles.text}`}
            >
              {renderStatusText(status)}
              <ChevronDownIcon className="size-[0.875rem]" />
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <UserIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">Fulano Silva</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <LockIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">Retirada</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <BanknoteIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">
                Dinheiro{" "}
                <span className="text-[0.625rem] font-medium text-[#9F9E7F]">
                  - Sem troco
                </span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="mt-9 flex flex-wrap justify-between gap-2 p-0">
            <span className="text-xs text-[#9F947F]">Recebido há 0 min</span>
            <p className="text-base font-semibold">R$ 55,00</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="flex w-full max-w-[40rem] flex-col gap-9">
        <DialogHeader className="flex-row items-baseline justify-between pt-6">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-order">#0001</p>
            <span className="text-[0.625rem] text-[#666358]">
              Recebido há 60 min
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className={`inline-flex h-8 items-center gap-1 px-2 py-1 text-xs font-semibold text-active ${styles.border} ${styles.background} ${styles.text}`}
              >
                {renderStatusText(status)}
                <ChevronDownIcon className="size-[0.875rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuCheckboxItem
                checked={status === activeStatus}
                onCheckedChange={() => setActiveStatus("accepted")}
                className="flex gap-1 px-2 py-1 text-order"
              >
                Mover para <strong>Aceito</strong>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={status === activeStatus}
                onCheckedChange={() => setActiveStatus("preparation")}
                className="flex gap-1 px-2 py-1 text-order"
              >
                Mover para <strong>Preparo</strong>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={status === activeStatus}
                onCheckedChange={() => setActiveStatus("pending")}
                className="flex gap-1 px-2 py-1 text-order"
              >
                Mover para <strong>Entrega</strong>
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={status === activeStatus}
                onCheckedChange={() => setActiveStatus("accepted")}
                className="flex gap-1 px-2 py-1 text-order"
              >
                Mover para <strong>Concluído</strong>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogHeader>
        <div className="flex w-full justify-between gap-2 rounded border border-border p-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <UserIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">Fulano Silva</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <LockIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">Retirada</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <ICON.Whatsapp className="size-[0.875rem]" />
              <a
                href="#"
                className="text-xs font-semibold text-primary-foreground underline opacity-90 hover:opacity-100"
              >
                (21) 98978-2683
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-[#605E48]">
              <BanknoteIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">
                Dinheiro{" "}
                <span className="text-[0.625rem] font-medium text-[#9F9E7F]">
                  - Sem troco
                </span>
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-1 pr-10 text-[#605E48]">
              <CalendarIcon className="size-[0.875rem]" />
              <p className="text-xs font-medium">17/09 - 23:18</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex flex-col gap-1 text-sm font-medium">
            <span className="text-[#282510]">Qtd</span>
            <span className="font-semibold text-foreground">1</span>
          </div>
          <div className="flex flex-col gap-1 text-sm font-medium">
            <span className="text-[#282510]">Itens</span>
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Image
                src={ImageProduct}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full object-cover"
              />
              <span>Caixinha Mickey Mouse 3D e Simples Modelo</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm font-medium">
            <span className="text-[#282510]">Preços</span>
            <span className="font-semibold text-foreground">R$ 55,00</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <span className="text-xs font-medium text-[#666358]">Total</span>
          <p className="text-sm font-semibold text-foreground">R$ 55,00</p>
        </div>
        <div className="block h-[1px] w-full bg-border"></div>
        <div className="flex items-center justify-end gap-3">
          {/* <Button
            variant="secondary"
            className="text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:bg-destructive focus-visible:text-white"
          >
            Deletar
          </Button> */}
          <Dialog>
            <DialogTrigger className="rounded-md border border-border px-4 py-2 font-medium text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:bg-destructive focus-visible:text-white">
              Deletar
            </DialogTrigger>
            <DialogContent className="w-full max-w-xl">
              <DialogHeader className="flex flex-col items-center justify-center gap-6">
                <DialogTitle className="mx-auto inline-flex size-[7.5rem] cursor-default items-center justify-center rounded-full border border-[#FFA624] px-12 py-3 text-7xl font-medium text-[#FFA624]">
                  !
                </DialogTitle>
                <DialogDescription className="flex w-full flex-col text-center text-lg text-foreground">
                  Tem certeza que deseja remover o pedido
                  <span>
                    &quot;
                    <strong>
                      #0001 - Caixinha Mickey Mouse 3D e Simples Modelo
                    </strong>
                    &quot;?
                  </span>
                </DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive">Excluir</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DialogClose asChild>
            <Button>Começar o preparo</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
