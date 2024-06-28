import useNotifications from "./notifications";
import useRequest from "./http";
import { useRouter } from "next/navigation";
import { signupUser, signinUser, signoutUser } from "@/services/auth";
const useSignup = () => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestSignup] = useRequest({
        action: signupUser,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.replace("/add-todo");
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestSignup };
};
const useSignin = () => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestSignin] = useRequest({
        action: signinUser,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.replace("/todos");
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestSignin };
};
const useSignout = () => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestSignout] = useRequest({
        action: signoutUser,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.replace("/signin");
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestSignout };
};
export { useSignup, useSignin, useSignout };