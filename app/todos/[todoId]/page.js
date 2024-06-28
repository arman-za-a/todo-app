import EditTodoForm from "@/templates/EditTodoForm";
import { notFound, redirect } from "next/navigation";
import { getTodo } from "@/services/todo";
import { authenticateUser } from "@/utils/auth";
const EditTodoPage = async ({ params }) => {
    const { status } = await authenticateUser();
    if (status === "unauthed") {
        redirect("/signin");
    };
    const { todoId } = params;
    const { data, error } = await getTodo(todoId);
    if (error === "notfound") {
        notFound();
    };
    return (
        <main>
            <EditTodoForm error={error} todo={data} />
        </main>
    );
};
export default EditTodoPage;