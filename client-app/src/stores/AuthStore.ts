import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStoreProps = {
    token: string;
    setToken: (token: string) => void;
};

export const useAuthStore = create(
    persist<AuthStoreProps>(
        (set, get) => ({
            token: "",
            setToken: (token: string) => set({ token }),
        }),
        {
            name: "authStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
