"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Modal
        title="Modal Title"
        description="Modal Description"
        isOpen={true}
        onChange={() => {}}
      >
        <p>Modal Content</p>
      </Modal>
    </>
  );
};

export default ModalProvider;
