import { LoaderCircleIcon } from "lucide-react";

export default function LoadingComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoaderCircleIcon className="size-28 animate-spin text-primary" />
    </div>
  );
}
