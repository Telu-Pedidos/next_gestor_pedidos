import Link from "next/link";
import NotFound404 from "/public/assets/404.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gray-50 py-2">
      <div className="container mx-auto my-4 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-md text-center">
          <div>
            <Image
              src={NotFound404}
              alt="Erro 404"
              width={584}
              height={300}
              className="w-full"
            />
          </div>
          <p className="mb-8 text-2xl font-semibold md:text-3xl">
            Desculpe, não conseguimos encontrar esta página.
          </p>
          <Link
            rel="noopener noreferrer"
            href="/dashboard"
            className="inline-block rounded border-2 border-solid border-primary px-4 py-2 font-bold text-primary-foreground transition-colors hover:bg-primary focus-visible:bg-primary focus-visible:text-primary-foreground"
          >
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </section>
  );
}
