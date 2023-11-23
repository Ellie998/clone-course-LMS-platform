"use client";

import { Chapter } from "@prisma/client";

interface ChaptersListProps {
  items: Chapter[];
  onReorder: (updateDate: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  return <div>Chapter List</div>;
};

export default ChaptersList;
