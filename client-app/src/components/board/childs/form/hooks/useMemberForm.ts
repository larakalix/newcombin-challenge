import * as Yup from "yup";

import type { IMember } from "../../../../../types/Member";

export const useMemberForm = () => {
    const initialValues: IMember = {
        firstName: "",
        lastName: "",
        address: "",
        ssn: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("Name is required"),
        lastName: Yup.string().required("Last name is required"),
        address: Yup.string().required("Address is required"),
        ssn: Yup.string()
            .matches(
                /^\d{3}-\d{2}-\d{4}$/,
                "Please enter a valid SSN. (e.g. 123-45-6789)"
            )
            .required("SSN is required"),
    });

    return {
        initialValues,
        validationSchema,
    };
};
