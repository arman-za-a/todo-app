import useNotifications from "./notifications";
import useRequest from "./http";
import { useRouter } from "next/navigation";
import { addTodo, editTodo, deleteTodo, updateTodoStatus } from "@/services/todo";
const useAddTodo = ({ resetForm }) => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestAddTodo] = useRequest({
        action: addTodo,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            resetForm();
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestAddTodo };
};
const useEditTodo = () => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestEditTodo] = useRequest({
        action: editTodo,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.replace("/todos");
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestEditTodo };
};
const useDeleteTodo = () => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    const [{ isLoading }, requestDeleteTodo] = useRequest({
        action: deleteTodo,
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
    return { isLoading, requestDeleteTodo };
};
const useUpdateTodoStatus = direction => {
    const router = useRouter();
    const { showNotification } = useNotifications();
    return useRequest({
        action: id => updateTodoStatus(id, direction),
        onSuccess: ({ message }) => {
            showNotification("success", message);
            router.refresh();
        },
        onError: error => showNotification("error", error)
    });
};
export { useAddTodo, useEditTodo, useDeleteTodo, useUpdateTodoStatus };