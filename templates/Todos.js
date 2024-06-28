import styles from "@/sass/Todos.module.scss";
import Error from "@/components/Error";
import Tasks from "@/components/Tasks";
const Todos = ({ error, tasks }) => (
    <section className={styles.container}>
        {error ? <Error message={error} /> : (
            <div className={styles.todos}>
                {Object.entries(tasks).map(([status, list]) => <Tasks key={status} status={status} list={list} />)}
            </div>
        )}
    </section>
);
export default Todos;