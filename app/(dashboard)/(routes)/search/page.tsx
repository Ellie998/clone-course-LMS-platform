import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import Categories from "./_components/categories";
import SearchInput from "@/components/seach-input";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const course = await getCourses({ userId, ...searchParams });
  return (
    <>
      <div className="block px-6 pt-6 md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default SearchPage;
