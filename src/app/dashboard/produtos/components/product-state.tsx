"use client";

import { useState, useTransition } from "react";
import State from "@/components/state";
import activateProduct from "@/actions/product/activate-product";
import toast from "react-hot-toast";
import deactivateProduct from "@/actions/product/deactivate-product";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ProductStateProps = {
  active: boolean;
  id: string;
};

export default function ProductState({ id, active }: ProductStateProps) {
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(active);

  const handleActivate = () => {
    startTransition(async () => {
      try {
        const result = await activateProduct(id);
        if (result.ok) {
          setIsActive(true);
        } else {
          console.error(result.error || "Erro ao ativar o produto.");
        }
      } catch (error) {
        toast.error("Erro ao ativar o produto.");
        console.error(error);
      }
    });
  };

  const handleDeactivate = () => {
    startTransition(async () => {
      try {
        const result = await deactivateProduct(id);
        if (result.ok) {
          setIsActive(false);
        } else {
          console.error(result.error || "Erro ao desativar o produto.");
        }
      } catch (error) {
        toast.error("Erro ao desativar o produto.");
        console.error(error);
      }
    });
  };

  return (
    <div>
      {isActive ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-default">
            <State active={true}>Disponível</State>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              asChild
              className="flex items-center justify-center gap-2"
            >
              <Button
                onClick={handleDeactivate}
                disabled={isPending}
                variant="link"
                size="sm"
                className="m-0 mx-auto h-fit rounded-md p-0 ring-0 hover:border-none hover:bg-inherit hover:outline-none focus:border-none focus:bg-inherit focus:outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0"
              >
                <State active={false}>Esgotado</State>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-default">
            <State active={false}>Esgotado</State>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              asChild
              className="flex items-center justify-center gap-2"
            >
              <Button
                onClick={handleActivate}
                disabled={isPending}
                variant="link"
                size="sm"
                className="m-0 mx-auto h-fit rounded-md p-0 ring-0 hover:border-none hover:bg-inherit hover:outline-none focus:border-none focus:bg-inherit focus:outline-none focus-visible:border-none focus-visible:outline-none focus-visible:ring-0"
              >
                <State active={true}>Disponível</State>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
