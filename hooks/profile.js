import useNotifications from "./notifications";
import useRequest from "./http";
import { useRouter } from "next/navigation";
import { editProfile } from "@/services/profile";
const useEditProfile = () => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestEditProfile] = useRequest({
        action: editProfile,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.replace("/todos");
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestEditProfile };
};
export { useEditProfile };