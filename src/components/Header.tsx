"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { Button } from "../components";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();
  const player = usePlayer();

  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }

    router.refresh();
    player.reset();
  };

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
            <HiHome
              size={20}
              className="text-black"
              onClick={() => router.push("/")}
            />
          </button>
          <button className="bg-white rounded-full p-2 flex items-center justify-center hover:opacity-75 transition">
            <BiSearch
              size={20}
              className="text-black"
              onClick={() => router.push("/search")}
            />
          </button>
        </div>

        <div className="flex justify-center items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-2" onClick={handleLogout}>
                Logout
              </Button>

              <Button
                className="bg-white"
                onClick={() => router.push("/account")}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
