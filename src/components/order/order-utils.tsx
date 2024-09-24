import {
  AlarmClock,
  CircleCheckIcon,
  CircleMinusIcon,
  ThumbsUpIcon
} from "lucide-react";

export type OrderStatusProps = {
  status: Status;
  activeStatus: Status;
  setActiveStatus: (status: Status) => void;
};

export type Status = "pending" | "accepted" | "preparation" | "completed";

export const renderStatusIcon = (status: Status) => {
  switch (status) {
    case "pending":
      return <CircleMinusIcon className="size-3 text-white" />;
    case "accepted":
      return <ThumbsUpIcon className="size-3 text-white" />;
    case "preparation":
      return <AlarmClock className="size-3 text-white" />;
    case "completed":
      return <CircleCheckIcon className="size-3 text-white" />;
  }
};

export const renderStatusText = (status: Status) => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "accepted":
      return "Aceito";
    case "preparation":
      return "Preparo";
    case "completed":
      return "Concluído";
  }
};

const createStatusStyles = (suffix: string = "") => ({
  pending: {
    border: `border-pending`,
    background: `bg-pending${suffix}`,
    iconBg: "bg-pending",
    text: "text-active"
  },
  accepted: {
    border: `border-accepted`,
    background: `bg-accepted${suffix}`,
    iconBg: "bg-accepted",
    text: "text-white"
  },
  preparation: {
    border: `border-preparation`,
    background: `bg-preparation${suffix}`,
    iconBg: "bg-preparation",
    text: "text-white"
  },
  completed: {
    border: `border-completed`,
    background: `bg-completed${suffix}`,
    iconBg: "bg-completed",
    text: "text-[#303C34]"
  }
});

export const statusStyles = createStatusStyles("/20");
export const statusStylesCard = createStatusStyles();
