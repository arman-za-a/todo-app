"use client";
import MethodForm from "./MethodForm";
import useForm from "@/hooks/form";
import { GrAddCircle } from "react-icons/gr";
import { useAddTodo } from "@/hooks/todo";
import { statusRadios } from "@/data/form";
const AddTodoForm = ({ error }) => {
    const { form, changeInput, resetForm } = useForm({ title: "", status: "todo" });
    const { isLoading, requestAddTodo } = useAddTodo({ resetForm });
    return (
        <MethodForm 
            error={error}
            form={form}
            icon={<GrAddCircle />}
            title="Add New Todo"
            inputs={[{ name: "title", type: "text", label: "Title:" }]}
            radios={statusRadios}
            submitText="Add"
            isLoading={isLoading}
            changeInput={changeInput}
            onSubmit={() => requestAddTodo(form)}
        />
    );
};
export default AddTodoForm;