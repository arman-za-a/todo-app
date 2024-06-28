"use client";
import MethodForm from "./MethodForm";
import useForm from "@/hooks/form";
import { useParams } from "next/navigation";
import { GrEdit } from "react-icons/gr";
import { useEditTodo } from "@/hooks/todo";
import { statusRadios } from "@/data/form";
const EditTodoForm = ({ error, todo }) => {
    const { todoId } = useParams();
    const { form, changeInput } = useForm({ title: todo?.title, status: todo?.status });
    const { isLoading, requestEditTodo } = useEditTodo();
    return (
        <MethodForm 
            error={error}
            form={form}
            icon={<GrEdit />}
            title="Edit Todo"
            inputs={[{ name: "title", type: "text", label: "Title:" }]}
            radios={statusRadios}
            submitText="Edit"
            isLoading={isLoading}
            changeInput={changeInput}
            onSubmit={() => requestEditTodo(todoId, form)}
        />
    );
};
export default EditTodoForm;