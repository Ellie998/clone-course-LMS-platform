"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ChapterActionProps {
  disable: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disable,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => {}}
        disabled={disable || isLoading}
        variant={"outline"}
        size={"sm"}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button disabled={isLoading}>
          <Trash size={"sm"} className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
