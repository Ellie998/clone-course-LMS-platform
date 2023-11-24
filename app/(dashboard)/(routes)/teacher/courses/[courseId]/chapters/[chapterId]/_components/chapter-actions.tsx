"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

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
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={() => {}}
        disabled={disable}
        variant={"outline"}
        size={"sm"}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button>
        <Trash size={"sm"} className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChapterActions;
