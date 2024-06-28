import AddTodoForm from "@/templates/AddTodoForm";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/utils/auth";
const AddTodoPage = async () => {
    const { status, error } = await authenticateUser();
    if (status === "unauthed") {
        redirect("/signin");
    };
    return (
        <main>
            <AddTodoForm error={error} />
        </main>
    );
};
export default AddTodoPage;