import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  OrderUtilsProps,
  renderStatusIcon,
  renderStatusText,
  statusStyles
} from "./order-utils";
import Link from "next/link";
import { Status } from "@/validations/order-validation";

type OrderStatusProps = OrderUtilsProps & {
  orderSize: number;
};

export default function OrderStatus({
  status,
  setActiveStatus,
  activeStatus,
  orderSize
}: OrderStatusProps) {
  const searchParams = useSearchParams();
  const selectedStatus = (searchParams.get("newStatus") as Status) || "";

  const styles = statusStyles[status];

  const handleStatusChange = () => {
    setActiveStatus(status);
  };

  return (
    <Link href={`?newStatus=${status}`} passHref>
      <Button
        variant="link"
        size="normal"
        className={`flex items-center gap-2 rounded border p-1 ${styles.border} ${styles.background} ${
          selectedStatus && status === activeStatus
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
        <div className="flex items-center gap-2 text-sm font-semibold text-order">
          <p>{renderStatusText(status)}</p>
          {orderSize > 0 && (
            <span
              className={`flex size-4 items-center justify-center rounded-full bg-destructive text-xs font-normal text-white ${styles.border} ${styles.background}`}
            >
              {orderSize}
              <div className="border-inherit"></div>
            </span>
          )}
        </div>
      </Button>
    </Link>
  );
}
