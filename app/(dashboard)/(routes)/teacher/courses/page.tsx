import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import Link from "next/link";
import { DataTable } from "./__components/data-table";
import { columns } from "./__components/colums";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <Link href={"/teacher/create"}>
        <DataTable columns={columns} data={courses} />
      </Link>
    </div>
  );
};

export default CoursesPage;
