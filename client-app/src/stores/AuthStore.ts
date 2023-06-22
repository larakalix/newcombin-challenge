import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ITokenResponse } from "../types/Auth";

type Props = {
    auth: ITokenResponse | null;
    setAuth: (auth: ITokenResponse) => void;
};

export const useAuthStore = create(
    persist<Props>(
        (set) => ({
            auth: null,
            setAuth: (auth: ITokenResponse) => set({ auth }),
        }),
        {
            name: "authStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
