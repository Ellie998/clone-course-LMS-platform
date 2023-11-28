import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashBoard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { coursesInProgress, completedCourses } = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4 ">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>{/* TODO : Info Card */}</div>
        <div>{/* TODO : Info Card */}</div>
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
