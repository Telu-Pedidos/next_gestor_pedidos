import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function Menu() {
  return (
    <aside className="hidden border-b border-b-secondary bg-card px-8 py-7 md:mb-7 md:block md:rounded-md">
      <div className="relative w-full md:max-w-96">
        <SearchIcon className="absolute bottom-0 left-4 top-3 size-5 text-[#858D9D]" />
        <Input
          placeholder="Pesquisar produto, pedido"
          className="border-[#F0F1F3] pl-12 placeholder:text-[#858D9D]"
        />
      </div>
    </aside>
  );
}
