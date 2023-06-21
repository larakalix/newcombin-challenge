import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
} from "@tremor/react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../stores/AuthStore";

import type { IMember } from "../../../../types/Member";
import { Children } from "react";
import { CustomMessage } from "../../../layout";

const fetchMembers = async (token: string) => {
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

export const DataTable = () => {
    const { auth } = useAuthStore((state) => state);
    const { data, isLoading, error } = useQuery(
        ["getMembers"],
        async () => await fetchMembers("token" in auth! ? auth.token : ""),
        {
            onError: (error: Error) =>
                console.log("Error fetching services: ", error),
        }
    );

    if (isLoading) return <CustomMessage message="Loading" isLoading />;

    if (error) return <CustomMessage message="Error getting Members" />;

    if (!data || data.length === 0)
        return <CustomMessage message="No members found" />;

    return (
        <Card className="min-h-[calc(70vh-2.5rem)]">
            <Title>Members</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        {Children.toArray(
                            ["First Name", "Last Name", "Address", "SSN"].map(
                                (column) => (
                                    <TableHeaderCell>{column}</TableHeaderCell>
                                )
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Children.toArray(
                        data.map((item: IMember) => (
                            <TableRow className="align-middle whitespace-nowrap tabular-nums text-left p-4">
                                <TableCell>{item.firstName}</TableCell>
                                <TableCell>
                                    <Text>{item.lastName}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.address}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{item.ssn}</Text>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
};
