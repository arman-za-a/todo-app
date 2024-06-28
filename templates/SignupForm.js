"use client";
import AuthForm from "./AuthForm";
import useForm from "@/hooks/form";
import { useSignup } from "@/hooks/auth";
import { signupInputs } from "@/data/form";
const SignupForm = ({ error }) => {
    const { form, changeInput } = useForm({ email: "", password: "", firstname: "", lastname: "" });
    const { isLoading, requestSignup } = useSignup();
    return (
        <AuthForm 
            error={error}
            title="Registration Form"
            inputs={signupInputs}
            question="Have an account?"
            submitText="Register"
            authLink={{ path: "/signin", text: "Sign in" }}
            isLoading={isLoading}
            onChangeInput={changeInput}
            onSubmit={() => requestSignup(form)}
        />
    );
};
export default SignupForm;