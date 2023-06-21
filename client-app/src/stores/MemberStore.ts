import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { IMember } from "../types/Member";

type Props = {
    members: IMember[];
    setMembers: (members: IMember[]) => void;
    addMember: (member: IMember) => void;
};

export const useMemberStore = create(
    persist<Props>(
        (set, get) => ({
            members: [],
            setMembers: (members: IMember[]) => set({ members }),
            addMember: (member: IMember) => {
                const members = get().members;
                set({ members: [...members, member] });
            },
        }),
        {
            name: "membersStore",
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
