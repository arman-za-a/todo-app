import api from "@/configs/axios";
import { getCookies } from "@/utils/cookies";
const { BASE_URL } = process.env;
const getMe = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/me`, 
            { cache: "no-store", headers: { "Cookie": await getCookies() } }
        );
        const data = await response.json();
        if (response.ok) {
            return { data };
        } else if (response.status === 401) {
            return { error: "unauthorized" };
        } else {
            return { error: data.message };
        };
    } catch {
        return { error: "Error in getting user" };
    };
};
const signoutUser = async () => {
    try {
        const response = await api.get("/auth/signout");
        return { data: response.data };
    } catch {
        return { error: "Error in signing out" };
    };
};
const signupUser = async user => {
    try {
        const response = await api.post("/auth/signup", user);
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in signing up" };
    };
};
const signinUser = async user => {
    try {
        const response = await api.post("/auth/signin", user);
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in signing in" };
    };
};
export { getMe, signoutUser, signupUser, signinUser };