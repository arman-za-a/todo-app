import { useContext } from "react";
import { NotificationsContext } from "@/contexts/NotificationsProvider";
const useNotifications = () => {
    const { notifications, dispatch } = useContext(NotificationsContext);
    const showNotification = (type, message) => dispatch({ type: "notificationShown", payload: { type, message } });
    const hideNotification = id => dispatch({ type: "notificationHidden", payload: { id } });
    const endNotification = id => dispatch({ type: "notificationEnded", payload: { id } });
    const pauseNotification = id => dispatch({ type: "notificationPaused", payload: { id } });
    const runNotification = id => dispatch({ type: "notificationRuned", payload: { id } });
    return { 
        notifications, 
        showNotification, 
        hideNotification,
        endNotification,
        pauseNotification,
        runNotification 
    };
};
export default useNotifications;