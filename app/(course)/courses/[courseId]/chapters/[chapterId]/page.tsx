import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";

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
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

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
      <div className="flex flex-col max-w-4xl pb-20 mx-auto">
        <div className="p-4 ">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <div>{/*  TODO: Add CourseProgressButton */}</div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
