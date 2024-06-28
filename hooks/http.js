import { useState } from "react";
const useRequest = ({ action, onSuccess, onError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const request = async (...variables) => {
        setIsLoading(true);
        const { data, error } = await action(...variables);
        data ? onSuccess(data) : onError(error);
        setIsLoading(false);
    };
    return [{ isLoading }, request];
}; 
export default useRequest;