import "@/sass/helpers.scss";
import styles from "@/sass/Tasks.module.scss";
import Task from "./Task";
const Tasks = ({ status, list }) => {
    const title = {
        todo: "Todo",
        progress: "In Progress",
        review: "Review",
        done: "Done"
    }[status];
    return (
        <div className={styles.container}>
            <div className={`${styles.header} ${`bg_${status}`}`}>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={styles.tasks}>
                {list.map(task => <Task key={task._id} status={status} {...task} />)}
            </div>
        </div>
    );
};
export default Tasks;