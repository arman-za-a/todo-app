"use client";
import AuthForm from "./AuthForm";
import useForm from "@/hooks/form";
import { useSignin } from "@/hooks/auth";
import { signinInputs } from "@/data/form";
const SigninForm = ({ error }) => {
    const { form, changeInput } = useForm({ email: "", password: "" });
    const { isLoading, requestSignin } = useSignin();
    return (
        <AuthForm 
            error={error}
            title="Login Form"
            inputs={signinInputs}
            question="Create an account?"
            submitText="Login"
            authLink={{ path: "/signup", text: "Sign up" }}
            isLoading={isLoading}
            onChangeInput={changeInput}
            onSubmit={() => requestSignin(form)}
        />
    );
};
export default SigninForm;