import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id) => set((state) => ({ activeId: id })),
  setIds: (ids) => set((state) => ({ ids: ids })),
  reset: () => set((state) => ({ ids: [], activeId: undefined })),
}));

export default usePlayer;
