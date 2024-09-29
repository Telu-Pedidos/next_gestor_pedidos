import { ReactNode } from "react";
import { Badge } from "./ui/badge";
import { ChevronDownIcon } from "lucide-react";

type StateProps = {
  children: ReactNode;
  active: boolean;
};

export default function State({ children, active }: StateProps) {
  return (
    <Badge
      className={`flex w-fit cursor-pointer gap-1 border border-secondary bg-[#FFFEF4] px-2 py-1 capitalize ${active ? "text-[#3CAF47]" : "text-preparation"}`}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${active ? "bg-[#3CAF47]" : "bg-preparation"}`}
      ></span>
      <span>{children}</span>
      <ChevronDownIcon className="size-3" />
    </Badge>
  );
}
