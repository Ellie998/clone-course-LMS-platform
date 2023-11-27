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
  return <div>Course Nav Bar</div>;
};
