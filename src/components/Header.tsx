"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { Button } from "../components";
import { useAuthModal } from "@/hooks/useAuthModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const authModal = useAuthModal();

  return (
    <div className="bg-gradient-to-b from-emerald-800 p-6 h-fit">
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="hidden md:flex items-center gap-x-2">
          <button
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
            onClick={router.back}
          >
            <RxCaretLeft size={35} className="text-neutral-400" />
          </button>
          <button
            className="bg-black rounded-full flex items-center justify-center hover:opacity-75 transition"
            onClick={router.forward}
          >
            <RxCaretRight size={35} className="text-neutral-400" />
          </button>
        </div>

        <div className="flex md:hidden items-center gap-x-2">
          <button className="bg-white rounded-full p-2 flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>
          <button className="bg-white rounded-full p-2 flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-x-4">
          <div>
            <Button
              className="text-neutral-300 bg-transparent font-medium"
              onClick={authModal.open}
            >
              Sign up
            </Button>
          </div>
          <div>
            <Button className="px-6 py-2 bg-white" onClick={authModal.open}>
              Log in
            </Button>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
