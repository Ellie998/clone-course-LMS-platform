"use client";

import * as z from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Chapter, MuxData } from "@prisma/client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";

interface ChapterVideoProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoProps) => {
  const router = useRouter();

  const [isEdditing, setIsEdditing] = useState(false);

  const toggleEdit = () => setIsEdditing((current: any) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEdditing && <>Cancel</>}
          {!isEdditing && !initialData?.videoUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a video
            </>
          )}
          {!isEdditing && initialData?.videoUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEdditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center rounded-md h-60 bg-slate-200">
            <VideoIcon className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2 aspect-video">
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ""} />
          </div>
        ))}
      {isEdditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEdditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Videos can take a few minutes to process. Refresh the page if video
          does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
