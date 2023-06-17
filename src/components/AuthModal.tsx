"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useAuthModal } from "@/hooks/useAuthModal";
import Modal from "./Modal";

const AuthModal = () => {
  const { close, isOpen } = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      router.refresh();
      close();
    }
  }, [close, router, session]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account to continue"
      isOpen={isOpen}
      onChange={() => {
        if (isOpen) close();
      }}
    >
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
        providers={["github"]}
        magicLink
      />
    </Modal>
  );
};

export default AuthModal;
