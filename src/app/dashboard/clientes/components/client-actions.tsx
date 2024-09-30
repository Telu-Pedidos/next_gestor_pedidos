import { PencilIcon } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { copyPhone } from "@/app/dashboard/clientes/client-functions";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import ClientDelete from "./client-delete";
import { ClientResponse } from "@/models/client";

type ClientActionsProps = {
  client: ClientResponse;
};

export default function ClientActions({ client }: ClientActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir Menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {client.phone && (
          <>
            <DropdownMenuItem onClick={() => copyPhone(client.phone || "")}>
              Copiar telefone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-active"
        >
          <Link href={`/dashboard/clientes/alterar/${client.id}`}>
            <PencilIcon className="size-4" />
            Editar Cliente
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="flex items-center gap-2 text-active"
        >
          <ClientDelete name={client.name} id={client.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
