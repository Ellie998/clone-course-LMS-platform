"use client";

import * as z from "zod";
import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { File, Loader2, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { Attachment, Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();

  const [isEdditing, setIsEdditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEdditing((current: any) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 mt-6 border rounded-md bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Course Attachments
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEdditing && <>Cancel</>}
          {!isEdditing && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEdditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="mt-2 text-sm italic text-slate-500 ">
              No attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-x-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center w-full p-3 border rounded-md bg-sky-100 border-sky-200 text-sky-700">
                  <File className="flex-shrink-0 w-4 h-4 mr-2" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto transition hover:opacity-75"
                      onClick={() => onDelete(attachment.id)}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEdditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            Add anything your students might need to complete the course
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
