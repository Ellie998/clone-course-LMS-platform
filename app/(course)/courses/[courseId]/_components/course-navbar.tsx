import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";

interface CourseNavBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavBarProps) => {
  return (
    <div className="flex items-center h-full p-4 bg-white border-b shadow-sm">
      <NavbarRoutes />
    </div>
  );
};
