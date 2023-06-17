import { create } from "zustand";

interface UploadModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useUploadModal = create<UploadModalState>((set) => ({
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  isOpen: false,
}));

export default useUploadModal;
