import EditProfileForm from "@/templates/EditProfileForm";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/utils/auth";
const ProfilePage = async () => {
    const { status, user, error } = await authenticateUser();
    if (status ==="unauthed") {
        redirect("/signin");
    };
    return (
        <main>
            <EditProfileForm error={error} user={user} />
        </main>
    );
};
export default ProfilePage;