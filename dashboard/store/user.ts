import { User } from "@carpal/drivetrain/types";
import { create } from "zustand";

export type StoredUserData = Omit<
  User,
  "id" | "password" | "keep_me_signed_in"
>;
type StoredUserDataUpdaters = {
  updateUserData: (user: StoredUserData) => void;
  resetUserData: () => void;
};

const useUserStore = create<StoredUserData & StoredUserDataUpdaters>((set) => ({
  name: "",
  surname: "",
  email: "",
  updateUserData: (user: StoredUserData) =>
    set(() => ({
      name: user.name,
      surname: user.surname,
      email: user.email,
    })),
  resetUserData: () =>
    set(() => ({
      name: "",
      surname: "",
      email: "",
    })),
}));

export default useUserStore;
