"use client";

import * as z from "zod";
import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { File, PlusCircle } from "lucide-react";
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
