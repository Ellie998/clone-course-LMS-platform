import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import getProgress from "@/actions/get-progress";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          useProgress: {
            where: { userId },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full ">
      <main className="h-full md:pl-80">{children}</main>
    </div>
  );
};

export default CourseLayout;
