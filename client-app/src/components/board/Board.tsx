import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/AuthStore";
import { Toaster } from "react-hot-toast";
import { CustomMessage, DataTable, MemberForm } from "../layout";
import { fetchAuth } from "../../services/auth";

import type { ITokenResponse } from "../../types/Auth";

export const Board = () => {
    const { auth, setAuth } = useAuthStore((state) => state);
    const { isLoading, error } = useQuery(
        ["auth"],
        async () => await fetchAuth(),
        {
            onSuccess: (data: ITokenResponse) => {
                if ("code" in data) console.error(data.code, data.message);

                if (data && "token" in data) setAuth(data);
            },
            onError: (error: Error) => toast.error(error.message),
        }
    );

    if (isLoading) return <CustomMessage message="Loading" isLoading />;

    if (error) return <CustomMessage message="Error in Auth" />;

    if (!auth) return <CustomMessage message="Not authenticated" />;

    return (
        <section className="flex items-center justify-center flex-1 bg-slate-200">
            <Toaster />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MemberForm />
                <DataTable />
            </div>
        </section>
    );
};
