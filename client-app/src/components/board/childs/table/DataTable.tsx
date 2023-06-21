/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { Children } from "react";
import { CustomMessage } from "../../../layout";
import { useMemberStore } from "../../../../stores/MemberStore";
import { fetchMembers } from "../../../../services/member";

import type { IMember } from "../../../../types/Member";

export const DataTable = () => {
    const { auth } = useAuthStore((state) => state);
    const { members, setMembers } = useMemberStore((state) => state);
    const { data, isLoading, error, isError } = useQuery(
        ["getMembers"],
        async () => await fetchMembers("token" in auth! ? auth.token : ""),
        {
            onSuccess(data) {
                if (data) setMembers(data);
            },
            onError: (error: Error) =>
                console.log("Error fetching services: ", error),
        }
    );

    if (isLoading) return <CustomMessage message="Loading" isLoading />;

    if (error || isError)
        return <CustomMessage message="Error getting Members" />;

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
                        members.map((item: IMember) => (
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
