import Todos from "@/templates/Todos";
import { redirect } from "next/navigation";
import { getTodos } from "@/services/todo";
import { authenticateUser } from "@/utils/auth";
const TodosPage = async () => {
  const { status } = await authenticateUser();
  if (status === "unauthed") {
      redirect("/signin");
  };
  const { data, error } = await getTodos();
  return (
    <main>
      <Todos error={error} tasks={data} />
    </main>
  );
};
export default TodosPage;