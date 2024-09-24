import { Button } from "../ui/button";
import {
  OrderStatusProps,
  renderStatusIcon,
  renderStatusText,
  statusStyles
} from "./order-utils";

export default function OrderStatus({
  status,
  activeStatus,
  setActiveStatus
}: OrderStatusProps) {
  const styles = statusStyles[status];

  const handleStatusChange = () => {
    setActiveStatus(status);
  };

  return (
    <Button
      variant="link"
      size="normal"
      className={`flex items-center gap-2 rounded border p-1 ${styles.border} ${styles.background} ${
        status === activeStatus
          ? "opacity-100"
          : "border-inherit bg-inherit opacity-60 transition-opacity hover:opacity-80"
      }`}
      onClick={handleStatusChange}
    >
      <span
        className={`flex size-6 items-center justify-center rounded-full shadow-sm ${styles.iconBg}`}
      >
        {renderStatusIcon(status)}
      </span>
      <span className="text-sm font-semibold text-order">
        {renderStatusText(status)}
      </span>
    </Button>
  );
}
