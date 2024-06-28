"use client";
import styles from "@/sass/Notification.module.scss";
import useNotifications from "@/hooks/notifications";
import { FaCheck, FaExclamation, FaXmark } from "react-icons/fa6";
const Notification = ({ id, isVisible, type, message, isTimering, isPaused }) => {
    const { hideNotification, endNotification, pauseNotification, runNotification } = useNotifications();
    let bgStyle, icon;
    switch (type) {
        case "success":
            bgStyle = "bgSuccess";
            icon = <FaCheck />;
            break;
        case "error":
            bgStyle = "bgError";
            icon = <FaExclamation />
            break;
    };
    return (
        <div 
            className={`${styles.container} ${styles[isVisible ? "appearAnimating" : "hideAnimating"]}`} 
            onAnimationEnd={() => endNotification(id)} 
            onMouseEnter={() => pauseNotification(id)} 
            onMouseLeave={() => runNotification(id)}
        >
            <div className={styles.body}>
                <div className={`${styles.typeIcon} ${styles[bgStyle]}`}>
                    {icon}
                </div>
                <span>{message}</span>
            </div>
            <div 
                className={`
                    ${styles.progressbar} 
                    ${styles[bgStyle]} ${isTimering && styles["timerAnimating"]} ${styles[isPaused ? "paused" : "running"]}
                `} 
                onAnimationEnd={event => {
                    event.stopPropagation();
                    hideNotification(id);
                }}
            >
            </div>
            <FaXmark className={styles.xIcon} onClick={() => hideNotification(id)} />
        </div>
    );
};
export default Notification;