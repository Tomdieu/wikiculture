import { UserType } from "@/types";
import { create } from "zustand";

type UserStoreType = {
  user?: UserType;
  isOpen: boolean;
  setUser: (user?: UserType) => void;
  onOpen: () => void;
  onClose: () => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
  user: undefined,
  isOpen: false,
  setUser: (user) => set({ user: user }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, user: undefined }),
}));
