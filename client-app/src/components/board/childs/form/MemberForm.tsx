/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Children } from "react";
import { useMutation } from "@tanstack/react-query";
import {
    Formik,
    ErrorMessage,
    Form,
    Field,
    type FieldInputProps,
    type FormikHelpers,
} from "formik";
import toast from "react-hot-toast";
import { Card, TextInput, Title, Subtitle, Button } from "@tremor/react";
import { useMemberForm } from "./hooks/useMemberForm";
import { useAuthStore } from "../../../../stores/AuthStore";
import { CustomMessage } from "../../../layout";
import { addMember } from "../../../../services/member";
import { useMemberStore } from "../../../../stores/MemberStore";

import type { IMember } from "../../../../types/Member";

const formFields: { name: string; label: string; placeholder: string }[] = [
    {
        name: "firstName",
        label: "First Name",
        placeholder: "John",
    },
    {
        name: "lastName",
        label: "Last Name",
        placeholder: "Doe",
    },
    {
        name: "address",
        label: "Address",
        placeholder: "1234 Main St",
    },
    {
        name: "ssn",
        label: "SSN",
        placeholder: "123-45-6789",
    },
];

export const MemberForm = () => {
    const { auth } = useAuthStore((state) => state);
    const { addMember: concatMember } = useMemberStore((state) => state);
    const { initialValues, validationSchema } = useMemberForm();
    const { mutate, isLoading, error, isError } = useMutation(
        (newMember: IMember) => {
            return addMember(newMember, "token" in auth! ? auth.token : "");
        },
        {
            onSuccess(data) {
                if ("code" in data) {
                    toast.error(data.message);
                    return;
                }

                toast.success("Member added successfully");
                concatMember(data);
            },
            onError: (error: Error) => toast.error(error.message),
        }
    );

    const handleSubmit = (
        values: IMember,
        { setSubmitting }: FormikHelpers<IMember>
    ) => {
        mutate(values);
        setSubmitting(false);
    };

    if (isLoading) return <CustomMessage message="Loading" isLoading />;

    if (error || isError)
        return <CustomMessage message="Error getting Members" />;

    return (
        <>
            <Card className="min-h-[calc(70vh-2.5rem)]">
                <Title className="mb-4">Add new member</Title>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, isSubmitting, resetForm }) => (
                        <Form className="flex flex-col gap-4">
                            {Children.toArray(
                                formFields.map(
                                    ({ label, name, placeholder }) => (
                                        <Field name={name}>
                                            {({
                                                field,
                                            }: {
                                                field: FieldInputProps<never>;
                                            }) => (
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor={name}>
                                                        <Subtitle className="text-xs">
                                                            {label}
                                                        </Subtitle>
                                                    </label>
                                                    <TextInput
                                                        placeholder={
                                                            placeholder
                                                        }
                                                        className="overflow-hidden"
                                                        {...field}
                                                    />
                                                    <ErrorMessage
                                                        name={name}
                                                        component="div"
                                                        className="text-red-500 text-xs font-light mt-1"
                                                    />
                                                </div>
                                            )}
                                        </Field>
                                    )
                                )
                            )}

                            <Button
                                size="xl"
                                color="orange"
                                type="button"
                                onClick={() => resetForm()}
                            >
                                Reset
                            </Button>
                            <Button
                                size="xl"
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    );
};
