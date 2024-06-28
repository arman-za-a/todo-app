import "@/sass/helpers.scss";
import styles from "@/sass/StatusRadio.module.scss";
const StatusRadio = ({ value, checked, icon, title, bg, onChange }) => (
    <div className={`${styles.container} ${bg}`}>
        <label className={styles.label}>
            {icon}
            <span>{title}</span>
        </label>
        <input 
            type="radio" 
            name="status" 
            value={value} 
            checked={checked} 
            onChange={({ target }) => onChange("status", target.value)} 
        />
    </div>
);
export default StatusRadio;