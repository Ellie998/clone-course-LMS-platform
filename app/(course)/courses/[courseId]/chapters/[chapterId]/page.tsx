import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeInEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          label={"You already completed this chapter."}
          variant={"success"}
        />
      )}
      {isLocked && (
        <Banner
          label={"You need to purchase this course to watch this chapter."}
          variant={"warning"}
        />
      )}
    </div>
  );
}
