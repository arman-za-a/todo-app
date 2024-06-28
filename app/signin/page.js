import SigninForm from "@/templates/SigninForm";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/utils/auth";
const SigninPage = async () => {
    const { status , error } = await authenticateUser();
    if (status === "authed") {
        redirect("/profile");
    };
    return (
        <main>
            <SigninForm error={error} />
        </main>
    );
};
export default SigninPage;