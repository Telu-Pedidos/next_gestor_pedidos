import { Status } from "@/validations/order-validation";
import {
  AlarmClock,
  CircleCheckIcon,
  CircleMinusIcon,
  ThumbsUpIcon
} from "lucide-react";

export type OrderUtilsProps = {
  status: Status;
  activeStatus: Status | null;
  setActiveStatus: (status: Status) => void;
};

export const renderStatusIcon = (status: Status) => {
  switch (status) {
    case "PENDING":
      return <CircleMinusIcon className="size-3 text-white" />;
    case "ACCEPTED":
      return <ThumbsUpIcon className="size-3 text-white" />;
    case "PREPARATION":
      return <AlarmClock className="size-3 text-white" />;
    case "COMPLETED":
      return <CircleCheckIcon className="size-3 text-white" />;
  }
};

export const renderStatusText = (status: Status) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "ACCEPTED":
      return "Aceito";
    case "PREPARATION":
      return "Preparo";
    case "COMPLETED":
      return "Concluído";
  }
};

const createStatusStyles = (suffix: string = "") => ({
  PENDING: {
    border: `border-pending`,
    background: `bg-pending${suffix}`,
    iconBg: "bg-pending",
    text: "text-active"
  },
  ACCEPTED: {
    border: `border-accepted`,
    background: `bg-accepted${suffix}`,
    iconBg: "bg-accepted",
    text: "text-white"
  },
  PREPARATION: {
    border: `border-preparation`,
    background: `bg-preparation${suffix}`,
    iconBg: "bg-preparation",
    text: "text-white"
  },
  COMPLETED: {
    border: `border-completed`,
    background: `bg-completed${suffix}`,
    iconBg: "bg-completed",
    text: "text-[#303C34]"
  }
});

export const statusStyles = createStatusStyles("/20");
export const statusStylesCard = createStatusStyles();
