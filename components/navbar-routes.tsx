"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

import { UserButton, useAuth } from "@clerk/nextjs";
import { isTeacher } from "@/lib/teacher";

import SearchInput from "./seach-input";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname?.includes("/search");

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex ml-auto gap-x-2 ">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button size={"sm"} variant={"ghost"}>
              <LogOut className="w-4 h-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href={"/teacher/courses"}>
            <Button size={"sm"} variant={"ghost"}>
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
