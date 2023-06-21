import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/AuthStore";

import type { ITokenResponse } from "../../types/Auth";
import { CustomMessage, DataTable, MemberForm } from "../layout";

const fetchAuth = async () => {
    const url = "http://localhost:8081/auth";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "sarah",
            password: "connor",
        }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

export const Board = () => {
    const { auth, setAuth } = useAuthStore((state) => state);
    const { data, isLoading, error } = useQuery(
        ["auth"],
        async () => await fetchAuth(),
        {
            onSuccess: (data: ITokenResponse) => {
                if ("code" in data) console.error(data.code, data.message);

                if (data && "token" in data) setAuth(data);
            },
            onError: (error: Error) =>
                console.log("Error fetching services: ", error),
        }
    );

    if (isLoading) return <CustomMessage message="Loading" isLoading />;

    if (error) return <CustomMessage message="Error in Auth" />;

    if (!auth) return <CustomMessage message="Not authenticated" />;

    return (
        <section className="flex items-center justify-center flex-1 bg-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MemberForm />
                <DataTable />
            </div>
        </section>
    );
};
