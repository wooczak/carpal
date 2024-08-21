import { User } from "./../../engine/types/database";
import { create } from "zustand";

type StoredUserData = Omit<User, "id" | "password" | "keep_me_signed_in">;

const useUserStore = create<StoredUserData>((set) => ({
  name: "",
  surname: "",
  email: "",
  updateUserData: (user: StoredUserData) =>
    set(() => ({
      name: user.name,
      surname: user.surname,
      email: user.email,
    })),
  resetUserData: () => set((state) => ({
    name: '',
    surname: '',
    email: ''
  }))
}));

export default useUserStore;
