import { v4 } from "uuid";
const initialNotifications = [];
const notificationsReducer = (notifications, action) => {
    switch (action.type) {
        case "notificationShown": {
            const { type, message } = action.payload;
            notifications.push({ id: v4(), isVisible: true, isTimering: true, isPaused: false, type, message });
            break;
        };
        case "notificationHidden": {
            const { id } = action.payload;
            const notification = notifications.find(notification => notification.id === id);
            notification.isVisible = false;
            break;
        };
        case "notificationEnded": {
            const { id } = action.payload;
            const notification = notifications.find(notification => notification.id === id);
            if (notification.isVisible) {
                notification.isTimering = true;
            } else {
                return notifications.filter(notification => notification.id !== id);
            };
            break;
        };
        case "notificationPaused": {
            const { id } = action.payload;
            const notification = notifications.find(notification => notification.id === id);
            notification.isPaused = true;
            break;
        };
        case "notificationRuned": {
            const { id } = action.payload;
            const notification = notifications.find(notification => notification.id === id);
            notification.isPaused = false;
        };
    };
};
export { initialNotifications, notificationsReducer };