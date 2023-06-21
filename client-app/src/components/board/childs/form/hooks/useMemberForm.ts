import type { FormikHelpers } from "formik";
import type { IMember } from "../../../../../types/Member";

export const useMemberForm = () => {
    const initialValues: IMember = {
        firstName: "",
        lastName: "",
        address: "",
        ssn: "",
    };

    const handleSubmit = (
        values: IMember,
        { setSubmitting }: FormikHelpers<IMember>
    ) => {
        console.log(values);
        setSubmitting(false);
    };

    return {
        initialValues,
        handleSubmit,
    };
};
