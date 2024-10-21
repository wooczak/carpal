import { router, useRootNavigationState, useRouter } from "expo-router";
import useUserStore, { StoredUserData } from "../../../store/user";
import { signOut } from "../api";
import { useEffect } from "react";

type HookReturnType = {
  handleSignOut: () => void;
  user: StoredUserData;
};

export default function useCurrentUser(): HookReturnType {
  const router = useRouter();
  const user = useUserStore();
  const rootNavigationState = useRootNavigationState();

  async function handleSignOut() {
    const signOutRes = await signOut();

    if (signOutRes.status === 200) {
      user.resetUserData();
      router.replace('/root/sign-in');
    }
  }

  useEffect(() => {
    if (!user.email && rootNavigationState?.key) handleSignOut();
  }, [user.email, rootNavigationState.key]);

  return { handleSignOut, user };
}
