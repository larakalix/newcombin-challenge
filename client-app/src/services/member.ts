import type { IMember } from "../types/Member";

export const addMember = async (newMember: IMember, token: string) => {
    try {
        const url = "http://localhost:8081/api/members";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newMember),
        };

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

export const fetchMembers = async (token: string) => {
    const url = "http://localhost:8081/api/members";
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data as IMember[];
};
