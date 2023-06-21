import { Card, TextInput, Title, Subtitle, Button } from "@tremor/react";
import { Formik, Field, Form } from "formik";
import { useMemberForm } from "./hooks/useMemberForm";
import { Children } from "react";

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
    const { initialValues, handleSubmit } = useMemberForm();

    return (
        <Card className="min-h-[calc(70vh-2.5rem)]">
            <Title className="mb-4">Add new member</Title>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="flex flex-col gap-4">
                    {Children.toArray(
                        formFields.map(({ label, name, placeholder }) => (
                            <div className="flex flex-col gap-1">
                                <label htmlFor={name}>
                                    <Subtitle className="text-xs">
                                        {label}
                                    </Subtitle>
                                </label>
                                <TextInput
                                    id={name}
                                    name={name}
                                    placeholder={placeholder}
                                />
                            </div>
                        ))
                    )}

                    <Button className="mt-6" size="lg" type="submit">
                        Submit
                    </Button>
                </Form>
            </Formik>
        </Card>
    );
};
