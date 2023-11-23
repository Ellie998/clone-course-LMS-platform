"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateDate: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  //  code for preventing hydation mismatch between client side and server side
  // this component is only rendered client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  //rehydrate
  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return <div>Chapter List</div>;
};

export default ChaptersList;
