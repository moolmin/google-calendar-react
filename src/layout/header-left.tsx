"use client";

import { Button } from "@/components/ui/button";
import { IoMdMenu } from "react-icons/io";
import logo from "../assets/logo.png";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function HeaderLeft() {

  return (
    <div className="flex flex-row items-center gap-3">
      <div className="hidden items-center lg:flex">
        <Button variant="ghost" size="lg" className="rounded-full">
          <IoMdMenu size={48} />
        </Button>
        
      </div>

      <img src={logo} alt="logo" width={40} height={40} />
      <h1 className="text-xl font-normal font-bold">Calendar</h1>

      <Button variant="outline">오늘</Button>

      <div className="flex items-center gap-3">
      <MdArrowBackIos />
      <MdArrowForwardIos />

      </div>

    </div>
  );
}
