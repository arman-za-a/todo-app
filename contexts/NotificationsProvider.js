"use client";
import { v4 } from "uuid";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { notificationsReducer, initialNotifications } from "@/reducers/notifications";
export const NotificationsContext = createContext();
const NotificationsProvider = ({ children }) => {
    const [notifications, dispatch] = useImmerReducer(notificationsReducer, initialNotifications);
    return (
        <NotificationsContext.Provider value={{ notifications, dispatch }}>
            {children}
        </NotificationsContext.Provider>
    );
};
export default NotificationsProvider;