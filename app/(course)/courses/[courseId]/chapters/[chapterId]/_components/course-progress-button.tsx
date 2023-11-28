"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

export function CourseProgressButton({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) {
  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto">
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="w-4 h-4 ml-2" />
    </Button>
  );
}
