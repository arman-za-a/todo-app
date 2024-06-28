import api from "@/configs/axios";
import { getCookies } from "@/utils/cookies";
const { BASE_URL } = process.env;
const getTodos = async () => {
    try {
        const response = await fetch(`${BASE_URL}/todos`, 
            { cache: "no-store", headers: { "Cookie": await getCookies() } }
        );
        const data = await response.json();
        return response.ok ? { data } : { error: data.message };
    } catch {
        return { error: "Error in getting todos" };
    };
};
const getTodo = async id => {
    try {
        const response = await fetch(`${BASE_URL}/todos/${id}`, 
            { cache: "no-store", headers: { "Cookie": await getCookies() } }
        );
        const data = await response.json();
        if (response.ok) {
            return { data };
        } else if (response.status === 404) {
            return { error: "notfound" };
        } else {
            return { error: data.message };
        };
    } catch {
        return { error: "Error in getting todo" };
    };
};
const addTodo = async todo => {
    try {
        const response = await api.post("/todos", todo);
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in adding todo" };
    };
};
const editTodo = async (id, editedTodo) => {
    try {
        const response = await api.patch(`/todos/${id}`, editedTodo);
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in editing todo" };
    };
};
const deleteTodo = async id => {
    try {
        const response = await api.delete(`/todos/${id}`);
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in deleting todo" };
    };
};
const updateTodoStatus = async (id, direction) => {
    try {
        const response = await api.patch(`/todos/${id}/status`, { direction });
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in updating todo status" };
    };
};
export { getTodos, getTodo, addTodo, editTodo, deleteTodo, updateTodoStatus };