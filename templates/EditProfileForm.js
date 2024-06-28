"use client";
import MethodForm from "./MethodForm";
import useForm from "@/hooks/form";
import { useEditProfile } from "@/hooks/profile";
import { CgProfile } from "react-icons/cg";
import { profileInputs } from "@/data/form";
const EditProfileForm = ({ error, user }) => {
    const { form, changeInput } = useForm({ firstname: user?.firstname, lastname: user?.lastname, password: "" });
    const { isLoading, requestEditProfile } = useEditProfile();
    return (
        <MethodForm 
            error={error}
            form={form}
            icon={<CgProfile />}
            title="Profile"
            inputs={profileInputs}
            radios={[]}
            submitText="Submit"
            isLoading={isLoading}
            changeInput={changeInput}
            onSubmit={() => requestEditProfile(form)}
        />
    );
};
export default EditProfileForm;