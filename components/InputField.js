import styles from "@/sass/InputField.module.scss";
const InputField = ({ name, type, label, value, onChange }) => (
    <div>
        <label className={styles.label}>{label}:</label>
        <input className={styles.input} type={type} value={value} onChange={({ target }) => onChange(name, target.value)} />
    </div>
);
export default InputField;