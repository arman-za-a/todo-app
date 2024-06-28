import SignupForm from "@/templates/SignupForm";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/utils/auth";
const SignupPage = async () => {
    const { status, error } = await authenticateUser();
    if (status === "authed") {
        redirect("/profile");
    };
    return (
        <main>
            <SignupForm error={error} />
        </main>
    );
};
export default SignupPage;