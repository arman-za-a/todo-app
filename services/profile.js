import api from "@/configs/axios";
const editProfile = async profile => {
    try {
        const response = await api.patch("/profile", profile);
        return { data: response.data };
    } catch ({ response }) {
        return { error: response?.data?.message || "Error in editing profile" };
    };
};
export { editProfile };