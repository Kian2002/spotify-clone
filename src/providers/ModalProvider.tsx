"use client";

import { useEffect, useState } from "react";

import { AuthModal, UploadModal } from "@/components";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UploadModal />
      <AuthModal />
    </>
  );
};

export default ModalProvider;
