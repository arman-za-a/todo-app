"use client";
import styles from "@/sass/Notifications.module.scss";
import Notification from "@/components/Notification";
import useNotifications from "@/hooks/notifications";
const Notifications = () => {
    const { notifications } = useNotifications();
    return (
        <div className={styles.container}>
            {notifications.map(notification => <Notification key={notification.id} { ...notification } />)}
        </div>
    );
};
export default Notifications;