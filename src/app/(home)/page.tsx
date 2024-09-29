"use client";

import LoadingComponent from "@/components/loading";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  router.push("/dashboard");

  return <LoadingComponent />;
}
