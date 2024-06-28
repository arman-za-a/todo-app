import styles from "@/sass/Error.module.scss";
const Error = ({ message, margin }) => (
    <h2 className={styles.message} style={{ margin }}>{message}</h2>
);
export default Error;