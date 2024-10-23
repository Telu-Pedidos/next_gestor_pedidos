import getCategories from "@/actions/category/get-categories";
import { Metadata } from "next";
import CategoriesTable from "./table/categories-table";
import CategoryCreate from "./components/category-create";

export const metadata: Metadata = {
  title: "Dashboard - Categorias | Télu Personalizados"
};

export default async function CategoriasPage() {
  const { data } = await getCategories();

  return (
    <main className="w-full max-w-6xl rounded-md bg-card px-5 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-2xl font-medium text-title">Categorias</h1>
      </div>

      <div className="flex w-full">
        <CategoryCreate />
      </div>
      {data && <CategoriesTable categories={data} />}
    </main>
  );
}
