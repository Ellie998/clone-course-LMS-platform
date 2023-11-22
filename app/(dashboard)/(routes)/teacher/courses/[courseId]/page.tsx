import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const userId = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({ where: { id: params.courseId } });
  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  console.log(categories);

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  // course에 등록되지 않는 값들은 null을 return하므로 Boolean으로 filter하면 값이 존재하는 것들만 남는다.

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700 ">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-16 md:grid-cols-2 ">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
